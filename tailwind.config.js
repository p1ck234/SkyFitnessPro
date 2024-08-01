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
      },
      cursor: {
        custom: "url(/img/customCursor.png), auto", // Ensure the image path is correct
      },
      boxShadow: {
        custom: "0px 4px 67px -12px rgba(0, 0, 0, 0.13)", // Adding custom box shadow
      },
    },
  },
  plugins: [],
};
