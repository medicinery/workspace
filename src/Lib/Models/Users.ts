import { deleteDoc, doc, setDoc } from "firebase/firestore"
import { db } from "../Firebase"
import { Model } from "../Model"
import { usersStore } from "../State"
import { getTimestamp } from "../Utilites"

export interface User_t {
   id: string
   dp: string
   name: string
   email: string
   dateCreated: number
   dateUpdated: number
   isVerified: boolean
}

class _Users extends Model<User_t> {
   constructor() {
      super({
         collection: "Users",
         store: usersStore,
      })
   }

   public get collection(): string {
      return this._collection
   }

   async Create(meta: { id: string; dp: string; name: string; email: string }) {
      const data = {
         id: meta.id,
         name: meta.name,
         dp: meta.dp,
         email: meta.email,
         dateCreated: getTimestamp(),
         dateUpdated: getTimestamp(),
         isVerified: false,
      } as User_t

      await setDoc(doc(db, this.collection, data.id), data, { merge: true })
   }

   async Delete(id: string) {
      await deleteDoc(doc(db, this.collection, id))
   }
}

//----------------------------------------------------------------------------------------------
export const UsersDB = new _Users()

//----------------------------------------------------------------------------------------------
