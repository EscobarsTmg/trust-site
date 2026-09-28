import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b11",
        paper: "#fbfbfd",
        violet: {
          50: "#f7f4ff",
          100: "#eee7ff",
          200: "#ddd0ff",
          300: "#c4adff",
          400: "#a67fff",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95"
        }
      },
      boxShadow: {
        soft: "0 24px 80px rgba(31, 24, 68, 0.12)",
        phone: "0 40px 100px rgba(28, 22, 72, 0.24)"
      },
      backgroundImage: {
        "hero-grid": "radial-gradient(circle at 1px 1px, rgba(88, 68, 175, .08) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
