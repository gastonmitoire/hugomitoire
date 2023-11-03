import type { Config } from "tailwindcss";

const { nextui } = require("@nextui-org/react");

// dark: #333533;
// light: #CFDBD5;
// darker: #242423;
// lighter: #E8EDDF;
// primary: #F5CB5C;
// secondary: #087f8c;

const colorTokens = {
  dark: {
    DEFAULT: "#333533",
    foreground: "#CFDBD5",
  },
  light: {
    DEFAULT: "#CFDBD5",
    foreground: "#333533",
  },
  darker: {
    DEFAULT: "#242423",
    foreground: "#E8EDDF",
  },
  lighter: {
    DEFAULT: "#E8EDDF",
    foreground: "#242423",
  },
  primary: {
    DEFAULT: "#F5CB5C",
    foreground: "#333533",
  },
  secondary: {
    DEFAULT: "#087f8c",
    foreground: "#333533",
  },
  background: {
    DEFAULT: "#242423", // darker
    foreground: "#E8EDDF", // lighter
  },
  foreground: {
    DEFAULT: "#E8EDDF", // lighter
    foreground: "#242423", // darker
  },
  success: {
    DEFAULT: "#4b9c44",
    foreground: "#242423", // darker
  },
  warning: {
    DEFAULT: "#ffa801",
    foreground: "#242423", // darker
  },
  danger: {
    DEFAULT: "#d1495b",
    foreground: "#242423", // darker
  },
};

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fill-300": "repeat(auto-fill, minmax(300px, 1fr))",
        "auto-fit-300": "repeat(auto-fit, minmax(300px, 1fr))",
      },
      backgroundImage: {
        "gradient-from-bottom-dark":
          "linear-gradient(3deg, rgba(36, 36, 35, 1) 5rem, rgba(36, 36, 35, 0.7), rgba(36, 36, 35, 0.3), rgba(36, 36, 35, 0.2), rgba(36, 36, 35, 0))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: colorTokens,
        },
      },
    }),
  ],
};
export default config;
