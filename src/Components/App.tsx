import { lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidebar from "./Common/Sidebar"

const Chat = lazy(() => import("./Routes/Chat"))
const Welcome = lazy(() => import("./Routes/Welcome"))

export default function App() {
   return (
      <main className="bg-bg1 h-screen overflow-y-auto text-text1 grid grid-cols-[min-content,1fr]">
         <Sidebar />
         <BrowserRouter>
            <Routes>
               <Route path="" element={<Welcome />} />
               <Route path="/:chatID" element={<Chat />} />
            </Routes>
         </BrowserRouter>
      </main>
   )
}
