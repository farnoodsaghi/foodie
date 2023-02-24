/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        "coal-black": "#1A1A23",
        "pearl-white": "#FDFDFD",
        "marine-blue": "#4A80F0",
        "lighter-grey": "#F7F7F7",
        "light-grey": "#EEEE",
        "dark-grey": "#9E9E9E",
      },
      gridAutoColumns: {
        "7p": "calc((100% / 7) - (1.5rem * 6/7))",
        "6p": "calc((100% / 6) - (1.5rem * 5/6))",
        "5p": "calc((100% / 5) - (1.5rem * 4/5))",
        "4p": "calc((100% / 4) - (1.5rem * 3/4))",
        "3p": "calc((100% / 3) - (1.5rem * 2/3))",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },

        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    }),
  ],
};
