/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#00b4ff',
        secondary: '#0a1628',
        accent: '#0055cc',
        success: '#34d399',
        warning: '#fbbf24',
        danger: '#f87171',
        background: 'var(--background)',
        card: 'var(--card)',
        surface: 'var(--surface)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        navy: {
          900: '#060d1f',
          800: '#081429',
          700: '#0d1f3e',
          600: '#142d5a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 6s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient-flow': 'gradient-flow 4s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'gradient-flow': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 'box-shadow': '0 0 5px rgba(0,180,255,0.3)' },
          '50%': { 'box-shadow': '0 0 20px rgba(0,180,255,0.7), 0 0 40px rgba(0,180,255,0.25)' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(0, 180, 255, 0.2)',
        'glow': '0 0 25px rgba(0, 180, 255, 0.3)',
        'glow-lg': '0 0 50px rgba(0, 180, 255, 0.4)',
        'glow-primary': '0 0 30px rgba(0, 180, 255, 0.35)',
        'inner-glow': 'inset 0 0 20px rgba(0, 180, 255, 0.05)',
      },
    },
  },
  plugins: [],
}

