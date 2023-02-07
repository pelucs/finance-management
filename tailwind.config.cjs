/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      screens:{
        sm: "640px",
        md: "840px",
        lg: "1280px"
      },
      backgroundImage: {
        elipse: "url(./src/assets/elipse.svg)",
        gradient: "linear-gradient(45deg, #2ECC71, #5A3092 50%)"
      },
      fontFamily: {
        sans: ['Inter, sans-serif']
      },
      colors: {
        purple: {
          500: "#8a4af3"
        },
        positive: {
          100: "#2ECC71"
        },
        negative: {
          100: "#E74C3C"
        },
        gray: {
          100: '#E9E9E9',
          200: '#AAAAAA',
          300: '#8D8D99',
          500: '#323238',
          600: '#29292E',
          700: '#121214',
          900: '#09090A'
        }
      }
    },
  },
  plugins: [],
}
