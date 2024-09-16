/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1FB1B5",
        secondary: "#003E7B",
        orange: "#FF9900",
      },
    },
  },
  plugins: [],
};
