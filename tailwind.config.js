/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  darkMode: "class",
  theme: {
    extend: {
      scale: {
        '110': '1.10',
      }
    },
  },
  plugins: [],
}

