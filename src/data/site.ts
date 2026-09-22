// Single source for public company facts — mirrors the approved Master File.
export const SITE = {
  name: 'MarkZone Technology',
  url: 'https://markzonetech.com',
  tagline: 'Organize your business. Grow your sales.',
  taglineAr: 'نظّم شغلك.. وكبّر مبيعاتك',
  phone: '+971 50 655 2181',
  phoneHref: 'tel:+971506552181',
  whatsapp: 'https://wa.me/971506552181',
  email: 'fadi.abouzoor@markzonetech.com',
  instagram: 'https://www.instagram.com/markzone.ae',
  instagramHandle: '@markzone.ae',
  address: { street: 'Office 188-101, Naif, Deira', city: 'Dubai', country: 'AE' },
  hours: 'Daily 10 AM – 10 PM · Sunday off',
  credentials: 'DED Licence No. 1574303 · Mohammed Bin Rashid Establishment for SME Development — Member',
  googleRating: { value: '4.4', count: 21 },
  googleMaps: 'https://maps.app.goo.gl/su4aQJoSjxrueqig9',
};

export const APPS = [
  {
    slug: 'oxpos', name: 'OxPOS', logo: '/img/oxpos-logo.webp', icon: '/img/oxpos-logo.webp', shot: '/img/screens/oxpos-products.webp', shotAlt: 'OxPOS products screen with stock levels and prices', accent: '#DF7F36', tone: 'ox',
    for: 'Retail shops',
    who: 'Supermarkets, fashion & garment stores, cosmetics shops and consignment stores.',
    problem: 'Inventory, purchases, salaries and expenses scattered everywhere. OxPOS puts them in one place, with the reports to match.',
    features: ['Fast point of sale with barcode scanning, split payments and returns', 'Full inventory control with low-stock and expiry alerts', 'Consignment module for stores hosting small vendors', 'Multi-branch with staff roles and permissions'],
    platform: 'Runs on Windows, managed from any device on the web.',
    price: '1,500', priceNote: 'Includes first-year maintenance', renewal: 'then 500 AED / year',
  },
  {
    slug: 'zainaapp', name: 'ZainaApp', logo: '/img/zaina-logo.webp', icon: '/img/zaina-icon.webp', shot: '/img/screens/zaina-appointments.webp', shotAlt: 'ZainaApp appointments calendar', accent: '#B8862F', tone: 'zaina',
    for: 'Salons & spas',
    who: "Ladies' salons, barbershops, spas and beauty lounges.",
    problem: 'Messy appointment books and staff commissions nobody can track. ZainaApp organizes both.',
    features: ['Appointments calendar with walk-ins and live booking alerts', 'Online booking page for every salon', 'Automatic WhatsApp booking notifications', 'Staff commissions, attendance and performance'],
    platform: 'Runs on Windows, managed from any device on the web.',
    price: '1,500', priceNote: 'Includes first-year maintenance', renewal: 'then 500 AED / year',
  },
  {
    slug: 'texpos', name: 'TexPOS', logo: '/img/texpos-logo.webp', icon: '/img/texpos-icon.webp', shot: '/img/screens/texpos-measurements-m.webp', shotAlt: 'TexPOS saved customer measurements on a phone', accent: '#BF9B30', tone: 'tex',
    for: 'Tailoring shops',
    who: 'Custom tailoring, ready-made items and alterations.',
    problem: 'Measurements and order details get lost between the counter and the tailor. TexPOS keeps every detail with the order.',
    features: ['Saved customer measurements, including shaila and ghutra', 'Job orders with sketch, printed or sent to the tailor on WhatsApp', 'Deposits, partial payments and overdue tracking', 'Fabric by the meter, items by the piece'],
    platform: "Runs on the shop's own phone. No hardware needed.",
    price: '1,000', priceNote: 'First year', renewal: 'then 500 AED / year',
  },
];
