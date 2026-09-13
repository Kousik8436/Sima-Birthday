/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#5a0626',
        blush: '#ffd1dd',
        lilac: '#ffe7ee',
        rose: '#ff4f7b',
        wine: '#7a082c',
        cream: '#fff7fa'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Inter"', 'sans-serif']
      }
    }
  },
  plugins: []
}
