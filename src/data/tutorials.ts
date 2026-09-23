import { getPosts, type Post, type Lang } from './blog';

/** Video tutorial series shown on /blog/tutorials. Add a series here, then add posts with category "tutorials". */
export const SERIES = {
  oxpos: {
    name: 'OxPOS', accent: '#DF7F36', logo: '/img/oxpos-logo.webp', page: 'oxpos',
    playlist: 'https://www.youtube.com/playlist?list=PL15QgJm3e6TATWFh6wT5HNidfb-mLMEDY',
    en: { title: 'OxPOS video tutorials', lead: 'Retail management, step by step: selling at the counter, products and stock, purchases, staff, branches and reports.' },
    ar: { title: 'شروحات OxPOS بالفيديو', lead: 'إدارة المحل خطوة بخطوة: البيع على الكاشير، المنتجات والمخزون، المشتريات، الموظفين، الفروع والتقارير.' },
  },
  texpos: {
    name: 'TexPOS', accent: '#BF9B30', logo: '/img/texpos-logo.webp', page: 'texpos',
    playlist: 'https://www.youtube.com/playlist?list=PLUGRxqvOpOO0',
    en: { title: 'TexPOS video tutorials', lead: 'Tailoring shop management, step by step: orders, measurements, job orders and customer files.' },
    ar: { title: 'شروحات TexPOS بالفيديو', lead: 'إدارة محل الخياطة خطوة بخطوة: الطلبات، المقاسات، أوامر الشغل وملفات العملاء.' },
  },
  zainaapp: {
    name: 'ZainaApp', accent: '#B8862F', logo: '/img/zaina-logo.webp', page: 'zainaapp', playlist: '',
    en: { title: 'ZainaApp video tutorials', lead: 'Salon and spa management, step by step.' },
    ar: { title: 'شروحات ZainaApp بالفيديو', lead: 'إدارة الصالون والسبا خطوة بخطوة.' },
  },
} as const;
export type SeriesKey = keyof typeof SERIES;

/** Learning paths inside each series, in display order. */
export const GROUPS: Record<string, { en: string; ar: string }> = {
  'start': { en: 'Getting started', ar: 'البداية' },
  'selling': { en: 'Selling at the counter', ar: 'البيع على الكاشير' },
  'products': { en: 'Products & stock', ar: 'المنتجات والمخزون' },
  'staff': { en: 'Staff & users', ar: 'الموظفين والمستخدمين' },
  'money': { en: 'Expenses, branches & reports', ar: 'المصاريف والفروع والتقارير' },
  'orders': { en: 'Orders & customers', ar: 'الطلبات والعملاء' },
};

export async function getTutorials(lang: Lang, series?: SeriesKey): Promise<Post[]> {
  const all = (await getPosts(lang)).filter((p) => p.data.category === 'tutorials' && p.data.video);
  return all.filter((p) => !series || p.data.video!.series === series).sort((a, b) => a.data.video!.lesson - b.data.video!.lesson);
}

export const mmss = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
export const isoDuration = (sec: number) => `PT${Math.floor(sec / 60)}M${sec % 60}S`;
export const toSec = (t: string) => t.split(':').reduce((a, b) => a * 60 + Number(b), 0);
export const ytWatch = (id: string, t = 0) => `https://www.youtube.com/watch?v=${id}${t ? `&t=${t}s` : ''}`;
export const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
