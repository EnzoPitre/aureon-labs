import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0a0a0a",
          secondary: "#1a1a1a",
          tertiary: "#242424",
        },
        text: {
          primary: "#ffffff",
          secondary: "#b3b3b3",
          tertiary: "#666666",
        },
        accent: {
          cyan: "#00d9ff",
          purple: "#b000ff",
        },
        border: {
          DEFAULT: "#333333",
          subtle: "#222222",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1400px",
      },
      borderRadius: {
        card: "10px",
        btn: "6px",
      },
      animation: {
        "grain": "grain 4s steps(10) infinite",
        "gradient-rotate": "gradient-rotate 20s linear infinite",
        "fade-up": "fade-up 0.4s ease-out forwards",
        "shimmer": "shimmer 2s infinite linear",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        grain: {
          "0%, 100%": { opacity: "0.02" },
          "50%": { opacity: "0.035" },
        },
        "gradient-rotate": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
    },
  },
  plugins: [],
};

export default config;
