const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      red: colors.red,
      green: colors.green,
      blue: colors.blue,
      black: colors.black,
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      primary: {
        50: "",
        100: "",
        200: "",
        300: "",
        400: "", //
        500: "#2D6A50", //
        600: "#204D3A",
        700: "",
        800: "",
        900: "",
      },
      secondary: "#D5AA3F",
    },
    extend: {},
  },
  plugins: [],
};
