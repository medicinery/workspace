import { makeIDBDatabaseStore, makeStore } from "common-react-toolkit"
import { Chat_t } from "./Models/Chat"
import { Organization_t } from "./Models/Organization"
import { User_t } from "./Models/Users"

//----------------------------------------------------------------------------------------------
// State stores (so called "Current Stores")
//----------------------------------------------------------------------------------------------
export const [userStore, useUser] = makeStore<User_t | null>(null, {}, { storeID: "concerns.user" })
export const [organizationStore, useOrganization] = makeStore<Organization_t | null>(null, {})

//----------------------------------------------------------------------------------------------
// Collection stores
//----------------------------------------------------------------------------------------------

/* - Users */
export const [usersStore, useUsers] = makeIDBDatabaseStore<User_t>({
   name: "users",
   key: "id",
   version: 1,
})

/* - Organizations */
export const [organizationsStore, useOrganizations] = makeIDBDatabaseStore<Organization_t>({
   name: "organizations",
   key: "id",
   version: 1,
})

/* - Chats */
export const [chatsStore, useChats] = makeIDBDatabaseStore<Chat_t>({
   name: "chats",
   key: "id",
   version: 1,
})

//----------------------------------------------------------------------------------------------
// Utility stores
//----------------------------------------------------------------------------------------------

/* 1. Routing */
export const [routingStore, useRouting] = makeStore<string>(location.pathname.split("/").slice(1).join("/"))
/* 2. Modal */
export const [modalStore, useModal] = makeStore<React.ReactNode | null>(null)

//----------------------------------------------------------------------------------------------
