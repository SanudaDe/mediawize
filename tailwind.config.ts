import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#EC2328",
          "red-hover": "#D1181D",
          "red-light": "#FFF1F1",
          "red-glow": "rgba(236, 35, 40, 0.25)",
          black: "#111827",
          dark: "#0F172A",
          charcoal: "#1E293B",
          gray: {
            50: "#F8FAFC",
            100: "#F1F5F9",
            200: "#E2E8F0",
            300: "#CBD5E1",
            400: "#94A3B8",
            500: "#64748B",
            600: "#475569",
            700: "#334155",
            800: "#1E293B",
            900: "#0F172A",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      boxShadow: {
        "card-soft": "0 10px 30px -5px rgba(0, 0, 0, 0.06), 0 4px 12px -2px rgba(0, 0, 0, 0.03)",
        "card-hover": "0 20px 40px -10px rgba(236, 35, 40, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.06)",
        "red-glow": "0 8px 20px -4px rgba(236, 35, 40, 0.4)",
        "red-glow-lg": "0 12px 30px -4px rgba(236, 35, 40, 0.5)",
      },
      clipPath: {
        "hero-angle": "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "badge-angle": "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
