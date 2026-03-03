/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ranch: {
          50: '#faf8f5',
          100: '#f3efe8',
          200: '#e5ddd0',
          300: '#d4c5ad',
          400: '#c0a888',
          500: '#b0916a',
          600: '#a3805e',
          700: '#886a4f',
          800: '#6f5744',
          900: '#5b483a',
          950: '#30251e',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e3ebe3',
          200: '#c8d8c8',
          300: '#a1bda1',
          400: '#779c77',
          500: '#567d56',
          600: '#436443',
          700: '#365036',
          800: '#2d412d',
          900: '#263626',
          950: '#121d12',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}