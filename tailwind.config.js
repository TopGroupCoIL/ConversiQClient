/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        message: '2px 4px 10px rgba(115,119,133,0.2)',
      },
      fontFamily: {
        inter: ['Inter'],
        rubik: ['Rubik'],
        arialRoundedMTBold: ['Arial Rounded MT Bold', 'ArialRoundedMTBold'],
      },
      backgroundImage: {
        wave: 'url(src/assets/wave.svg)',
        ellipse: 'url(src/assets/ellipse.svg)',
      },
      backgroundColor: {
        babyPowder: '#FFFEF9',
      },
    },
  },
  plugins: [],
};
