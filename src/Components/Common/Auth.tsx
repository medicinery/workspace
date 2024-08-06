import { LucideLogIn } from "lucide-react"
import { useState } from "react"
import { authenticate } from "../../Lib/Auth"
import { classNames } from "../../Lib/Utilites"
import LoadingIndicator from "./LoadingIndicator"

export default function Auth() {
   const [isError, setIsError] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   return (
      <div className="gap-3 flex flex-col items-center justify-center bg-bg2 text-text1 h-screen overflow-auto">
         <div
            className={classNames("flex items-center gap-3 px-5 py-4 rounded-full", {
               "bg-bg4 hover:bg-bg5 cursor-pointer": !isLoading,
               "bg-bg3 hover:bg-bg3 cursor-wait": isLoading,
            })}
            onClick={async () => {
               if (isLoading) return
               setIsLoading(true)
               setIsError(false)

               try {
                  await authenticate()
               } catch {
                  setIsError(true)
               }

               setIsLoading(false)
            }}
         >
            {isLoading ? <LoadingIndicator small /> : <LucideLogIn size={18} />}
            <span className="text-sm">Login with Google</span>
         </div>
         {isError && (
            <div className="text-red-500 text-sm text-red rounded-full">Error occurred while logging in.</div>
         )}
      </div>
   )
}
