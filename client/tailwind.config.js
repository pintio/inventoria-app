const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryDark: "#C9184A",
        primary: "#FF4D6D",
        secondary: colors.teal,
        themeBlack: "#0B090A",
        themeBlackLight: "#161A1D",
        themeWhite: "#fffbfb",
        themeOffWhite: "#F5F3F4",
      },
    },
  },
  plugins: [],
};

// "./src/**/*.{js,jsx,ts,tsx}"
