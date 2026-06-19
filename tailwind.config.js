/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        c: {
          bg: '#F7F6F2',
          surface: '#FEFEFE',
          surface2: '#F2F1ED',
          surface3: '#ECEAE4',
          border: '#E2E0D8',
          border2: '#CCCAB8',
          purple: '#6558D3',
          'purple-l': '#4A40A8',
          'purple-d': '#EDE9FA',
          'purple-dd': '#E3DEFF',
          green: '#1A7A5E',
          'green-d': '#E8F5F0',
          amber: '#92580C',
          'amber-d': '#FDF0DC',
          red: '#A33D1E',
          'red-d': '#FCEEE9',
          blue: '#1F68B3',
          'blue-d': '#E8F2FB',
          text: '#1E1B3A',
          text2: '#54516E',
          text3: '#9B94C4',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', '-apple-system', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      borderRadius: {
        app: '14px',
        'app-sm': '10px',
      },
      letterSpacing: {
        display: '-0.03em',
        heading: '-0.025em',
      },
      boxShadow: {
        card: '0 2px 8px rgba(30,27,58,0.06)',
        'card-hover': '0 8px 24px rgba(30,27,58,0.10)',
        modal: '0 24px 64px rgba(30,27,58,0.18)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        'modal-in': {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s ease-in-out infinite',
        'modal-in': 'modal-in 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-up': 'slide-up 0.2s ease-out',
        'slide-right': 'slide-right 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
