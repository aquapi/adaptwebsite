import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      headings: ["Rubik Variable", "sans-serif"],
      base: ["Nunito Variable", "sans-serif"],
    },
  },
  plugins: [daisyui],
};
