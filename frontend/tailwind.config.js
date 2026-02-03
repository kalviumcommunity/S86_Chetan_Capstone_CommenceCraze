/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF7E33',
          50: '#FFF5EE',
          100: '#FFE8D6',
          200: '#FFD1AD',
          300: '#FFBA85',
          400: '#FFA35C',
          500: '#FF7E33',
          600: '#FF6300',
          700: '#CC4F00',
          800: '#993B00',
          900: '#662700',
        },
        secondary: {
          DEFAULT: '#FACC15',
          50: '#FFFEF0',
          100: '#FFFBDB',
          200: '#FFF7B8',
          300: '#FFF394',
          400: '#FFEF71',
          500: '#FACC15',
          600: '#F5B800',
          700: '#C79300',
          800: '#946E00',
          900: '#614900',
        },
        dark: {
          DEFAULT: '#1a1a1a',
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#666666',
          600: '#4d4d4d',
          700: '#333333',
          800: '#262626',
          900: '#1a1a1a',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
