"""Generate branded 1200x630 cover images for blog posts that don't have one.
Usage: python3 scripts/make-covers.py   (skips posts whose cover already exists)"""
import os, re, glob, math
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = os.path.join(ROOT, 'node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff')
FONT2 = os.path.join(ROOT, 'node_modules/@fontsource/poppins/files/poppins-latin-600-normal.woff')
LOGO = os.path.join(ROOT, 'public/img/mz-logo-rev.webp')
CATS = {'retail-tips': 'RETAIL TIPS', 'salon-business': 'SALON BUSINESS', 'business-growth': 'BUSINESS GROWTH', 'technology': 'TECHNOLOGY', 'markzone-news': 'MARKZONE NEWS'}
ACCENT = {'retail-tips': '#fa8606', 'salon-business': '#c9a24a', 'business-growth': '#06abae', 'technology': '#06abae', 'markzone-news': '#fa8606'}
def fm(path):
    t = open(path, encoding='utf-8').read()
    m = re.search(r'^---\n(.*?)\n---', t, re.S); y = m.group(1)
    g = lambda k: (re.search(rf'^{k}:\s*"?(.*?)"?\s*$', y, re.M) or [None, ''])[1]
    return g('title'), g('category'), g('cover')
def wrap(draw, text, font, width):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if draw.textlength(t, font=font) <= width: cur = t
        else: lines.append(cur); cur = w
    lines.append(cur); return lines
for p in sorted(glob.glob(os.path.join(ROOT, 'src/content/blog/en/*.md'))):
    slug = os.path.basename(p)[:-3]
    title, cat, cover = fm(p)
    out = os.path.join(ROOT, 'public/img/blog', slug + '.webp')
    if cover or os.path.exists(out): continue
    W, H = 1200, 630
    im = Image.new('RGB', (W, H), '#04478b'); d = ImageDraw.Draw(im, 'RGBA')
    for i in range(H):  # vertical gradient
        c = int(0x2f + (0x04 - 0x2f) * (1 - i / H)); d.line([(0, i), (W, i)], fill=(3, 47 + int(24 * (1 - i / H)), 94 + int(45 * (1 - i / H)), 255))
    # orbit motif
    for r, a in [(360, 60), (300, 45)]:
        d.ellipse([W - 520 - r // 2, -120, W - 520 + r * 2, 120 + r * 2], outline=(6, 171, 174, a), width=14)
    ov = Image.new('RGBA', (W, H), (0, 0, 0, 0)); od = ImageDraw.Draw(ov)
    od.line([(930, 360), (1010, 440), (1170, 250)], fill=(250, 134, 6, 255), width=22, joint='curve')
    for x, y in [(930, 360), (1170, 250)]: od.ellipse([x - 11, y - 11, x + 11, y + 11], fill=(250, 134, 6, 255))
    ov.putalpha(ov.getchannel('A').point(lambda a: int(a * 0.55)))
    im.paste(ov, (0, 0), ov); d = ImageDraw.Draw(im, 'RGBA')
    f_cat = ImageFont.truetype(FONT2, 22); f_t = ImageFont.truetype(FONT, 58)
    d.rounded_rectangle([72, 70, 72 + d.textlength(CATS.get(cat, ''), font=f_cat) + 36, 116], radius=23, fill=(6, 171, 174, 60), outline=(6, 171, 174, 160), width=2)
    d.text((90, 79), CATS.get(cat, ''), font=f_cat, fill='#bff1f1')
    size = 58
    while True:
        f_t = ImageFont.truetype(FONT, size); lines = wrap(d, title, f_t, 820)
        if len(lines) <= 4 or size <= 40: break
        size -= 4
    y = 150
    for ln in lines:
        d.text((72, y), ln, font=f_t, fill='white'); y += int(size * 1.25)
    d.rectangle([72, 560 - 8, 72 + 90, 560 - 2], fill=ACCENT.get(cat, '#fa8606'))
    logo = Image.open(LOGO).convert('RGBA'); logo.thumbnail((230, 80)); im.paste(logo, (72, 565), logo)
    im.save(out, 'WEBP', quality=85); print('cover', slug)
