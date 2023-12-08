/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Inter']
      },
      colors: {
        primaryColorF: '#8257e5',
        primaryColorFHover: "#6743ba",
        secondaryColorF: '#202024',//#202024
        subSecondaryColorF: '#121214',//#121214,
        textPrimaryColorF: "#f8fafc",
        primaryBorder: "#393939"
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

