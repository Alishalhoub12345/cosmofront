/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
      screens: {
        '2xl': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }
  
        'xl': {'max': '1350px'},
        // => @media (max-width: 1279px) { ... }
  
        'lg': {'max': '950px'},
        // => @media (max-width: 1023px) { ... }
  
        'md': {'max': '600px'},
        // => @media (max-width: 767px) { ... }
  
        'sm': {'max': '450px'},
        // => @media (max-width: 639px) { ... }
      }
    },
    extend: {
      lineHeight: {
        'initial': 'initial',
    }
  },

  plugins: [],
}

