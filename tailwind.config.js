// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#34D399",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
