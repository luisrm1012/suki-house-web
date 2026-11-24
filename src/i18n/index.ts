// Utilidades de idioma. Español en "/", inglés en "/en".
// Uso en cualquier componente:
//   const lang = getLang(Astro.currentLocale);
//   const d = getData(lang);            // mismo shape que src/data/site.ts
//   <a href={localizePath('/pozuelo', lang)}>
import * as es from '../data/site';
import * as en from '../data/site.en';

export type Lang = 'es' | 'en';
export const LANGS: readonly Lang[] = ['es', 'en'];
export const DEFAULT_LANG: Lang = 'es';

export const HTML_LANG: Record<Lang, string> = { es: 'es', en: 'en' };
export const OG_LOCALE: Record<Lang, string> = { es: 'es_ES', en: 'en_GB' };
export const LANG_LABEL: Record<Lang, string> = { es: 'Español', en: 'English' };

export function getLang(locale: string | undefined): Lang {
  return locale === 'en' ? 'en' : 'es';
}

export type SiteData = typeof es;
export function getData(lang: Lang): SiteData {
  return (lang === 'en' ? en : es) as SiteData;
}

/**
 * Prefijo de despliegue (p. ej. "/suki-house-web" en GitHub Pages, "" con dominio propio).
 * Viene de `base` en astro.config.mjs.
 */
export const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Añade la base a una ruta absoluta del sitio: withBase('/favicon.svg') → '/suki-house-web/favicon.svg'. */
export function withBase(path: string): string {
  return `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Normaliza a ruta lógica (sin base, sin idioma, sin .html/index): "/suki-house-web/en/pozuelo/" → "/pozuelo". */
export function stripLang(pathname: string): string {
  let p = pathname;
  if (BASE && (p === BASE || p.startsWith(`${BASE}/`))) p = p.slice(BASE.length);
  p = p.replace(/\/index(\.html)?$/, '/').replace(/\.html$/, '');
  if (p.length > 1) p = p.replace(/\/+$/, '');
  if (p === '/en') return '/';
  if (p.startsWith('/en/')) return p.slice(3) || '/';
  return p || '/';
}

/**
 * Convierte una ruta lógica (en español, sin base) en el href final del idioma pedido,
 * con la base de despliegue y barra final (las páginas se generan como carpeta/index.html).
 * Deja intactos enlaces externos, tel:, mailto:, "#" y anclas locales ("#x").
 *   localizePath('/pozuelo', 'en')        → '/suki-house-web/en/pozuelo/'
 *   localizePath('/', 'es')               → '/suki-house-web/'
 *   localizePath('/#alojamientos', 'en')  → '/suki-house-web/en/#alojamientos'
 */
export function localizePath(href: string, lang: Lang): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const [path, hash = ''] = href.split('#');
  const clean = stripLang(path || '/');
  const logical = lang === DEFAULT_LANG ? clean : clean === '/' ? '/en' : `/en${clean}`;
  const out = withBase(logical === '/' ? '/' : `${logical}/`);
  return hash ? `${out}#${hash}` : out;
}

/** Hrefs equivalentes en cada idioma para un pathname (para hreflang y el selector ES/EN). */
export function alternates(pathname: string): Record<Lang, string> {
  const logical = stripLang(pathname);
  return { es: localizePath(logical, 'es'), en: localizePath(logical, 'en') };
}
