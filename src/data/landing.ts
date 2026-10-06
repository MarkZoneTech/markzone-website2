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
  app?: 'oxpos' | 'zainaapp' | 'texpos';
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

  // ───────────── Comparison: ZainaApp vs KeynesPOS and Salonist ─────────────
  // Facts checked against each vendor's own public pricing page on 6 Oct 2026.
  // Keep wording factual and neutral: no claims about competitors beyond their published prices/features.
  {
    path: 'compare/zainaapp-vs-keynespos-and-salonist', kind: 'app', app: 'zainaapp',
    en: {
      schemaName: 'ZainaApp compared with KeynesPOS and Salonist',
      title: 'ZainaApp vs KeynesPOS vs Salonist: UAE Salon Software Prices',
      desc: 'Published UAE salon software prices: ZainaApp 1,500 AED (year one included), KeynesPOS AED 3,000 per branch a year, Salonist from USD 59 a month.',
      eyebrow: 'Salon software comparison', h1: 'ZainaApp, KeynesPOS and Salonist: what salon software costs in the UAE',
      lead: 'A simple look at the prices each company publishes, so you can compare like with like before you choose. Checked on 6 October 2026.',
      h2: 'Published prices side by side',
      body: [
        'ZainaApp: 1,500 AED, which includes the first year of maintenance. After that, the renewal is 500 AED per year. Over three years that is 2,500 AED.',
        'KeynesPOS: its price list page shows AED 3,000 per branch per year, with unlimited team members (keynespos.com/price-list, checked 6 October 2026).',
        'Salonist: its pricing page shows monthly plans in US dollars: Essential USD 59, Advance USD 109 and Expert USD 179 per month, with unlimited staff on every plan (salonist.io/pricing, checked 6 October 2026). At the dirham’s fixed rate of 3.6725 to the dollar, that is roughly AED 217, 400 and 657 per month.',
        'These products do not all include the same features, and prices can change at any time, so always confirm the current price and what is included with each company. The companies and product names mentioned belong to their owners. MarkZone is not affiliated with them, and this page is for information only.',
      ],
      points: [
        ['What to compare first', 'Online booking, WhatsApp notifications, staff commissions, inventory, and what the price actually includes.'],
        ['Ask about the second year', 'ZainaApp renews at 500 AED per year after the first year, which is included in the 1,500 AED.'],
        ['Check the language and VAT', 'ZainaApp runs in Arabic and English and is compatible with UAE VAT requirements.'],
        ['See it before you decide', 'We offer a free 1-hour trial on a Zoom call, where we walk you through ZainaApp live.'],
      ],
      crumb: 'Salon software comparison', parent: { label: 'ZainaApp', href: '/zainaapp' },
      timelineLabel: 'Setup', timeline: '45 min – 2 hrs', price: '1,500 AED, first year included',
      waText: 'Hi MarkZone, I read your salon software comparison and I\'d like to see ZainaApp',
      faqTitle: 'Questions salon owners ask when comparing',
      faq: [
        ['How much does salon software cost in the UAE?', 'It depends on the product and plan. According to their own websites on 6 October 2026, KeynesPOS lists AED 3,000 per branch per year and Salonist lists USD 59 to 179 per month. ZainaApp is 1,500 AED, including the first year of maintenance, then 500 AED per year.'],
        ['What is included in the ZainaApp price?', 'The 1,500 AED includes the first year of maintenance. ZainaApp covers appointments, an online booking page for your salon, WhatsApp booking notifications, client profiles, staff commissions, POS checkout, inventory and reports.'],
        ['How much is ZainaApp after the first year?', 'The renewal is 500 AED per year.'],
        ['Does ZainaApp support Arabic and UAE VAT?', 'Yes. ZainaApp runs in Arabic and English, and it is fully compatible with UAE VAT requirements.'],
        ['Are these prices up to date?', 'We checked them on 6 October 2026 on each company’s public website. Prices and plans can change, so confirm with the company before you decide.'],
        ['Can I try ZainaApp before paying?', 'Yes. We offer a free 1-hour trial on a Zoom call, where we walk you through the app live.'],
        ['How fast can my salon start?', 'Most salons are running the same day. Setup takes between 45 minutes and 2 hours.'],
      ],
      ctaTitle: 'Want to see ZainaApp for your salon?',
      ctaText: 'Tell us about your salon on WhatsApp. We’ll show you ZainaApp on a free 1-hour Zoom call.',
    },
    ar: {
      schemaName: 'مقارنة ZainaApp مع KeynesPOS وSalonist',
      title: 'ZainaApp وKeynesPOS وSalonist: أسعار برامج الصالونات',
      desc: 'أسعار برامج الصالونات المعلنة: ZainaApp بـ 1,500 درهم والسنة الأولى مشمولة، وKeynesPOS بـ 3,000 درهم للفرع بالسنة، وSalonist من 59 دولار بالشهر.',
      eyebrow: 'مقارنة برامج الصالونات', h1: 'ZainaApp وKeynesPOS وSalonist: بكم برنامج الصالون في الإمارات؟',
      lead: 'نظرة بسيطة على الأسعار اللي تعلنها كل شركة، عشان تقارن بشكل عادل قبل ما تختار. مراجعة بتاريخ 6 أكتوبر 2026.',
      h2: 'الأسعار المعلنة جنب بعض',
      body: [
        'ZainaApp: 1,500 درهم، وتشمل صيانة السنة الأولى. بعدها التجديد 500 درهم بالسنة. يعني 2,500 درهم لثلاث سنوات.',
        'KeynesPOS: صفحة الأسعار عندهم تذكر 3,000 درهم للفرع بالسنة، مع عدد موظفين غير محدود (keynespos.com/price-list، مراجعة بتاريخ 6 أكتوبر 2026).',
        'Salonist: صفحة الأسعار عندهم تذكر باقات شهرية بالدولار: Essential بـ 59 دولار، وAdvance بـ 109 دولار، وExpert بـ 179 دولار بالشهر، مع موظفين غير محدودين في كل الباقات (salonist.io/pricing، مراجعة بتاريخ 6 أكتوبر 2026). وبسعر صرف الدرهم الثابت 3.6725 للدولار، يطلع تقريباً 217 و400 و657 درهم بالشهر.',
        'هالمنتجات ما تشمل نفس المزايا كلها، والأسعار ممكن تتغير في أي وقت، فتأكد دايماً من السعر الحالي ومن اللي يشمله عند كل شركة. أسماء الشركات والمنتجات المذكورة ملك لأصحابها، وماركزون مو تابعة لهم، والصفحة للمعلومات فقط.',
      ],
      points: [
        ['شو تقارن أول شي', 'الحجز أونلاين، إشعارات الواتساب، عمولات الموظفين، المخزون، وشو يشمل السعر فعلاً.'],
        ['اسأل عن السنة الثانية', 'ZainaApp يتجدد بـ 500 درهم بالسنة بعد السنة الأولى المشمولة في الـ 1,500 درهم.'],
        ['تأكد من اللغة والضريبة', 'ZainaApp يشتغل بالعربي والإنجليزي ومتوافق مع متطلبات ضريبة القيمة المضافة في الإمارات.'],
        ['شوفه قبل لا تقرر', 'نوفر لك تجربة مجانية ساعة على مكالمة زوم، نمشّي معاك على ZainaApp مباشرة.'],
      ],
      crumb: 'مقارنة برامج الصالونات', parent: { label: 'ZainaApp', href: '/ar/zainaapp' },
      timelineLabel: 'التجهيز', timeline: '45 دقيقة – ساعتين', price: '1,500 درهم، السنة الأولى مشمولة',
      waText: 'مرحبا ماركزون، قريت مقارنة برامج الصالونات وأبا أشوف ZainaApp',
      faqTitle: 'أسئلة أصحاب الصالونات وهم يقارنون',
      faq: [
        ['بكم برنامج الصالون في الإمارات؟', 'يعتمد على المنتج والباقة. حسب مواقعهم الرسمية بتاريخ 6 أكتوبر 2026، KeynesPOS يذكر 3,000 درهم للفرع بالسنة، وSalonist يذكر من 59 إلى 179 دولار بالشهر. وZainaApp بـ 1,500 درهم تشمل صيانة السنة الأولى، وبعدها 500 درهم بالسنة.'],
        ['شو يشمل سعر ZainaApp؟', 'الـ 1,500 درهم تشمل صيانة السنة الأولى. وZainaApp يغطي المواعيد وصفحة حجز أونلاين لصالونك وإشعارات الحجز على الواتساب وملفات الزبائن وعمولات الموظفين والكاشير والمخزون والتقارير.'],
        ['بكم ZainaApp بعد السنة الأولى؟', 'التجديد 500 درهم بالسنة.'],
        ['ZainaApp يدعم العربي وضريبة الإمارات؟', 'إيه. ZainaApp يشتغل بالعربي والإنجليزي، ومتوافق بالكامل مع متطلبات ضريبة القيمة المضافة في الإمارات.'],
        ['هالأسعار محدّثة؟', 'راجعناها بتاريخ 6 أكتوبر 2026 من الموقع الرسمي لكل شركة. الأسعار والباقات ممكن تتغير، فتأكد من الشركة قبل لا تقرر.'],
        ['أقدر أجرّب ZainaApp قبل ما أدفع؟', 'إيه. نوفر لك تجربة مجانية مدتها ساعة على مكالمة زوم، نمشّي معاك على التطبيق مباشرة.'],
        ['كم ياخذ صالوني عشان يبدأ؟', 'أغلب الصالونات تشتغل نفس اليوم. التجهيز ياخذ من 45 دقيقة لين ساعتين.'],
      ],
      ctaTitle: 'تبا تشوف ZainaApp لصالونك؟',
      ctaText: 'قول لنا عن صالونك على الواتساب، ونوريك ZainaApp في تجربة مجانية ساعة على زوم.',
    },
  },

  // ───────────── Comparison: TexPOS vs Tailoroo ─────────────
  // Facts checked against Tailoroo's own public pricing page (tailoroo.com/pricing) on 6 Oct 2026.
  {
    path: 'compare/texpos-vs-tailoroo', kind: 'app', app: 'texpos',
    en: {
      schemaName: 'TexPOS compared with Tailoroo',
      title: 'TexPOS vs Tailoroo: UAE Tailoring Software Prices',
      desc: 'Published UAE tailoring software prices: TexPOS 1,000 AED for the first year, Tailoroo from AED 149 a month plus VAT. Checked 6 October 2026.',
      eyebrow: 'Tailoring software comparison', h1: 'TexPOS and Tailoroo: what tailoring software costs in the UAE',
      lead: 'A simple look at the prices each company publishes, so you can compare like with like before you choose. Checked on 6 October 2026.',
      h2: 'Published prices side by side',
      body: [
        'TexPOS: 1,000 AED for the first year, then 500 AED per year. Over three years that is 2,000 AED. TexPOS runs on the shop’s own phone, so no extra hardware is needed.',
        'Tailoroo: its pricing page shows three monthly plans, all plus VAT: Starter AED 149 (1 branch, up to 3 staff users), Business AED 299 (up to 10 users) and Enterprise AED 499 (unlimited users, multi-branch) (tailoroo.com/pricing, checked 6 October 2026). Over twelve months, Starter adds up to AED 1,788 before VAT.',
        'These products do not include the same features, and prices can change at any time, so always confirm the current price and what is included with each company. The companies and product names mentioned belong to their owners. MarkZone is not affiliated with them, and this page is for information only.',
      ],
      points: [
        ['What to compare first', 'Saved measurements, how job orders reach the tailor, deposits and partial payments, and how many staff users the price covers.'],
        ['Monthly or yearly', 'TexPOS is paid per year, with 1,000 AED for the first year and 500 AED per year after. Check whether the other option bills monthly and whether VAT is added.'],
        ['Check the measurements', 'TexPOS saves customer measurements, including shaila and ghutra, and each job order includes a sketch.'],
        ['See it before you decide', 'We offer a free 1-hour trial on a Zoom call, where we walk you through TexPOS live.'],
      ],
      crumb: 'Tailoring software comparison', parent: { label: 'TexPOS', href: '/texpos' },
      timelineLabel: 'Hardware', timeline: 'None, runs on your phone', price: '1,000 AED for the first year',
      waText: 'Hi MarkZone, I read your tailoring software comparison and I\'d like to see TexPOS',
      faqTitle: 'Questions tailors ask when comparing',
      faq: [
        ['How much does tailoring software cost in the UAE?', 'It depends on the product and plan. According to its own website on 6 October 2026, Tailoroo lists AED 149, 299 and 499 per month plus VAT. TexPOS is 1,000 AED for the first year, then 500 AED per year.'],
        ['How much does TexPOS cost?', 'TexPOS is 1,000 AED for the first year, then 500 AED per year. That works out to under 3 AED a day in the first year.'],
        ['Do I need a computer or special hardware for TexPOS?', 'No. TexPOS runs on the shop’s own phone, so no hardware is needed.'],
        ['Can TexPOS save shaila and ghutra measurements?', 'Yes. Customer measurements are saved, including shaila and ghutra.'],
        ['How do orders reach the tailor?', 'Each job order includes a sketch and can be printed or sent to the tailor’s WhatsApp.'],
        ['Can customers pay a deposit?', 'Yes. TexPOS handles deposits, partial payments, overdue tracking and payment history.'],
        ['Are these prices up to date?', 'We checked them on 6 October 2026 on each company’s public website. Prices and plans can change, so confirm with the company before you decide.'],
        ['Can I try TexPOS before paying?', 'Yes. We offer a free 1-hour trial on a Zoom call, where we walk you through the app live.'],
      ],
      ctaTitle: 'Want to see TexPOS for your tailoring shop?',
      ctaText: 'Tell us about your shop on WhatsApp. We’ll show you TexPOS on a free 1-hour Zoom call.',
    },
    ar: {
      schemaName: 'مقارنة TexPOS مع Tailoroo',
      title: 'TexPOS وTailoroo: أسعار برامج الخياطة في الإمارات',
      desc: 'أسعار برامج الخياطة المعلنة: TexPOS بـ 1,000 درهم للسنة الأولى، وTailoroo من 149 درهم بالشهر زائد الضريبة. مراجعة 6 أكتوبر 2026.',
      eyebrow: 'مقارنة برامج الخياطة', h1: 'TexPOS وTailoroo: بكم برنامج محل الخياطة في الإمارات؟',
      lead: 'نظرة بسيطة على الأسعار اللي تعلنها كل شركة، عشان تقارن بشكل عادل قبل ما تختار. مراجعة بتاريخ 6 أكتوبر 2026.',
      h2: 'الأسعار المعلنة جنب بعض',
      body: [
        'TexPOS: 1,000 درهم للسنة الأولى، وبعدها 500 درهم بالسنة. يعني 2,000 درهم لثلاث سنوات. وTexPOS يشتغل على تلفون المحل، ما تحتاج أجهزة زيادة.',
        'Tailoroo: صفحة الأسعار عندهم تذكر ثلاث باقات شهرية، كلها زائد الضريبة: Starter بـ 149 درهم (فرع واحد وحد أقصى 3 مستخدمين)، وBusiness بـ 299 درهم (لين 10 مستخدمين)، وEnterprise بـ 499 درهم (مستخدمين غير محدودين ومتعدد الفروع) (tailoroo.com/pricing، مراجعة بتاريخ 6 أكتوبر 2026). على 12 شهر، باقة Starter تطلع 1,788 درهم قبل الضريبة.',
        'هالمنتجات ما تشمل نفس المزايا كلها، والأسعار ممكن تتغير في أي وقت، فتأكد دايماً من السعر الحالي ومن اللي يشمله عند كل شركة. أسماء الشركات والمنتجات المذكورة ملك لأصحابها، وماركزون مو تابعة لهم، والصفحة للمعلومات فقط.',
      ],
      points: [
        ['شو تقارن أول شي', 'حفظ المقاسات، وكيف توصل أوامر الشغل للخياط، والعربون والدفعات الجزئية، وكم مستخدم يشمل السعر.'],
        ['شهري ولا سنوي', 'TexPOS يندفع بالسنة: 1,000 درهم للسنة الأولى وبعدها 500 درهم بالسنة. اسأل الخيار الثاني هل يتحاسب شهرياً وهل الضريبة تنضاف.'],
        ['تأكد من المقاسات', 'TexPOS يحفظ مقاسات الزبون، وتشمل الشيلة والغترة، وكل أمر شغل فيه رسمة.'],
        ['شوفه قبل لا تقرر', 'نوفر لك تجربة مجانية ساعة على مكالمة زوم، نمشّي معاك على TexPOS مباشرة.'],
      ],
      crumb: 'مقارنة برامج الخياطة', parent: { label: 'TexPOS', href: '/ar/texpos' },
      timelineLabel: 'الأجهزة', timeline: 'ما تحتاج، يشتغل على تلفونك', price: '1,000 درهم للسنة الأولى',
      waText: 'مرحبا ماركزون، قريت مقارنة برامج الخياطة وأبا أشوف TexPOS',
      faqTitle: 'أسئلة الخياطين وهم يقارنون',
      faq: [
        ['بكم برنامج محل الخياطة في الإمارات؟', 'يعتمد على المنتج والباقة. حسب موقعهم الرسمي بتاريخ 6 أكتوبر 2026، Tailoroo يذكر 149 و299 و499 درهم بالشهر زائد الضريبة. وTexPOS بـ 1,000 درهم للسنة الأولى، وبعدها 500 درهم بالسنة.'],
        ['بكم TexPOS؟', 'TexPOS بـ 1,000 درهم للسنة الأولى، وبعدها 500 درهم بالسنة. يعني أقل من 3 دراهم باليوم في السنة الأولى.'],
        ['أحتاج كمبيوتر أو أجهزة خاصة لـ TexPOS؟', 'لا. TexPOS يشتغل على تلفون المحل، فما تحتاج أي أجهزة.'],
        ['TexPOS يحفظ مقاسات الشيلة والغترة؟', 'إيه. مقاسات الزبون تنحفظ، وتشمل الشيلة والغترة.'],
        ['كيف توصل الطلبات للخياط؟', 'كل أمر شغل فيه رسمة، وتقدر تطبعه أو ترسله على واتساب الخياط.'],
        ['الزبون يقدر يدفع عربون؟', 'إيه. TexPOS يتعامل مع العربون والدفعات الجزئية ومتابعة المتأخرات وسجل الدفعات.'],
        ['هالأسعار محدّثة؟', 'راجعناها بتاريخ 6 أكتوبر 2026 من الموقع الرسمي لكل شركة. الأسعار والباقات ممكن تتغير، فتأكد من الشركة قبل لا تقرر.'],
        ['أقدر أجرّب TexPOS قبل ما أدفع؟', 'إيه. نوفر لك تجربة مجانية مدتها ساعة على مكالمة زوم، نمشّي معاك على التطبيق مباشرة.'],
      ],
      ctaTitle: 'تبا تشوف TexPOS لمحلك؟',
      ctaText: 'قول لنا عن محلك على الواتساب، ونوريك TexPOS في تجربة مجانية ساعة على زوم.',
    },
  },

  // ───────────── Comparison: OxPOS vs Zoho POS ─────────────
  // Facts checked against Zoho's own UAE pricing page (zoho.com/en-ae/pos/pricing.html) on 6 Oct 2026.
  {
    path: 'compare/oxpos-vs-zoho-pos', kind: 'app', app: 'oxpos',
    en: {
      schemaName: 'OxPOS compared with Zoho POS',
      title: 'OxPOS vs Zoho POS: Retail POS Prices in the UAE',
      desc: 'Published retail POS prices: OxPOS 1,500 AED with year one included, Zoho POS from AED 39 per location a month billed annually. Checked 6 Oct 2026.',
      eyebrow: 'Retail POS comparison', h1: 'OxPOS and Zoho POS: what a retail POS costs in the UAE',
      lead: 'A simple look at the prices each company publishes, so you can compare like with like before you choose. Checked on 6 October 2026.',
      h2: 'Published prices side by side',
      body: [
        'OxPOS: 1,500 AED, which includes the first year of maintenance. After that, the renewal is 500 AED per year. Over three years that is 2,500 AED.',
        'Zoho POS: its UAE pricing page shows AED 39 (Standard), AED 79 (Professional) and AED 129 (Premium) per location per month, billed annually, plus VAT, and a free plan for a single owner. Billed annually, that is AED 468, 948 and 1,548 a year per location before VAT. Add-ons listed: AED 50 per extra user and AED 100 per register, billed annually (zoho.com/en-ae/pos/pricing.html, checked 6 October 2026).',
        'These products do not include the same features, and prices can change at any time, so always confirm the current price and what is included with each company. The companies and product names mentioned belong to their owners. MarkZone is not affiliated with them, and this page is for information only.',
      ],
      points: [
        ['What to compare first', 'Which plan includes the features you need, how many users and registers are covered, and what each add-on costs.'],
        ['Count the extras', 'If you need more users or registers, add those add-on prices to the plan price before you compare.'],
        ['Check VAT reports', 'OxPOS includes VAT reports alongside sales, P&L, stock value and payment-type reports, all exportable to PDF or Excel.'],
        ['See it before you decide', 'We offer a free 1-hour trial on a Zoom call, where we walk you through OxPOS live.'],
      ],
      crumb: 'Retail POS comparison', parent: { label: 'OxPOS', href: '/oxpos' },
      timelineLabel: 'Setup', timeline: '45 min – 2 hrs', price: '1,500 AED, first year included',
      waText: 'Hi MarkZone, I read your retail POS comparison and I\'d like to see OxPOS',
      faqTitle: 'Questions shop owners ask when comparing',
      faq: [
        ['How much does a retail POS cost in the UAE?', 'It depends on the product and what you need. According to its own UAE website on 6 October 2026, Zoho POS lists AED 39, 79 and 129 per location per month billed annually, plus VAT, with a free plan for one owner. OxPOS is 1,500 AED, including the first year of maintenance, then 500 AED per year.'],
        EN.oxCost,
        EN.oxVat,
        EN.hw,
        ['Are these prices up to date?', 'We checked them on 6 October 2026 on each company’s public website. Prices and plans can change, so confirm with the company before you decide.'],
        EN.trial,
        EN.oxStart,
      ],
      ctaTitle: OX_EN.ctaTitle,
      ctaText: OX_EN.ctaText,
    },
    ar: {
      schemaName: 'مقارنة OxPOS مع Zoho POS',
      title: 'OxPOS وZoho POS: أسعار نقاط البيع للمحلات في الإمارات',
      desc: 'أسعار نقاط البيع المعلنة: OxPOS بـ 1,500 درهم والسنة الأولى مشمولة، وZoho POS من 39 درهم للموقع بالشهر تُدفع سنوياً. مراجعة 6 أكتوبر 2026.',
      eyebrow: 'مقارنة نقاط البيع', h1: 'OxPOS وZoho POS: بكم نظام نقطة البيع للمحل في الإمارات؟',
      lead: 'نظرة بسيطة على الأسعار اللي تعلنها كل شركة، عشان تقارن بشكل عادل قبل ما تختار. مراجعة بتاريخ 6 أكتوبر 2026.',
      h2: 'الأسعار المعلنة جنب بعض',
      body: [
        'OxPOS: 1,500 درهم، وتشمل صيانة السنة الأولى. بعدها التجديد 500 درهم بالسنة. يعني 2,500 درهم لثلاث سنوات.',
        'Zoho POS: صفحة الأسعار الإماراتية عندهم تذكر 39 درهم (Standard) و79 درهم (Professional) و129 درهم (Premium) للموقع بالشهر، تُدفع سنوياً، زائد الضريبة، مع باقة مجانية لصاحب محل واحد. يعني على الدفع السنوي 468 و948 و1,548 درهم بالسنة للموقع قبل الضريبة. والإضافات المذكورة: 50 درهم للمستخدم الإضافي و100 درهم لكل كاشير (register)، تُدفع سنوياً (zoho.com/en-ae/pos/pricing.html، مراجعة بتاريخ 6 أكتوبر 2026).',
        'هالمنتجات ما تشمل نفس المزايا كلها، والأسعار ممكن تتغير في أي وقت، فتأكد دايماً من السعر الحالي ومن اللي يشمله عند كل شركة. أسماء الشركات والمنتجات المذكورة ملك لأصحابها، وماركزون مو تابعة لهم، والصفحة للمعلومات فقط.',
      ],
      points: [
        ['شو تقارن أول شي', 'أي باقة تشمل المزايا اللي تحتاجها، وكم مستخدم وكاشير تغطي، وكم سعر كل إضافة.'],
        ['احسب الإضافات', 'إذا تحتاج مستخدمين أو كاشيرات زيادة، ضيف أسعار الإضافات على سعر الباقة قبل لا تقارن.'],
        ['تأكد من تقارير الضريبة', 'OxPOS فيه تقارير الضريبة مع تقارير المبيعات والأرباح والخسائر وقيمة المخزون وأنواع الدفع، وكلها تنطلع PDF أو Excel.'],
        ['شوفه قبل لا تقرر', 'نوفر لك تجربة مجانية ساعة على مكالمة زوم، نمشّي معاك على OxPOS مباشرة.'],
      ],
      crumb: 'مقارنة نقاط البيع', parent: { label: 'OxPOS', href: '/ar/oxpos' },
      timelineLabel: 'التجهيز', timeline: '45 دقيقة – ساعتين', price: '1,500 درهم، السنة الأولى مشمولة',
      waText: 'مرحبا ماركزون، قريت مقارنة نقاط البيع وأبا أشوف OxPOS',
      faqTitle: 'أسئلة أصحاب المحلات وهم يقارنون',
      faq: [
        ['بكم نظام نقطة البيع للمحل في الإمارات؟', 'يعتمد على المنتج وعلى اللي تحتاجه. حسب موقعهم الإماراتي الرسمي بتاريخ 6 أكتوبر 2026، Zoho POS يذكر 39 و79 و129 درهم للموقع بالشهر تُدفع سنوياً، زائد الضريبة، مع باقة مجانية لصاحب واحد. وOxPOS بـ 1,500 درهم تشمل صيانة السنة الأولى، وبعدها 500 درهم بالسنة.'],
        AR.oxCost,
        AR.oxVat,
        AR.hw,
        ['هالأسعار محدّثة؟', 'راجعناها بتاريخ 6 أكتوبر 2026 من الموقع الرسمي لكل شركة. الأسعار والباقات ممكن تتغير، فتأكد من الشركة قبل لا تقرر.'],
        AR.trial,
        AR.oxStart,
      ],
      ctaTitle: OX_AR.ctaTitle,
      ctaText: OX_AR.ctaText,
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
