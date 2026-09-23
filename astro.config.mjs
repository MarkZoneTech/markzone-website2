import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://markzonetech.com',
  trailingSlash: 'never',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [sitemap({
    filter: (page) => !/\/(r|growth-partner\/admin)(\/|$)/.test(new URL(page).pathname),
    i18n: { defaultLocale: 'en', locales: { en: 'en-AE', ar: 'ar-AE' } },
  }), react()],
});