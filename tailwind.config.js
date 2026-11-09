/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        icrcmp: {
          blue: {
            DEFAULT: "#0B1F3A", // Bleu nuit régalien
            light: "#143054",
            dark: "#061224",
          },
          gold: {
            DEFAULT: "#C9A227", // Or discret / satiné
            light: "#DFC05C",
            dark: "#9E7E17",
          },
          stone: {
            DEFAULT: "#F5F5F0", // Gris pierre
            light: "#FAF9F6",
            dark: "#E5E5DF",
          },
          charcoal: "#1A2332",
          muted: "#5C6675",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

