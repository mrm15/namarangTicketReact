/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        kaushan: "Kaushan Script",
      },
      backgroundImage: {
        hero1: "url(src/assets/images/hero1.jpg)",
        hero2: "url(src/assets/images/hero2.jpg)",
        hero3: "url(src/assets/images/hero3.jpg)",
      },
    },
  },
  plugins: [],
}

