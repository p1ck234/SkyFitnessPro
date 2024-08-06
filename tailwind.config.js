module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#34D399",
        customYellow: "#FFC700",
        customGreenCurse: "#BCEC30",
      },
      cursor: {
        custom: "url(/img/customCursor.png), auto", // Ensure the image path is correct
      },
      boxShadow: {
        custom: "0px 4px 67px -12px rgba(0, 0, 0, 0.13)", // Adding custom box shadow
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
