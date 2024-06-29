// tailwind.config.js
import plugin from 'tailwindcss/plugin';
import withMT  from '@material-tailwind/react/utils/withMT';

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    
  },
    extend: {zIndex: {
      '100': '100',
      '200': '200',
      '300': '300',
      // Add more custom values as needed
    },
      colors: {
        primary: {
          100: '#5134a9',
          // bg-[#5134a9]
          // 100: '#563FBA',
          // 100: '#5641B2',
          // 100: '#5E4BB5',
          // 100: '#544498',
          // 100: '#595eb8',
        },
        bglight: {
          100: '#f5f5f7',
          200:'#e1e7ec',
          300:'#F4F5FF'
        },
       
        logo: {
          100: '#807fcc',
        },
        inputbg: {
          100: '#ebebeb',
          200: 'red',
        },
      },
      backgroundImage: {
        'footer-bg': "url('./src/assets/images/FooterBackgroundImage.png')"
        
      }
    },
  },
  plugins: [
    
    function ({ addVariant, e }) {
      addVariant('autofill', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`autofill${separator}${className}`)}:-webkit-autofill`;
        });
      });
    },
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
        },
        '.scrollbar-custom': {
          '&::-webkit-scrollbar': {
            width: '5px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '9999px',
            border: '3px solid #f1f1f1',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
});
