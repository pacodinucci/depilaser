/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        backgroundImage: { 
          'image': "url('/src/assets/perspectiva-exterior-nadie-caja-vacia.jpg')"
        }
      },
    },
    plugins: [],
  }
  
  