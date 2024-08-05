/*global module*/
/*eslint no-undef: "error"*/

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        customYellow: "#FFC700",
        customGreen: "#BCEC30",
      }
    },
  },
  plugins: [],
};
