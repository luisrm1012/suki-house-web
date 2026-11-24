# Suki House web

Web estática (Astro 7) orientada a reservas directas: Home, `/pozuelo` (habitaciones), 404 personalizada, `robots.txt`, `llms.txt` y sitemap.

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321/suki-house-web/
npm run build    # genera dist/
npm run preview  # sirve dist/
```

## Deploy (GitHub Pages)

Cada push a `main` publica la web con `.github/workflows/deploy.yml` en
https://luisrm1012.github.io/suki-house-web/

Activación (una sola vez): **Settings → Pages → Build and deployment → Source: GitHub Actions**.
En repos privados, GitHub Pages requiere un plan de pago (Pro/Team).

Dominio propio (p. ej. `www.sukihouse.es`): en **Settings → Secrets and variables → Actions → Variables**
crea `SITE_URL=https://www.sukihouse.es` y `BASE_PATH=/`, añade `public/CNAME` con el dominio
y configura el DNS según la guía de GitHub Pages.

`public/_headers` solo lo aplican Netlify / Cloudflare Pages; GitHub Pages lo ignora.

## Antes de publicar

- La URL pública sale de `SITE_URL` y `BASE_PATH` (`astro.config.mjs` o variables del workflow): canonical, Open Graph, sitemap, robots y llms la usan.
- Los precios se editan en `src/data/prices.ts`.
- Sustituye los marcadores del diseño en `src/data/site.ts`: capacidad `[N] personas`, distancias `[X] min` de Vallarta y la política de cancelación.
- Los formularios de reserva apuntan a `#`: conéctalos al motor de reservas.
- `public/_headers` (Netlify / Cloudflare Pages) define caché inmutable para `/_astro/*` y cabeceras de seguridad.

## Estructura

- `src/data/site.ts` — todo el contenido (casas, habitaciones, reseñas, contacto).
- `src/styles/global.css` — tokens de marca y utilidades.
- `src/components/` — piezas compartidas; `src/components/home/` — secciones de la Home.
- `src/assets/images/` — fotos originales; Astro genera AVIF/WebP redimensionados en el build.

No hay variables de entorno ni secretos en el proyecto.
