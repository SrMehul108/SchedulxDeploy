/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Add the file types used in your project
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        darkmode: '#121212', // this color for dark mode bacground color
        borderDarkmode: '#374151',  // this color for dark mode border colors
        bgCopnents:'#1b1b1b', //bacgrounds of components
        bgbutton:'#37393b',
        ScocilMCompnent:'#282a2c',
        dropdown:'#2d2f31',
      },
    },
  },
  plugins: [],
}
