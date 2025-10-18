/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#171B21',
        'dark-secondary': '#1A1F25',
        'dark-tertiary': '#12181F',
        'primary': '#FFFFFF',
        'secondary': '#64748B',
        'border': '#808195',
        'accent': '#FF3E46',
        'success': '#00C087',
        'warning': '#F0B90B',
        'error': '#FF3E46',
        'gray': '#92929D',
        'gray-light': '#F0F4F7',
        'action': '#0CAF60',
        'secondary': '#C2C2C2',
        'light-gray': 'rgb(128 129 149 / 0.3)'
      },
      fontFamily: {
        'display': ['Satoshi', 'sans-serif']
      }
    },
  },
  plugins: [],
}

