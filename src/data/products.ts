// Product page content — every feature and number is from the approved Master File.
export interface Product {
  slug: string; name: string; accent: string; tone: string; logo: string;
  seoTitle: string; seoDesc: string;
  kicker: string; h1: string; lead: string;
  forList: string[]; problem: string;
  features: { h: string; p: string }[];
  platform: string; platformNote?: string;
  price: string; priceNote: string; renewal: string;
  desktop: { src: string; alt: string }[];
  mobile: { src: string; alt: string }[];
  faq: [string, string][];
  track: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: 'oxpos', name: 'OxPOS', accent: '#DF7F36', tone: 'ox', logo: '/img/oxpos-logo.webp',
    seoTitle: 'OxPOS | Retail POS & Inventory Software in Dubai, UAE | MarkZone',
    seoDesc: 'OxPOS is retail management software for UAE shops: fast POS, inventory, purchases, expenses, salaries, consignment and VAT reports. 1,500 AED with the first year included.',
    kicker: 'Retail management',
    h1: 'Run your whole shop from one system',
    lead: 'OxPOS brings your sales, stock, purchases, expenses and salaries into one place, with the reports to see exactly where your money goes.',
    forList: ['Supermarkets', 'Garment & fashion stores', 'Cosmetics & makeup shops', 'Consignment & multi-vendor stores'],
    problem: 'In most shops, inventory lives in one place, purchases in another, and salaries and expenses somewhere else. Nobody sees the full picture until it is too late. OxPOS puts it all in one system, with dedicated reports for each part of the business.',
    features: [
      { h: 'Fast point of sale', p: 'Barcode scanning, split payments, parked sales, returns, and item or invoice discounts.' },
      { h: 'Full inventory control', p: 'Low-stock alerts, expiry tracking, size and color variants, and weighed products.' },
      { h: 'Purchases & suppliers', p: 'Purchase invoices, supplier records and supplier reports.' },
      { h: 'Expenses & salaries', p: 'Track running costs and staff salaries in the same system as your sales.' },
      { h: 'Consignment module', p: 'Built for stores hosting home businesses and small vendors.' },
      { h: 'Shift & cash control', p: 'Opening and closing cash, expected vs. actual, and end-of-day reports.' },
      { h: 'Reports that answer questions', p: 'Sales by item, employee and receipt; P&L; VAT; stock value; payment types. Export to PDF or Excel.' },
      { h: 'Multi-branch', p: 'Manage several branches with staff roles and permissions.' },
      { h: 'Customer accounts', p: 'Customer balances and full purchase history.' },
      { h: 'Arabic & English', p: 'Thermal receipts plus a custom label and invoice designer.' },
    ],
    platform: 'Runs fully on Windows, and the web app lets you manage the business from any device.',
    price: '1,500', priceNote: 'Includes first-year maintenance', renewal: 'then 500 AED / year',
    desktop: [
      { src: '/img/screens/oxpos-inventory.webp', alt: 'OxPOS inventory management with stock value, low-stock and out-of-stock counts' },
      { src: '/img/screens/oxpos-reorder.webp', alt: 'OxPOS reorder screen with low-stock suggestions' },
      { src: '/img/screens/oxpos-purchases.webp', alt: 'OxPOS purchase management and supplier invoices' },
      { src: '/img/screens/oxpos-employees.webp', alt: 'OxPOS employee management with payroll and advances' },
    ],
    mobile: [
      { src: '/img/screens/oxpos-inventory-m.webp', alt: 'OxPOS inventory on a phone' },
      { src: '/img/screens/oxpos-consignment-m.webp', alt: 'OxPOS consignment delivery notes on a phone' },
      { src: '/img/screens/oxpos-reorder-m.webp', alt: 'OxPOS reorder suggestions on a phone' },
    ],
    faq: [
      ['How much does OxPOS cost?', 'OxPOS is 1,500 AED, which includes the first year of maintenance. After that, the renewal is 500 AED per year.'],
      ['What kind of shops is OxPOS for?', 'Any retail shop, including supermarkets, garment and fashion stores, cosmetics and makeup shops, and consignment or multi-vendor stores.'],
      ['Can OxPOS handle consignment stock?', 'Yes. OxPOS has a consignment module for stores that host home businesses and small vendors.'],
      ['Does OxPOS support more than one branch?', 'Yes. You can run multiple branches, with staff roles and permissions for each.'],
      ['Are the reports VAT-ready?', 'Yes. OxPOS includes VAT reports alongside sales, P&L, stock value and payment-type reports, all exportable to PDF or Excel.'],
      ['How fast can we start?', 'Most shops are running the same day. Setup takes between 45 minutes and 2 hours, and we can migrate your items from Excel where available.'],
    ],
    track: '12+ shops within about 6 months of launch.',
  },
  {
    slug: 'zainaapp', name: 'ZainaApp', accent: '#B8862F', tone: 'zaina', logo: '/img/zaina-logo.webp',
    seoTitle: 'ZainaApp | Salon & Spa Management Software in Dubai, UAE | MarkZone',
    seoDesc: 'ZainaApp is salon and spa software for the UAE: appointments, online booking, WhatsApp notifications, staff commissions, POS and reports. 1,500 AED with the first year included.',
    kicker: 'Salon & spa management',
    h1: 'A calmer salon, from booking to commission',
    lead: 'ZainaApp organizes your appointments, clients and staff, and works out every commission for you, so the day runs smoothly and month end is simple.',
    forList: ["Ladies' salons", 'Barbershops', 'Spas', 'Beauty lounges'],
    problem: 'Appointment books get messy, walk-ins get lost, and staff commissions on services and products are hard to track fairly. ZainaApp keeps bookings, clients and commissions in one organized system.',
    features: [
      { h: 'Appointments', p: 'Calendar view, walk-ins and real-time booking alerts.' },
      { h: 'Online booking page', p: 'Every salon gets its own page where clients choose the service and staff member, book, and rate staff.' },
      { h: 'WhatsApp notifications', p: 'Booking notifications go out automatically on WhatsApp.' },
      { h: 'Client profiles', p: 'Full visit history for every client.' },
      { h: 'Services, packages & gift cards', p: 'Set up your menu the way you sell it.' },
      { h: 'Staff & HR', p: 'Attendance, performance, commissions on services and products, and warnings.' },
      { h: 'POS checkout', p: 'Checkout with sequential invoice numbers.' },
      { h: 'Inventory & purchases', p: 'Track the products you use and sell in the salon.' },
      { h: 'Reports', p: 'Sales, end-of-day, employee performance and commission reports.' },
      { h: 'Arabic & English', p: 'Bilingual app with thermal receipt printing.' },
    ],
    platform: 'Runs on Windows, and the web app lets you manage the salon from any device.',
    price: '1,500', priceNote: 'Includes first-year maintenance', renewal: 'then 500 AED / year',
    desktop: [
      { src: '/img/screens/zaina-appointments.webp', alt: 'ZainaApp staff and appointments calendar' },
      { src: '/img/screens/zaina-services.webp', alt: 'ZainaApp services management' },
      { src: '/img/screens/zaina-eod-report.webp', alt: 'ZainaApp end-of-day report' },
    ],
    mobile: [],
    faq: [
      ['How much does ZainaApp cost?', 'ZainaApp is 1,500 AED, which includes the first year of maintenance. After that, the renewal is 500 AED per year.'],
      ['Can clients book online?', 'Yes. Every salon gets its own online booking page where clients choose a service and a staff member, book, and rate the staff.'],
      ['Does ZainaApp send WhatsApp notifications?', 'Yes. Booking notifications are sent automatically on WhatsApp.'],
      ['Can it calculate staff commissions?', 'Yes. ZainaApp tracks commissions on both services and products, alongside attendance and performance.'],
      ['Is it only for ladies’ salons?', 'No. ZainaApp works for ladies’ salons, barbershops, spas, beauty lounges and similar beauty businesses.'],
    ],
    track: '2 salons within about 2 months of launch.',
  },
  {
    slug: 'texpos', name: 'TexPOS', accent: '#BF9B30', tone: 'tex', logo: '/img/texpos-logo.webp',
    seoTitle: 'TexPOS | Tailoring Shop Management App in the UAE | MarkZone',
    seoDesc: 'TexPOS is a tailoring shop app for the UAE: saved measurements including shaila and ghutra, job orders to the tailor on WhatsApp, deposits and fabric stock. 1,000 AED first year.',
    kicker: 'Bespoke tailoring management',
    h1: 'Every measurement, every order, in one place',
    lead: 'TexPOS keeps measurements and order details together from the counter to the tailor, so mistakes and remakes stop costing you.',
    forList: ['Custom tailoring', 'Ready-made items', 'Alterations'],
    problem: 'Measurements and order details get lost between the counter and the tailor. That means mistakes, remakes and unhappy customers. TexPOS saves every detail with the order and sends it straight to the tailor.',
    features: [
      { h: 'Easy order screen', p: 'Simple enough for any staff member to use.' },
      { h: 'Custom or ready-made orders', p: 'Fabric, model, lining, buttons and size on every order.' },
      { h: 'Saved measurements', p: 'Customer measurements are saved, including shaila and ghutra.' },
      { h: 'Job orders to the tailor', p: 'Job orders with a sketch, printed or sent to the tailor’s WhatsApp.' },
      { h: 'Invoices', p: 'Send invoices by print or on WhatsApp.' },
      { h: 'Payments & deposits', p: 'Partial payments, deposits, overdue tracking and payment history.' },
      { h: 'Inventory', p: 'Fabric by the meter and items by the piece, with low-stock alerts.' },
      { h: 'Purchases & expenses', p: 'Keep costs in the same app as your sales.' },
      { h: 'Customer source tracking', p: 'See which channel each customer came from.' },
      { h: 'Reports', p: 'Sales reports, including payment-gateway fees, visible only to you and never to the customer.' },
      { h: 'Multi-branch', p: 'Staff permissions, several branches, Arabic & English.' },
    ],
    platform: 'Runs on the shop’s own phone, so no hardware is needed.',
    price: '1,000', priceNote: 'First year', renewal: 'then 500 AED / year',
    desktop: [],
    mobile: [
      { src: '/img/screens/texpos-measurements-m.webp', alt: 'TexPOS saved customer measurements with body diagram' },
      { src: '/img/screens/texpos-inventory-m.webp', alt: 'TexPOS tailoring inventory with fabric and models' },
      { src: '/img/screens/texpos-reports-m.webp', alt: 'TexPOS sales reports' },
      { src: '/img/screens/texpos-menu-m.webp', alt: 'TexPOS main menu' },
    ],
    faq: [
      ['How much does TexPOS cost?', 'TexPOS is 1,000 AED for the first year, then 500 AED per year.'],
      ['Do I need a computer or special hardware?', 'No. TexPOS runs on the shop’s own phone, so no hardware is needed.'],
      ['Can TexPOS save shaila and ghutra measurements?', 'Yes. Customer measurements are saved, including shaila and ghutra.'],
      ['How do orders reach the tailor?', 'Each job order includes a sketch and can be printed or sent to the tailor’s WhatsApp.'],
      ['Can customers pay a deposit?', 'Yes. TexPOS handles deposits, partial payments, overdue tracking and payment history.'],
    ],
    track: 'Live in its first shop, with more expected soon.',
  },
];
