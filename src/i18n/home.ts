// Homepage copy. EN is approved-draft; AR (Emirati dialect) awaits Fadi's approval.
export interface HomeCopy {
  title: string; description: string;
  kicker: string; h1a: string; h1b: string; lead: string;
  ctaWa: string; ctaApps: string;
  trust: [string, string][]; ratingLabel: string;
  browserLabel: string; chipSub: string;
  whyEyebrow: string; whyH2: string; whyP: string; pains: [string, string][];
  appsEyebrow: string; appsH2: string; appsP: string; explore: string;
  hwLine: string; hwRest: string; soonLabel: string; soon: string[];
  stats: [string, string][]; statsLabel: string;
  svcEyebrow: string; svcH2: string; svcP: string; services: { h: string; p: string; t: string; href: string }[];
  inclEyebrow: string; inclH2: string; inclP: string; inclCta: string; included: [string, string][];
  valEyebrow: string; valH2: string; valP: string; why: [string, string][];
  faqTitle: string; faq: [string, string][];
  ctaTitle: string; ctaText: string; ctaCall: string;
  apps: Record<string, { for: string; problem: string; features: string[]; platform: string; priceNote: string; renewal: string; shotAlt: string }>;
  aed: string;
}

export const EN: HomeCopy = {
  title: 'MarkZone Technology | Business Apps, POS & Websites in Dubai, UAE',
  description: 'Dubai software company helping UAE SMEs get organized: OxPOS for retail, ZainaApp for salons, TexPOS for tailors, plus websites in 2 weeks. Trusted by 400+ businesses since 2019.',
  kicker: 'Business software for UAE SMEs · Since 2019',
  h1a: 'Organize your business.', h1b: 'Grow your sales.',
  lead: 'Apps made for how UAE shops, salons and tailors actually work. Sales, stock, staff and reports in one place, set up the same day, with real local support on WhatsApp.',
  ctaWa: 'Chat on WhatsApp', ctaApps: 'Explore our apps',
  trust: [['400+', 'businesses since 2019'], ['All 7', 'emirates']], ratingLabel: 'on Google ({n} reviews)',
  browserLabel: 'OxPOS · Inventory', chipSub: 'Salons & spas',
  whyEyebrow: 'Why we exist',
  whyH2: 'Most SMEs don’t struggle because of marketing. They struggle because the business isn’t organized.',
  whyP: 'We started MarkZone after seeing UAE businesses pay too much for software and get poor support afterwards. Along the way we learned something bigger: disorganization quietly costs shops their sales and their leads. Organizing the business became the core of every app we build.',
  pains: [
    ['Stock you can’t see', 'You find out an item is finished when a customer asks for it.'],
    ['Numbers in five places', 'Sales in one notebook, expenses in another, salaries in someone’s phone.'],
    ['Staff you can’t track', 'Commissions, shifts and cash drawers argued about at month end.'],
  ],
  appsEyebrow: 'Our apps', appsH2: 'One app for your industry. Not a generic system.',
  appsP: 'Each app is built around one type of business, in Arabic and English, with VAT-ready reports in AED.',
  explore: 'Explore {name}',
  hwLine: 'Compatible hardware available.', hwRest: 'Accounting is covered too, through our integrated accounting solution.',
  soonLabel: 'Coming Soon', soon: ['MadaPOS · Restaurants & cafés', 'AqarOS · Real estate agencies'],
  statsLabel: 'MarkZone in numbers',
  stats: [['400+', 'businesses have trusted MarkZone since 2019'], ['15+', 'businesses on our new-generation apps in their first months'], ['7', 'emirates served, from Abu Dhabi to Fujairah'], ['< 2 hrs', 'typical setup, often as quick as 45 minutes']],
  svcEyebrow: 'What we do', svcH2: 'Software that fits your flow',
  svcP: 'We create, deploy, sell and support software, from ready-made apps to websites and fully custom systems.',
  services: [
    { h: 'Business management apps', p: 'Ready-made apps for each industry, set up and running the same day.', t: 'From 1,000 AED', href: '#apps' },
    { h: 'Websites & web design', p: 'A professional website for your business, delivered within 2 weeks.', t: 'Quote on request', href: '/websites' },
    { h: 'Custom software & mobile apps', p: 'Systems built around exactly how you work, fully delivered from about 2 months depending on size.', t: 'Quote on request', href: '/custom-software' },
  ],
  inclEyebrow: 'Included with every app', inclH2: 'Outstanding service is the standard. Never an upgrade.',
  inclP: 'Whether you choose a ready-made app or a custom system, every client gets the same support from day one.', inclCta: 'Talk to us',
  included: [
    ['Onboarding & setup', 'We install, configure and train your team.'],
    ['Data migration from Excel', 'Bring your existing items and customers with you, where available.'],
    ['Full WhatsApp support', 'Real people in the UAE, daily 10 AM – 10 PM. Sunday off.'],
    ['On-site visits', 'When the situation needs someone at your shop, we come.'],
  ],
  valEyebrow: 'Why MarkZone', valH2: 'Smart software. Fair price. Real support.',
  valP: 'Unlike expensive, complicated systems, our apps are built to be affordable for SMEs and easy for any staff member to use.',
  why: [
    ['Built for UAE businesses', 'Arabic & English, VAT-ready reports, AED throughout.'],
    ['Made for your industry', 'Retail, salons and tailoring each get their own app, not a generic system.'],
    ['Fast delivery', 'Apps running the same day, websites in 2 weeks, custom apps from about 2 months.'],
    ['Fair, clear pricing', 'One-time setup with the first year included, then a low yearly renewal. No hidden costs.'],
    ['Real local support', 'WhatsApp support every day except Sunday, plus on-site visits when needed.'],
    ['Everything in one place', 'Sales, stock, purchases, expenses, staff and reports together.'],
  ],
  faqTitle: 'Questions owners ask us',
  faq: [
    ['How much does OxPOS cost?', 'OxPOS is 1,500 AED including the first year of maintenance, then 500 AED per year. ZainaApp is priced the same. TexPOS is 1,000 AED for the first year, then 500 AED per year.'],
    ['How long does setup take?', 'Most businesses are up and running the same day. Setup usually takes between 45 minutes and 2 hours.'],
    ['Do I need to buy new hardware?', 'Not necessarily. OxPOS and ZainaApp run on Windows and can be managed from any device on the web, and TexPOS runs on your own phone. Compatible hardware is available if you need it.'],
    ['Which emirates do you serve?', 'We are based in Dubai and serve businesses in all 7 emirates.'],
    ['What support do I get?', 'Full WhatsApp support daily from 10 AM to 10 PM (Sunday off), plus on-site visits when needed.'],
  ],
  ctaTitle: 'Ready to get your business organized?',
  ctaText: 'Tell us what you sell and how you work. We’ll show you the right app on WhatsApp, same day.', ctaCall: 'Call us',
  aed: 'AED',
  apps: {
    oxpos: { for: 'Retail shops', problem: 'Inventory, purchases, salaries and expenses scattered everywhere. OxPOS puts them in one place, with the reports to match.', features: ['Fast point of sale with barcode scanning, split payments and returns', 'Full inventory control with low-stock and expiry alerts', 'Consignment module for stores hosting small vendors', 'Multi-branch with staff roles and permissions'], platform: 'Runs on Windows, managed from any device on the web.', priceNote: 'Includes first-year maintenance', renewal: 'then 500 AED / year', shotAlt: 'OxPOS products screen with stock levels and prices' },
    zainaapp: { for: 'Salons & spas', problem: 'Messy appointment books and staff commissions nobody can track. ZainaApp organizes both.', features: ['Appointments calendar with walk-ins and live booking alerts', 'Online booking page for every salon', 'Automatic WhatsApp booking notifications', 'Staff commissions, attendance and performance'], platform: 'Runs on Windows, managed from any device on the web.', priceNote: 'Includes first-year maintenance', renewal: 'then 500 AED / year', shotAlt: 'ZainaApp appointments calendar' },
    texpos: { for: 'Tailoring shops', problem: 'Measurements and order details get lost between the counter and the tailor. TexPOS keeps every detail with the order.', features: ['Saved customer measurements, including shaila and ghutra', 'Job orders with sketch, printed or sent to the tailor on WhatsApp', 'Deposits, partial payments and overdue tracking', 'Fabric by the meter, items by the piece'], platform: "Runs on the shop's own phone. No hardware needed.", priceNote: 'First year', renewal: 'then 500 AED / year', shotAlt: 'TexPOS saved customer measurements on a phone' },
  },
};

export const AR: HomeCopy = {
  title: 'ماركزون تكنولوجي | برامج إدارة المحلات ونقاط البيع وتصميم المواقع في دبي',
  description: 'شركة برمجيات في دبي تساعد الشركات الصغيرة في الإمارات تنظم شغلها: OxPOS للمحلات، ZainaApp للصالونات، TexPOS للخياطين، ومواقع تتسلم خلال أسبوعين.',
  kicker: 'برامج للشركات الصغيرة والمتوسطة في الإمارات · من 2019',
  h1a: 'نظّم شغلك..', h1b: 'وكبّر مبيعاتك',
  lead: 'تطبيقات مسوية على طريقة شغل المحلات والصالونات والخياطين في الإمارات. المبيعات والمخزون والموظفين والتقارير في مكان واحد، تشتغل من نفس اليوم، ودعم محلي حقيقي على الواتساب.',
  ctaWa: 'كلمنا واتساب', ctaApps: 'شوف تطبيقاتنا',
  trust: [['+400', 'شركة وثقت فينا من 2019'], ['كل', 'الإمارات السبع']], ratingLabel: 'على جوجل ({n} تقييم)',
  browserLabel: 'OxPOS · المخزون', chipSub: 'صالونات وسبا',
  whyEyebrow: 'ليش بدينا',
  whyH2: 'أغلب الشركات الصغيرة ما تتعب بسبب التسويق.. تتعب لأن شغلها مب منظم.',
  whyP: 'بدينا ماركزون لما شفنا الشركات في الإمارات تدفع وايد على البرامج، وبعدها ما تلقى دعم عدل. ومع الوقت فهمنا شي أكبر: الفوضى في الشغل تضيّع على المحلات مبيعاتها وعملاءها بدون ما تحس. عشان جي، تنظيم الشغل صار أساس كل تطبيق نسويه.',
  pains: [
    ['مخزون ما تشوفه', 'تدري إن الصنف خلص لما الزبون يسأل عنه.'],
    ['أرقامك في خمس أماكن', 'المبيعات في دفتر، والمصاريف في دفتر ثاني، والرواتب في تلفون واحد من الموظفين.'],
    ['موظفين ما تقدر تتابعهم', 'العمولات والشفتات والكاش.. نقاش كل آخر شهر.'],
  ],
  appsEyebrow: 'تطبيقاتنا', appsH2: 'تطبيق لمجال شغلك.. مب نظام عام.',
  appsP: 'كل تطبيق مبني لنوع واحد من الشغل، بالعربي والإنجليزي، وتقاريره جاهزة للضريبة وبالدرهم.',
  explore: 'تعرّف على {name}',
  hwLine: 'الأجهزة المتوافقة متوفرة.', hwRest: 'والمحاسبة بعد مغطاة، عن طريق حل المحاسبة المتكامل.',
  soonLabel: 'قريباً', soon: ['MadaPOS · مطاعم وكافيهات', 'AqarOS · مكاتب العقارات'],
  statsLabel: 'ماركزون بالأرقام',
  stats: [['+400', 'شركة وثقت في ماركزون من 2019'], ['+15', 'شركة على تطبيقاتنا الجديدة من أول شهورها'], ['7', 'إمارات نخدمها، من أبوظبي لين الفجيرة'], ['أقل من ساعتين', 'وقت التشغيل عادةً، وأحياناً 45 دقيقة بس']],
  svcEyebrow: 'شو نسوي', svcH2: 'برامج على مقاس شغلك',
  svcP: 'نصمم ونركّب ونبيع وندعم البرامج، من التطبيقات الجاهزة لين المواقع والأنظمة الخاصة.',
  services: [
    { h: 'تطبيقات إدارة الأعمال', p: 'تطبيقات جاهزة لكل مجال، تتركب وتشتغل من نفس اليوم.', t: 'من 1,000 درهم', href: '#apps' },
    { h: 'المواقع الإلكترونية', p: 'موقع احترافي لشغلك، يتسلم خلال أسبوعين.', t: 'السعر حسب الطلب', href: '/ar/websites' },
    { h: 'برامج وتطبيقات حسب الطلب', p: 'أنظمة مبنية على طريقة شغلك بالضبط، تتسلم كاملة من حوالي شهرين حسب حجم المشروع.', t: 'السعر حسب الطلب', href: '/ar/custom-software' },
  ],
  inclEyebrow: 'مشمول مع كل تطبيق', inclH2: 'الخدمة الممتازة هي الأساس.. مب إضافة بفلوس.',
  inclP: 'سواء اخترت تطبيق جاهز أو نظام خاص، كل عميل ياخذ نفس الدعم من أول يوم.', inclCta: 'تكلّم ويانا',
  included: [
    ['التجهيز والتركيب', 'نركّب النظام ونجهزه وندرّب فريقك.'],
    ['نقل البيانات من الإكسل', 'جيب أصنافك وعملاءك وياك، إذا كانت موجودة.'],
    ['دعم كامل على الواتساب', 'ناس حقيقيين في الإمارات، يومياً من 10 الصبح لين 10 الليل. الأحد إجازة.'],
    ['زيارات للموقع', 'إذا احتاج الموضوع حد يجيك المحل، نجيك.'],
  ],
  valEyebrow: 'ليش ماركزون', valH2: 'برامج ذكية، سعر عادل، ودعم حقيقي',
  valP: 'مب مثل الأنظمة الغالية والمعقدة، تطبيقاتنا مسوية عسب تكون في متناول الشركات الصغيرة وسهلة على أي موظف.',
  why: [
    ['مسوية لشركات الإمارات', 'عربي وإنجليزي، تقارير جاهزة للضريبة، وكل شي بالدرهم.'],
    ['مصممة لمجال شغلك', 'التجزئة والصالونات والخياطة، كل واحد له تطبيقه، مب نظام عام.'],
    ['تسليم سريع', 'التطبيقات تشتغل من نفس اليوم، المواقع خلال أسبوعين، والتطبيقات الخاصة من حوالي شهرين.'],
    ['أسعار واضحة وعادلة', 'تدفع مرة وحدة للتجهيز والسنة الأولى مشمولة، وبعدها تجديد سنوي بسيط. بدون تكاليف مخفية.'],
    ['دعم محلي حقيقي', 'دعم على الواتساب كل يوم ما عدا الأحد، وزيارات للموقع إذا احتجت.'],
    ['كل شي في مكان واحد', 'المبيعات والمخزون والمشتريات والمصاريف والموظفين والتقارير مع بعض.'],
  ],
  faqTitle: 'أسئلة يسألونا عنها أصحاب المحلات',
  faq: [
    ['بكم OxPOS؟', 'OxPOS بـ 1,500 درهم وتشمل صيانة السنة الأولى، وبعدها 500 درهم بالسنة. ZainaApp بنفس السعر. TexPOS بـ 1,000 درهم للسنة الأولى، وبعدها 500 درهم بالسنة.'],
    ['التركيب ياخذ كم وقت؟', 'أغلب الشركات تشتغل من نفس اليوم. التجهيز عادةً ياخذ من 45 دقيقة لين ساعتين.'],
    ['لازم أشتري أجهزة جديدة؟', 'مب شرط. OxPOS وZainaApp يشتغلون على ويندوز وتقدر تتابعهم من أي جهاز عن طريق الويب، وTexPOS يشتغل على تلفونك. وإذا تحتاج أجهزة، الأجهزة المتوافقة متوفرة.'],
    ['أي إمارات تخدمون؟', 'مقرنا في دبي ونخدم الشركات في كل الإمارات السبع.'],
    ['شو الدعم اللي بحصّله؟', 'دعم كامل على الواتساب يومياً من 10 الصبح لين 10 الليل (الأحد إجازة)، وزيارات للموقع إذا احتاج الأمر.'],
  ],
  ctaTitle: 'جاهز ترتّب شغلك؟',
  ctaText: 'قول لنا شو تبيع وكيف تشتغل، ونوريك التطبيق المناسب على الواتساب في نفس اليوم.', ctaCall: 'اتصل بنا',
  aed: 'درهم',
  apps: {
    oxpos: { for: 'محلات التجزئة', problem: 'المخزون والمشتريات والرواتب والمصاريف متفرقة في كل مكان. OxPOS يجمعها في مكان واحد مع التقارير اللي تحتاجها.', features: ['نقطة بيع سريعة مع الباركود وتقسيم الدفع والمرتجعات', 'تحكم كامل في المخزون مع تنبيهات النقص وانتهاء الصلاحية', 'نظام بضاعة الأمانة للمحلات اللي تعرض منتجات المشاريع المنزلية والبياعين الصغار', 'فروع متعددة مع صلاحيات لكل موظف'], platform: 'يشتغل على ويندوز، وتتابع شغلك من أي جهاز عن طريق الويب.', priceNote: 'تشمل صيانة السنة الأولى', renewal: 'وبعدها 500 درهم بالسنة', shotAlt: 'شاشة المنتجات في OxPOS مع الكميات والأسعار' },
    zainaapp: { for: 'صالونات وسبا', problem: 'دفتر مواعيد ملخبط وعمولات موظفين محد يقدر يحسبها. ZainaApp ينظم الثنتين.', features: ['تقويم مواعيد مع الووك إن وتنبيهات الحجز أول بأول', 'صفحة حجز أونلاين لكل صالون', 'إشعارات حجز تلقائية على الواتساب', 'عمولات الموظفين والحضور والأداء'], platform: 'يشتغل على ويندوز، وتتابع صالونك من أي جهاز عن طريق الويب.', priceNote: 'تشمل صيانة السنة الأولى', renewal: 'وبعدها 500 درهم بالسنة', shotAlt: 'تقويم المواعيد في ZainaApp' },
    texpos: { for: 'محلات الخياطة', problem: 'المقاسات وتفاصيل الطلب تضيع بين الكاونتر والخياط. TexPOS يحفظ كل تفصيل مع الطلب.', features: ['حفظ مقاسات الزباين، ومنها الشيلة والغترة', 'أوامر شغل مع رسمة، تنطبع أو تنرسل للخياط على الواتساب', 'العربون والدفعات الجزئية ومتابعة المتأخر', 'القماش بالمتر والقطع بالحبة'], platform: 'يشتغل على تلفون المحل نفسه، وما يحتاج أجهزة.', priceNote: 'السنة الأولى', renewal: 'وبعدها 500 درهم بالسنة', shotAlt: 'مقاسات الزبون محفوظة في TexPOS على التلفون' },
  },
};
