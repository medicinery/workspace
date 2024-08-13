import { onMount } from "common-react-toolkit"
import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { initAuthListener } from "../Lib/Auth"
import { ChatMessageRole } from "../Lib/Models/Chat"
import { chatsStore, useUser } from "../Lib/State"
import Sidebar from "./Common/Sidebar"

const Auth = lazy(() => import("./Common/Auth"))
const Chat = lazy(() => import("./Routes/Chat"))
const Welcome = lazy(() => import("./Routes/Welcome"))

export default function App() {
   onMount(() => {
      initAuthListener()

      setTimeout(() => {
         chatsStore.UpdateMany([
            {
               id: "chat1",
               createdBy: "user123",
               createdAt: Date.now(),
               title: "General Chat",
               messages: [
                  {
                     id: "msg1",
                     createdBy: "user123",
                     createdAt: Date.now(),
                     role: ChatMessageRole.User,
                     isUnderProcess: false,
                     message: "Hello there!",
                     suggestions: {},
                  },
                  {
                     id: "msg2",
                     createdBy: "system",
                     createdAt: Date.now(),
                     role: ChatMessageRole.System,
                     isUnderProcess: false,
                     message: "Hi! How can I help you today?",
                     suggestions: {},
                  },
               ],
            },
            {
               id: "chat2",
               createdBy: "user456",
               createdAt: Date.now(),
               title: "Need of a specialized eye doctor",
               messages: [
                  {
                     id: "msg3",
                     createdBy: "user456",
                     createdAt: Date.now(),
                     role: ChatMessageRole.User,
                     isUnderProcess: false,
                     message: "I have a problem with my code.",
                     suggestions: {},
                  },
               ],
            },
         ])
      }, 2000)
   })

   const userID = useUser((x) => !!x?.id)
   if (!userID) return <Auth />

   return (
      <main className="bg-bg1 h-screen overflow-y-auto text-text1 grid grid-cols-[min-content,1fr]">
         <BrowserRouter>
            <Sidebar />
            <Suspense fallback={<div>Loading...</div>}>
               <Routes>
                  <Route path="" element={<Welcome />} />
                  <Route path="/:chatID" element={<Chat />} />
               </Routes>
            </Suspense>
         </BrowserRouter>
      </main>
   )
}
