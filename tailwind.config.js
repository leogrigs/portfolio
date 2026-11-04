/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ['"Geist"', "system-ui", "sans-serif"],
      display: ['"Geist"', "system-ui", "sans-serif"],
      name: ['"Archivo"', '"Geist"', "system-ui", "sans-serif"],
      mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
    },
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        line: "hsl(var(--line) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "scroll-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "scroll-line": "scroll-line 1.8s cubic-bezier(0.76, 0, 0.24, 1) infinite",
      },
    },
  },
  plugins: [],
};
