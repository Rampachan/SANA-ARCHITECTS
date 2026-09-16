/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#FAF9F5',
          off: '#F4F2EC',
          stone: '#E8E5DD',
          muted: '#C4BFB4'
        },
        studio: {
          black: '#0A0A0A',
          charcoal: '#141413',
          dark: '#1E1E1C',
          slate: '#2D2D29',
          concrete: '#8E8C84'
        },
        accent: {
          terracotta: '#A6553B',
          amber: '#D97706',
          warm: '#94806A'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      letterSpacing: {
        architectural: '0.25em',
        editorial: '0.15em'
      },
      aspectRatio: {
        '16/10': '16 / 10',
        '4/5': '4 / 5',
        '21/9': '21 / 9',
        '3/4': '3 / 4'
      }
    },
  },
  plugins: [],
}
