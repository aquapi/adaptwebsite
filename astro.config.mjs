// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import netlify from "@astrojs/netlify";

export default defineConfig({
  integrations: [tailwind()],

  prefetch: {
    prefetchAll: true,
  },

  output: "server",
  adapter: netlify(),
});