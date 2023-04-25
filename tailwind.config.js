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
      yellow: colors.yellow,
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
      azul: {
        50: "#8d9bda",
        100: "#8391d0",
        200: "#7987c6",
        300: "#6f7dbc",
        400: "#6573b2",
        500: "#5b69a8",
        600: "#515f9e",
        700: "#475594",
        800: "#3d4b8a",
        900: "#334180",
      },
      naranja: {
        50: "#e89a47",
        100: "#de903d",
        200: "#d48633",
        300: "#ca7c29",
        400: "#c0721f",
        500: "#b66815",
        600: "#ac5e0b",
        700: "#a25401",
        800: "#984a00",
        900: "#8e4000",
      },
    },
    extend: {},
  },
  plugins: [],
};
