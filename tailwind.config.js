/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  safelist: [
    'text-primary',
    'text-primary-light',
    'text-strawberry',
    'text-strawberry-light',
    'text-cherry-pie',
    'text-cherry-pie-light',
    {
      pattern: /text-(primary|strawberry|cherry-pie)(-light)?/,
      variants: ['group-hover'],
    },
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4f46e5',
          DEFAULT: '#4338ca',
          dark: '#3730a3',
        },
        accent: {
          light: '#ffed4a',
          DEFAULT: '#c8a600',
          dark: '#c8a600',
        },
        background: {
          light: '#f8fafc',
          DEFAULT: '#0a0f2c',
        },
        surface: {
          light: '#ffffff',
          DEFAULT: '#141832',
        },
        text: {
          light: '#1e293b',
          DEFAULT: '#ffffff',
        },
        strawberry: {
          light: '#ff99a3',
          DEFAULT: '#ff4d6a',
          dark: '#e31b3d',
        },
        'cherry-pie': {
          light: '#ff3366',
          DEFAULT: '#cc0033',
          dark: '#990033',
        }
      },
      zIndex: {
        '-1': '-1',
        '1': '1',
        '60': '60',
      },
      boxShadow: {
        'dark': '0 4px 6px -1px rgba(255, 215, 0, 0.1), 0 2px 4px -1px rgba(255, 215, 0, 0.06)',
        'dark-lg': '0 10px 15px -3px rgba(255, 215, 0, 0.1), 0 4px 6px -2px rgba(255, 215, 0, 0.05)',
        'dark-xl': '0 20px 25px -5px rgba(255, 215, 0, 0.1), 0 10px 10px -5px rgba(255, 215, 0, 0.04)',
        'dark-2xl': '0 25px 50px -12px rgba(255, 215, 0, 0.25)',
        'light': '0 4px 6px -1px rgba(26, 35, 126, 0.1), 0 2px 4px -1px rgba(26, 35, 126, 0.06)',
        'light-lg': '0 10px 15px -3px rgba(26, 35, 126, 0.1), 0 4px 6px -2px rgba(26, 35, 126, 0.05)',
        'light-xl': '0 20px 25px -5px rgba(26, 35, 126, 0.1), 0 10px 10px -5px rgba(26, 35, 126, 0.04)',
        'light-2xl': '0 25px 50px -12px rgba(26, 35, 126, 0.25)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) rotate(45deg)' },
          '50%': { transform: 'translateY(-30px) rotate(45deg)' },
        },
        gradientFlow: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'float-delayed-slow': 'floatSlow 8s ease-in-out 3s infinite',
        'gradient-flow': 'gradientFlow 8s ease infinite',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
