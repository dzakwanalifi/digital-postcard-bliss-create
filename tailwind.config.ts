
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        ngepos: {
          DEFAULT: "#17A2B8", // Teal primary
          dark: "#1092a2",    // Teal hover
          light: "#e5f7fa",   // Pale teal
        },
        neutralBody: "#222222",
        // Fix: Add border color (for .border-border)
        border: "hsl(var(--border))",
      },
      boxShadow: {
        ngefos: "0 4px 20px rgba(23, 162, 184, 0.06)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
