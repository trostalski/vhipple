/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      // sm: "480px",
      // md: "768px",
      // lg: "976px",
      // xl: "1440px",
    },
    extend: {
      colors: {
        "main-bg": "#f0f9ff",
        "sidebar-bg": "#2f4b7c",
        "sidebar-hover": "#665191",
        "primary-button": "#0284c7",
        "primary-button-hover": "#38bdf8",
        "secondary-button": "#a855f7",
        "secondary-button-hover": "#d8b4fe",
        "cancel-button": "#be123c",
        "cancel-button-hover": "#fb7185",
      },
      fontFamily: {},
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
  },
  plugins: [],
};
