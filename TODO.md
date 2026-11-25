# Suki House web — tareas pendientes

Estado: web publicada en https://luisrm1012.github.io/suki-house-web/ (ES + EN).
Prioridad: 🔴 antes de promocionar la web · 🟠 importante · 🟢 mejora.

> Lo legal de esta lista es orientativo, no asesoramiento jurídico: conviene que un gestor o abogado revise los textos finales.

---

## 1. Legal y privacidad (RGPD / LSSI)

- [ ] 🔴 **Aviso legal** (LSSI-CE, art. 10): titular (nombre o razón social), NIF/CIF, domicilio, email y teléfono, datos registrales si es sociedad. Página `/aviso-legal/` + `/en/legal-notice/`.
- [ ] 🔴 **Política de privacidad** (RGPD + LOPDGDD): responsable, finalidades (reservas, consultas por WhatsApp/email/teléfono), base legal, plazos de conservación, destinatarios y encargados (**motor de reservas Amenitiz**, Google Maps, GitHub Pages como hosting, WhatsApp/Meta), transferencias internacionales (EE. UU.), derechos ARSOPL y cómo ejercerlos, derecho a reclamar ante la AEPD. Versión ES + EN.
- [ ] 🔴 **Política de cookies**: listar las cookies reales. Hoy la web no instala cookies propias; las de terceros vienen de **Google Maps** (al pulsar «Ver mapa») y de lo que se añada después (analítica, motor de reservas embebido…).
- [ ] 🔴 **Banner de consentimiento de cookies**: aceptar / rechazar / configurar con el mismo peso visual, sin casillas premarcadas, que se pueda cambiar después (enlace «Configurar cookies» en el pie). Conectarlo al mapa: con consentimiento → el mapa carga solo al llegar a la sección; sin él → se mantiene el botón «Ver mapa».
- [ ] 🔴 Sustituir los enlaces `#` del pie (Política de privacidad, Aviso legal, Cookies) por las páginas reales (`legalLinks` en `src/data/site.ts` y `site.en.ts`).
- [ ] 🔴 **Número de registro turístico**: la Comunidad de Madrid exige mostrar el nº de inscripción (VT-…) en toda publicidad, y desde el 1-jul-2025 también el **número de registro único** (Registro Único de Arrendamientos, RD 1312/2024 / Reglamento UE 2024/1028). Mostrar el de cada casa en su página y en el pie.
- [ ] 🟠 Si se añade un formulario de contacto: casilla de aceptación de la política de privacidad + texto informativo de primera capa.
- [ ] 🟠 **Condiciones de reserva y cancelación** (página propia): precios con IVA y tasas incluidos, depósito, política de cancelación, horario de entrada/salida, normas de la casa, hoja de reclamaciones disponible.

## 2. Contenido pendiente (marcadores en la web)

> Desde el 2026-11-25 los marcadores (`[XX] €`, `[N]`, `[X] min`, `[Tu política]`…) **no se muestran**: `isFilled` (`src/data/placeholders.ts`) los oculta. Al rellenar el dato real en `src/data/` aparece solo.

- [ ] 🔴 Precios reales: los precios están centralizados en `src/data/prices.ts`. Hay 5 habitaciones con precio (Pozuelo hab. 2, 3 y 6; Vallarta hab. 2 y 7); las demás no muestran precio (la línea se oculta). Hay que completarlos y revisarlos periódicamente.
- [ ] 🔴 Política de cancelación: `[Tu política]` y `[Plazo de cancelación gratuita]` en «Antes de reservar» (la tarjeta de Cancelación está oculta hasta tenerla).
- [ ] 🟠 Capacidad de las familiares de Pozuelo: `[N] personas`.
- [ ] 🟠 Vallarta: minutos a pie al Metro L5, a IFEMA y al aeropuerto (`[X] min`), y **código postal** (mejora la precisión del mapa).
- [ ] 🟠 Vallarta, habitación 7: el nombre dice «baño privado» pero sus servicios en sukihouse.es dicen «baño compartido». Confirmar.
- [ ] 🟠 Puntuaciones de Vallarta (Booking/Expedia u otras) si existen; ahora solo se muestran las de Pozuelo.
- [ ] 🟢 Revisar los textos en inglés con alguien nativo (`src/data/site.en.ts` y los diccionarios `t` de cada componente).
- [ ] 🟢 Corregir en la web actual de sukihouse.es los textos alternativos de las fotos de Vallarta (dicen «Pozuelo de Alarcón»).

## 3. Reservas

- [ ] 🔴 **Conectar los formularios al motor de reservas** (hoy envían a `#`). Encontrado en la web actual: `https://sukihouse-vallarta.amenitiz.io/es/booking/room` y `https://www.sukihouse.es/es/booking/room`. Pasar llegada, salida, huéspedes y casa como parámetros si Amenitiz lo admite.
- [ ] 🔴 Botones «Reservar» de cada habitación → enlace directo a esa habitación en el motor.
- [ ] 🟠 Enlaces «Ver detalles y fotos» y «Ver todas las fotos» (hoy `#`): galería por habitación (lightbox) o página de detalle.
- [ ] 🟢 Precios dinámicos desde Amenitiz (si ofrece API o widget) en lugar de texto fijo. Amenitiz no tiene API pública documentada: su API interna no permite CORS y Cloudflare bloquea peticiones fuera del navegador. Alternativa: script local con Playwright que actualice `src/data/prices.ts`.

## 4. Dominio y despliegue (migración fuera de GitHub Pages)

> Los problemas propios de GitHub Pages se resuelven al migrar; no merece la pena parchearlos antes.

- [ ] 🟠 Apuntar **sukihouse.es** a esta web: variables del repo `SITE_URL=https://www.sukihouse.es` y `BASE_PATH=/`, `public/CNAME`, DNS según la guía de GitHub Pages, activar «Enforce HTTPS».
- [ ] 🟠 **Redirecciones 301** desde las URLs antiguas (`/es/pagina/suki-house-vallarta`, `/es/habitaciones`, `/es/contactar`…) a las nuevas para no perder SEO. GitHub Pages no admite 301 → usar Cloudflare (gratis) delante, o páginas de redirección.
- [ ] 🟢 Cabeceras de seguridad y caché: `public/_headers` solo funciona en Netlify/Cloudflare Pages. Con Cloudflare delante se pueden aplicar (CSP con `frame-src https://www.google.com` para el mapa).
- [ ] 🟠 CSP: hay scripts inline (`Header.astro` y los que inlinea Astro) → usar hashes `sha256-…` o moverlos a archivos.
- [ ] 🟠 Revisar `Strict-Transport-Security … includeSubDomains` de `_headers` antes de activarlo en sukihouse.es (rompe subdominios sin HTTPS).
- [ ] 🟠 `robots.txt` solo es válido en la raíz del dominio: hoy (`/suki-house-web/robots.txt`) los buscadores lo ignoran; se arregla con `BASE_PATH=/`.
- [ ] 🟢 Con hosting con caché inmutable para `/_astro/*`, valorar `inlineStylesheets: 'auto'` en `astro.config.mjs` (el HTML de la home pesa ~97 KB por el CSS inline).
- [ ] 🟢 Si se sigue con GitHub Actions: fijar las acciones del workflow por SHA en vez de por tag.

## 5. SEO y presencia local

- [ ] 🟠 **Google Business Profile** de cada casa (mismas dirección y teléfono que la web) y, después, usar el nombre del negocio en `mapQuery` para que el pin muestre «Suki House».
- [ ] 🟠 Alta en **Google Search Console** (ES y EN) y envío del sitemap.
- [ ] 🟢 Imagen Open Graph propia para la home (hoy la foto de la entrada; Pozuelo y Vallarta ya usan su foto principal).
- [ ] 🟢 JSON-LD: añadir `geo` (lat/lng) y `hasMap` a cada `LodgingBusiness` (mejora SEO local).
- [ ] 🟢 Página 404 en inglés (hoy solo en español con una línea en inglés).
- [ ] 🟢 Añadir `aggregateRating` al JSON-LD solo cuando haya un nº de reseñas verificable.

## 6. Analítica (opcional)

- [ ] 🟢 Analítica respetuosa con la privacidad (Plausible, Umami o Cloudflare Web Analytics sin cookies) **o** GA4 condicionada al banner de cookies.
- [ ] 🟢 Medir clics en «Reservar», WhatsApp y teléfono como conversiones.

## 7. Calidad

- [ ] 🟢 Repetir Lighthouse y revisar accesibilidad tras conectar el motor de reservas y el banner de cookies.
- [ ] 🟢 Probar en Safari iOS y Firefox (las transiciones entre páginas solo funcionan en Chrome/Safari 18+; en el resto se navega sin animación).

## 8. Accesibilidad

- [ ] 🟠 Menú móvil: atrapar el foco dentro mientras está abierto y cerrarlo al pulsar fuera.
- [ ] 🟢 Puntuaciones («8,7») sin escala: añadir «/10» o texto oculto para lectores de pantalla (`RatingBadge.astro`, `Testimonials.astro`).
- [ ] 🟢 Verificar contraste de `--muted` (#4F6160) sobre `--mint` con Lighthouse.

## 9. Rendimiento

- [ ] 🟢 `global.css` importa Nunito con todos los subsets; importar solo `latin` reduce los `@font-face` inline de cada página.
- [ ] 🟢 Logo en JPG con `mix-blend-mode: multiply` para disimular el fondo → pasarlo a SVG o PNG transparente.

## 10. Conversión / UX

- [ ] 🟠 «Reservar» en la tarjeta de cada casa (home) lleva a `#reservar` sin preseleccionar esa casa en el formulario.
- [ ] 🟢 Enlace de WhatsApp con mensaje predefinido (`https://wa.me/34680257954?text=…`, ES/EN).
- [ ] 🟢 Filtros de habitaciones reflejados en la URL (`?tipo=familiar`) para poder compartirlos.

## 11. Seguridad y mantenimiento

- [ ] 🟠 Email de contacto `@gmail.com` → uno del dominio (p. ej. `reservas@sukihouse.es`): más profesional y filtrable.
- [ ] 🟢 Activar Dependabot/Renovate para `npm` (hoy `npm audit` = 0 vulnerabilidades).
- [ ] 🟢 Quitar `<meta name="generator">` de `Base.astro` (revela la versión de Astro).
- [ ] 🟢 `engines.node` de `package.json` (`>=22.23.4`) → `>=22`.

## Hecho (auditoría 2026-11-25)

- [x] JSON-LD con URLs e imágenes correctas, og:image por casa, foco visible y validación de fechas en el formulario de casa, marcadores ocultos, nº de habitaciones derivado de los datos, `referrerPolicy` del mapa, JSON-LD escapado, `robots.txt` sin `Disallow: /404`, hreflang del sitemap `es`/`en`. Commits `8642c75` y `9c08829`.
