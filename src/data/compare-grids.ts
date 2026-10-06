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
  'compare/texpos-vs-tailoroo': {
    en: {
      caption: 'Tailoring software at a glance',
      head: ['', 'TexPOS', 'Tailoroo Starter', 'Tailoroo Business', 'Tailoroo Enterprise'],
      rows: [
        ['Published price', '1,000 AED first year, then 500 AED per year', 'AED 149 per month + VAT', 'AED 299 per month + VAT', 'AED 499 per month + VAT'],
        ['Billing', 'Yearly', 'Monthly', 'Monthly', 'Monthly'],
        ['Users', 'Staff permissions included', 'Up to 3 staff users', 'Up to 10 users', 'Unlimited users'],
        ['Branches', 'Multi-branch', '1 branch', 'Not listed on the plan', 'Multi-branch'],
        ['Cost over 12 months', '1,000 AED', 'AED 1,788', 'AED 3,588', 'AED 5,988'],
        ['Cost over 3 years', '2,000 AED', 'AED 5,364', 'AED 10,764', 'AED 17,964'],
        ['Hardware', 'None, runs on the shop’s phone', 'Cloud-hosted', 'Cloud-hosted', 'Cloud-hosted'],
        ['Free trial', 'Free 1-hour Zoom trial', '14-day free trial (their site)', '14-day free trial (their site)', 'Talk to them'],
      ],
      note: 'Tailoroo figures are from tailoroo.com/pricing, checked 6 October 2026, before 5% VAT; add-ons not included. Totals are our own arithmetic. Confirm current prices with each company.',
    },
    ar: {
      caption: 'برامج الخياطة بنظرة سريعة',
      head: ['', 'TexPOS', 'Tailoroo Starter', 'Tailoroo Business', 'Tailoroo Enterprise'],
      rows: [
        ['السعر المعلن', '1,000 درهم للسنة الأولى، وبعدها 500 درهم بالسنة', '149 درهم بالشهر + الضريبة', '299 درهم بالشهر + الضريبة', '499 درهم بالشهر + الضريبة'],
        ['طريقة الدفع', 'سنوي', 'شهري', 'شهري', 'شهري'],
        ['المستخدمين', 'صلاحيات الموظفين مشمولة', 'لين 3 مستخدمين', 'لين 10 مستخدمين', 'مستخدمين غير محدودين'],
        ['الفروع', 'متعدد الفروع', 'فرع واحد', 'غير مذكور في الباقة', 'متعدد الفروع'],
        ['التكلفة لـ 12 شهر', '1,000 درهم', '1,788 درهم', '3,588 درهم', '5,988 درهم'],
        ['التكلفة لثلاث سنوات', '2,000 درهم', '5,364 درهم', '10,764 درهم', '17,964 درهم'],
        ['الأجهزة', 'ما تحتاج، يشتغل على تلفون المحل', 'على السحابة', 'على السحابة', 'على السحابة'],
        ['تجربة مجانية', 'تجربة مجانية ساعة على زوم', 'تجربة 14 يوم (حسب موقعهم)', 'تجربة 14 يوم (حسب موقعهم)', 'تواصل معهم'],
      ],
      note: 'أرقام Tailoroo من tailoroo.com/pricing، مراجعة بتاريخ 6 أكتوبر 2026، قبل ضريبة 5% وبدون الإضافات. المجاميع حسابنا نحن. تأكد من الأسعار الحالية عند كل شركة.',
    },
  },
  'compare/oxpos-vs-zoho-pos': {
    en: {
      caption: 'Retail POS at a glance',
      head: ['', 'OxPOS', 'Zoho POS Free', 'Zoho POS Standard', 'Zoho POS Professional', 'Zoho POS Premium'],
      rows: [
        ['Published price', '1,500 AED, first year included, then 500 AED per year', 'AED 0', 'AED 39 per location per month', 'AED 79 per location per month', 'AED 129 per location per month'],
        ['Billing', 'Yearly', 'Free', 'Billed annually', 'Billed annually', 'Billed annually'],
        ['Per year, 1 location', '1,500 AED (then 500 AED)', 'AED 0', 'AED 468', 'AED 948', 'AED 1,548'],
        ['Cost over 3 years', '2,500 AED', 'AED 0', 'AED 1,404', 'AED 2,844', 'AED 4,644'],
        ['Extra users and registers', 'Staff roles and permissions, multi-branch', 'Add-ons not supported', 'AED 50 per user, AED 100 per register', 'AED 50 per user, AED 100 per register', 'AED 50 per user, AED 100 per register'],
        ['Free trial', 'Free 1-hour Zoom trial', 'Free plan', '15-day free trial', '15-day free trial', '15-day free trial'],
      ],
      note: 'Zoho figures are from zoho.com/en-ae/pos/pricing.html, checked 6 October 2026, before VAT. Totals are our own arithmetic. Confirm current prices and what each plan includes with each company.',
    },
    ar: {
      caption: 'أنظمة الكاشير بنظرة سريعة',
      head: ['', 'OxPOS', 'Zoho POS المجانية', 'Zoho POS Standard', 'Zoho POS Professional', 'Zoho POS Premium'],
      rows: [
        ['السعر المعلن', '1,500 درهم والسنة الأولى مشمولة، وبعدها 500 درهم بالسنة', '0 درهم', '39 درهم للموقع بالشهر', '79 درهم للموقع بالشهر', '129 درهم للموقع بالشهر'],
        ['طريقة الدفع', 'سنوي', 'مجانية', 'تُدفع سنوياً', 'تُدفع سنوياً', 'تُدفع سنوياً'],
        ['بالسنة، موقع واحد', '1,500 درهم (وبعدها 500 درهم)', '0 درهم', '468 درهم', '948 درهم', '1,548 درهم'],
        ['التكلفة لثلاث سنوات', '2,500 درهم', '0 درهم', '1,404 درهم', '2,844 درهم', '4,644 درهم'],
        ['مستخدمين وكاشيرات زيادة', 'أدوار وصلاحيات للموظفين، فروع متعددة', 'الإضافات غير مدعومة', '50 درهم للمستخدم، 100 درهم للكاشير', '50 درهم للمستخدم، 100 درهم للكاشير', '50 درهم للمستخدم، 100 درهم للكاشير'],
        ['تجربة مجانية', 'تجربة مجانية ساعة على زوم', 'باقة مجانية', 'تجربة 15 يوم', 'تجربة 15 يوم', 'تجربة 15 يوم'],
      ],
      note: 'أرقام Zoho من zoho.com/en-ae/pos/pricing.html، مراجعة بتاريخ 6 أكتوبر 2026، قبل الضريبة. المجاميع حسابنا نحن. تأكد من الأسعار الحالية وما تشمله كل باقة عند كل شركة.',
    },
  },
};

export const RESOURCES: Record<string, Resource[]> = {
  oxpos: [
    { href: 'guides/retail-pos-uae-buyers-guide', en: 'How to choose a retail POS in the UAE', ar: 'كيف تختار نظام كاشير لمحلك', enSub: 'Buyer’s guide', arSub: 'دليل الشراء' },
    { href: 'compare/oxpos-vs-zoho-pos', en: 'OxPOS vs Zoho POS', ar: 'OxPOS مقابل Zoho POS', enSub: 'Prices side by side', arSub: 'الأسعار جنب بعض' },
  ],
  texpos: [
    { href: 'guides/tailoring-software-uae', en: 'How to choose tailoring software', ar: 'كيف تختار برنامج الخياطة', enSub: 'Buyer’s guide', arSub: 'دليل الشراء' },
    { href: 'compare/texpos-vs-tailoroo', en: 'TexPOS vs Tailoroo', ar: 'TexPOS مقابل Tailoroo', enSub: 'Prices side by side', arSub: 'الأسعار جنب بعض' },
  ],
  zainaapp: [
    { href: 'guides/salon-software-uae', en: 'How to choose salon software', ar: 'كيف تختار برنامج الصالون', enSub: 'Buyer’s guide', arSub: 'دليل الشراء' },
    { href: 'compare/zainaapp-vs-keynespos-and-salonist', en: 'ZainaApp vs KeynesPOS vs Salonist', ar: 'ZainaApp مقابل KeynesPOS وSalonist', enSub: 'Prices side by side', arSub: 'الأسعار جنب بعض' },
  ],
};
