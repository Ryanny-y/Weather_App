/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{html,js}', 
            './*.{html,js}',
            'scripts/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'bg': '#08080a',
        'bg-color': '#111015',
        'dark-gray': '#1e1e1e',
        'light-1': '#fbfbfa',
        'light-2': '#7d7d82',
        'light-blue': '#9dcdf3',
        'light-blue-1': '#89c3f0',
        'indigo': '#4e6b99'
      },
      fontFamily: {
        'raleway': ["Raleway", 'Aria;', "sans-serif"],
        'poppins': ["Poppins", 'Aria;', "sans-serif"]
      },
      height: {
        'maxh': '600px'
      },
      maxWidth: {
        'maxw': '320px'
      },
      width: {
        'maxw': '320px'
      },
    },
  },
  plugins: [],
}

