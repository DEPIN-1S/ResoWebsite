/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f5efe8',
        sand: '#c4a07a',
        ink: '#2b2b2b',
        gold: { DEFAULT: '#734e30', light: '#c4a07a' },
        sage: { DEFAULT: '#734e30', soft: '#ead9c4', deep: '#3d2a1a' },
      },
      fontFamily: {
        serif: ['Montserrat', 'system-ui', 'sans-serif'],
        cond: ['Montserrat', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
