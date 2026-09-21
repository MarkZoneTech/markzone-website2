import { getCollection, type CollectionEntry } from 'astro:content';
export type Post = CollectionEntry<'blog'>;
export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('blog', (p) => !p.data.draft);
  return all.sort((a, b) => (b.data.updated ?? b.data.date).valueOf() - (a.data.updated ?? a.data.date).valueOf());
}
export function readingTime(body = ''): number {
  return Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));
}
export const fmtDate = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
import fs from 'node:fs';
import path from 'node:path';
/** Cover image: explicit cover, else the generated /img/blog/<slug>.webp, else the default. */
export function coverFor(post: Post): string {
  if (post.data.cover) return post.data.cover;
  const auto = `/img/blog/${post.id}.webp`;
  return fs.existsSync(path.join(process.cwd(), 'public', auto)) ? auto : '/img/blog-default.webp';
}
