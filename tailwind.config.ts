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
    },
  },
  plugins: [],
};
export default config;
