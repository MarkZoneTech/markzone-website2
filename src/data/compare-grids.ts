// Side-by-side grids for the comparison pages. Competitor cells hold only what each
// company publishes on its own website (checked 6 Oct 2026); anything else says to check with them.
export interface Grid { caption: string; head: string[]; rows: string[][]; note: string }
export interface Resource { href: string; en: string; ar: string; enSub: string; arSub: string }

export const GRIDS: Record<string, { en: Grid; ar: Grid }> = {
  'compare/zainaapp-vs-keynespos-and-salonist': {
    en: {
      caption: 'Salon software at a glance',
      head: ['', 'ZainaApp', 'KeynesPOS', 'Salonist'],
      rows: [
        ['Published price', '1,500 AED, first year included', 'AED 3,000 per branch per year', 'USD 59, 109 or 179 per month'],
        ['In dirhams', '1,500 AED, then 500 AED per year', 'AED 3,000 per year', 'About AED 217, 400 or 657 per month'],
        ['Billing', 'Yearly', 'Yearly, per branch', 'Monthly'],
        ['Staff limit', 'Staff, attendance and commissions included', 'Unlimited team members', 'Unlimited staff on every plan'],
        ['Cost over 3 years (1 branch)', '2,500 AED', 'About AED 9,000', 'About AED 7,800 to 23,700'],
        ['Free trial', 'Free 1-hour Zoom trial', 'Check with the company', 'Check with the company'],
      ],
      note: 'Three-year figures are our own arithmetic from the published prices (before VAT, extras not included). Checked 6 October 2026. Confirm current prices with each company.',
    },
    ar: {
      caption: 'برامج الصالونات بنظرة سريعة',
      head: ['', 'ZainaApp', 'KeynesPOS', 'Salonist'],
      rows: [
        ['السعر المعلن', '1,500 درهم والسنة الأولى مشمولة', '3,000 درهم للفرع بالسنة', '59 أو 109 أو 179 دولار بالشهر'],
        ['بالدرهم', '1,500 درهم، وبعدها 500 درهم بالسنة', '3,000 درهم بالسنة', 'تقريباً 217 أو 400 أو 657 درهم بالشهر'],
        ['طريقة الدفع', 'سنوي', 'سنوي لكل فرع', 'شهري'],
        ['عدد الموظفين', 'الموظفين والحضور والعمولات مشمولة', 'موظفين غير محدودين', 'موظفين غير محدودين في كل الباقات'],
        ['التكلفة لثلاث سنوات (فرع واحد)', '2,500 درهم', 'تقريباً 9,000 درهم', 'تقريباً من 7,800 لين 23,700 درهم'],
        ['تجربة مجانية', 'تجربة مجانية ساعة على زوم', 'اسأل الشركة', 'اسأل الشركة'],
      ],
      note: 'أرقام الثلاث سنوات حسابنا نحن من الأسعار المعلنة (قبل الضريبة وبدون الإضافات). مراجعة بتاريخ 6 أكتوبر 2026. تأكد من الأسعار الحالية عند كل شركة.',
    },
  },
  'compare/texpos-vs-tailoroo-and-tailorsync': {
    en: {
      caption: 'Tailoring software at a glance (entry plans)',
      head: ['', 'TexPOS', 'Tailoroo Starter', 'TailorSync Starter'],
      rows: [
        ['Published price', '1,000 AED first year, then 500 AED per year', 'AED 149 per month + VAT', 'AED 99 per month (VAT not stated)'],
        ['Billing', 'Yearly', 'Monthly', 'Monthly'],
        ['Users', 'Staff permissions included', 'Up to 3 staff users', 'Up to 5 users'],
        ['Branches', 'Each branch is added as a new shop, managed from the same platform', '1 branch', 'Single location'],
        ['Cost over 12 months', '1,000 AED', 'AED 1,788', 'AED 1,188'],
        ['Cost over 3 years', '2,000 AED', 'AED 5,364', 'AED 3,564'],
        ['Hardware', 'None, works on any device', 'Cloud-hosted', 'Cloud-hosted'],
        ['Free trial', 'Free 1-hour Zoom trial', '14-day free trial (their site)', '30-day free trial (their site)'],
      ],
      note: 'Only each competitor’s entry plan is shown. Figures are from tailoroo.com/pricing and the TailorSync pricing page, checked 6 October 2026; add-ons not included. Totals are our own arithmetic. Confirm current prices with each company.',
    },
    ar: {
      caption: 'برامج الخياطة بنظرة سريعة (الباقات الأساسية)',
      head: ['', 'TexPOS', 'Tailoroo Starter', 'TailorSync Starter'],
      rows: [
        ['السعر المعلن', '1,000 درهم للسنة الأولى، وبعدها 500 درهم بالسنة', '149 درهم بالشهر + الضريبة', '99 درهم بالشهر (الضريبة غير مذكورة)'],
        ['طريقة الدفع', 'سنوي', 'شهري', 'شهري'],
        ['المستخدمين', 'صلاحيات الموظفين مشمولة', 'لين 3 مستخدمين', 'لين 5 مستخدمين'],
        ['الفروع', 'كل فرع ينضاف كمحل جديد، وتديره من نفس المنصة', 'فرع واحد', 'موقع واحد'],
        ['التكلفة لـ 12 شهر', '1,000 درهم', '1,788 درهم', '1,188 درهم'],
        ['التكلفة لثلاث سنوات', '2,000 درهم', '5,364 درهم', '3,564 درهم'],
        ['الأجهزة', 'ما تحتاج، يشتغل على أي جهاز', 'على السحابة', 'على السحابة'],
        ['تجربة مجانية', 'تجربة مجانية ساعة على زوم', 'تجربة 14 يوم (حسب موقعهم)', 'تجربة 30 يوم (حسب موقعهم)'],
      ],
      note: 'نعرض بس الباقة الأساسية لكل منافس. الأرقام من tailoroo.com/pricing وصفحة أسعار TailorSync، مراجعة بتاريخ 6 أكتوبر 2026، بدون الإضافات. المجاميع حسابنا نحن. تأكد من الأسعار الحالية عند كل شركة.',
    },
  },
  'compare/oxpos-vs-zoho-pos-and-daftra': {
    en: {
      caption: 'Retail POS at a glance (entry plans)',
      head: ['', 'OxPOS', 'Zoho POS Standard', 'Daftra Basic'],
      rows: [
        ['Published price', '1,500 AED, first year included, then 500 AED per year', 'AED 39 per location per month + VAT', 'USD 30 per month, or USD 240 per year'],
        ['In dirhams', '1,500 AED (then 500 AED)', 'AED 39 per month', 'About AED 110 per month, or AED 881 per year'],
        ['Billing', 'Yearly', 'Billed annually', 'Monthly or yearly'],
        ['Per year, 1 location', '1,500 AED (then 500 AED)', 'AED 468', 'About AED 881 (yearly plan)'],
        ['Cost over 3 years', '2,500 AED', 'AED 1,404', 'About AED 2,644 (yearly plan)'],
        ['Users and limits', 'Staff roles and permissions included', 'AED 50 per extra user, AED 100 per register', '1 employee, 100 invoices and 100 clients per month'],
        ['Branches', 'Each branch is added as a new shop, managed from the same platform', 'Priced per location', 'Extra branches cost extra'],
        ['Free trial', 'Free 1-hour Zoom trial', '15-day free trial', '14-day free trial'],
      ],
      note: 'Only each competitor’s entry plan is shown. Figures are from zoho.com/en-ae/pos/pricing.html and daftra.com pricing, checked 6 October 2026. Daftra prices in USD and may run promotions; dirham figures are approximate. Totals are our own arithmetic, before VAT. Confirm current prices with each company.',
    },
    ar: {
      caption: 'أنظمة الكاشير بنظرة سريعة (الباقات الأساسية)',
      head: ['', 'OxPOS', 'Zoho POS Standard', 'Daftra Basic'],
      rows: [
        ['السعر المعلن', '1,500 درهم والسنة الأولى مشمولة، وبعدها 500 درهم بالسنة', '39 درهم للموقع بالشهر + الضريبة', '30 دولار بالشهر، أو 240 دولار بالسنة'],
        ['بالدرهم', '1,500 درهم (وبعدها 500 درهم)', '39 درهم بالشهر', 'تقريباً 110 درهم بالشهر، أو 881 درهم بالسنة'],
        ['طريقة الدفع', 'سنوي', 'تُدفع سنوياً', 'شهري أو سنوي'],
        ['بالسنة، موقع واحد', '1,500 درهم (وبعدها 500 درهم)', '468 درهم', 'تقريباً 881 درهم (الباقة السنوية)'],
        ['التكلفة لثلاث سنوات', '2,500 درهم', '1,404 درهم', 'تقريباً 2,644 درهم (الباقة السنوية)'],
        ['المستخدمين والحدود', 'أدوار وصلاحيات للموظفين مشمولة', '50 درهم للمستخدم الإضافي، 100 درهم للكاشير', 'موظف واحد، 100 فاتورة و100 عميل بالشهر'],
        ['الفروع', 'كل فرع ينضاف كمحل جديد، وتديره من نفس المنصة', 'السعر لكل موقع', 'الفروع الإضافية بسعر زيادة'],
        ['تجربة مجانية', 'تجربة مجانية ساعة على زوم', 'تجربة 15 يوم', 'تجربة 14 يوم'],
      ],
      note: 'نعرض بس الباقة الأساسية لكل منافس. الأرقام من zoho.com/en-ae/pos/pricing.html وصفحة أسعار daftra.com، مراجعة بتاريخ 6 أكتوبر 2026. Daftra تسعّر بالدولار وممكن يكون عندها عروض، وأرقام الدرهم تقريبية. المجاميع حسابنا نحن، قبل الضريبة. تأكد من الأسعار الحالية عند كل شركة.',
    },
  },
};

export const RESOURCES: Record<string, Resource[]> = {
  oxpos: [
    { href: 'guides/retail-pos-uae-buyers-guide', en: 'How to choose a retail POS in the UAE', ar: 'كيف تختار نظام كاشير لمحلك', enSub: 'Buyer’s guide', arSub: 'دليل الشراء' },
    { href: 'compare/oxpos-vs-zoho-pos-and-daftra', en: 'OxPOS vs Zoho POS vs Daftra', ar: 'OxPOS مقابل Zoho POS وDaftra', enSub: 'Prices side by side', arSub: 'الأسعار جنب بعض' },
  ],
  texpos: [
    { href: 'guides/tailoring-software-uae', en: 'How to choose tailoring software', ar: 'كيف تختار برنامج الخياطة', enSub: 'Buyer’s guide', arSub: 'دليل الشراء' },
    { href: 'compare/texpos-vs-tailoroo-and-tailorsync', en: 'TexPOS vs Tailoroo vs TailorSync', ar: 'TexPOS مقابل Tailoroo وTailorSync', enSub: 'Prices side by side', arSub: 'الأسعار جنب بعض' },
  ],
  zainaapp: [
    { href: 'guides/salon-software-uae', en: 'How to choose salon software', ar: 'كيف تختار برنامج الصالون', enSub: 'Buyer’s guide', arSub: 'دليل الشراء' },
    { href: 'compare/zainaapp-vs-keynespos-and-salonist', en: 'ZainaApp vs KeynesPOS vs Salonist', ar: 'ZainaApp مقابل KeynesPOS وSalonist', enSub: 'Prices side by side', arSub: 'الأسعار جنب بعض' },
  ],
};
