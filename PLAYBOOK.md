# MarkZone Website Playbook

The single reference for updating markzonetech.com: adding a product or service, publishing blog posts, and keeping design and SEO consistent. Company facts always come from the approved **MarkZone Master File**. If a fact is not there, ask Fadi before publishing it.

## 1. Stack & settings

| Item | Setting |
|---|---|
| Framework | Astro 5, fully static (every page is pre-rendered HTML) |
| Repo | `MarkZoneTech/markzone-website2`, branch `main` |
| Hosting | Cloudflare Worker `markzone-website2` (static assets). Every push to `main` rebuilds in about a minute |
| Test URL | `markzone-website2.markzone-computers.workers.dev` (until launch) |
| Domain | `markzonetech.com`; DNS at Hostinger |
| Cloudflare config | `wrangler.jsonc`: custom 404 page, no trailing slashes |
| Headers / redirects | `public/_headers` (caching, security), `public/_redirects` (old site URLs → new, 301) |
| Build | `npm run build` → `dist/`; Node 22 |
| Backend | None on the marketing site. The Growth Partner portal and admin stay on the Lovable project |

## 2. Where things live

| What | File |
|---|---|
| Company facts: phone, email, address, hours, credentials, Google rating and Maps link | `src/data/site.ts` |
| Homepage app cards (EN) | `src/data/site.ts` → `APPS` |
| Product pages (EN) | `src/data/products.ts` |
| Product pages (AR) | `src/data/products.ar.ts` |
| Homepage copy (EN + AR) | `src/i18n/home.ts` |
| Page templates | `src/components/` (`Home`, `ProductPage`, `BlogPost`, `PageHero`, `ServiceBody`, `Faq`, `Cta`, `Legal`) |
| Other pages | `src/pages/*.astro` (EN) and `src/pages/ar/*.astro` (AR) |
| Layout: header, footer, SEO head, business schema | `src/layouts/Base.astro` |
| Design tokens | `src/styles/global.css` |
| Blog posts | `src/content/blog/en/<slug>.md` and `src/content/blog/ar/<slug>.md` |
| Blog Manager config | `public/admin/config.yml` |
| Images | `public/img/` (logos, `screens/` app screenshots, `blog/` covers, `blog/ar/` Arabic covers) |
| Source screenshots (not published) | `assets-src/` |

## 3. Design system (MarkZone Branding)

- **Colours** (the logo is the master):
  - Navy `#04478B`, with deep navy `#032F5E` for hero and footer backgrounds.
  - Teal `#06ABAE`, and `#00757A` for teal text on light backgrounds.
  - Orange `#FA8606` for main action buttons only, with dark text on it.
  - Price colour `#B35600`.
  - Surfaces are white and `#F5F7FA`; borders `#E5E7EB`; text `#1A1A2E` and `#5F6675`.
- **Fonts** (self-hosted): English headings Poppins, body Inter. Arabic headings Cairo, body Tajawal.
- **Product sub-brands** keep their own identity on their pages and cards:
  - OxPOS: orange `#DF7F36`.
  - ZainaApp: gold `#B8862F` on black.
  - TexPOS: gold `#BF9B30` and ink `#0F121C`, "Heritage Bespoke".
- **Look and feel:**
  - Navy gradient heroes with a subtle orbit and check-mark motif.
  - Rounded cards (16–20px corners).
  - Real app screenshots in browser or phone frames, never stock icons as the main visual.
- **Calls to action:**
  - WhatsApp is the primary action (orange button plus a floating WhatsApp button).
  - Call is the secondary action.
- **Arabic pages** are fully right-to-left. Phone numbers, prices and the licence line are forced left-to-right. App names stay in Latin letters, with Western digits.
- **Screenshots:**
  - Blur any real customer names or phone numbers.
  - Never show zero-sales dashboards, TRN or settings screens, or payment-provider names.

## 4. Content rules (from the Master File)

- **Tagline:** "Organize your business. Grow your sales." / «نظّم شغلك.. وكبّر مبيعاتك»
- **Credentials line, used exactly:** `DED Licence No. 1574303 · Mohammed Bin Rashid Establishment for SME Development — Member`
- **Contact details:**
  - fadi.abouzoor@markzonetech.com · +971 50 655 2181 · @markzone.ae
  - Office 188-101, Naif, Deira, Dubai.
  - Google Maps: https://maps.app.goo.gl/su4aQJoSjxrueqig9
- **Support hours:** WhatsApp daily 10 AM – 10 PM, Sunday off. Never say "24/7".
- **Pricing:**
  - OxPOS and ZainaApp: 1,500 AED including first-year maintenance, then 500 AED/year.
  - TexPOS: 1,000 AED first year, then 500 AED/year.
  - Websites and custom software: "Quote on request" / «عرض الأسعار».
- **Timelines:** setup 45 min – 2 hrs, websites within 2 weeks, custom apps from about 2 months.
- **Numbers:** 400+ businesses since 2019; 15+ on the new-generation apps; all 7 emirates; Google rating 4.4★ from 21 reviews.
- **Never publish:**
  - e-invoicing, Track A/B/C/D, or MarkZone Manager by name (say only "integrated accounting solution").
  - Rent-a-Wheel, Vela, Jusoor, or competitor names.
  - The tools or platforms behind the apps (say "proprietary cloud platform, 100% developed in-house").
  - Ownership structure, offline mode, app-store apps, or online card payments for ZainaApp.
  - Invented statistics, clients or testimonials, and fake ratings in structured data.
- **Hardware** appears only as "Compatible hardware available." Tamara appears only on hardware packages (none are currently shown).
- **Coming Soon** (exact label, «قريباً» in Arabic): MadaPOS (restaurants & cafés) and AqarOS (real estate agencies).
- **Growth Partner:** the reward amount stays hidden ("we'll share the current partner terms").
- **Product track-record numbers** stay off the product pages.
- **Arabic:** customer-facing copy in Emirati dialect. Exceptions: Privacy and Terms are in formal Arabic.
- **Arabic terms:** consignment = «بضاعة الأمانة»; quote on request = «عرض الأسعار».

## 5. SEO standards (every page)

- **Title:** at most 65 characters, with the main keyword first and "| MarkZone" or "| ماركزون" when it fits.
- **Meta description:** 70–160 characters.
- **Headings:** exactly one H1.
- **Links in the page head:**
  - A canonical link to `https://markzonetech.com/<path>`, without a trailing slash.
  - hreflang `en-AE`, `ar-AE` and `x-default` whenever an English/Arabic pair exists. Arabic pages live under `/ar/...` with the same slug.
- **Social preview:** Open Graph and Twitter tags (defaults to `/img/og-default.jpg`).
- **Structured data:**
  - `LocalBusiness` sitewide (address, hours Mon–Sat 10:00–22:00, 7 emirates, Instagram and Google Maps links).
  - `SoftwareApplication` with an AED offer on product pages.
  - `Service` on the service pages.
  - `FAQPage` wherever there are FAQs.
  - `BreadcrumbList` on inner pages.
  - `BlogPosting` on posts.
  - **Never include `aggregateRating`.**
- **Images:** every image has alt text, WebP format, and explicit width and height.
- **Sitemap and robots:** the sitemap is automatic (`/sitemap-index.xml`, with language pairs). `robots.txt` blocks `/admin` only.
- **Old URLs:** when a page is renamed or removed, add a 301 in `public/_redirects`.

## 6. Adding a new product (checklist)

1. Confirm the product details in the Master File: audience, problem, features, platform, price, and screenshots allowed.
2. Add the product to `src/data/products.ts` (EN) and `src/data/products.ar.ts` (AR), including SEO title and description, features, FAQ and screenshots.
3. Add a card to `APPS` in `src/data/site.ts` and the matching copy in `src/i18n/home.ts` under `apps` (EN and AR).
4. Add the logo and screenshots under `public/img/` (WebP, compressed, personal data blurred).
5. Add it to the footer "Apps" list in `src/layouts/Base.astro`, and to the blog `product` options (`src/content.config.ts` and `public/admin/config.yml`).
6. If it was "Coming Soon", remove it from `coming-soon.astro` (EN and AR) and redirect `/coming-soon#slug` visitors via the new page links.
7. Build, run `python3 scripts/audit.py`, check the pages on the test URL, then get Fadi's approval.

## 7. Adding a new service

Create `src/pages/<service>.astro` and `src/pages/ar/<service>.astro` from the Websites page pattern (`PageHero`, then `ServiceBody`, then `Faq`, then `Cta`), with `Service` and `FAQPage` schema. Then add it to the nav and footer in `Base.astro`, and to the homepage `services` in `src/i18n/home.ts`.

## 8. Blog

- **Blog Manager** (`/admin`): sign in with a GitHub fine-grained token (Contents: read and write on this repo only). There are two collections: **Blog — English** and **Blog — Arabic (Emirati dialect)**.
- **Pairing translations:** English and Arabic versions must use the **same slug** so they link as translations, with hreflang and the language switcher.
- **Front-matter fields:**
  - Required: `title`, `description` (70–160 characters), `date`, `category`, `product`.
  - Optional: `updated`, `cover`, `coverAlt`, `faq[]` and `draft`.
  - Categories: `retail-tips`, `salon-business`, `business-growth`, `technology`, `markzone-news`.
  - The `product` field sets the side box: `oxpos`, `zainaapp`, `texpos`, `websites`, `custom-software` or `none`.
- **Writing standard:**
  - 600–1,000 words, with `##` section headings and practical, non-salesy advice.
  - 2–3 internal links to product or service pages (`/ar/...` links in Arabic posts).
  - 2–3 FAQs, and one WhatsApp call to action at the end.
  - Only Master File facts; no invented statistics; no legal or tax advice (point to official sources).
- **Covers:** 1200×630. If none is uploaded, run `python3 scripts/make-covers.py` (English) and `python3 scripts/make-covers-ar.py` (Arabic) to generate branded covers; otherwise the default cover is used.
- **When editing an old post,** change `updated` to today's date.
- **Automatic for every post:** RSS (`/rss.xml`), category pages, related posts, and BlogPosting/FAQ schema.
- **Retired old posts** redirect in `public/_redirects`. Never reuse a retired slug.

## 9. Before every release

- `npm run build` passes.
- There are no broken internal links.
- The metadata audit is clean: titles ≤65, descriptions 70–160, one H1, and valid structured data.
- The Arabic versions are updated along with the English ones.
- Fadi has approved the change (every deliverable is a draft until then).
