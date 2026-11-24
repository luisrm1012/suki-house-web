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

- [ ] 🔴 Precios reales: todos los `[XX] €` (`PRICE_PLACEHOLDER` y tarjetas de habitación).
- [ ] 🔴 Política de cancelación: `[Tu política]` y `[Plazo de cancelación gratuita]` en «Antes de reservar».
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
- [ ] 🟢 Precios dinámicos desde Amenitiz (si ofrece API o widget) en lugar de texto fijo.

## 4. Dominio y despliegue

- [ ] 🟠 Apuntar **sukihouse.es** a esta web: variables del repo `SITE_URL=https://www.sukihouse.es` y `BASE_PATH=/`, `public/CNAME`, DNS según la guía de GitHub Pages, activar «Enforce HTTPS».
- [ ] 🟠 **Redirecciones 301** desde las URLs antiguas (`/es/pagina/suki-house-vallarta`, `/es/habitaciones`, `/es/contactar`…) a las nuevas para no perder SEO. GitHub Pages no admite 301 → usar Cloudflare (gratis) delante, o páginas de redirección.
- [ ] 🟢 Cabeceras de seguridad y caché: `public/_headers` solo funciona en Netlify/Cloudflare Pages. Con Cloudflare delante se pueden aplicar (CSP con `frame-src https://www.google.com` para el mapa).

## 5. SEO y presencia local

- [ ] 🟠 **Google Business Profile** de cada casa (mismas dirección y teléfono que la web) y, después, usar el nombre del negocio en `mapQuery` para que el pin muestre «Suki House».
- [ ] 🟠 Alta en **Google Search Console** (ES y EN) y envío del sitemap.
- [ ] 🟢 Imagen Open Graph propia para cada página (hoy todas usan la foto de la entrada).
- [ ] 🟢 Añadir `aggregateRating` al JSON-LD solo cuando haya un nº de reseñas verificable.

## 6. Analítica (opcional)

- [ ] 🟢 Analítica respetuosa con la privacidad (Plausible, Umami o Cloudflare Web Analytics sin cookies) **o** GA4 condicionada al banner de cookies.
- [ ] 🟢 Medir clics en «Reservar», WhatsApp y teléfono como conversiones.

## 7. Calidad

- [ ] 🟢 Repetir Lighthouse y revisar accesibilidad tras conectar el motor de reservas y el banner de cookies.
- [ ] 🟢 Probar en Safari iOS y Firefox (las transiciones entre páginas solo funcionan en Chrome/Safari 18+; en el resto se navega sin animación).
