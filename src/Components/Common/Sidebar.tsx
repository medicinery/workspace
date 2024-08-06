import { If, makeStore } from "common-react-toolkit"
import {
   LucideGithub,
   LucideMessageCircle,
   LucidePlus,
   LucideSidebarClose,
   LucideSidebarOpen,
} from "lucide-react"
import { useCallback, useState } from "react"
import { useParams } from "react-router-dom"
import { logout } from "../../Lib/Auth"
import { GITHUB_URI } from "../../Lib/Constants"
import { ChatsDB } from "../../Lib/Models/Chat"
import { useChats, useUser } from "../../Lib/State"
import { classNames } from "../../Lib/Utilites"
import LoadingIndicator from "./LoadingIndicator"

const [isSidebarHiddenStore, useIsSidebarHidden] = makeStore(
   false,
   {},
   {
      storeID: "isSidebarHidden",
   }
)

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
   const isSidebarHidden = useIsSidebarHidden()
   const [isCreating, setIsCreating] = useState(false)
   const [userName, userDP] = useUser((x) => [x?.name ?? "", x?.dp ?? ""])

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
      <div className="h-full overflow-y-auto grid grid-cols-[3.8rem,1fr]">
         <div className="grid justify-center grid-rows-[4rem,1fr,4rem] py-4">
            {isSidebarHidden ? (
               <div
                  onClick={() => isSidebarHiddenStore.set(false)}
                  className="mt-[1.2rem] flex justify-center items-center gap-2 w-[2.3rem] h-[2.3rem] rounded-full cursor-pointer bg-bg4 border border-bg4 hover:bg-bg5"
               >
                  <LucideSidebarOpen size={16} />
               </div>
            ) : (
               <div></div>
            )}
            <div
               className="font-semibold text-text1 text-center rotate-180 opacity-50 w-[2rem]"
               style={{ writingMode: "vertical-lr" }}
            >
               Medicinery
            </div>
            <div
               className="w-[2rem] h-[2rem] rounded-full mt-1"
               title={`${userName} (click to logout)`}
               onClick={logout}
            >
               <img
                  src={userDP}
                  alt=""
                  className="w-full h-full rounded-full object-cover border border-bg5"
               />
            </div>
         </div>
         {!isSidebarHidden && (
            <div className="w-[23rem] p-4 h-full overflow-y-auto">
               <div className="bg-bg2 rounded-2xl w-full h-full grid grid-rows-[min-content,1fr] overflow-y-auto">
                  <div className="flex items-center justify-between gap-2 px-6 py-5">
                     <div className="text-text1 font-semibold text-xl">Chats</div>
                     <div className="flex items-center gap-2">
                        <div
                           onClick={() => isSidebarHiddenStore.set(true)}
                           className="flex justify-center items-center gap-2 w-[2.3rem] h-[2.3rem] rounded-full cursor-pointer bg-bg4 border border-bg4 hover:bg-bg5"
                        >
                           <LucideSidebarClose size={16} />
                        </div>
                        <div
                           onClick={() => window.open(GITHUB_URI, "_blank")}
                           className="flex justify-center items-center gap-2 w-[2.3rem] h-[2.3rem] rounded-full cursor-pointer bg-bg4 border border-bg4 hover:bg-bg5"
                        >
                           <LucideGithub size={16} />
                        </div>
                        <div
                           onClick={handleNewChat}
                           className={classNames(
                              "flex items-center gap-2 px-3 py-[0.5rem] rounded-full cursor-pointer bg-bg4 border border-bg4 hover:bg-bg5",
                              {
                                 "bg-bg5 cursor-wait": isCreating,
                              }
                           )}
                        >
                           {isCreating ? (
                              <LoadingIndicator small />
                           ) : (
                              <LucidePlus className="-mt-[1px]" size={18} />
                           )}
                           <span className="text-[0.8rem] font-medium text-nowrap">New chat</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col gap-1 px-3">
                     <If value={chatIDS.length}>
                        {chatIDS.map((x) => (
                           <Components.ChatTile key={x} id={x} />
                        ))}
                     </If>
                     <If value={!chatIDS.length}>
                        <div className="flex items-center justify-center h-full text-text3 text-sm">
                           It's quite in here
                        </div>
                     </If>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}
