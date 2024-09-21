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
      width: {
        '640': '640px',
        '768': '768px',
        '1024': '1024px',
        '1280': '1280px',
        '1536': '1536px',

        'calc-100-640': 'calc(100% - 640px    + 8px)',
        'calc-100-768': 'calc(100% - 768px    + 8px)',
        'calc-100-1024': 'calc(100% - 1024px  + 8px)',
        'calc-100-1280': 'calc(100% - 1280px  + 8px)',
        'calc-100-1536': 'calc(100% - 1536px  + 8px)',
      },
      minWidth: { // Add min-width here
        '640': '640px',
        '768': '768px',
        '1024': '1024px',
        '1280': '1280px',
        '1536': '1536px',


        '432': '432px', // 640  - 208  // 208 is sidebar with ( w-44 === 11 rem === 11 * 16(fontSize)   and  p-4===1rem left and right ==== 208px
        '560':'560px', //768 -208
        '819':'819px', //1024 -208
        '1072':'1072px', //1280 -208
        '1328':'1328px', //1536 -208


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

