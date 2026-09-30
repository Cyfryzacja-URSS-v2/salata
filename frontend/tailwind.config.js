const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./index.html",
    "./public/**/*.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      fontSize: {
        xs: ["0.813rem", "1rem"],
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "pale-green": "#D9F7EA",
      "light-green": "#42D99A",
      "ligher-green": "#EFFBF6",
      green: "#00BF6F",
      "dark-green": "#008755",
      "darkest-green": "#006B43",
      "light-blue": "#5E91C4",
      blue: "#113E6B",
      orange: "#D89A25",
      yellow: "#FFF0CC",
      "dark-yellow": "#8A6818",
      white: "#FFFFFF",
      "off-white": "#F5F7F8",
      black: "#101820",
      gray: "#B6BEC3",
      "dark-gray": "#68747A",
      "very-dark-gray": "#465158",
      "light-gray": "#F2F5F6",
      "light-gray-stroke": "#DCE3E6",
      "avail-green": colors.emerald, // The green used for marking availability
      red: "#D83A3A",
    },
    screens: {
      sm: "640px",
      md: "768px",
      mdlg: "896px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "publift-s": "755px",
      "publift-m": "995px",
      "publift-l": "1225px",
      "publift-xl": "1475px",
    },
  },
  plugins: [],
  prefix: "tw-",
  safelist: [],
}
