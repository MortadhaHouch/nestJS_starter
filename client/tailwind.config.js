/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee var(--duration) linear infinite", 
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite", 
      }, 
      keyframes: { 
        marquee: { 
          from: { transform: "translateX(0)" }, 
          to: { transform: "translateX(calc(-100% - var(--gap)))" }, 
        }, 
        "marquee-vertical": { 
          from: { transform: "translateY(0)" }, 
          to: { transform: "translateY(calc(-100% - var(--gap)))" }, 
        }, 
      }, 
    },
  },
  plugins: [],
}
