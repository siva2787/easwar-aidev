/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        canvas: { light: '#fafaf8', dark: '#0a0b10' },
        primary: { 50: '#eef0ff', 100: '#e0e4ff', 400: '#8b93ff', 500: '#5560f0', 600: '#3b4df0', 700: '#2f3ed1' },
        accent: { cyan: '#06b6d4', emerald: '#10b981', violet: '#7c3aed' },
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        rise: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'none' } },
      },
      animation: { float: 'float 7s ease-in-out infinite', fadeIn: 'fadeIn .3s ease both', rise: 'rise .35s ease both' },
    },
  },
  plugins: [],
};
