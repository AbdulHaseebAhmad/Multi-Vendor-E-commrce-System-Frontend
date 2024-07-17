/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        'content': '32rem', // Example custom min-height
      },
      boxShadow: {
        'blur-yellow': '2px 4px 15px rgba(252, 211, 77, 0.7)', // Customize the shadow
        'blur-green': '2px 4px 15px rgba(6, 95, 70, 0.7)', // Customize the shadow

      },
    
      colors: {
        'yellow-300': '#fcd34d', // Ensure the yellow-300 color is defined
        'green-900': '#065f46',
      },
      
    },
  },
  plugins: [],
}