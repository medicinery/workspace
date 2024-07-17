import { IDBCollectionStore } from "common-react-toolkit"
import {
	DocumentData,
	Query,
	Unsubscribe,
	WriteBatch,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	writeBatch,
} from "firebase/firestore"
import { db } from "./Firebase"
import { getUserID } from "./Utilites"

export class Model<T> {
	protected _collection: string
	protected store: IDBCollectionStore<T>
	private listeners = new Map<string, Unsubscribe | (() => void)>()

	private updateDebouceWaitTime: number
	private updateDebounceTimer: NodeJS.Timeout | undefined
	private updateDebounceCache = new Map<string, T>()

	private deleteDebouceWaitTime: number
	private deleteDebounceTimer: NodeJS.Timeout | undefined
	private deleteDebounceCache = new Map<string, T>()

	public get collection(): string {
		// TODO: Orgify this (add orgID to collection)
		return `/${this._collection}`
	}

	constructor(meta: {
		collection: string
		store: IDBCollectionStore<T>
		debouceWaitTime?: number
	}) {
		this.store = meta.store
		this._collection = meta.collection
		this.updateDebouceWaitTime = meta.debouceWaitTime || 1500
		this.deleteDebouceWaitTime = meta.debouceWaitTime || 1500
	}

	Listen(
		docID: string,
		callback?: (value: T) => void | Promise<void>,
		debounceEnabled?: boolean
	) {
		if (!docID) return
		if ([...this.listeners.keys()].includes(docID)) {
			const value = this.store.value()[docID]
			if (callback && value) callback(value)
			// console.warn(`Duplicate listen request for [${this._collection}: ${docID}]`)
			return
		}

		this.listeners.set(
			docID,
			onSnapshot(doc(db, this.collection, docID), (doc) => {
				if (!doc.data()) {
					this.Unlisten(docID)
					if (this.store.value()[docID]) {
						// Debounce delete
						this.deleteDebounceCache.set(docID, this.store.value()[docID])
						if (this.deleteDebounceTimer) clearTimeout(this.deleteDebounceTimer)
						this.deleteDebounceTimer = setTimeout(
							() => {
								this.store.Delete(docID)
								this.deleteDebounceCache.delete(docID)
							},
							debounceEnabled && !this.listeners.has(docID)
								? this.deleteDebouceWaitTime
								: 0
						)
					}
					this.updateDebounceCache.delete(docID)
					return
				}

				if (callback) callback(doc.data() as T)

				// Debounce update
				this.updateDebounceCache.set(docID, doc.data() as T)
				if (this.updateDebounceTimer) clearTimeout(this.updateDebounceTimer)
				this.updateDebounceTimer = setTimeout(
					() => {
						this.store.UpdateMany([...this.updateDebounceCache.values()])
						for (const id of this.updateDebounceCache.keys()) {
							this.updateDebounceCache.delete(id)
						}
					},
					debounceEnabled && !this.listeners.has(docID)
						? this.updateDebouceWaitTime
						: 0
				)
			})
		)
	}

	ListenMany(docIDS: string[], callback?: (value: T) => void | Promise<void>) {
		for (const id of docIDS) this.Listen(id, callback, true)
	}

	Unlisten(docID: string) {
		if (!this.listeners.has(docID)) return

		this.listeners.get(docID)?.()
		this.listeners.delete(docID)

		this.store.Delete(docID)
	}

	UnlistenMany(docIDS: string[]) {
		for (const id of docIDS) this.Unlisten(id)
	}

	UnlistenAll() {
		for (const listener of Object.values(this.listeners)) listener()
		this.listeners.clear()
	}

	IsLoading(id: string): boolean {
		// listening & yet store doesn't have value coressponding to id
		return Object.keys(this.listeners).includes(id) && !this.store.value()[id]
	}

	async GetDocByID(id: string): Promise<T | undefined> {
		const data = (await getDoc(doc(db, this.collection, id))).data()
		return data as T | undefined
	}

	async GetDocsByIDS(ids: string[]): Promise<T[]> {
		const docs = await Promise.all(ids.map((id) => this.GetDocByID(id)))
		return docs.filter((x) => x) as T[]
	}

	async GetDocsByQuery(query: Query<DocumentData>): Promise<T[]> {
		return (await getDocs(query)).docs
			.map((x) => x.data())
			.filter((x) => x) as T[]
	}

	protected async PerformBatch(
		callback: (batch: WriteBatch) => void | Promise<void>
	) {
		if (!getUserID()) return

		const batch = writeBatch(db)
		await callback(batch)
		await batch.commit()
	}
}
