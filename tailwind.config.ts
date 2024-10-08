import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
      colors: {
        primary: '#e18f33',
        secondary: '#f9fafb',
      },
      fontFamily: {
        main: ['main-font', 'sans-serif'],
      },
     
    },
  },
  plugins: [
    require('daisyui'),
  ],
};

export default config;
