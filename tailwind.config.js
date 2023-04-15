/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "login-bg": "url('/utatte2-bg.jpg')"
      }
    },
  },
  plugins: [],
}

