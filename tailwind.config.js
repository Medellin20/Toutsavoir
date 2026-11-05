/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0B0B13',
        royal: '#32135C',
        orchid: '#7B2CBF',
        gold: '#D4AF37',
        lavender: '#F8E9FF',
      },
    },
  },
  plugins: [],
};
