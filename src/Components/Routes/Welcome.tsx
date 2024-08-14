import React, { useState, useEffect } from "react"
import ArrowIcon from "../Common/"
import LeftArrowIcon from "./arrow left"

const slides = [
   {
      id: 1,
      content: (
         <div className="flex justify-center items-center h-full">
            <h1 className="text-white text-8xl font-bold animate-fadeIn">Welcome</h1>
         </div>
      ),
   },
   {
      id: 2,
      content: (
         <div className="grid grid-cols-2 h-full">
            <div className="flex justify-center items-center text-white p-4">Section 1</div>
            <div className="flex justify-center items-center text-white p-4">Section 2</div>
            <div className="flex justify-center items-center text-white p-4 col-span-2">Section 3</div>
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

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
      }, 5000)

      return () => clearInterval(interval)
   }, [])

   const goToSlide = (index: number) => {
      setCurrentSlide(index)
   }

   const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
   }

   const prevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1))
   }
   return (
      <div className="fixed top-0 w-full shadow bg-slate-800">
         <div className="relative w-full h-screen bg-zinc-900 overflow-hidden">
            <div className="absolute inset-0 flex">
               {slides.map((slide, index) => (
                  <div
                     key={slide.id}
                     className={`absolute w-full h-full transition-transform duration-1000 ease-in-out ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                     }`}
                  >
                     {slide.content}
                  </div>
               ))}
            </div>

            <button
               className="absolute left-4 top-1/2 transform -translate-y-1/2 w-[10%] h-[10%]"
               onClick={prevSlide}
            >
               <LeftArrowIcon />
            </button>
            <button
               className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[10%] h-[10%] "
               onClick={nextSlide}
            >
               <ArrowIcon />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
               {slides.map((_, index) => (
                  <div
                     key={index}
                     className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-gray-500"}`}
                     onClick={() => goToSlide(index)}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}
