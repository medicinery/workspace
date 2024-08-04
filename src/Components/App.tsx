import { lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Common/Navbar"
import Sidebar from "./Common/Sidebar"

const Chat = lazy(() => import("./Routes/Chat"))
const Welcome = lazy(() => import("./Routes/Welcome"))

export default function App() {
   return (
      <div className="bg-bg1 grid grid-rows-[min-content,1fr] h-screen">
         <Navbar />
         <main className="h-full grid grid-cols-[min-content,1fr]">
            <Sidebar />
            <div className="text-text1">
               <BrowserRouter>
                  <Routes>
                     <Route path="" element={<Welcome />} />
                     <Route path="/:chatID" element={<Chat />} />
                  </Routes>
               </BrowserRouter>
            </div>
         </main>
      </div>
   )
}
