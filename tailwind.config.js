/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainWhite: "#ffffff",
        secondaryWhite: "#f0f2f5",
        mainGreen: "#008069",
        secondaryGreen: "#d9fdd3",
        mainBeige: "#f0ebe3",
        secondaryBeige: "#ffeecd",
        mainGray: "#3b4a54",
        secondaryGray: "#99999e",
        mainRed: "#ea063c",
        mainBlack: "#000000",
      },
    },
  },
  plugins: [],
};
