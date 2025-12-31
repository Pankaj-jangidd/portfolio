/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Backgrounds - Pure black theme
        darkBg: "#000000",
        darkCard: "#1A1A1A",
        darkBorder: "#2A2A2A",

        // Accents - Cyan theme
        accent: "#06B6D4",
        accentHover: "#0891B2",
        accentCyan: "#06B6D4",
        accentGreen: "#10B981",

        // Text
        textWhite: "#FFFFFF",
        textGray: "#D1D5DB",
        textMuted: "#6B7280",
      },
      fontFamily: {
        sans: ["Oxanium", "sans-serif"],
        oxanium: ["Oxanium", "sans-serif"],
      },
    },
  },
  plugins: [],
};
