import rss from '@astrojs/rss';
import { getPosts } from '../data/blog';
export async function GET(context: { site: URL }) {
  const posts = await getPosts();
  return rss({
    title: 'MarkZone Technology Blog',
    description: 'Practical guides for UAE shop, salon and SME owners.',
    site: context.site,
    items: posts.map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.date, link: `/blog/${p.id}` })),
  });
}
