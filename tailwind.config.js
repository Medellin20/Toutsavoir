/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#faf8f2',
        sage: {
          50: '#f1f5ef', 100: '#e3ebe0', 200: '#cddbc9', 300: '#adbea8',
          400: '#8da187', 500: '#71886c', 600: '#526e50', 700: '#3f593f',
          800: '#314633', 900: '#27392b', 950: '#17281c',
        },
        gold: { 300: '#d9c9a3', 700: '#806536' },
      },
    },
  },
  plugins: [],
};
