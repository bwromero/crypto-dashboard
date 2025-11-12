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
        'slate': '#303A46',
        'slate-secondary': '#242D39',
        'accent': '#FF3E46',
        'success': '#00C087',
        'slate-success': '#12BE73',
        'slate-success-40': 'rgba(18, 190, 115, 0.4)',
        'slate-failure-40': 'rgba(253, 76, 66, 0.4)',
        'warning': '#F0B90B',
        'error': '#FF3E46',
        'gray': '#92929D',
        'gray-light': '#F0F4F7',
        'action': '#0CAF60',
        'light-gray': 'rgb(128 129 149 / 0.3)',
        'midnight': '#0B0E13',
        'cool-gray': '#12181F'
      },
      fontFamily: {
        'display': ['Satoshi', 'sans-serif']
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-dark': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-dark-sm': {
          textShadow: '0 1px 2px rgba(23, 27, 33, 0.6)',
        },
        '.text-shadow-dark-lg': {
          textShadow: '0 4px 8px rgba(23, 27, 33, 0.8)',
        },
        '.text-stroke-dark': {
          WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.8)',
          textStroke: '0.5px rgba(0, 0, 0, 0.8)',
        },
        '.text-stroke-dark-thick': {
          WebkitTextStroke: '2px rgba(23, 27, 33, 0.8)',
          textStroke: '2px rgba(23, 27, 33, 0.8)',
        },
        '.text-stroke-dark-thin': {
          WebkitTextStroke: '0.5px rgba(23, 27, 33, 0.8)',
          textStroke: '0.5px rgba(23, 27, 33, 0.8)',
        },
        // Custom drop shadows
        '.drop-shadow-dark': {
          filter: 'drop-shadow(0 4px 2px rgba(0, 0, 0, 0.4))',
        },
        '.drop-shadow-dark-lg': {
          filter: 'drop-shadow(0 8px 12px rgba(0, 0, 0, 0.9))',
        },
        '.drop-shadow-dark-xl': {
          filter: 'drop-shadow(0 12px 16px rgba(0, 0, 0, 0.95))',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

