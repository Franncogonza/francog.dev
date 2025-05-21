module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {}
  },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class', // ← ACTIVÁ esto
  theme: {
    extend: {},
  },
  plugins: [],
};
