/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#633CFF",
        "purple-med": "#BEADFF",
        "purple-light": "#EFEBFF",
        dark: "#333333",
        "dark-med": "#737373",
        "dark-light": "#D9D9D9",
        "dark-lighter": "#FAFAFA",
        danger: "#FF3939",
      },
    },
  },
  plugins: [],
};
