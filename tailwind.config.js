/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        title: 'Arial Rounded MT Bold',
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
