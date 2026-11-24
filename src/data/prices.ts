/**
 * Precios «desde» de las habitaciones (única fuente de precios).
 *
 * Última actualización 2026-11-24: precio mínimo por noche visto para la
 * estancia del 10 al 12 de diciembre de 2026.
 * Precios por noche, IVA incluido, tasa turística NO incluida.
 *
 * Cómo actualizar:
 *  1) Abrir los motores de Amenitiz:
 *     - https://www.sukihouse.es/es/booking/room (Pozuelo)
 *     - https://sukihouse-vallarta.amenitiz.io/es/booking/room (Vallarta)
 *  2) Buscar fechas y anotar el mínimo por noche de cada habitación.
 *  3) Editar `from` con punto decimal (p. ej. 48.6); null muestra «[XX] €».
 *  4) Actualizar PRICES_UPDATED.
 *  5) npm run build
 *
 * Aviso: las claves son los Room.id de src/data/site.ts (iguales en
 * site.en.ts); si se renombra uno hay que renombrarlo aquí.
 */
import type { Property } from './site';
import type { Lang } from '../i18n';

export type HouseId = Property['id']; // 'pozuelo' | 'vallarta'

export const PRICES_UPDATED = '2026-11-24';
export const PRICE_PLACEHOLDER = '[XX] €';

export interface RoomPrice {
  house: HouseId;
  amenitizId: number | null;
  amenitizName: string | null;
  from: number | null;
}

export const roomPrices: Record<string, RoomPrice> = {
  // Pozuelo
  'doble-premium': { house: 'pozuelo', amenitizId: 99291, amenitizName: '3 - Habitación Doble Premium con baño privado', from: 69.3 },
  'familiar-privado': { house: 'pozuelo', amenitizId: null, amenitizName: null, from: null },
  'doble-aire': { house: 'pozuelo', amenitizId: 99292, amenitizName: '2 - Habitación Doble con A/A, baño compartido', from: 51.75 },
  'doble-compartido': { house: 'pozuelo', amenitizId: null, amenitizName: null, from: null },
  'doble-estandar-2-camas': { house: 'pozuelo', amenitizId: null, amenitizName: null, from: null },
  'doble-planta-baja': { house: 'pozuelo', amenitizId: 99295, amenitizName: '6 - Habitación Doble con baño compartido PB', from: 48.6 },
  'familiar-compartido': { house: 'pozuelo', amenitizId: null, amenitizName: null, from: null },
  // Vallarta
  'v1-doble-compartido': { house: 'vallarta', amenitizId: null, amenitizName: null, from: null },
  'v2-doble-compartido': { house: 'vallarta', amenitizId: 148016, amenitizName: '2 - Habitación doble con baño compartido', from: 68.4 },
  'v3-doble-premium': { house: 'vallarta', amenitizId: null, amenitizName: null, from: null },
  'v4-familiar-compartido': { house: 'vallarta', amenitizId: null, amenitizName: null, from: null },
  'v5-familiar-terraza': { house: 'vallarta', amenitizId: null, amenitizName: null, from: null },
  'v6-familiar-compartido': { house: 'vallarta', amenitizId: null, amenitizName: null, from: null },
  'v7-doble-privado': { house: 'vallarta', amenitizId: 148030, amenitizName: '7 - Habitación doble con baño privado', from: 89.55 },
  'v8-doble-privado': { house: 'vallarta', amenitizId: null, amenitizName: null, from: null },
};

/** Precio «desde» de una habitación, o null si no hay dato. */
export function getRoomPrice(roomId: string): number | null {
  return roomPrices[roomId]?.from ?? null;
}

function minOf(values: Array<number | null>): number | null {
  const nums = values.filter((v): v is number => v !== null);
  return nums.length ? Math.min(...nums) : null;
}

/** Mínimo de las habitaciones de una casa con precio; null si ninguna. */
export function getHousePrice(house: HouseId): number | null {
  return minOf(
    Object.values(roomPrices)
      .filter((r) => r.house === house)
      .map((r) => r.from),
  );
}

/** Mínimo global entre todas las habitaciones. */
export function getMinPrice(): number | null {
  return minOf(Object.values(roomPrices).map((r) => r.from));
}

/** Formatea un importe en euros; null devuelve el marcador de posición. */
export function formatPrice(amount: number | null, lang: Lang): string {
  if (amount === null) return PRICE_PLACEHOLDER;
  const d = Number.isInteger(amount) ? 0 : 2;
  return new Intl.NumberFormat(lang === 'en' ? 'en-GB' : 'es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  }).format(amount);
}
