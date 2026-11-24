import type { APIRoute } from 'astro';
import { localizePath } from '../i18n';
import {
  site,
  properties,
  pozueloRooms,
  vallartaRooms,
  vallartaIncluded,
  beforeBooking,
  includedEverywhere,
} from '../data/site';

// Omite cualquier valor con marcadores pendientes ("[X] min", "[N] personas", "[XX] €")
const clean = (text: string) => !text.includes('[');
const abs = (base: URL, path: string, lang: 'es' | 'en' = 'es') => new URL(localizePath(path, lang), base).href;

export const GET: APIRoute = ({ site: siteUrl }) => {
  const base = siteUrl!;

  const alojamientos = properties.map((p) => {
    const address = p.addressLines.filter(Boolean).join(', ');
    const link = p.href.startsWith('/') ? ` (${abs(base, p.href)})` : '';
    const bullets = p.bullets.filter(clean).map((b) => `  - ${b}`);
    return [
      `- ${p.name}${link}`,
      `  - Dirección: ${address}`,
      `  - Habitaciones: ${p.rooms}`,
      ...bullets,
    ].join('\n');
  });

  const roomLine = (r: { name: string; description: string; chips: string[] }) =>
    `- ${r.name} — ${r.description} (${r.chips.filter(clean).join(', ')})`;
  const habitaciones = pozueloRooms.map(roomLine);
  const habitacionesVallarta = vallartaRooms.map(roomLine);

  const practica = [
    `- Entrada: desde las ${site.checkIn}`,
    `- Salida: hasta las ${site.checkOut}`,
    ...beforeBooking
      .filter((b) => clean(b.title) && clean(b.note))
      .filter((b) => b.label !== 'Entrada' && b.label !== 'Salida')
      .map((b) => `- ${b.label}: ${b.title}. ${b.note}.`),
    `- Incluido en todas las habitaciones de Pozuelo: ${includedEverywhere.filter(clean).join(', ')}`,
    `- Incluido en todas las habitaciones de Vallarta: ${vallartaIncluded.filter(clean).join(', ')}`,
  ];

  const contacto = [
    ...site.phones.map((ph) => `- Teléfono: ${ph.label}`),
    `- Email: ${site.email}`,
    `- WhatsApp: ${site.whatsapp.href}`,
  ];

  const paginas = [
    `- [Inicio](${abs(base, '/')})`,
    `- [Habitaciones de Suki House Pozuelo](${abs(base, '/pozuelo')})`,
    `- [Habitaciones de Suki House Vallarta](${abs(base, '/vallarta')})`,
  ];

  const english = [
    `- [Home (English)](${abs(base, '/', 'en')})`,
    `- [Suki House Pozuelo rooms (English)](${abs(base, '/pozuelo', 'en')})`,
    `- [Suki House Vallarta rooms (English)](${abs(base, '/vallarta', 'en')})`,
  ];

  const body = [
    '# Suki House',
    '',
    `> ${site.description}`,
    '',
    `Suki House alquila habitaciones dobles y familiares con cocina equipada en Madrid, en dos alojamientos: Suki House Pozuelo (Pozuelo de Alarcón) y Suki House Vallarta (San Blas–Canillejas). Reserva directa en la web oficial con el mejor precio garantizado.`,
    '',
    '## Alojamientos',
    '',
    ...alojamientos,
    '',
    '## Habitaciones de Suki House Pozuelo',
    '',
    ...habitaciones,
    '',
    '## Habitaciones de Suki House Vallarta',
    '',
    ...habitacionesVallarta,
    '',
    '## Información práctica',
    '',
    ...practica,
    '',
    '## Contacto',
    '',
    ...contacto,
    '',
    '## Páginas',
    '',
    ...paginas,
    '',
    '## English',
    '',
    ...english,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
