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
        "main-bg": "var(--main-bg)",
        "hns-blue": "#05386B",
        "sidebar-bg": "var(--sidebar-bg)",
        "primary-button": "var(--primary-button)",
        "primary-button-hover": "var(--primary-button-hover)",
        "secondary-button": "var(--secondary-button)",
        "secondary-button-hover": "var(--secondary-button-hover)",
        "cancel-button": "var(--cancel-button)",
        "cancel-button-hover": "var(--cancel-button-hover)",
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
