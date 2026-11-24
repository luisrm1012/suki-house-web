// Contenido de Suki House (copy literal del diseño).
// Los precios están en ./prices.ts. Los marcadores [N] / [X] min son datos pendientes del negocio: se mantienen tal cual.
import type { ImageMetadata } from 'astro';

import entrada from '../assets/images/entrada.jpg';
import bancoEntrada from '../assets/images/banco-entrada.jpg';
import habAire from '../assets/images/hab-aire.jpg';
import habAbuhardillada from '../assets/images/hab-abuhardillada.jpg';
import habDoblePremium from '../assets/images/hab-doble-premium.jpg';
import vallartaTerraza from '../assets/images/vallarta-terraza.jpg';
import habLuminosa from '../assets/images/hab-luminosa.jpg';
import habZocaloFloral from '../assets/images/hab-zocalo-floral.jpg';
import habFamiliar from '../assets/images/hab-familiar.jpg';
import habPlantaBaja from '../assets/images/hab-planta-baja.jpg';
import terraza from '../assets/images/terraza.jpg';
import cocina from '../assets/images/cocina.jpg';
import jardin from '../assets/images/jardin.jpg';
import logo from '../assets/images/logo.jpg';

// Suki House Vallarta (fotos de sukihouse.es)
import vGaleria1 from '../assets/images/vallarta/galeria-1.jpg';
import vGaleria2 from '../assets/images/vallarta/galeria-2.jpg';
import vGaleria3 from '../assets/images/vallarta/galeria-3.jpg';
import vGaleria4 from '../assets/images/vallarta/galeria-4.jpg';
import vGaleria5 from '../assets/images/vallarta/galeria-5.jpg';
import vHab1 from '../assets/images/vallarta/hab-1.jpg';
import vHab2 from '../assets/images/vallarta/hab-2.jpg';
import vHab3 from '../assets/images/vallarta/hab-3.jpg';
import vHab4 from '../assets/images/vallarta/hab-4.jpg';
import vHab5 from '../assets/images/vallarta/hab-5.jpg';
import vHab5Terraza from '../assets/images/vallarta/hab-5-terraza.jpg';
import vHab6 from '../assets/images/vallarta/hab-6.jpg';
import vHab7 from '../assets/images/vallarta/hab-7.jpg';
import vHab8 from '../assets/images/vallarta/hab-8.jpg';

export const images = {
  entrada,
  bancoEntrada,
  habAire,
  habAbuhardillada,
  habDoblePremium,
  vallartaTerraza,
  habLuminosa,
  habZocaloFloral,
  habFamiliar,
  habPlantaBaja,
  terraza,
  cocina,
  jardin,
  logo,
} satisfies Record<string, ImageMetadata>;

export const vallartaImages = {
  galeria1: vGaleria1,
  galeria2: vGaleria2,
  galeria3: vGaleria3,
  galeria4: vGaleria4,
  galeria5: vGaleria5,
  hab5Terraza: vHab5Terraza,
} satisfies Record<string, ImageMetadata>;

export const site = {
  name: 'Suki House',
  tagline: 'rent a room',
  handTagline: 'your place in Madrid',
  description:
    'Habitaciones dobles y familiares con cocina equipada en Pozuelo de Alarcón y San Blas–Canillejas (Madrid). Reserva directa con el mejor precio garantizado.',
  locale: 'es_ES',
  lang: 'es',
  claim: 'Mejor precio garantizado reservando en esta web',
  claimShort: 'Mejor precio garantizado reservando aquí',
  phones: [
    { label: '+34 680 257 954', href: 'tel:+34680257954', e164: '+34680257954' },
    { label: '+34 669 870 564', href: 'tel:+34669870564', e164: '+34669870564' },
  ],
  email: 'sukihousechalet1@gmail.com',
  whatsapp: { label: 'WhatsApp · 680 257 954', href: 'https://wa.me/34680257954' },
  checkIn: '15:00',
  checkOut: '11:00',
  year: 2026,
};

export const nav = [
  { label: 'Alojamientos', href: '/#alojamientos', key: 'alojamientos' },
  { label: 'Ubicación', href: '/#ubicacion', key: 'ubicacion' },
  { label: 'Opiniones', href: '/#opiniones', key: 'opiniones' },
  { label: 'Contacto', href: '/#contacto', key: 'contacto' },
] as const;

export type NavKey = (typeof nav)[number]['key'];

export const legalLinks = [
  { label: 'Política de privacidad', href: '#' },
  { label: 'Aviso legal', href: '#' },
  { label: 'Cookies', href: '#' },
];

export interface Rating {
  score: string;     // formato español: "8,7"
  value: number;     // 8.7 (para JSON-LD)
  label: string;
  shortLabel: string;
  source: 'Booking.com' | 'Expedia';
}

export const ratings: Rating[] = [
  { score: '8,7', value: 8.7, label: 'Instalaciones', shortLabel: 'Instalaciones', source: 'Booking.com' },
  { score: '8,5', value: 8.5, label: 'Ubicación (parejas)', shortLabel: 'Ubicación', source: 'Booking.com' },
  { score: '8,4', value: 8.4, label: 'Valoración global', shortLabel: 'Global', source: 'Expedia' },
];

export interface Review {
  quote: string;
  name: string;
  country: string;
  source: string;
}

export const reviews: Review[] = [
  { quote: 'Lugar cómodo con cocina equipada, buenos espacios comunes.', name: 'Miguel', country: 'Perú', source: 'Booking.com' },
  { quote: 'Habitaciones limpias, acogedoras y amplias, cocina equipada, lugar seguro y tranquilo.', name: 'Manuel', country: 'Costa Rica', source: 'Booking.com' },
  { quote: 'La habitación muy limpia y bien ordenada, las camas son cómodas.', name: 'Yanely', country: 'España', source: 'Booking.com' },
];

export interface Property {
  id: 'pozuelo' | 'vallarta';
  name: string;
  area: string;
  rooms: number;
  street: string;
  postalCode: string;
  locality: string;
  region: string;
  addressLines: [string, string];
  summary: string;      // versión corta (móvil)
  bullets: string[];
  image: ImageMetadata;
  imageAlt: string;
  href: string;         // página de habitaciones
  mapQuery: string;     // búsqueda para Google Maps (embed y "Cómo llegar")
  distances: { place: string; value: string }[];
}

export const properties: Property[] = [
  {
    id: 'pozuelo',
    name: 'Suki House Pozuelo',
    area: 'Pozuelo de Alarcón',
    rooms: 7,
    street: 'Gómez Tejedor, 3, Chalet 1',
    postalCode: '28224',
    locality: 'Pozuelo de Alarcón',
    region: 'Madrid',
    addressLines: ['Gómez Tejedor, 3, Chalet 1', '28224 Pozuelo de Alarcón'],
    summary: 'Chalet tranquilo con jardín y terraza, a 10 minutos a pie del tren.',
    bullets: [
      'Chalet en zona residencial tranquila, con jardín y terraza',
      'A 10 minutos a pie de la estación de Pozuelo',
      'A 11 km del Palacio Real y el centro de Madrid',
    ],
    image: habAbuhardillada,
    imageAlt: 'Habitación abuhardillada de Suki House Pozuelo',
    href: '/pozuelo',
    mapQuery: 'Calle Gómez Tejedor 3, 28224 Pozuelo de Alarcón, Madrid',
    distances: [
      { place: 'Estación de Cercanías Pozuelo', value: '10 min a pie' },
      { place: 'Palacio Real', value: '11 km' },
      { place: 'Aeropuerto Madrid-Barajas', value: '26 km' },
    ],
  },
  {
    id: 'vallarta',
    name: 'Suki House Vallarta',
    area: 'Madrid · San Blas–Canillejas',
    rooms: 8,
    street: 'Puerto Vallarta, 68',
    postalCode: '',
    locality: 'Madrid',
    region: 'Madrid',
    addressLines: ['Puerto Vallarta, 68', 'San Blas–Canillejas, Madrid'],
    summary: 'Cerca del metro (línea 5), con acceso rápido a IFEMA y al aeropuerto.',
    bullets: [
      'En la calle Puerto Vallarta, cerca del metro (línea 5)',
      'Acceso rápido a IFEMA y al aeropuerto',
      'Habitaciones dobles y familiares, una con terraza',
    ],
    image: vallartaTerraza,
    imageAlt: 'Habitación con salida a la terraza en Suki House Vallarta',
    href: '/vallarta',
    mapQuery: 'Calle de Puerto Vallarta 68, San Blas-Canillejas, Madrid',
    distances: [
      { place: 'Metro línea 5', value: '[X] min a pie' },
      { place: 'IFEMA Madrid', value: '[X] min' },
      { place: 'Aeropuerto Madrid-Barajas', value: '[X] min' },
    ],
  },
];

export type RoomTag = 'privado' | 'familiar' | 'aire' | 'terraza';

export interface Room {
  id: string;
  name: string;
  description: string;
  chips: string[];          // chips en el listado de /pozuelo
  homeChips?: string[];     // chips en la tarjeta compacta del Home
  badge?: string;
  tags: RoomTag[];          // para los filtros
  image: ImageMetadata;
  imageAlt: string;
  featured?: boolean;       // aparece en "Habitaciones para cada plan"
  homeImageAlt?: string;
}

/** Las 7 habitaciones de Suki House Pozuelo, en el orden del diseño. */
export const pozueloRooms: Room[] = [
  {
    id: 'doble-premium',
    name: 'Doble Premium con baño privado',
    description: 'Baño propio con bañera, ducha y bidé, y artículos de aseo gratuitos.',
    chips: ['2 personas', 'Baño privado', 'WiFi'],
    homeChips: ['2 personas', 'Baño privado con bañera'],
    badge: 'La más completa',
    tags: ['privado'],
    image: habDoblePremium,
    imageAlt: 'Habitación doble premium con cabecero blanco y cojines lila',
    homeImageAlt: 'Habitación doble premium con baño privado',
    featured: true,
  },
  {
    id: 'familiar-privado',
    name: 'Familiar con baño privado',
    description: 'Espacio para toda la familia con baño propio con ducha y artículos de aseo.',
    chips: ['[N] personas', 'Baño privado', 'WiFi'],
    homeChips: ['[N] personas', 'Baño privado con ducha'],
    badge: 'Ideal para familias',
    tags: ['privado', 'familiar'],
    image: habFamiliar,
    imageAlt: 'Habitación familiar con cama doble y detalle de bienvenida',
    homeImageAlt: 'Habitación familiar con baño privado',
    featured: true,
  },
  {
    id: 'doble-aire',
    name: 'Doble con aire acondicionado',
    description: 'Fresca en verano, con el baño compartido justo al lado de la habitación.',
    chips: ['2 personas', 'Aire acondicionado', 'Baño compartido'],
    homeChips: ['2 personas', 'Baño compartido contiguo'],
    tags: ['aire'],
    image: habAire,
    imageAlt: 'Habitación abuhardillada luminosa con claraboya',
    homeImageAlt: 'Habitación doble abuhardillada con aire acondicionado',
    featured: true,
  },
  {
    id: 'doble-compartido',
    name: 'Doble con baño compartido',
    description: 'Acogedora y práctica, con el baño compartido junto a la puerta.',
    chips: ['2 personas', 'Baño compartido', 'WiFi'],
    tags: [],
    image: habZocaloFloral,
    imageAlt: 'Habitación doble con zócalo floral y colcha rosa',
  },
  {
    id: 'doble-estandar-2-camas',
    name: 'Doble Estándar · 2 camas',
    description: 'Dos camas separadas, perfecta para amigos o compañeros de viaje.',
    chips: ['2 personas', '2 camas', 'Baño compartido'],
    tags: [],
    image: habLuminosa,
    imageAlt: 'Habitación luminosa con ventana a los árboles',
  },
  {
    id: 'doble-planta-baja',
    name: 'Doble en planta baja',
    description: 'Sin escaleras y cerca de la cocina y la terraza. Baño compartido.',
    chips: ['2 personas', 'Planta baja', 'Baño compartido'],
    tags: [],
    image: habPlantaBaja,
    imageAlt: 'Habitación doble en planta baja con consola de madera',
  },
  {
    id: 'familiar-compartido',
    name: 'Familiar con baño compartido',
    description: 'La opción más económica para viajar en familia o en grupo pequeño.',
    chips: ['[N] personas', 'Baño compartido', 'WiFi'],
    tags: ['familiar'],
    image: habAbuhardillada,
    imageAlt: 'Habitación familiar abuhardillada con cama grande',
  },
];

export const roomFilters: { label: string; tag: RoomTag | 'todas' }[] = [
  { label: 'Todas', tag: 'todas' },
  { label: 'Baño privado', tag: 'privado' },
  { label: 'Familiares', tag: 'familiar' },
  { label: 'Aire acondicionado', tag: 'aire' },
];

export const bookingPerks = [
  'El mejor precio garantizado, solo en nuestra web oficial',
  'Confirmación inmediata y pago seguro',
  'Trato directo con nosotros, antes y durante la estancia',
];

export const amenities = [
  { icon: 'train', label: 'A 10 min a pie de Cercanías Pozuelo' },
  { icon: 'kitchen', label: 'Cocina equipada de uso compartido' },
  { icon: 'leaf', label: 'Jardín y terraza para desconectar' },
  { icon: 'wifi', label: 'WiFi gratis en toda la casa' },
] as const;

export const homeExtras = [
  'Cocina con horno, microondas, nevera y lavavajillas',
  'Terraza cubierta con mesas y vistas al jardín',
  'Ropa de cama y toallas incluidas',
];

export const beforeBooking = [
  { label: 'Entrada', title: 'Desde las 15:00', note: 'Avísanos de tu hora de llegada' },
  { label: 'Salida', title: 'Hasta las 11:00', note: 'Consulta la consigna de equipaje' },
  { label: 'Normas', title: 'Casa sin humo', note: 'No se admiten mascotas' },
  { label: 'Cancelación', title: '[Tu política]', note: '[Plazo de cancelación gratuita]' },
];

export const includedEverywhere = [
  'WiFi gratis',
  'Ropa de cama y toallas',
  'Cocina equipada compartida',
  'Jardín y terraza',
  'Cafetera y hervidor',
];

export const guestOptions = ['1 huésped', '2 huéspedes', '3 huéspedes', '4 huéspedes'];

/** Las 8 habitaciones de Suki House Vallarta (datos de sukihouse.es). */
export const vallartaRooms: Room[] = [
  {
    id: 'v1-doble-compartido',
    name: 'Habitación 1 · Doble con baño compartido',
    description: 'Alojamiento cómodo para dos personas, con TV, armario y baño compartido.',
    chips: ['2 personas', '1 cama doble', 'Baño compartido'],
    tags: [],
    image: vHab1,
    imageAlt: 'Habitación doble con armario de madera, aire acondicionado y suelo de madera',
  },
  {
    id: 'v2-doble-compartido',
    name: 'Habitación 2 · Doble con baño compartido',
    description: 'Estancia práctica y acogedora, con nevera propia en la habitación y baño compartido.',
    chips: ['2 personas', '1 cama doble', 'Nevera'],
    tags: [],
    image: vHab2,
    imageAlt: 'Dormitorio con cama doble, televisión y ventana con vistas a la ciudad',
  },
  {
    id: 'v3-doble-premium',
    name: 'Habitación 3 · Doble Premium con baño privado',
    description: 'Mayor confort con baño privado exclusivo con jacuzzi, nevera y sofá cama para una tercera persona.',
    chips: ['Hasta 3 personas', 'Cama doble + sofá cama', 'Baño privado con jacuzzi'],
    badge: 'La más completa',
    tags: ['privado'],
    image: vHab3,
    imageAlt: 'Habitación amplia con zona de estar, suelo de madera y vistas a la ciudad',
  },
  {
    id: 'v4-familiar-compartido',
    name: 'Habitación 4 · Familiar con baño compartido',
    description: 'Espacio amplio ideal para familias, con una cama doble y dos individuales.',
    chips: ['4 personas', '1 doble + 2 individuales', 'Baño compartido'],
    badge: 'Ideal para familias',
    tags: ['familiar'],
    image: vHab4,
    imageAlt: 'Habitación familiar con cama, televisión y decoración minimalista',
  },
  {
    id: 'v5-familiar-terraza',
    name: 'Habitación 5 · Familiar con terraza y baño compartido',
    description: 'Habitación familiar con terraza privada, cama doble y litera.',
    chips: ['4 personas', 'Cama doble + litera', 'Terraza privada'],
    badge: 'Con terraza',
    tags: ['familiar', 'terraza'],
    image: vHab5,
    imageAlt: 'Dormitorio con cama de matrimonio, cabecero de madera y ventana con marco azul',
  },
  {
    id: 'v6-familiar-compartido',
    name: 'Habitación 6 · Familiar con baño compartido',
    description: 'Opción familiar cómoda para hasta cinco personas, con cama doble, sofá cama y dos camas individuales.',
    chips: ['5 personas', '1 doble + sofá cama + 2 individuales', 'Baño compartido'],
    tags: ['familiar'],
    image: vHab6,
    imageAlt: 'Habitación familiar con literas, cama de matrimonio y decoración moderna',
  },
  {
    id: 'v7-doble-privado',
    name: 'Habitación 7 · Doble con baño privado',
    description: 'Descanso privado para dos personas, con su propio baño.',
    chips: ['2 personas', '1 cama doble', 'Baño privado'],
    tags: ['privado'],
    image: vHab7,
    imageAlt: 'Dormitorio con cama blanca, almohadas grises y lámpara de noche',
  },
  {
    id: 'v8-doble-privado',
    name: 'Habitación 8 · Doble con baño privado',
    description: 'Habitación acogedora con baño privado exclusivo.',
    chips: ['2 personas', '1 cama doble', 'Baño privado'],
    tags: ['privado'],
    image: vHab8,
    imageAlt: 'Dormitorio luminoso con cabecero de madera y ventana con contraventanas',
  },
];

export const vallartaFilters: { label: string; tag: RoomTag | 'todas' }[] = [
  { label: 'Todas', tag: 'todas' },
  { label: 'Baño privado', tag: 'privado' },
  { label: 'Familiares', tag: 'familiar' },
  { label: 'Con terraza', tag: 'terraza' },
];

export const vallartaIncluded = [
  'WiFi gratis',
  'TV en la habitación',
  'Armario',
  'Cerca del Metro línea 5',
  'Acceso rápido al aeropuerto e IFEMA',
];
