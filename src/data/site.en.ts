// English version of Suki House content (same shape as ./site).
// Prices live in ./prices.ts. [N] / [X] min placeholders are pending business data: kept as is.
import type { Rating, Review, Property, RoomTag, Room } from './site';
import { images } from './site';

export { images, vallartaImages } from './site';
export type { NavKey, Rating, Review, Property, RoomTag, Room } from './site';

const { habAbuhardillada, habAire, habDoblePremium, habFamiliar, habLuminosa, habPlantaBaja, habZocaloFloral, vallartaTerraza } = images;

import vHab1 from '../assets/images/vallarta/hab-1.jpg';
import vHab2 from '../assets/images/vallarta/hab-2.jpg';
import vHab3 from '../assets/images/vallarta/hab-3.jpg';
import vHab4 from '../assets/images/vallarta/hab-4.jpg';
import vHab5 from '../assets/images/vallarta/hab-5.jpg';
import vHab6 from '../assets/images/vallarta/hab-6.jpg';
import vHab7 from '../assets/images/vallarta/hab-7.jpg';
import vHab8 from '../assets/images/vallarta/hab-8.jpg';

export const site = {
  name: 'Suki House',
  tagline: 'rent a room',
  handTagline: 'your place in Madrid',
  description:
    'Double and family rooms with a fully equipped kitchen in Pozuelo de Alarcón and San Blas–Canillejas (Madrid). Book direct for the best price guaranteed.',
  locale: 'en_GB',
  lang: 'en',
  claim: 'Best price guaranteed when you book on this website',
  claimShort: 'Best price guaranteed when you book here',
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
  { label: 'Accommodation', href: '/#alojamientos', key: 'alojamientos' },
  { label: 'Location', href: '/#ubicacion', key: 'ubicacion' },
  { label: 'Reviews', href: '/#opiniones', key: 'opiniones' },
  { label: 'Contact', href: '/#contacto', key: 'contacto' },
] as const;

export const legalLinks = [
  { label: 'Privacy policy', href: '#' },
  { label: 'Legal notice', href: '#' },
  { label: 'Cookies', href: '#' },
];

export const ratings: Rating[] = [
  { score: '8.7', value: 8.7, label: 'Facilities', shortLabel: 'Facilities', source: 'Booking.com' },
  { score: '8.5', value: 8.5, label: 'Location (couples)', shortLabel: 'Location', source: 'Booking.com' },
  { score: '8.4', value: 8.4, label: 'Overall rating', shortLabel: 'Overall', source: 'Expedia' },
];

export const reviews: Review[] = [
  { quote: 'Comfortable place with an equipped kitchen and good shared spaces.', name: 'Miguel', country: 'Peru', source: 'Booking.com' },
  { quote: 'Clean, cosy and spacious rooms, equipped kitchen, a safe and quiet place.', name: 'Manuel', country: 'Costa Rica', source: 'Booking.com' },
  { quote: 'The room was very clean and tidy, and the beds are comfortable.', name: 'Yanely', country: 'Spain', source: 'Booking.com' },
];

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
    summary: 'Quiet chalet with a garden and terrace, a 10-minute walk from the train.',
    bullets: [
      'Chalet in a quiet residential area, with a garden and terrace',
      'A 10-minute walk from Pozuelo station',
      '11 km from the Royal Palace (Palacio Real) and central Madrid',
    ],
    image: habAbuhardillada,
    imageAlt: 'Attic room at Suki House Pozuelo',
    href: '/pozuelo',
    mapQuery: 'Calle Gómez Tejedor 3, 28224 Pozuelo de Alarcón, Madrid',
    distances: [
      { place: 'Pozuelo Cercanías train station', value: '10 min walk' },
      { place: 'Royal Palace (Palacio Real)', value: '11 km' },
      { place: 'Madrid-Barajas Airport', value: '26 km' },
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
    summary: 'Close to the metro (line 5), with quick access to IFEMA and the airport.',
    bullets: [
      'On Calle Puerto Vallarta, close to the metro (line 5)',
      'Quick access to IFEMA and the airport',
      'Double and family rooms, one with a terrace',
    ],
    image: vallartaTerraza,
    imageAlt: 'Room with access to the terrace at Suki House Vallarta',
    href: '/vallarta',
    mapQuery: 'Calle de Puerto Vallarta 68, San Blas-Canillejas, Madrid',
    distances: [
      { place: 'Metro line 5', value: '[X] min walk' },
      { place: 'IFEMA Madrid', value: '[X] min' },
      { place: 'Madrid-Barajas Airport', value: '[X] min' },
    ],
  },
];

/** The 7 rooms at Suki House Pozuelo, in design order. */
export const pozueloRooms: Room[] = [
  {
    id: 'doble-premium',
    name: 'Premium Double with private bathroom',
    description: 'Private bathroom with bath, shower and bidet, plus free toiletries.',
    chips: ['2 people', 'Private bathroom', 'WiFi'],
    homeChips: ['2 people', 'Private bathroom with bath'],
    badge: 'Our most complete room',
    tags: ['privado'],
    image: habDoblePremium,
    imageAlt: 'Premium double room with white headboard and lilac cushions',
    homeImageAlt: 'Premium double room with private bathroom',
    featured: true,
  },
  {
    id: 'familiar-privado',
    name: 'Family room with private bathroom',
    description: 'Space for the whole family, with a private bathroom with shower and toiletries.',
    chips: ['[N] people', 'Private bathroom', 'WiFi'],
    homeChips: ['[N] people', 'Private bathroom with shower'],
    badge: 'Ideal for families',
    tags: ['privado', 'familiar'],
    image: habFamiliar,
    imageAlt: 'Family room with a double bed and a welcome touch',
    homeImageAlt: 'Family room with private bathroom',
    featured: true,
  },
  {
    id: 'doble-aire',
    name: 'Double with air conditioning',
    description: 'Cool in summer, with the shared bathroom right next to the room.',
    chips: ['2 people', 'Air conditioning', 'Shared bathroom'],
    homeChips: ['2 people', 'Shared bathroom next door'],
    tags: ['aire'],
    image: habAire,
    imageAlt: 'Bright attic room with a skylight',
    homeImageAlt: 'Attic double room with air conditioning',
    featured: true,
  },
  {
    id: 'doble-compartido',
    name: 'Double with shared bathroom',
    description: 'Cosy and practical, with the shared bathroom next to the door.',
    chips: ['2 people', 'Shared bathroom', 'WiFi'],
    tags: [],
    image: habZocaloFloral,
    imageAlt: 'Double room with floral skirting and a pink bedspread',
  },
  {
    id: 'doble-estandar-2-camas',
    name: 'Standard Double · 2 beds',
    description: 'Two separate beds, perfect for friends or travelling companions.',
    chips: ['2 people', '2 beds', 'Shared bathroom'],
    tags: [],
    image: habLuminosa,
    imageAlt: 'Bright room with a window onto the trees',
  },
  {
    id: 'doble-planta-baja',
    name: 'Ground-floor double',
    description: 'No stairs, and close to the kitchen and terrace. Shared bathroom.',
    chips: ['2 people', 'Ground floor', 'Shared bathroom'],
    tags: [],
    image: habPlantaBaja,
    imageAlt: 'Ground-floor double room with a wooden console table',
  },
  {
    id: 'familiar-compartido',
    name: 'Family room with shared bathroom',
    description: 'The most affordable option for travelling as a family or small group.',
    chips: ['[N] people', 'Shared bathroom', 'WiFi'],
    tags: ['familiar'],
    image: habAbuhardillada,
    imageAlt: 'Attic family room with a large bed',
  },
];

export const roomFilters: { label: string; tag: RoomTag | 'todas' }[] = [
  { label: 'All', tag: 'todas' },
  { label: 'Private bathroom', tag: 'privado' },
  { label: 'Family rooms', tag: 'familiar' },
  { label: 'Air conditioning', tag: 'aire' },
];

export const bookingPerks = [
  'Best price guaranteed, only on our official website',
  'Instant confirmation and secure payment',
  'Direct contact with us, before and during your stay',
];

export const amenities = [
  { icon: 'train', label: '10-minute walk from Pozuelo Cercanías' },
  { icon: 'kitchen', label: 'Equipped shared kitchen' },
  { icon: 'leaf', label: 'Garden and terrace to unwind' },
  { icon: 'wifi', label: 'Free WiFi throughout the house' },
] as const;

export const homeExtras = [
  'Kitchen with oven, microwave, fridge and dishwasher',
  'Covered terrace with tables and garden views',
  'Bed linen and towels included',
];

export const beforeBooking = [
  { label: 'Check-in', title: 'From 15:00', note: 'Let us know your arrival time' },
  { label: 'Check-out', title: 'Until 11:00', note: 'Ask about luggage storage' },
  { label: 'House rules', title: 'Smoke-free house', note: 'No pets allowed' },
  { label: 'Cancellation', title: '[Your policy]', note: '[Free cancellation window]' },
];

export const includedEverywhere = [
  'Free WiFi',
  'Bed linen and towels',
  'Equipped shared kitchen',
  'Garden and terrace',
  'Coffee maker and kettle',
];

export const guestOptions = ['1 guest', '2 guests', '3 guests', '4 guests'];

/** The 8 rooms at Suki House Vallarta. */
export const vallartaRooms: Room[] = [
  {
    id: 'v1-doble-compartido',
    name: 'Room 1 · Double with shared bathroom',
    description: 'Comfortable accommodation for two, with TV, wardrobe and shared bathroom.',
    chips: ['2 people', '1 double bed', 'Shared bathroom'],
    tags: [],
    image: vHab1,
    imageAlt: 'Double room with wooden wardrobe, air conditioning and wooden floor',
  },
  {
    id: 'v2-doble-compartido',
    name: 'Room 2 · Double with shared bathroom',
    description: 'Practical, cosy stay with its own fridge in the room and a shared bathroom.',
    chips: ['2 people', '1 double bed', 'Fridge'],
    tags: [],
    image: vHab2,
    imageAlt: 'Bedroom with a double bed, television and a window with city views',
  },
  {
    id: 'v3-doble-premium',
    name: 'Room 3 · Premium Double with private bathroom',
    description: 'More comfort, with an exclusive private bathroom with jacuzzi, a fridge and a sofa bed for a third person.',
    chips: ['Up to 3 people', 'Double bed + sofa bed', 'Private bathroom with jacuzzi'],
    badge: 'Our most complete room',
    tags: ['privado'],
    image: vHab3,
    imageAlt: 'Spacious room with a seating area, wooden floor and city views',
  },
  {
    id: 'v4-familiar-compartido',
    name: 'Room 4 · Family room with shared bathroom',
    description: 'Spacious room ideal for families, with one double bed and two single beds.',
    chips: ['4 people', '1 double + 2 single beds', 'Shared bathroom'],
    badge: 'Ideal for families',
    tags: ['familiar'],
    image: vHab4,
    imageAlt: 'Family room with a bed, television and minimalist decor',
  },
  {
    id: 'v5-familiar-terraza',
    name: 'Room 5 · Family room with terrace and shared bathroom',
    description: 'Family room with a private terrace, a double bed and a bunk bed.',
    chips: ['4 people', 'Double bed + bunk bed', 'Private terrace'],
    badge: 'With terrace',
    tags: ['familiar', 'terraza'],
    image: vHab5,
    imageAlt: 'Bedroom with a double bed, wooden headboard and a window with a blue frame',
  },
  {
    id: 'v6-familiar-compartido',
    name: 'Room 6 · Family room with shared bathroom',
    description: 'Comfortable family option for up to five people, with a double bed, a sofa bed and two single beds.',
    chips: ['5 people', '1 double + sofa bed + 2 single beds', 'Shared bathroom'],
    tags: ['familiar'],
    image: vHab6,
    imageAlt: 'Family room with bunk beds, a double bed and modern decor',
  },
  {
    id: 'v7-doble-privado',
    name: 'Room 7 · Double with private bathroom',
    description: 'A private retreat for two, with its own bathroom.',
    chips: ['2 people', '1 double bed', 'Private bathroom'],
    tags: ['privado'],
    image: vHab7,
    imageAlt: 'Bedroom with a white bed, grey pillows and a bedside lamp',
  },
  {
    id: 'v8-doble-privado',
    name: 'Room 8 · Double with private bathroom',
    description: 'Cosy room with an exclusive private bathroom.',
    chips: ['2 people', '1 double bed', 'Private bathroom'],
    tags: ['privado'],
    image: vHab8,
    imageAlt: 'Bright bedroom with a wooden headboard and a window with shutters',
  },
];

export const vallartaFilters: { label: string; tag: RoomTag | 'todas' }[] = [
  { label: 'All', tag: 'todas' },
  { label: 'Private bathroom', tag: 'privado' },
  { label: 'Family rooms', tag: 'familiar' },
  { label: 'With terrace', tag: 'terraza' },
];

export const vallartaIncluded = [
  'Free WiFi',
  'TV in the room',
  'Wardrobe',
  'Close to Metro line 5',
  'Quick access to the airport and IFEMA',
];
