// Landing pages for target searches. Every fact comes from the approved Master File
// (see products.ts / products.ar.ts). Arabic is Emirati dialect.
export interface LandingCopy {
  title: string; desc: string;
  eyebrow: string; h1: string; lead: string;
  h2: string; body: string[];
  points: [string, string][];
  faq: [string, string][]; faqTitle: string;
  crumb: string; parent?: { label: string; href: string };
  timelineLabel: string; timeline: string; price: string; waText: string;
  ctaTitle: string; ctaText: string;
  schemaName: string;
}
export interface Landing {
  path: string; kind: 'app' | 'service' | 'soon';
  app?: 'oxpos' | 'zainaapp';
  en: LandingCopy; ar: LandingCopy;
}

// Shared answers, so wording stays identical across pages.
const EN = {
  oxCost: ['How much does OxPOS cost?', 'OxPOS is 1,500 AED, which includes the first year of maintenance. After that, the renewal is 500 AED per year.'] as [string, string],
  oxVat: ['Are the reports VAT-ready?', 'Yes. OxPOS includes VAT reports alongside sales, P&L, stock value and payment-type reports, all exportable to PDF or Excel.'] as [string, string],
  oxStart: ['How fast can we start?', 'Most shops are running the same day. Setup takes between 45 minutes and 2 hours, and we can migrate your items from Excel where available.'] as [string, string],
  trial: ['Can I try it first?', 'Yes. We offer a free 1-hour trial on a Zoom call, where we walk you through the app live.'] as [string, string],
  hw: ['What hardware do I need?', 'OxPOS runs on Windows, and the web app lets you manage the business from any device. Compatible hardware available.'] as [string, string],
};
const AR = {
  oxCost: ['بكم OxPOS؟', 'OxPOS بـ 1,500 درهم، وتشمل صيانة السنة الأولى. بعدها التجديد 500 درهم بالسنة.'] as [string, string],
  oxVat: ['التقارير جاهزة للضريبة؟', 'إيه. OxPOS فيه تقارير الضريبة مع تقارير المبيعات والأرباح والخسائر وقيمة المخزون وأنواع الدفع، وكلها تنطلع PDF أو Excel.'] as [string, string],
  oxStart: ['كم ياخذ التشغيل؟', 'أغلب المحلات تشتغل نفس اليوم. التجهيز ياخذ من 45 دقيقة لين ساعتين، وننقل أصنافك من Excel إذا متوفر.'] as [string, string],
  trial: ['أقدر أجرّبه أول؟', 'إيه. نوفر لك تجربة مجانية مدتها ساعة على مكالمة زوم، نمشّي معاك على التطبيق مباشرة.'] as [string, string],
  hw: ['شو الأجهزة اللي أحتاجها؟', 'OxPOS يشتغل على ويندوز، ومن تطبيق الويب تقدر تدير شغلك من أي جهاز. الأجهزة المتوافقة متوفرة.'] as [string, string],
};
const OX_EN = { timelineLabel: 'Setup', timeline: '45 min – 2 hrs', price: '1,500 AED, first year included', parent: { label: 'OxPOS', href: '/oxpos' }, faqTitle: 'Questions shop owners ask', ctaTitle: 'Want to see OxPOS for your shop?', ctaText: 'Tell us what you sell on WhatsApp. We’ll show you OxPOS on a free 1-hour Zoom call.' };
const OX_AR = { timelineLabel: 'التجهيز', timeline: '45 دقيقة – ساعتين', price: '1,500 درهم، السنة الأولى مشمولة', parent: { label: 'OxPOS', href: '/ar/oxpos' }, faqTitle: 'أسئلة يسألونا عنها أصحاب المحلات', ctaTitle: 'تبا تشوف OxPOS لمحلك؟', ctaText: 'قول لنا شو تبيع على الواتساب، ونوريك OxPOS في تجربة مجانية ساعة على زوم.' };

export const LANDINGS: Landing[] = [
  // ───────────── OxPOS by business type ─────────────
  {
    path: 'oxpos/supermarkets', kind: 'app', app: 'oxpos',
    en: {
      ...OX_EN, schemaName: 'OxPOS for supermarkets',
      title: 'Supermarket POS & Inventory Software in the UAE | OxPOS',
      desc: 'OxPOS for UAE supermarkets: fast barcode POS, weighed products, expiry and low-stock alerts, shift cash control and VAT reports. 1,500 AED, year one included.',
      eyebrow: 'OxPOS for supermarkets', h1: 'POS and stock control built for supermarkets',
      lead: 'Sell fast at the counter and always know what is on the shelf, what is close to expiring and what to reorder. OxPOS keeps sales, stock, purchases and cash in one system.',
      h2: 'One system for the counter and the stockroom',
      body: [
        'A supermarket runs on speed at the till and accuracy behind it. OxPOS gives your cashiers a fast point of sale with barcode scanning, split payments, parked sales and returns, and gives you the stock control to match.',
        'Track expiry dates, get low-stock alerts, sell weighed products, record purchase invoices and see supplier reports, all in the same place as your sales.',
      ],
      points: [
        ['Fast checkout', 'Barcode scanning, split payments, parked sales, returns, and item or invoice discounts.'],
        ['Expiry and low-stock alerts', 'Know what is running low and what is close to expiring before it costs you.'],
        ['Weighed products', 'Sell items by weight alongside your barcoded products.'],
        ['Shift and cash control', 'Opening and closing cash, expected vs. actual, and end-of-day reports.'],
      ],
      crumb: 'Supermarkets', waText: 'Hi MarkZone, I run a supermarket and I\'d like to see OxPOS',
      faq: [
        ['How much does OxPOS cost for a supermarket?', EN.oxCost[1]],
        ['Can OxPOS sell weighed products?', 'Yes. OxPOS supports weighed products alongside barcoded items.'],
        ['Does it track expiry dates?', 'Yes. OxPOS has expiry tracking and low-stock alerts.'],
        EN.oxVat, EN.trial, EN.oxStart, EN.hw,
      ],
    },
    ar: {
      ...OX_AR, schemaName: 'OxPOS للسوبرماركت',
      title: 'برنامج كاشير ومخزون للسوبرماركت في الإمارات | OxPOS',
      desc: 'OxPOS للسوبرماركت في الإمارات: كاشير سريع بالباركود، منتجات بالوزن، تنبيهات الصلاحية والمخزون، وتقارير الضريبة. 1,500 درهم والسنة الأولى مشمولة.',
      eyebrow: 'OxPOS للسوبرماركت', h1: 'كاشير وتحكم بالمخزون مسوّي للسوبرماركت',
      lead: 'بع بسرعة عند الكاشير، وخل كل شي تحت عينك: شو على الرف، شو قرب تنتهي صلاحيته، وشو لازم تطلبه. OxPOS يجمع المبيعات والمخزون والمشتريات والكاش في نظام واحد.',
      h2: 'نظام واحد للكاشير والمخزن',
      body: [
        'السوبرماركت يمشي على سرعة الكاشير ودقة المخزون. OxPOS يعطي الكاشير نقطة بيع سريعة بمسح الباركود، مع الدفع المقسّم والفواتير المعلّقة والمرتجعات، ويعطيك تحكم بالمخزون يماشيها.',
        'تتابع تواريخ الصلاحية، وتجيك تنبيهات المخزون القليل، وتبيع المنتجات بالوزن، وتسجل فواتير المشتريات وتشوف تقارير الموردين، كله في نفس مكان مبيعاتك.',
      ],
      points: [
        ['كاشير سريع', 'مسح الباركود، دفع مقسّم، فواتير معلّقة، مرتجعات، وخصومات على الصنف أو الفاتورة.'],
        ['تنبيهات الصلاحية والمخزون', 'تعرف شو قارب يخلص وشو قرب تنتهي صلاحيته قبل ما يكلفك.'],
        ['منتجات بالوزن', 'بع الأصناف بالوزن مع المنتجات اللي بالباركود.'],
        ['الوردية والكاش', 'كاش الفتح والإغلاق، المتوقع مقابل الفعلي، وتقارير نهاية اليوم.'],
      ],
      crumb: 'السوبرماركت', waText: 'مرحبا ماركزون، عندي سوبرماركت وأبا أشوف OxPOS',
      faq: [
        ['بكم OxPOS للسوبرماركت؟', AR.oxCost[1]],
        ['يقدر OxPOS يبيع منتجات بالوزن؟', 'إيه. OxPOS يدعم المنتجات بالوزن مع الأصناف اللي بالباركود.'],
        ['يتابع تواريخ الصلاحية؟', 'إيه. OxPOS فيه تتبع للصلاحية وتنبيهات للمخزون القليل.'],
        AR.oxVat, AR.trial, AR.oxStart, AR.hw,
      ],
    },
  },
  {
    path: 'oxpos/garment-and-fashion-stores', kind: 'app', app: 'oxpos',
    en: {
      ...OX_EN, schemaName: 'OxPOS for garment and fashion stores',
      title: 'POS for Garment & Fashion Stores in the UAE | OxPOS',
      desc: 'OxPOS for UAE garment and fashion stores: size and color variants, barcode POS, returns, label designer and VAT reports. 1,500 AED with year one included.',
      eyebrow: 'OxPOS for garment & fashion stores', h1: 'POS for garment and fashion stores, with sizes and colors sorted',
      lead: 'Every size and color has its own stock, so you always know what is left. OxPOS keeps sales, returns, stock and reports together.',
      h2: 'Built around sizes, colors and returns',
      body: [
        'In a garment store, one item can mean many stock lines. OxPOS handles size and color variants, so each one is counted correctly at the till and in your stock.',
        'Process returns, apply item or invoice discounts, design your own labels and invoices, and see sales by item, employee and receipt.',
      ],
      points: [
        ['Size and color variants', 'Track stock for every size and color of an item.'],
        ['Returns and discounts', 'Handle returns, plus item or invoice discounts, at the counter.'],
        ['Labels and invoices', 'A custom label and invoice designer, with Arabic and English thermal receipts.'],
        ['Reports that answer questions', 'Sales by item, employee and receipt, P&L and stock value, exportable to PDF or Excel.'],
      ],
      crumb: 'Garment & fashion stores', waText: 'Hi MarkZone, I run a fashion store and I\'d like to see OxPOS',
      faq: [
        ['How much does OxPOS cost for a clothing store?', EN.oxCost[1]],
        ['Does OxPOS handle sizes and colors?', 'Yes. OxPOS supports size and color variants, so each variant has its own stock.'],
        ['Can I design my own labels?', 'Yes. OxPOS includes a custom label and invoice designer.'],
        EN.oxVat, EN.trial, EN.oxStart, EN.hw,
      ],
    },
    ar: {
      ...OX_AR, schemaName: 'OxPOS لمحلات الملابس والأزياء',
      title: 'برنامج كاشير لمحلات الملابس والأزياء في الإمارات | OxPOS',
      desc: 'OxPOS لمحلات الملابس والأزياء في الإمارات: مقاسات وألوان، كاشير بالباركود، مرتجعات، تصميم الملصقات وتقارير الضريبة. 1,500 درهم والسنة الأولى مشمولة.',
      eyebrow: 'OxPOS لمحلات الملابس والأزياء', h1: 'كاشير لمحلات الملابس والأزياء.. المقاسات والألوان مرتبة',
      lead: 'كل مقاس ولون له مخزونه، وتعرف دايماً شو باقي. OxPOS يجمع المبيعات والمرتجعات والمخزون والتقارير في مكان واحد.',
      h2: 'مبني على المقاسات والألوان والمرتجعات',
      body: [
        'في محل الملابس، الصنف الواحد ممكن يكون له مخزون كثير. OxPOS يتعامل مع المقاسات والألوان، وكل واحد ينحسب صح عند الكاشير وفي مخزونك.',
        'سوّ المرتجعات، وطبّق خصومات على الصنف أو الفاتورة، وصمم ملصقاتك وفواتيرك بنفسك، وشوف المبيعات حسب الصنف والموظف والإيصال.',
      ],
      points: [
        ['مقاسات وألوان', 'تابع المخزون لكل مقاس ولون من الصنف.'],
        ['مرتجعات وخصومات', 'تعامل مع المرتجعات، وخصومات الصنف أو الفاتورة، عند الكاشير.'],
        ['ملصقات وفواتير', 'مصمم ملصقات وفواتير حسب ذوقك، مع إيصالات حرارية بالعربي والإنجليزي.'],
        ['تقارير تجاوب على أسئلتك', 'المبيعات حسب الصنف والموظف والإيصال، والأرباح والخسائر وقيمة المخزون، وتنطلع PDF أو Excel.'],
      ],
      crumb: 'محلات الملابس والأزياء', waText: 'مرحبا ماركزون، عندي محل ملابس وأبا أشوف OxPOS',
      faq: [
        ['بكم OxPOS لمحل الملابس؟', AR.oxCost[1]],
        ['يتعامل OxPOS مع المقاسات والألوان؟', 'إيه. OxPOS يدعم المقاسات والألوان، وكل نوع له مخزونه.'],
        ['أقدر أصمم ملصقاتي بنفسي؟', 'إيه. OxPOS فيه مصمم ملصقات وفواتير حسب ذوقك.'],
        AR.oxVat, AR.trial, AR.oxStart, AR.hw,
      ],
    },
  },
  {
    path: 'oxpos/cosmetics-shops', kind: 'app', app: 'oxpos',
    en: {
      ...OX_EN, schemaName: 'OxPOS for cosmetics and makeup shops',
      title: 'POS for Cosmetics & Makeup Shops in the UAE | OxPOS',
      desc: 'OxPOS for UAE cosmetics and makeup shops: barcode POS, expiry tracking, low-stock alerts, color variants and VAT reports. 1,500 AED, year one included.',
      eyebrow: 'OxPOS for cosmetics shops', h1: 'POS for cosmetics and makeup shops, with expiry under control',
      lead: 'Products with expiry dates and many colors need careful stock control. OxPOS tracks expiry, flags low stock and keeps sales and reports in one system.',
      h2: 'Know what sells, what is running low and what expires',
      body: [
        'Cosmetics and makeup shops carry many small items, each with its own stock level and expiry date. OxPOS tracks expiry, sends low-stock alerts and handles color variants, so nothing is missed.',
        'At the counter, scan barcodes, take split payments and print receipts in Arabic and English. At month end, see sales by item, P&L and VAT reports.',
      ],
      points: [
        ['Expiry tracking', 'Keep an eye on expiry dates across your stock.'],
        ['Low-stock alerts and reorder suggestions', 'See what is running low and reorder in time.'],
        ['Color variants', 'Track stock for each color of a product.'],
        ['Fast checkout', 'Barcode scanning, split payments, returns, and item or invoice discounts.'],
      ],
      crumb: 'Cosmetics shops', waText: 'Hi MarkZone, I run a cosmetics shop and I\'d like to see OxPOS',
      faq: [
        ['How much does OxPOS cost for a cosmetics shop?', EN.oxCost[1]],
        ['Does OxPOS track expiry dates?', 'Yes. OxPOS has expiry tracking and low-stock alerts.'],
        ['Can it handle different colors of the same product?', 'Yes. OxPOS supports size and color variants.'],
        EN.oxVat, EN.trial, EN.oxStart, EN.hw,
      ],
    },
    ar: {
      ...OX_AR, schemaName: 'OxPOS لمحلات التجميل والمكياج',
      title: 'برنامج كاشير لمحلات التجميل والمكياج في الإمارات | OxPOS',
      desc: 'OxPOS لمحلات التجميل والمكياج في الإمارات: كاشير بالباركود، تتبع الصلاحية، تنبيهات المخزون، ألوان وتقارير الضريبة. 1,500 درهم والسنة الأولى مشمولة.',
      eyebrow: 'OxPOS لمحلات التجميل', h1: 'كاشير لمحلات التجميل والمكياج.. والصلاحية تحت السيطرة',
      lead: 'المنتجات اللي لها تاريخ صلاحية وألوان كثيرة تبي تحكم دقيق بالمخزون. OxPOS يتابع الصلاحية وينبهك للمخزون القليل ويجمع المبيعات والتقارير في نظام واحد.',
      h2: 'اعرف شو يبيع وشو قارب يخلص وشو بينتهي',
      body: [
        'محلات التجميل والمكياج فيها أصناف صغيرة كثيرة، وكل صنف له مخزونه وتاريخ صلاحيته. OxPOS يتابع الصلاحية، وينبهك للمخزون القليل، ويتعامل مع الألوان، وما يفوتك شي.',
        'عند الكاشير امسح الباركود، وخذ الدفع مقسّم، واطبع الإيصالات بالعربي والإنجليزي. وآخر الشهر شوف المبيعات حسب الصنف والأرباح والخسائر وتقارير الضريبة.',
      ],
      points: [
        ['تتبع الصلاحية', 'خل عينك على تواريخ الصلاحية في مخزونك.'],
        ['تنبيهات المخزون واقتراحات الطلب', 'شوف شو قارب يخلص واطلبه في وقته.'],
        ['ألوان', 'تابع المخزون لكل لون من المنتج.'],
        ['كاشير سريع', 'مسح الباركود، دفع مقسّم، مرتجعات، وخصومات على الصنف أو الفاتورة.'],
      ],
      crumb: 'محلات التجميل', waText: 'مرحبا ماركزون، عندي محل تجميل وأبا أشوف OxPOS',
      faq: [
        ['بكم OxPOS لمحل التجميل؟', AR.oxCost[1]],
        ['يتابع OxPOS تواريخ الصلاحية؟', 'إيه. OxPOS فيه تتبع للصلاحية وتنبيهات للمخزون القليل.'],
        ['يتعامل مع ألوان مختلفة لنفس المنتج؟', 'إيه. OxPOS يدعم المقاسات والألوان.'],
        AR.oxVat, AR.trial, AR.oxStart, AR.hw,
      ],
    },
  },
  {
    path: 'oxpos/consignment-stores', kind: 'app', app: 'oxpos',
    en: {
      ...OX_EN, schemaName: 'OxPOS for consignment stores',
      title: 'Consignment Store POS Software in the UAE | OxPOS',
      desc: 'OxPOS has a consignment module for UAE stores that host home businesses and small vendors, plus POS, inventory, expenses and VAT reports. 1,500 AED.',
      eyebrow: 'OxPOS for consignment stores', h1: 'Run a consignment store without the spreadsheets',
      lead: 'If your store hosts home businesses and small vendors, OxPOS has a consignment module built for it, inside the same system as your sales, stock and reports.',
      h2: 'A consignment module, not a workaround',
      body: [
        'Stores that host home businesses and small vendors have different needs from a normal shop. OxPOS includes a consignment module built for this, with consignment delivery notes you can use from your phone.',
        'Everything else is in the same place: point of sale, inventory, purchases and suppliers, expenses, salaries and reports.',
      ],
      points: [
        ['Consignment module', 'Built for stores that host home businesses and small vendors.'],
        ['Delivery notes on your phone', 'Manage consignment delivery notes from your phone.'],
        ['One system', 'Sales, stock, purchases, expenses and salaries together.'],
        ['Reports', 'Sales by item, employee and receipt, P&L, VAT and stock value, exportable to PDF or Excel.'],
      ],
      crumb: 'Consignment stores', waText: 'Hi MarkZone, I run a consignment store and I\'d like to see OxPOS',
      faq: [
        ['What is the consignment module?', 'It is part of OxPOS, built for stores that host home businesses and small vendors.'],
        ['How much does OxPOS cost for a consignment store?', EN.oxCost[1]],
        EN.oxVat, EN.trial, EN.oxStart, EN.hw,
      ],
    },
    ar: {
      ...OX_AR, schemaName: 'OxPOS لمحلات بضاعة الأمانة',
      title: 'برنامج كاشير لمحلات بضاعة الأمانة في الإمارات | OxPOS',
      desc: 'OxPOS فيه نظام بضاعة الأمانة للمحلات اللي تستضيف مشاريع منزلية وبائعين صغار، مع الكاشير والمخزون والمصاريف وتقارير الضريبة. 1,500 درهم.',
      eyebrow: 'OxPOS لمحلات بضاعة الأمانة', h1: 'شغّل محل بضاعة الأمانة بدون ملفات Excel',
      lead: 'إذا محلك يستضيف مشاريع منزلية وبائعين صغار، OxPOS فيه نظام بضاعة الأمانة مسوّي لك، في نفس نظام مبيعاتك ومخزونك وتقاريرك.',
      h2: 'نظام بضاعة الأمانة، مو حل ترقيعي',
      body: [
        'المحلات اللي تستضيف مشاريع منزلية وبائعين صغار تختلف احتياجاتها عن المحل العادي. OxPOS فيه نظام بضاعة الأمانة مسوّي لهذا الغرض، مع سندات تسليم البضاعة تقدر تستخدمها من جوالك.',
        'وباقي شغلك في نفس المكان: نقطة البيع والمخزون والمشتريات والموردين والمصاريف والرواتب والتقارير.',
      ],
      points: [
        ['نظام بضاعة الأمانة', 'مسوّي للمحلات اللي تستضيف مشاريع منزلية وبائعين صغار.'],
        ['سندات التسليم من جوالك', 'تعامل مع سندات تسليم بضاعة الأمانة من جوالك.'],
        ['نظام واحد', 'المبيعات والمخزون والمشتريات والمصاريف والرواتب مع بعض.'],
        ['تقارير', 'المبيعات حسب الصنف والموظف والإيصال، والأرباح والخسائر والضريبة وقيمة المخزون، وتنطلع PDF أو Excel.'],
      ],
      crumb: 'بضاعة الأمانة', waText: 'مرحبا ماركزون، عندي محل بضاعة الأمانة وأبا أشوف OxPOS',
      faq: [
        ['شو هو نظام بضاعة الأمانة؟', 'جزء من OxPOS، مسوّي للمحلات اللي تستضيف مشاريع منزلية وبائعين صغار.'],
        ['بكم OxPOS لمحل بضاعة الأمانة؟', AR.oxCost[1]],
        AR.oxVat, AR.trial, AR.oxStart, AR.hw,
      ],
    },
  },

  // ───────────── ZainaApp for salons & barbershops ─────────────
  {
    path: 'zainaapp/salons-and-barbershops', kind: 'app', app: 'zainaapp',
    en: {
      schemaName: 'ZainaApp for salons and barbershops',
      title: 'Salon & Barbershop Software in the UAE | ZainaApp',
      desc: 'ZainaApp for UAE salons, barbershops, spas and beauty lounges: appointments, online booking, WhatsApp notifications and staff commissions. 1,500 AED.',
      eyebrow: 'ZainaApp for salons & barbershops', h1: 'Salon and barbershop software that runs the day for you',
      lead: 'Bookings, walk-ins, clients and staff commissions in one system, with an online booking page for every salon.',
      h2: 'From the first booking to month-end commissions',
      body: [
        'ZainaApp keeps your appointment calendar, walk-ins and client history in one place, and sends booking notifications automatically on WhatsApp.',
        'It works out staff commissions on services and products, tracks attendance and performance, and checks out clients with sequential invoice numbers.',
      ],
      points: [
        ['Online booking page', 'Clients choose the service and staff member, book, and rate staff.'],
        ['WhatsApp notifications', 'Booking notifications go out automatically on WhatsApp.'],
        ['Staff commissions', 'Commissions on services and products, with attendance and performance.'],
        ['Client profiles', 'Full visit history for every client.'],
      ],
      crumb: 'Salons & barbershops', parent: { label: 'ZainaApp', href: '/zainaapp' },
      timelineLabel: 'Setup', timeline: '45 min – 2 hrs', price: '1,500 AED, first year included',
      waText: 'Hi MarkZone, I run a salon and I\'d like to see ZainaApp',
      faqTitle: 'Questions salon owners ask',
      faq: [
        ['How much does ZainaApp cost?', 'ZainaApp is 1,500 AED, which includes the first year of maintenance. After that, the renewal is 500 AED per year.'],
        ['Can clients book online?', 'Yes. Every salon gets its own online booking page where clients choose a service and a staff member, book, and rate the staff.'],
        ['Does ZainaApp send WhatsApp notifications?', 'Yes. Booking notifications are sent automatically on WhatsApp.'],
        ['Can it calculate staff commissions?', 'Yes. ZainaApp tracks commissions on both services and products, alongside attendance and performance.'],
        ['Does it work for barbershops and spas?', 'Yes. ZainaApp works for ladies’ salons, barbershops, spas, beauty lounges and similar beauty businesses.'],
        ['Is ZainaApp compatible with UAE VAT requirements?', 'Yes. ZainaApp is fully compatible with UAE VAT requirements.'],
        ['Can I try it first?', 'Yes. We offer a free 1-hour trial on a Zoom call, where we walk you through the app live.'],
      ],
      ctaTitle: 'Want to see ZainaApp for your salon?',
      ctaText: 'Tell us about your salon on WhatsApp. We’ll show you ZainaApp on a free 1-hour Zoom call.',
    },
    ar: {
      schemaName: 'ZainaApp للصالونات والحلاقين',
      title: 'برنامج إدارة صالونات وحلاقة في الإمارات | ZainaApp',
      desc: 'ZainaApp للصالونات والحلاقين والسبا في الإمارات: مواعيد، حجز أونلاين، إشعارات واتساب وعمولات الموظفين. 1,500 درهم والسنة الأولى مشمولة.',
      eyebrow: 'ZainaApp للصالونات والحلاقين', h1: 'برنامج صالون وحلاقة يمشّي لك اليوم',
      lead: 'الحجوزات والزبائن اللي بدون موعد وعمولات الموظفين في نظام واحد، مع صفحة حجز أونلاين لكل صالون.',
      h2: 'من أول حجز لين عمولات آخر الشهر',
      body: [
        'ZainaApp يجمع تقويم المواعيد والزبائن اللي بدون موعد وسجل الزبائن في مكان واحد، ويرسل إشعارات الحجز تلقائياً على الواتساب.',
        'ويحسب عمولات الموظفين على الخدمات والمنتجات، ويتابع الحضور والأداء، وينهي حساب الزبون بفواتير بأرقام متسلسلة.',
      ],
      points: [
        ['صفحة حجز أونلاين', 'الزبون يختار الخدمة والموظف، يحجز، ويقيّم الموظف.'],
        ['إشعارات واتساب', 'إشعارات الحجز تنرسل تلقائياً على الواتساب.'],
        ['عمولات الموظفين', 'عمولات على الخدمات والمنتجات، مع الحضور والأداء.'],
        ['ملفات الزبائن', 'سجل زيارات كامل لكل زبون.'],
      ],
      crumb: 'الصالونات والحلاقين', parent: { label: 'ZainaApp', href: '/ar/zainaapp' },
      timelineLabel: 'التجهيز', timeline: '45 دقيقة – ساعتين', price: '1,500 درهم، السنة الأولى مشمولة',
      waText: 'مرحبا ماركزون، عندي صالون وأبا أشوف ZainaApp',
      faqTitle: 'أسئلة يسألونا عنها أصحاب الصالونات',
      faq: [
        ['بكم ZainaApp؟', 'ZainaApp بـ 1,500 درهم، وتشمل صيانة السنة الأولى. بعدها التجديد 500 درهم بالسنة.'],
        ['الزبائن يقدرون يحجزون أونلاين؟', 'إيه. كل صالون ياخذ صفحة حجز أونلاين خاصة فيه، الزبون يختار فيها الخدمة والموظف، يحجز، ويقيّم الموظف.'],
        ['ZainaApp يرسل إشعارات واتساب؟', 'إيه. إشعارات الحجز تنرسل تلقائياً على الواتساب.'],
        ['يحسب عمولات الموظفين؟', 'إيه. ZainaApp يتابع العمولات على الخدمات والمنتجات، مع الحضور والأداء.'],
        ['يشتغل للحلاقين والسبا؟', 'إيه. ZainaApp يشتغل للصالونات النسائية والحلاقين والسبا ومراكز التجميل وأي نشاط تجميل مشابه.'],
        ['ZainaApp متوافق مع متطلبات الضريبة في الإمارات؟', 'إيه. ZainaApp متوافق بالكامل مع متطلبات ضريبة القيمة المضافة في الإمارات.'],
        ['أقدر أجرّبه أول؟', 'إيه. نوفر لك تجربة مجانية مدتها ساعة على مكالمة زوم، نمشّي معاك على التطبيق مباشرة.'],
      ],
      ctaTitle: 'تبا تشوف ZainaApp لصالونك؟',
      ctaText: 'قول لنا عن صالونك على الواتساب، ونوريك ZainaApp في تجربة مجانية ساعة على زوم.',
    },
  },

  // ───────────── MadaPOS waitlist ─────────────
  {
    path: 'madapos', kind: 'soon',
    en: {
      schemaName: 'MadaPOS',
      title: 'MadaPOS: Restaurant & Café App, Coming Soon | MarkZone',
      desc: 'MadaPOS is MarkZone’s upcoming app for restaurants and cafés in the UAE. Register your interest on WhatsApp and we’ll tell you when it launches.',
      eyebrow: 'Coming Soon', h1: 'MadaPOS for restaurants and cafés is coming soon',
      lead: 'We build one app per industry. MadaPOS is the next one, made for restaurants and cafés in the UAE.',
      h2: 'Be first to know',
      body: [
        'MadaPOS is not available yet, and we have not announced a launch date or price.',
        'Message us on WhatsApp to register your interest and we will tell you when it is ready.',
      ],
      points: [],
      crumb: 'MadaPOS', parent: { label: 'Coming Soon', href: '/coming-soon' },
      timelineLabel: '', timeline: '', price: '',
      waText: 'Hi MarkZone, please tell me when MadaPOS launches',
      faqTitle: 'About MadaPOS',
      faq: [
        ['What is MadaPOS?', 'MadaPOS is an upcoming MarkZone app for restaurants and cafés in the UAE.'],
        ['Is MadaPOS available now?', 'Not yet. It is marked Coming Soon. Message us on WhatsApp and we will tell you when it launches.'],
        ['How much will MadaPOS cost?', 'MadaPOS pricing has not been announced yet.'],
        ['Which MarkZone apps can I use today?', 'OxPOS for retail shops, ZainaApp for salons and spas, and TexPOS for tailoring shops are live today.'],
      ],
      ctaTitle: 'Run a restaurant or café?', ctaText: 'Tell us about it on WhatsApp and we’ll let you know when MadaPOS is ready.',
    },
    ar: {
      schemaName: 'MadaPOS',
      title: 'MadaPOS: تطبيق المطاعم والكافيهات، قريباً | ماركزون',
      desc: 'MadaPOS تطبيق ماركزون القادم للمطاعم والكافيهات في الإمارات. سجّل اهتمامك على الواتساب ونخبرك أول ما ينزل.',
      eyebrow: 'قريباً', h1: 'MadaPOS للمطاعم والكافيهات.. قريباً',
      lead: 'نسوي تطبيق لكل نشاط. MadaPOS هو التالي، مسوّي للمطاعم والكافيهات في الإمارات.',
      h2: 'كن أول من يعرف',
      body: [
        'MadaPOS مو متوفر للحين، وما أعلنّا عن موعد إطلاقه ولا سعره.',
        'راسلنا على الواتساب وسجّل اهتمامك، ونخبرك أول ما يكون جاهز.',
      ],
      points: [],
      crumb: 'MadaPOS', parent: { label: 'قريباً', href: '/ar/coming-soon' },
      timelineLabel: '', timeline: '', price: '',
      waText: 'مرحبا ماركزون، خبروني أول ما ينزل MadaPOS',
      faqTitle: 'عن MadaPOS',
      faq: [
        ['شو هو MadaPOS؟', 'MadaPOS تطبيق قادم من ماركزون للمطاعم والكافيهات في الإمارات.'],
        ['MadaPOS متوفر الحين؟', 'مو للحين، وهو تحت «قريباً». راسلنا على الواتساب ونخبرك أول ما ينزل.'],
        ['بكم بيكون MadaPOS؟', 'ما أعلنّا عن سعر MadaPOS للحين.'],
        ['أي تطبيقات ماركزون أقدر أستخدمها اليوم؟', 'OxPOS لمحلات التجزئة، وZainaApp للصالونات والسبا، وTexPOS لمحلات الخياطة، كلها متوفرة اليوم.'],
      ],
      ctaTitle: 'عندك مطعم أو كافيه؟', ctaText: 'قول لنا عنه على الواتساب ونخبرك أول ما يكون MadaPOS جاهز.',
    },
  },

  // ───────────── Websites: Dubai / Sharjah / Ras Al Khaimah ─────────────
  {
    path: 'websites/dubai-sharjah-ras-al-khaimah', kind: 'service',
    en: {
      schemaName: 'Website design in Dubai, Sharjah and Ras Al Khaimah',
      title: 'Website Design in Dubai, Sharjah & Ras Al Khaimah | MarkZone',
      desc: 'MarkZone builds professional websites for businesses in Dubai, Sharjah, Ras Al Khaimah and all 7 emirates. From 1,500 AED, delivered within 2 weeks.',
      eyebrow: 'Websites in Dubai, Sharjah & Ras Al Khaimah', h1: 'Website design for businesses in Dubai, Sharjah and Ras Al Khaimah',
      lead: 'Based in Dubai, serving all 7 emirates. A clear, professional website delivered within 2 weeks, with real local support on WhatsApp.',
      h2: 'A website for your business, wherever in the UAE you are',
      body: [
        'Whether your business is in Dubai, Sharjah, Ras Al Khaimah or any other emirate, your website is often the first thing a customer sees. We build it quickly, keep it clear, and stay on WhatsApp for you after launch.',
        'Websites start from 1,500 AED. The final price depends on what your business needs, and we send a clear quote on WhatsApp before we start, with no hidden costs.',
      ],
      points: [
        ['Delivered within 2 weeks', 'A live, professional website in about two weeks.'],
        ['From 1,500 AED', 'Clear quote up front, with no hidden costs.'],
        ['All 7 emirates', 'Based in Dubai, serving businesses across the UAE.'],
        ['Real local support', 'Real people on WhatsApp, plus on-site visits when needed.'],
      ],
      crumb: 'Dubai, Sharjah & Ras Al Khaimah', parent: { label: 'Websites', href: '/websites' },
      timelineLabel: 'Delivery', timeline: 'Within 2 weeks', price: 'From 1,500 AED',
      waText: 'Hi MarkZone, I\'d like a quote for a website',
      faqTitle: 'Website questions',
      faq: [
        ['Do you build websites for businesses in Sharjah and Ras Al Khaimah?', 'Yes. We are based in Dubai and serve businesses in all 7 emirates, including Sharjah and Ras Al Khaimah.'],
        ['How much does a website cost?', 'Websites start from 1,500 AED. The final price depends on what your business needs, and we send you a clear quote on WhatsApp before we start, with no hidden costs.'],
        ['How long does a website take?', 'Websites are delivered within 2 weeks.'],
        ['Do you support the website after launch?', 'Yes. Every client gets full WhatsApp support daily from 10 AM to 10 PM (Sunday off), plus on-site visits when needed.'],
      ],
      ctaTitle: 'Let’s talk about your website', ctaText: 'Tell us about your business on WhatsApp and we’ll send you a clear quote.',
    },
    ar: {
      schemaName: 'تصميم مواقع في دبي والشارقة ورأس الخيمة',
      title: 'تصميم مواقع في دبي والشارقة ورأس الخيمة | ماركزون',
      desc: 'ماركزون تسوي مواقع احترافية للشركات في دبي والشارقة ورأس الخيمة وكل الإمارات السبع. من 1,500 درهم، وتتسلم خلال أسبوعين.',
      eyebrow: 'مواقع في دبي والشارقة ورأس الخيمة', h1: 'تصميم مواقع للشركات في دبي والشارقة ورأس الخيمة',
      lead: 'مقرنا في دبي ونخدم الإمارات السبع. موقع احترافي وواضح يتسلم خلال أسبوعين، مع دعم محلي حقيقي على الواتساب.',
      h2: 'موقع لشغلك، وين ما كنت في الإمارات',
      body: [
        'سواء شغلك في دبي أو الشارقة أو رأس الخيمة أو أي إمارة ثانية، موقعك غالباً أول شي يشوفه الزبون عنك. نسويه بسرعة، ونخليه واضح، ونبقى وياك على الواتساب بعد التسليم.',
        'المواقع تبدأ من 1,500 درهم، والسعر النهائي حسب اللي يحتاجه شغلك. نرسل لك عرض سعر واضح على الواتساب قبل ما نبدأ، بدون تكاليف مخفية.',
      ],
      points: [
        ['يتسلم خلال أسبوعين', 'موقع احترافي شغّال في حدود أسبوعين.'],
        ['من 1,500 درهم', 'عرض سعر واضح من البداية، بدون تكاليف مخفية.'],
        ['الإمارات السبع', 'مقرنا في دبي ونخدم الشركات في كل الإمارات.'],
        ['دعم محلي حقيقي', 'ناس حقيقيين على الواتساب، وزيارات للموقع إذا احتاج الأمر.'],
      ],
      crumb: 'دبي والشارقة ورأس الخيمة', parent: { label: 'المواقع', href: '/ar/websites' },
      timelineLabel: 'التسليم', timeline: 'خلال أسبوعين', price: 'من 1,500 درهم',
      waText: 'مرحبا ماركزون، أبا عرض سعر لموقع',
      faqTitle: 'أسئلة عن المواقع',
      faq: [
        ['تسوون مواقع لشركات في الشارقة ورأس الخيمة؟', 'إيه. مقرنا في دبي ونخدم الشركات في كل الإمارات السبع، ومنها الشارقة ورأس الخيمة.'],
        ['بكم الموقع؟', 'المواقع تبدأ من 1,500 درهم، والسعر النهائي حسب اللي يحتاجه شغلك. نرسل لك عرض سعر واضح على الواتساب قبل ما نبدأ، بدون تكاليف مخفية.'],
        ['الموقع ياخذ كم وقت؟', 'المواقع تتسلم خلال أسبوعين.'],
        ['تدعمون الموقع بعد التسليم؟', 'إيه. كل عميل ياخذ دعم كامل على الواتساب يومياً من 10 الصبح لين 10 الليل (الأحد إجازة)، وزيارات للموقع إذا احتاج الأمر.'],
      ],
      ctaTitle: 'خلنا نتكلم عن موقعك', ctaText: 'قول لنا عن شغلك على الواتساب ونرسل لك عرض سعر واضح.',
    },
  },
];
