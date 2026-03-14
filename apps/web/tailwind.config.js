module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        sand: {
          50: '#fdfcfb',
          100: '#fbf8f1',
          200: '#f5eedc',
          300: '#ece0c1',
          400: '#dfcc9d',
          500: '#d1b578',
          600: '#c19d5a',
          700: '#a68146',
          800: '#87683d',
          900: '#6f5635',
          950: '#3f301d',
        },
        accent: '#ff4d00',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
