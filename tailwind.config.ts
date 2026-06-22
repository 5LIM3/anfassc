import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        condensed: ["var(--font-condensed)", "sans-serif"],
      },
      colors: {
        green: {
          700: "#008751",
          800: "#005e38",
          900: "#003d24",
          950: "#001f12",
        },
        gold: "#D4AF37",
        "gold-light": "#F0D060",
        "off-white": "#F8F5EF",
        cream: "#EDE8DC",
        "text-dark": "#0A0A0A",
        "text-mid": "#2e2e2e",
        "text-muted": "#666666",
      },
    },
  },
  plugins: [],
};

export default config;
