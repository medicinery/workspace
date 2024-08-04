import { If } from "common-react-toolkit"
import { LucideMessageCircle, LucidePlus } from "lucide-react"
import { useCallback, useState } from "react"
import { useParams } from "react-router-dom"
import { ChatsDB } from "../../Lib/Models/Chat"
import { useChats } from "../../Lib/State"
import { classNames } from "../../Lib/Utilites"
import LoadingIndicator from "./LoadingIndicator"

namespace Components {
   export function ChatTile(props: { id: string }) {
      const activeChatID = useParams().chatID || ""

      const chat = useChats((x) => x[props.id])
      if (!chat) return null

      return (
         <div
            className={`flex flex-col gap-2 px-4 py-3 rounded-lg cursor-pointer text-white border ${
               activeChatID ? "bg-bg3 border-bg4" : "bg-bg2 border-bg2 hover:bg-bg3"
            }`}
         >
            <div className="flex items-center gap-2">
               <LucideMessageCircle size={16} />
               <span className="text-[0.95rem] font-semibold text-nowrap">New chat</span>
            </div>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap w-[16.2rem] text-sm text-text3">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, et? Eligendi, dolorem
               voluptatibus repudiandae magnam quia inventore distinctio nisi, id vero praesentium assumenda
               dignissimos corrupti in quam temporibus recusandae debitis!
            </div>
         </div>
      )
   }
}

export default function Sidebar() {
   const chatIDS = useChats((x) => Object.keys(x))
   const [isCreating, setIsCreating] = useState(false)

   const handleNewChat = useCallback(async () => {
      if (isCreating) return
      setIsCreating(true)

      try {
         const chatID = await ChatsDB.Create()
         console.log(chatID)
      } catch {
         alert("Failed to create a new chat")
      }

      setIsCreating(false)
   }, [isCreating])

   return (
      <div className="w-[23rem] p-4 h-full overflow-y-auto">
         <div className="bg-bg2 rounded-2xl w-full h-full grid grid-rows-[min-content,1fr] overflow-y-auto">
            <div className="flex items-center justify-between gap-2 px-6 py-5">
               <div className="text-text1 font-semibold text-xl">Chats</div>
               <div
                  onClick={handleNewChat}
                  className={classNames(
                     "flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer bg-slate-100 border border-slate-200  hover:bg-slate-200",
                     {
                        "bg-slate-200 cursor-wait": isCreating,
                     }
                  )}
               >
                  {isCreating ? <LoadingIndicator small /> : <LucidePlus size={20} />}
                  <span className="text-sm font-semibold text-nowrap">New chat</span>
               </div>
            </div>
            <div className="flex flex-col gap-1 px-3">
               <If value={chatIDS.length}>
                  {chatIDS.map((x) => (
                     <Components.ChatTile key={x} id={x} />
                  ))}
               </If>
               <If value={!chatIDS.length}>
                  <div className="flex items-center justify-center h-full text-text3">It's quite in here</div>
               </If>
            </div>
         </div>
      </div>
   )
}
