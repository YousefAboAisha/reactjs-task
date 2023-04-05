/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark Theme variables
        // background_dark: "#1B2430",
        // text_dark: "#FFF",

        // Light theme variables
        background_light: "#F9F9F9",
        text_light: "#181D31",

        // Primary theme variables
        primary: "#D61355",
        primary_hover: "#ff3380",

        // Secondary theme variables
        secondary: "#003566",
        // dark: "#dddddd24",
      },

      borderColor: {
        light: "#181D3115",
        // dark: "#dddddd24",
      },
    },

    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1400px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
