import type { Config } from "tailwindcss";

/**
 * Sistema de diseño "Precision Current" (exportado de Google Stitch).
 * Navy #0B192C · Ámbar eléctrico #F59E0B · Slate navy #1E3E62.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0B192C", 900: "#0B192C", 800: "#10233b", 700: "#1E3E62" },
        amber: { DEFAULT: "#F59E0B", 600: "#D97706" },
        ink: "#0F172A",
        surface: "#FAF8FF",
        "surface-low": "#F2F3FF",
        "surface-mid": "#EAEDFF",
        line: "#E2E8F0",
        whatsapp: { DEFAULT: "#25D366", dark: "#128C4A" },
      },
      fontFamily: {
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "1rem",
        panel: "2rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(11,25,44,0.05), 0 1px 2px -1px rgba(11,25,44,0.03)",
        lift: "0 10px 15px -3px rgba(11,25,44,0.08), 0 4px 6px -4px rgba(11,25,44,0.03)",
        float: "0 20px 25px -5px rgba(11,25,44,0.12), 0 8px 10px -6px rgba(11,25,44,0.04)",
        glow: "0 0 0 3px rgba(245,158,11,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
