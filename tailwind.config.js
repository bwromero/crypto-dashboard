/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': 'var(--color-dark-primary)',
        'dark-secondary': 'var(--color-dark-secondary)',
        'dark-tertiary': 'var(--color-dark-tertiary)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'accent': 'var(--color-accent)',
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'error': 'var(--color-error)',
        'action': 'var(--color-action)',
      }
    },
  },
  plugins: [],
}

