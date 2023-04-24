/** @type {import('tailwindcss').Config} */

export default {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "darkHT": "#1F293755",
        "gray-850": "#17212F",
      },
      backgroundImage: {
        "login-bg": "url('/utatte2-bg.jpg')"
      }
    },
  },
  plugins: [],
}