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
        primary: '#803BB2',
        ink: '#111111',
        'muted-ink': '#1F1F1F',
        'light-base': '#FFFFFF',
        'light-surface': '#FFFFFF',
        'light-panel': '#FFFFFF',
        'deep-black': '#0A0A0B',
        'steel-gray': '#1E1E24',
        'mist-gray': '#1A1A1A',
        'orchid-mist': '#A978CE',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['"Geist Mono"', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #8B5CF6' },
          '100%': { boxShadow: '0 0 20px #8B5CF6' },
        }
      }
    },
  },
  plugins: [],
}