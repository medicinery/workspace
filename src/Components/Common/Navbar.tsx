export default function Navbar() {
   return (
      <div className="h-16 grid grid-cols-[10rem,1fr,10rem] items-center justify-between px-4">
         <div className="flex gap-4 items-center h-full">
            {/* <img src="/logo-circle.png" className="h-12 -mt-[0.5]" /> */}
         </div>
         <div className="font-medium text-xl text-text1 text-center">Medicinery</div>
         <div className="flex items-center gap-2 justify-end"></div>
      </div>
   )
}
