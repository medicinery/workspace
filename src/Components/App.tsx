import { lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Common/Navbar"

const Chat = lazy(() => import("./Routes/Chat"))
const Welcome = lazy(() => import("./Routes/Welcome"))

export default function App() {
   return (
      <div>
         <Navbar />
         <BrowserRouter>
            <Routes>
               <Route path="" element={<Welcome />} />
               <Route path=":chatID" element={<Chat />} />
            </Routes>
         </BrowserRouter>
      </div>
   )
}
