# markzonetech.com

Static website for MarkZone Technology, built with Astro and deployed on Cloudflare Pages.

- Build command: `npm run build`
- Output directory: `dist`
- Node: 22

Content rule: every company fact must match the approved MarkZone Master File.
Company facts live in `src/data/site.ts`.

## Adding a blog post

**Option 1 — Blog Manager (no code):** open `/admin` on the live site, sign in with a GitHub
token that can write to this repo, click **New English post**, fill the fields and publish.
Saving commits a Markdown file to `src/content/blog/en/`; Cloudflare rebuilds the site in about a minute.

**Option 2 — Ask Claude:** send the topic; the post is written to Master File rules and pushed.

SEO is automatic for every post: title and meta description, canonical URL, BlogPosting,
Breadcrumb and FAQ structured data, Open Graph image, sitemap entry, RSS feed and related posts.
Posts without a cover use the default cover; run `python3 scripts/make-covers.py` (English) and `python3 scripts/make-covers-ar.py` (Arabic) to generate branded covers.
