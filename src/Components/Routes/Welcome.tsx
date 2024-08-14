import { useState, useEffect, useRef } from "react"
import "./Welcome.css"

const slides = [
   {
      id: 1,
      content: (
         <div className="flex justify-center items-center h-full">
            <h1 className="text-white text-8xl font-bold fade-in-animation">
               Welcome to <p className="text-green-600">Medicinery™</p>
               <hr />
               <br /> <hr />
               <h1 className="text-white text-xl font-bold fade-in-animation">Scroll for more info</h1>
            </h1>
         </div>
      ),
   },
   {
      id: 2,
      content: (
         <div className="grid grid-cols-2 gap-4 h-full p-8">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:shadow-slate-500 transition-shadow duration-300">
               <h2 className="text-2xl font-bold">Section 1</h2>
               <p>Details about Section 1.</p>
            </div>
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:shadow-slate-500 transition-shadow duration-300">
               <h2 className="text-2xl font-bold">Section 2</h2>
               <p>Details about Section 2.</p>
            </div>
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:shadow-slate-500 transition-shadow duration-300 col-span-2">
               <h2 className="text-2xl font-bold">Section 3</h2>
               <p>Details about Section 3.</p>
            </div>
         </div>
      ),
   },
   {
      id: 3,
      content: (
         <div className="flex justify-center items-center h-full">
            <button
               type="button"
               className="inline-block rounded-full border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-2xl font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            >
               Start
            </button>
         </div>
      ),
   },
]

export const Welcome = () => {
   const [currentSlide, setCurrentSlide] = useState(0)
   const [scrollCount, setScrollCount] = useState(0)
   const scrollDirection = useRef("")

   const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 0) {
         if (scrollDirection.current !== "down") {
            setScrollCount(1)
            scrollDirection.current = "down"
         } else {
            setScrollCount((prev) => prev + 1)
         }
      } else {
         if (scrollDirection.current !== "up") {
            setScrollCount(1)
            scrollDirection.current = "up"
         } else {
            setScrollCount((prev) => prev + 1)
         }
      }

      if (scrollCount >= 2) {
         if (scrollDirection.current === "down") {
            nextSlide()
         } else {
            prevSlide()
         }
         setScrollCount(0)
      }
   }

   const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
   }

   const prevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1))
   }

   useEffect(() => {
      window.addEventListener("wheel", handleScroll)

      return () => {
         window.removeEventListener("wheel", handleScroll)
      }
   }, [scrollCount])

   return (
      <div className="fixed top-0 w-full shadow bg-slate-800">
         <div className="relative w-full h-screen bg-zinc-900 overflow-hidden">
            <div className="absolute inset-0 flex">
               {slides.map((slide, index) => (
                  <div
                     key={slide.id}
                     className={`absolute w-full h-full transition-all duration-1000 ease-in-out ${
                        index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
                     } ${
                        index === currentSlide
                           ? "translate-x-0"
                           : index > currentSlide
                           ? "translate-x-full"
                           : "-translate-x-full"
                     }`}
                  >
                     {slide.content}
                  </div>
               ))}
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
               {slides.map((_, index) => (
                  <div
                     key={index}
                     className={`w-3 h-3 rounded-full cursor-pointer ${
                        index === currentSlide ? "bg-white" : "bg-gray-500"
                     }`}
                     onClick={() => setCurrentSlide(index)}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}
