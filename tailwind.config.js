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
                     DEFAULT: 'var(--color-primary)',
                     light: 'var(--color-primary-light)',
                     dark: 'var(--color-primary-dark)',
                   },
                   accent: {
                     gold: '#D4AF37',
                     'gold-light': '#F4E4BC',
                   }
                 },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
