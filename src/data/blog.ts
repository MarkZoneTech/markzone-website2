import { getCollection, type CollectionEntry } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';
export type Post = CollectionEntry<'blog'> | CollectionEntry<'blogAr'>;
export type Lang = 'en' | 'ar';

export const CAT_LABELS: Record<Lang, Record<string, string>> = {
  en: { 'retail-tips': 'Retail tips', 'salon-business': 'Salon business', 'business-growth': 'Business growth', technology: 'Technology', 'markzone-news': 'MarkZone news', tutorials: 'Video tutorials' },
  ar: { 'retail-tips': 'نصائح للمحلات', 'salon-business': 'شغل الصالونات', 'business-growth': 'نمو الشغل', technology: 'التقنية', 'markzone-news': 'أخبار ماركزون', tutorials: 'شروحات فيديو' },
};

export async function getPosts(lang: Lang = 'en'): Promise<Post[]> {
  const all = (await getCollection(lang === 'ar' ? 'blogAr' : 'blog', (p) => !p.data.draft)) as Post[];
  return all.sort((a, b) => (b.data.updated ?? b.data.date).valueOf() - (a.data.updated ?? a.data.date).valueOf() || b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title));
}
export async function hasTwin(slug: string, lang: Lang): Promise<boolean> {
  const other = await getPosts(lang === 'ar' ? 'en' : 'ar');
  return other.some((p) => p.id === slug);
}
export function readingTime(body = ''): number {
  return Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));
}
export const fmtDate = (d: Date, lang: Lang = 'en') =>
  d.toLocaleDateString(lang === 'ar' ? 'ar-AE-u-nu-latn' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
export const blogBase = (lang: Lang) => (lang === 'ar' ? '/ar/blog' : '/blog');

/** Cover image: explicit cover, else a generated cover for this language, else the default. */
export function coverFor(post: Post, lang: Lang = 'en'): string {
  if (post.data.cover) return post.data.cover;
  const auto = lang === 'ar' ? `/img/blog/ar/${post.id}.webp` : `/img/blog/${post.id}.webp`;
  return fs.existsSync(path.join(process.cwd(), 'public', auto)) ? auto : '/img/blog-default.webp';
}
