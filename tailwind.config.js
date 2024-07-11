/* const { extend } = require('dayjs'); */

/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false,
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
  },
}