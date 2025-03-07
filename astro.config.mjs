// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      // Configuration options
      filter: (page) => !page.includes('/404'),
      lastmod: new Date(),
    }),
  ],
  site: 'https://www.expungementattorneys.org',
  compressHTML: true,
});
