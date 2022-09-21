/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#171725",
        accent: "#FFC34A",
        background: "#FAFAFB",
      },
      spacing: {
        laptop: "85.375rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
