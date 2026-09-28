/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030712",
        surface: "#0f172a",
        fontFamily: {
      cinzel: ["Cinzel", "serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
      }
    },
  },
  plugins: [],
}
