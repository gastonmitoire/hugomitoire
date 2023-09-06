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
        "auto-fill-100": "repeat(auto-fill, minmax(100px, 1fr))",
        "auto-fit-100": "repeat(auto-fit, minmax(100px, 1fr))",
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
