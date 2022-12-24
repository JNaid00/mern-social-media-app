/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-background': '#F6F6F6',
        'dark-background': '#0A0A0A',
        'light-alt': '#FFFFFF',
        'dark-alt': '#1A1A1A',
      },
    },
  },
  plugins: [],
}
