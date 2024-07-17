import "./App.scss"

import { onMount, onUpdate } from "common-react-toolkit"
import { useEffect } from "react"
import {
   BrowserRouter,
   Navigate,
   Outlet,
   Route,
   Routes,
   useLocation,
   useNavigate,
   useParams,
} from "react-router-dom"

import { initAuthListener } from "../Lib/Auth"
import { OrganizationsDB } from "../Lib/Models/Organization"
import { organizationStore, routingStore, useOrganization, useRouting, useUser } from "../Lib/State"
import LoadingIndicator from "./Common/LoadingIndicator"

namespace Components {
   export function LifecycleMaintainer() {
      const navigate = useNavigate()
      const location = useLocation()
      const currentLocalRoute = useRouting()

      useEffect(() => {
         function escCloseWorker(event: KeyboardEvent) {
            if (event.key === "Escape") routingStore.set("dashboard")
            if (event.key === "F1") {
               event.preventDefault()
               routingStore.set("calendar")
            }
            if (event.key === "F2") {
               event.preventDefault()
               routingStore.set("dashboard")
            }
            if (event.key === "F3") {
               event.preventDefault()
               routingStore.set("faculties")
            }
         }
         document.addEventListener("keydown", escCloseWorker)

         return () => {
            document.removeEventListener("keydown", escCloseWorker)
         }
      })

      // Routing
      onUpdate(() => {
         routingStore.set(location.pathname.split("/").slice(2).join("/"))
      }, [location.pathname])
      onUpdate(() => {
         if (!organizationStore.value()) return
         navigate(`/${organizationStore.value()?.id ?? ""}/${currentLocalRoute}`)
      }, [currentLocalRoute])

      return <></>
   }

   export function Organization() {
      const { organizationID } = useParams()
      const organization = useOrganization((organization) => ({
         id: organization?.id,
         faculties: organization?.faculties ?? [],
         coordinator: organization?.coordinator ?? "",
      }))
      const userID = useUser((user) => user?.id ?? "")

      onUpdate(() => OrganizationsDB.Listen(organizationID ?? ""), [organizationID])

      if (!organization.id)
         return (
            <div className="loading">
               <LoadingIndicator />
            </div>
         )
      if (organization.coordinator !== userID && !organization.faculties.includes(userID))
         return (
            <div className="not-a-member">
               <span>Not a member</span>
            </div>
         )

      return (
         <div className="AppComponent">
            <main>
               <Outlet />
            </main>
         </div>
      )
   }
}

export default function App() {
   onMount(() => {
      initAuthListener()
   })

   const userID = useUser((user) => user?.id)
   // if (!userID) return <Login />

   return (
      <BrowserRouter>
         <Components.LifecycleMaintainer />
         <Routes>
            <Route path="" element={<Navigate to={"medicinery"} />} />
            <Route path=":organizationID" element={<Components.Organization />}>
               <Route path="" element={<Navigate to={"dashboard"} replace />} />
               <Route path="*" element={<Navigate to={"dashboard"} replace />} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}
