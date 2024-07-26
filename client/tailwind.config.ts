import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'dark-primary': '#000000',
        'dark-secondary': '#0d0d0d',
        'light-primary': '#ffffff',
        'light-secondary': '#7e7e7e',
        'dark-background': '#181818',
        'color-primary': '#1b202c',
        'color-secondary': '#161923',
        'header-bg': 'rgba(27, 27, 27, .26)',
        'header-border': 'rgba(255, 255, 255, .1)',
        'footer-divider': '#2b2b2b',
        'btn-primary': '#0266ff',
        'btn-secondary': '#3898ec',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scrollUp: {
          '0%': { marginTop: '100px', opacity: '0' },
          '10%': { marginTop: '85px', opacity: '0.5' },
          '20%': { marginTop: '70px', opacity: '1' },
          '100%': { marginTop: '0px', opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        fade: 'fadeIn 350ms ease-in-out',
        'scroll-text': 'scrollUp 2.5s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
