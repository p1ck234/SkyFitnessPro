import tailwindScrollbar from "tailwind-scrollbar";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#BCEC30",
        customYellow: "#FFC700",
        customGreenCurse: "#BCEC30",
        custumBlue: "#00C1FF",
      },
      cursor: {
        custom: "url(/img/customCursor.png), auto", // Ensure the image path is correct
      },
      boxShadow: {
        custom: "0px 4px 67px -12px rgba(0, 0, 0, 0.13)", // Adding custom box shadow
      },
      screens: {
        laptop: "1440px",
        phone: "376px",
        wide: "1920px",
        tablet: "792px",
      },
      spacing: {
        "50px": "50px",
        "140px": "140px",
        "16px": "16px",
        "40px": "40px",
      },
    },
  },
  plugins: [
    tailwindScrollbar,
    function ({ addComponents }) {
      addComponents({
        ".btn-custom-color": {
          backgroundColor: "#BCEC30",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          color: "#000000",
          transition: "background-color 0.3s, border-color 0.3s",
          "&:hover": {
            backgroundColor: "#C6FF00",
          },
          "&:active": {
            backgroundColor: "#000000",
            color: "#ffffff",
          },
          "&:disabled": {
            backgroundColor: "#f7f7f7",
            color: "#999999",
          },
        },
        ".btn-custom-achrom": {
          backgroundColor: "#ffffff",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          borderColor: "#000000",
          borderWidth: "4px",
          color: "#000000",
          transition: "background-color 0.3s, border-color 0.3s",
          "&:hover": {
            backgroundColor: "#f7f7f7",
          },
          "&:active": {
            backgroundColor: "#E9ECED",
          },
          "&:disabled": {
            backgroundColor: "#ffffff",
            color: "#999999",
          },
        },
      });
    },
  ],
};
