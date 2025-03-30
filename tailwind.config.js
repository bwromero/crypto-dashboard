/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Main background colors
        dark: {
            primary: '#161D26',    // Main dark blue background
            secondary: '#12181F',  // Black accents
        },
        
        // Text colors
        text: {
            primary: '#FFFFFF',    // White text
            secondary: '#F0F4F7',  // Light gray text
        },
        
        // Accent colors from the design
        accent: {
            red: '#FF3E46',      // Red accent
            gray: '#92929D',     // Gray text/icons
            green: '#12181F',    // Dark green
        },
        
        // Status colors
        success: '#00C087',         // Green for positive values
        warning: '#F0B90B',         // Yellow for warnings
        error: '#FF3E46',           // Red for errors/negative
      }
    }
  },
  plugins: [],
}