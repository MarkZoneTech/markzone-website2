import { getPosts, blogBase, coverFor } from '../data/blog';
import { SITE } from '../data/site';
import { ytThumb } from '../data/tutorials';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Video sitemap: one <url> per post that carries a YouTube video, EN and AR. */
export async function GET() {
  const entries: string[] = [];
  for (const lang of ['en', 'ar'] as const) {
    for (const p of await getPosts(lang)) {
      const v = p.data.video;
      if (!v || p.data.draft) continue;
      entries.push(`  <url>
    <loc>${SITE.url}${blogBase(lang)}/${p.id}</loc>
    <video:video>
      <video:thumbnail_loc>${ytThumb(v.id)}</video:thumbnail_loc>
      <video:title>${esc(p.data.title)}</video:title>
      <video:description>${esc(p.data.description)}</video:description>
      <video:player_loc>https://www.youtube.com/embed/${v.id}</video:player_loc>
      <video:duration>${v.duration}</video:duration>
      <video:publication_date>${v.uploaded}</video:publication_date>
    </video:video>
  </url>`);
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
