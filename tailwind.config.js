/** @type {import('tailwindcss').Config} */
export default {
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
        custom: ["Poppins"],
      },
      colors: {
        primaryColorF: "#8257E5",
        primaryColorFHover: "#6743BA",
        secondaryColorF: "#202024",
        secondaryColorFHover: "#303036",
        thirdColorF: "#343439",
        textPrimaryColorF: "#dedede",
        textSecondaryColorF: "#A7A6A6",
        subSecondaryColorF: "#121214",
        primaryBorderF: "#393939",
        secondaryBorderF: "#373737FE",
        darkGrayBorderF: "#2D2D2D",
        thirdBorderF: "#4E4E4E",
        "primary-icon-color": "#686873",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
