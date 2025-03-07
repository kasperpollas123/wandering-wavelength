// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
// import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    // Sitemap integration disabled - using custom sitemap.xml.js instead
    // sitemap({
    //   // Configuration options
    //   filter: (page) => !page.includes('/404'),
    //   lastmod: new Date(),
    // }),
  ],
  site: 'https://www.expungementattorneys.online',
  compressHTML: true,
});
