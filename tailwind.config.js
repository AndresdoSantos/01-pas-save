/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        300: 'Inter_300Light',
        400: 'Inter_400Regular',
        700: 'Inter_700Bold',
      },
    },
  },
  plugins: [],
}
