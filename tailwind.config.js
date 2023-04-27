//cspell:ignore tailwindcss, flowbite

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      custom280: { max: '280px' },
      custom340: { max: '340px' },
      custom540: { max: '540px' },
      custom640: { max: '640px' },
      custom768: { max: '768px' },
      custom950: { max: '950px' },
      custom1400: { max: '1400px' },
      // md: "768px",
      // lg: "1400px",
    },
  },
  plugins: [require('flowbite/plugin')],
};
