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
          50: '#f0fdf4',
          100: 'var(--color-primary-light)',
          500: 'var(--color-primary)',
          600: 'var(--color-primary)',
          700: 'var(--color-primary-hover)',
        },
        secondary: {
          500: 'var(--color-accent)',
          600: 'var(--color-accent)',
        },
        breakfast: '#fbbf24',
        lunch: '#3b82f6',
        dinner: '#8b5cf6',
        snack: '#ec4899',
        dessert: '#f97316',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
    },
  },
  plugins: [],
}
