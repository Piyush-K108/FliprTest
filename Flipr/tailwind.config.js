/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    extend: {
      colors: {
        primary: '#131424',
        secondary: '#393A47',
        accent: '#F13024',
      },
      fontFamily: {
        poppins: [`var(--font-poppins)`, 'sans-serif'],
        sora: [`var(--font-sora)`, 'sans-serif'],
      },
    },
  },
  container: {
    padding: {
      DEFAULT: '15px',
    },
  },
  plugins: [],
};
