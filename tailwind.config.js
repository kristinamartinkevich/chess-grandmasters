const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#3B82F6",
            foreground: "#ffffff",
          },
          secondary: {
            DEFAULT: "#64748B",
            foreground: "#ffffff",
          },
          success: {
            DEFAULT: "#10B981",
            foreground: "#ffffff",
          },
          warning: {
            DEFAULT: "#F59E0B",
            foreground: "#ffffff",
          },
          danger: {
            DEFAULT: "#EF4444",
            foreground: "#ffffff",
          },
        },
      },
      dark: {
        colors: {
          primary: {
            DEFAULT: "#60A5FA",
            foreground: "#000000",
          },
          secondary: {
            DEFAULT: "#94A3B8",
            foreground: "#000000",
          },
          success: {
            DEFAULT: "#34D399",
            foreground: "#000000",
          },
          warning: {
            DEFAULT: "#FBBF24",
            foreground: "#000000",
          },
          danger: {
            DEFAULT: "#F87171",
            foreground: "#000000",
          },
        },
      },
    },
  })],
};