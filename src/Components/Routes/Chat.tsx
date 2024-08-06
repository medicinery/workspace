import { onUpdate } from "common-react-toolkit"
import {
   LucideAward,
   LucideBlinds,
   LucideCalendarCheck,
   LucideCalendarClock,
   LucideContact,
   LucideLanguages,
   LucideSend,
} from "lucide-react"
import { useCallback, useState } from "react"
import { useParams } from "react-router-dom"
import { ChatMessage_t, ChatMessageRole, ChatsDB } from "../../Lib/Models/Chat"
import { Doctor_t } from "../../Lib/Models/Doctor"
import { useChats } from "../../Lib/State"
import { classNames } from "../../Lib/Utilites"
import LoadingIndicator from "../Common/LoadingIndicator"

const messages: ChatMessage_t[] = [
   {
      id: "msg1",
      createdBy: "user123",
      createdAt: 1691234567890,
      role: ChatMessageRole.User,
      isUnderProcess: false,
      message: "Hello there!",
      suggestions: {
         quick_replies: ["Hi", "How can I help?"],
      },
   },
   {
      id: "msg2",
      createdBy: "assistantBot",
      createdAt: 1691234678900,
      role: ChatMessageRole.System,
      isUnderProcess: false,
      message: "Hello! How can I help you today?",
      suggestions: {},
   },
   {
      id: "msg3",
      createdBy: "user123",
      createdAt: 1691234789000,
      role: ChatMessageRole.User,
      isUnderProcess: true,
      message: "Can you help me with something?",
      suggestions: {},
   },
   {
      id: "msg4",
      createdBy: "assistantBot",
      createdAt: 1691234890000,
      role: ChatMessageRole.System,
      isUnderProcess: true,
      message: "Processing your request",
      suggestions: {},
   },
   {
      id: "msg5",
      createdBy: "user123",
      createdAt: 1691234990000,
      role: ChatMessageRole.User,
      isUnderProcess: false,
      message: "Thank you!",
      suggestions: {},
   },
   {
      id: "msg6",
      createdBy: "user123",
      createdAt: 1691234990000,
      role: ChatMessageRole.System,
      isUnderProcess: false,
      message: "Here are some doctors near you",
      suggestions: {
         Doctors: [
            {
               id: "doctor1",
               dateCreated: 1691234567890,
               dateUpdated: 1691234678900,
               isVerified: true,
               dp: "placeholder1.jpg", // Replace with image from UI Faces
               name: "Dr. Emily Carter",
               role: "General Practitioner",
               appointmentURL: "",
               profile: {
                  specialization: "General Medicine",
                  education: "MD from Harvard Medical School",
                  experience: "10 years",
                  awards: ["Doctor of the Year 2023"],
                  languages: ["English", "Spanish"],
                  availability: {
                     days: ["Monday", "Wednesday", "Friday"],
                     hours: "9:00 AM - 5:00 PM",
                  },
               },
               contactInformation: {
                  email: "emilycarter@example.com",
                  phone: "+1234567890",
                  address: {
                     representation: "123 Main St, Anytown, CA 12345, USA",
                     latitude: 37.7749,
                     longitude: -122.4194,
                  },
               },
            },
            {
               id: "doctor4",
               dateCreated: 1691234567890,
               dateUpdated: 1691234678900,
               isVerified: false,
               dp: "placeholder4.jpg", // Replace with image from UI Faces
               name: "Dr. Michael Brown",
               role: "Cardiologist",

               appointmentURL: "",
               profile: {
                  specialization: "Cardiology",
                  education: "MD from Stanford University",
                  experience: "15 years",
                  awards: ["Cardiologist of the Year 2022"],
                  languages: ["English"],
                  availability: {
                     days: ["Tuesday", "Thursday"],
                     hours: "10:00 AM - 4:00 PM",
                  },
               },
               contactInformation: {
                  email: "michaelbrown@example.com",
                  phone: "+1234567891",
                  address: {
                     representation: "456 Oak Ave, Anytown, CA 12345, USA",
                     latitude: 34.0522,
                     longitude: -118.2437,
                  },
               },
            },
            {
               id: "doctor5",
               dateCreated: 1691234567890,
               dateUpdated: 1691234678900,
               isVerified: true,
               dp: "placeholder5.jpg", // Replace with image from UI Faces
               name: "Dr. Sarah Lee",
               role: "Pediatrician",

               appointmentURL: "",
               profile: {
                  specialization: "Pediatrics",
                  education: "MD from Johns Hopkins University",
                  experience: "8 years",
                  awards: ["Pediatrician of the Year 2021"],
                  languages: ["English", "French"],
                  availability: {
                     days: ["Monday", "Wednesday", "Friday"],
                     hours: "9:00 AM - 5:00 PM",
                  },
               },
               contactInformation: {
                  email: "sarahlee@example.com",
                  phone: "+1234567892",
                  address: {
                     representation: "789 Pine St, Anytown, CA 12345, USA",
                     latitude: 40.7128,
                     longitude: -74.006,
                  },
               },
            },
            {
               id: "doctor5",
               dateCreated: 1691234567890,
               dateUpdated: 1691234678900,
               isVerified: true,
               dp: "placeholder5.jpg", // Replace with image from UI Faces
               name: "Dr. Sarah Lee",
               role: "Pediatrician",

               appointmentURL: "",
               profile: {
                  specialization: "Pediatrics",
                  education: "MD from Johns Hopkins University",
                  experience: "8 years",
                  awards: ["Pediatrician of the Year 2021"],
                  languages: ["English", "French"],
                  availability: {
                     days: ["Monday", "Wednesday", "Friday"],
                     hours: "9:00 AM - 5:00 PM",
                  },
               },
               contactInformation: {
                  email: "sarahlee@example.com",
                  phone: "+1234567892",
                  address: {
                     representation: "789 Pine St, Anytown, CA 12345, USA",
                     latitude: 40.7128,
                     longitude: -74.006,
                  },
               },
            },
         ] as Doctor_t[],
      },
   },
]

namespace Components {
   function DoctorCard(props: { doctor: Doctor_t }) {
      return (
         <div className="flex flex-col gap-2 bg-bg2 justify-between h-full rounded-2xl p-2">
            {/* Content */}
            <div className="flex flex-col gap-1">
               {/* Header */}
               <div className="grid grid-cols-[min-content,1fr] gap-3 items-center">
                  <div className="w-[2.8rem] h-[2.8rem] rounded-full">
                     <img
                        src="https://mighty.tools/mockmind-api/content/human/76.jpg"
                        alt=""
                        className="w-full h-full rounded-full object-cover border border-bg4"
                     />
                  </div>
                  <div className="">
                     <div className="text-[0.85rem] font-semibold">{props.doctor.name}</div>
                     <div className="text-[0.75rem] text-text3">{props.doctor.profile.specialization}</div>
                  </div>
               </div>
               {/* Information */}
               <div className="flex flex-col text-[0.75rem] mt-1">
                  {/* Experience */}
                  <div className="grid grid-cols-[.7rem,1fr] gap-2 px-2 py-0.5">
                     <LucideCalendarCheck size={12} className="mt-[2px]" />
                     <span>{props.doctor.profile.experience}</span>
                  </div>
                  {/* Languages */}
                  <div className="grid grid-cols-[.7rem,1fr] gap-2 px-2 py-0.5">
                     <LucideLanguages size={12} className="mt-[2px]" />
                     <span>{props.doctor.profile.languages.join(", ")}</span>
                  </div>
                  {/* Languages */}
                  <div className="grid grid-cols-[.7rem,1fr] gap-2 px-2 py-0.5">
                     <LucideAward size={12} className="mt-[2px]" />
                     <span>{props.doctor.profile.awards.join(", ")}</span>
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-1">
               <div
                  title="Get details about the doctor"
                  className="w-full flex items-center justify-center gap-2 py-2 border rounded-2xl cursor-pointer border-bg5 bg-bg4 hover:bg-bg5"
               >
                  <LucideBlinds size={15} />
                  <span className="text-[0.75rem]">Details</span>
               </div>
               <div
                  title="Schedule an appointment with the doctor on Calendly"
                  className="w-[3rem] flex items-center justify-center gap-2 py-2 border rounded-2xl cursor-pointer border-bg5 bg-bg4 hover:bg-bg5"
                  onClick={() => window.open(props.doctor.appointmentURL, "_blank")}
               >
                  <LucideCalendarClock size={15} />
               </div>
               <div
                  title="Get contact information of the doctor"
                  className="w-[3rem] flex items-center justify-center gap-2 py-2 border rounded-2xl cursor-pointer border-bg5 bg-bg4 hover:bg-bg5"
               >
                  <LucideContact size={15} />
               </div>
            </div>
         </div>
      )
   }

   function DoctorsSuggestions(props: { doctors: Doctor_t[] }) {
      if (!props.doctors.length) return null

      return (
         <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-2">
            {props.doctors.map((x: Doctor_t) => (
               <DoctorCard key={x.id} doctor={x} />
            ))}
         </div>
      )
   }

   function MessageSuggestions(props: { suggestions: ChatMessage_t["suggestions"] }) {
      if (!Object.keys(props.suggestions).length) return null

      const isDoctorSuggested = !!props.suggestions["Doctors"]?.length

      return (
         <div className="max-w-[80%] ml-[2.8rem]">
            {isDoctorSuggested && <DoctorsSuggestions doctors={props.suggestions["Doctors"]} />}
         </div>
      )
   }

   function Message(props: { message: ChatMessage_t }) {
      return (
         <div
            className={classNames("flex flex-col gap-2", {
               "items-end": props.message.role == ChatMessageRole.User,
               "opacity-50": props.message.isUnderProcess,
            })}
         >
            {/* Message Content */}
            <div
               className={classNames("flex gap-3 w-full", {
                  "flex-row-reverse": props.message.role == ChatMessageRole.User,
               })}
            >
               <div className="w-[2rem] h-[2rem] rounded-full mt-1">
                  <img
                     src="https://mighty.tools/mockmind-api/content/human/76.jpg"
                     alt=""
                     className="w-full h-full rounded-full object-cover border border-bg5"
                  />
               </div>
               <div
                  className={classNames("flex items-center gap-2 rounded-2xl px-3 py-2 border max-w-[70%]", {
                     "bg-bg3 border-bg3 rounded-bl-none": props.message.role == ChatMessageRole.System,
                     "bg-bg4 border-bg5 rounded-br-none": props.message.role == ChatMessageRole.User,
                  })}
               >
                  {props.message.isUnderProcess && props.message.role == ChatMessageRole.System && (
                     <LoadingIndicator small />
                  )}
                  <span className="text-[0.9rem]">{props.message.message}</span>
               </div>
            </div>
            {/* Suggestions (if any) */}
            <MessageSuggestions suggestions={props.message.suggestions} />
         </div>
      )
   }

   export function Messages() {
      const chatID = useParams().chatID || ""
      // if (!chatID) return null

      const chat = useChats((x) => x[chatID])
      // if (!chat) return <div></div>

      return (
         <div className="flex justify-center h-full overflow-auto">
            <div className="w-[65%] max-w-[48rem] flex flex-col justify-end gap-2 h-full overflow-auto">
               {messages.map((message) => (
                  <Message key={message.id} message={message} />
               ))}
            </div>
         </div>
      )
   }

   export function WritingArea() {
      const chatID = useParams().chatID || ""
      if (!chatID) return null

      const [messageContent, setMessageContent] = useState("")
      const [isSendingMessage, setIsSendingMessage] = useState(false)

      const handleSendMessage = useCallback(async () => {
         if (isSendingMessage || !messageContent.trim()) return

         setIsSendingMessage(true)

         try {
            const messageID = await ChatsDB.SendMessage(chatID, messageContent)
         } catch {
            alert("Failed to send message")
         }

         setIsSendingMessage(false)
      }, [isSendingMessage, messageContent])

      return (
         <div className="pb-4 flex justify-center">
            <div className="w-[65%] max-w-[48rem] bg-bg2 rounded-2xl grid grid-cols-[1fr,min-content] gap-4 items-center p-2">
               <input
                  type="text"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  className="bg-transparent outline-none pl-2 text-[0.9rem]"
                  placeholder="What's happening?"
               />
               <div
                  onClick={handleSendMessage}
                  className={classNames("w-8 h-8 rounded-lg flex justify-center items-center ", {
                     "bg-bg3 hover:bg-bg3 cursor-default": isSendingMessage || !messageContent.trim(),
                     "bg-white hover:bg-slate-100 cursor-pointer":
                        !isSendingMessage && !!messageContent.trim(),
                  })}
               >
                  <LucideSend
                     color={isSendingMessage ? "#ffffffa0" : messageContent.trim() ? "black" : "#ffffffa0"}
                     size={16}
                     className="-ml-[1px]"
                  />
               </div>
            </div>
         </div>
      )
   }
}

export default function Chat() {
   const chatID = useParams().chatID || ""
   if (!chatID) return null

   onUpdate(() => ChatsDB.Listen(chatID), [chatID])

   return (
      <div className="h-full overflow-auto grid grid-rows-[1fr,min-content] gap-4">
         <Components.Messages />
         <Components.WritingArea />
      </div>
   )
}
