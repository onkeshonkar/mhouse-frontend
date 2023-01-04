/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#171725",
        accent: "#FFB100",
        background: "#FAFAFB",
        "x-red": "#FC5A5A",
        "x-green": "#3DD598",
        "x-grey": "#92929D",
        "x-silver": "#B5B5BE",
      },
      spacing: {
        laptop: "85.375rem",
      },
      maxWidth: {
        "8xl": "85.375rem",
      },

      boxShadow: {
        bottom: "rgba(149, 157, 165, 0.2) 0px 3px 24px",
        right: "rgba(149, 157, 165, 0.2) 3px 0px 24px",
      },
    },
  },
  plugins: [],
}
