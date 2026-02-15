/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    screens: {
      xs: "450px",
      sm: "575px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
    extend: {
      colors: {
        current: "currentColor",
        transparent: "transparent",
        white: "#FFFFFF",
        black: "#1a1a1a",
        primary: "#1270B4",
        yellow: "#FBB040",
        cream: "#f7f5f0",
        "body-color": "#788293",
        stroke: "#d5d0c8",
        gray: {
          50: "#fafaf7",
          100: "#f7f5f0",
          200: "#e0dcd4",
          300: "#d5d0c8",
          400: "#999",
          500: "#788293",
          600: "#555",
          700: "#333",
          800: "#1a1a1a",
          900: "#111",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        serif: ["Source Serif 4", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 4px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.08)",
        subtle: "0 1px 2px rgba(0,0,0,0.04)",
        sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.06)",
        btn: "0px 1px 2px rgba(4, 10, 34, 0.1)",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};
