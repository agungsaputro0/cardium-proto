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
        maintheme: "#c40d43",
        boldmaintheme: "#7a0125",
        fesypurple: "#7f0353",
        footertop: "#f5f2ee",
        footerbody: "#FAACC2",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'supernarrow': '330px',
        'mediumgap': '910px', 
        'largegap': '1150px',
      },
      keyframes: {
        wavepulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '20%': { transform: 'scale(1.1)' },
          '40%': { transform: 'scale(0.95)' },
          '60%': { transform: 'scale(1.05)' },
          '80%': { transform: 'scale(0.98)' },
        },
      },
      animation: {
        wavepulse: 'wavepulse 1.5s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
