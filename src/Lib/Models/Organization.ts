import { doc } from "firebase/firestore"
import { db } from "../Firebase"
import { Model } from "../Model"
import { organizationsStore, organizationStore } from "../State"
import { getTimestamp } from "../Utilites"

export interface Organization_t {
   id: string
   name: string
   logo: string

   createdAt: number
   coordinator: string
   faculties: string[]

   events: string[]
}

class _Organizations extends Model<Organization_t> {
   constructor() {
      super({
         collection: "Organizations",
         store: organizationsStore,
      })
   }

   public get collection(): string {
      return this._collection
   }

   async Update(data: Partial<Organization_t>) {
      await this.PerformBatch((batch) => {
         batch.set(
            doc(db, this.collection, organizationStore.value()?.id ?? ""),
            {
               ...data,
               editedAt: getTimestamp(),
            },
            { merge: true }
         )
      })
   }
}

//----------------------------------------------------------------------------------------------
export const OrganizationsDB = new _Organizations()

//----------------------------------------------------------------------------------------------
