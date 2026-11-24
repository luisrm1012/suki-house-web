// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Despliegue en GitHub Pages: https://luisrm1012.github.io/suki-house-web/
// Con dominio propio (p. ej. https://www.sukihouse.es): pon SITE_URL al dominio,
// BASE_PATH a '/' y crea public/CNAME con el dominio. Se puede sobrescribir con
// las variables de entorno SITE_URL y BASE_PATH.
export const SITE_URL = process.env.SITE_URL ?? 'https://luisrm1012.github.io';
const BASE_PATH = process.env.BASE_PATH ?? '/suki-house-web';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  image: { responsiveStyles: false },
  vite: { build: { sourcemap: false } },
  // Español en la raíz (/), inglés bajo /en
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES', en: 'en-GB' } },
    }),
  ],
});
