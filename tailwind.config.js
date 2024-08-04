/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         fontFamily: {
            sans: ["Inter", "sans-serif"],
         },
         colors: {
            bg1: "hsl(0, 0%, 8%)",
            bg2: "hsl(0, 0%, 12%)",
            bg3: "hsl(0, 0%, 16%)",
            bg4: "hsl(0, 0%, 20%)",
            bg5: "hsl(0, 0%, 24%)",
            highlight: "hsl(0, 0%, 100%)",

            theme: "hsl(11, 73%, 44%)",

            text1: "hsl(0, 0%, 100%)",
            text2: "hsl(0, 0%, 80%)",
            text3: "hsl(0, 0%, 60%)",
            text4: "hsl(0, 0%, 40%)",
            text5: "hsl(0, 0%, 20%)",
         },
      },
   },
   plugins: [],
}
