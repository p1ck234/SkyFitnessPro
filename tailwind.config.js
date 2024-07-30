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
        custom: "url(/img/customCursor.png), auto", // Убедитесь, что путь к изображению правильный
      },
    },
  },
  plugins: [],
};
