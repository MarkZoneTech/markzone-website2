import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://markzonetech.com',
  trailingSlash: 'never',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [sitemap({
    filter: (page) => !page.endsWith('/blog/') && !page.endsWith('/blog'),
    i18n: { defaultLocale: 'en', locales: { en: 'en-AE', ar: 'ar-AE' } },
  })],
});
