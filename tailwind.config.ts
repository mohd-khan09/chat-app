/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        'custom-teal': '#329A93',
        darkslategray: 'rgba(74, 74, 74, 0.51)',
        dimgreen: '#E9F7F8',
        darkgreen: '#329A93',
      },

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },

  plugins: [require('@tailwindcss/forms')],
};
