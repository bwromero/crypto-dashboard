/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Main background colors
        'dark-primary': '#161D26',    // Dark blue background
        'dark-secondary': '#000000',  // Pure black accents
        
        // Text and accent colors
        'text-primary': '#FFFFFF',    // White text
        'text-secondary': '#F0F4F7',  // Light gray text
        
        // Accent colors
        'accent-red': '#FF3E46',      // Red accent color
        'accent-gray': '#92929D',     // Gray accent color
        'accent-green': '#12181F',    // Dark green accent
        
        // Status colors
        'success': '#00C087',         // Green success color
        'warning': '#F0B90B',         // Yellow warning color
        'error': '#FF3E46',           // Red error color
      },
    },
  },
  plugins: [],
} 