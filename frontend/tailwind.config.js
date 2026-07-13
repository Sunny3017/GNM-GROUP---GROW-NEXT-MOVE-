/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#F8F9FA',
          DEFAULT: '#FFFFFF',
          dark: '#111111',
        },
        gold: {
          light: '#E5C76B',
          DEFAULT: '#D4AF37',
          dark: '#996515',
        },
      },
      fontFamily: {
        serif: ['DM Sans', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
        saira: ['Saira', 'sans-serif'],
        plex: ['IBM Plex Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
