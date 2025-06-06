/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./sections/**/*.{js,ts,jsx,tsx,html}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./css/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        'bmpoa-green': '#2E5339',
        'bmpoa-gold': '#C9A66B',
      },
      fontFamily: {
        'serif': ['Times New Roman', 'serif'],
      }
    },
  },
  plugins: [],
}