import { auth } from "../Firebase"
import { Model } from "../Model"
import { chatsStore } from "../State"

export enum ChatMessageRole {
   User = "User",
   System = "System",
}

export type ChatMessage_t = {
   id: string
   createdBy: string
   createdAt: number

   role: ChatMessageRole
   isUnderProcess: boolean

   message: string
   suggestions: Record<string, any>
}

export type Chat_t = {
   id: string
   createdBy: string
   createdAt: number

   title: string

   messages: ChatMessage_t[]
}

class _Chats extends Model<Chat_t> {
   constructor() {
      super({
         collection: "Chats",
         store: chatsStore,
      })
   }

   public get collection(): string {
      return this._collection
   }

   async Create(): Promise<string> {
      const idToken = (await auth.currentUser?.getIdToken()) ?? ""
      if (!idToken) throw new Error("User not signed in")

      const res = await fetch("http://localhost:5000/chat/create", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
         },
         body: JSON.stringify({}),
      })
      const data = await res.json()
      return data.id
   }

   async Delete(id: string) {
      throw new Error("Method not implemented.")
   }

   async SendMessage(chatID: string, message: string) {
      throw new Error("Method not implemented.")
   }
}

//----------------------------------------------------------------------------------------------
export const ChatsDB = new _Chats()

//----------------------------------------------------------------------------------------------
