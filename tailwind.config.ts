/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#FFC857",
          pink: "#FF1B8D",
          dark: "#1A0615",
        }
      },
    },
  },
  plugins: [],
}