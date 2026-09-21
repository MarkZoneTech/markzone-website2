"""Generate Arabic 1200x630 covers for posts in src/content/blog/ar (skips existing).
Needs Pillow with libraqm. Font: scripts/fonts/Cairo.ttf (SIL OFL)."""
import os, re, glob
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = os.path.join(ROOT, 'scripts/fonts/Cairo.ttf')
LOGO = os.path.join(ROOT, 'public/img/mz-logo-rev.webp')
CATS = {'retail-tips': 'نصائح للمحلات', 'salon-business': 'شغل الصالونات', 'business-growth': 'نمو الشغل', 'technology': 'التقنية', 'markzone-news': 'أخبار ماركزون'}
ACCENT = {'retail-tips': '#fa8606', 'salon-business': '#c9a24a', 'business-growth': '#06abae', 'technology': '#06abae', 'markzone-news': '#fa8606'}
def font(size, weight='Bold'):
    f = ImageFont.truetype(FONT, size); f.set_variation_by_name(weight); return f
def fm(path):
    y = re.search(r'^---\n(.*?)\n---', open(path, encoding='utf-8').read(), re.S).group(1)
    g = lambda k: (re.search(rf'^{k}:\s*"?(.*?)"?\s*$', y, re.M) or [None, ''])[1]
    return g('title'), g('category'), g('cover')
def tl(d, t, f): return d.textlength(t, font=f, direction='rtl', language='ar')
def wrap(d, text, f, width):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if tl(d, t, f) <= width: cur = t
        else: lines.append(cur); cur = w
    lines.append(cur); return lines
W, H, R = 1200, 630, 1128
for p in sorted(glob.glob(os.path.join(ROOT, 'src/content/blog/ar/*.md'))):
    slug = os.path.basename(p)[:-3]
    title, cat, cover = fm(p)
    out = os.path.join(ROOT, 'public/img/blog/ar', slug + '.webp')
    if cover or os.path.exists(out): continue
    im = Image.new('RGB', (W, H)); d = ImageDraw.Draw(im, 'RGBA')
    for i in range(H): d.line([(0, i), (W, i)], fill=(3, 47 + int(24 * (1 - i / H)), 94 + int(45 * (1 - i / H))))
    for r, a in [(360, 60), (300, 45)]:
        d.ellipse([520 - r * 2, -120, 520 + r // 2, 120 + r * 2], outline=(6, 171, 174, a), width=14)
    ov = Image.new('RGBA', (W, H), (0, 0, 0, 0)); od = ImageDraw.Draw(ov)
    pts = [(270, 360), (190, 440), (30, 250)]
    pts = [(30, 360 - 110), (110, 440 - 110), (270, 250 - 110)]
    pts = [(40, 330), (120, 410), (280, 220)]
    od.line(pts, fill=(250, 134, 6, 255), width=22, joint='curve')
    for x, y in (pts[0], pts[-1]): od.ellipse([x - 11, y - 11, x + 11, y + 11], fill=(250, 134, 6, 255))
    ov.putalpha(ov.getchannel('A').point(lambda a: int(a * .55))); im.paste(ov, (0, 0), ov); d = ImageDraw.Draw(im, 'RGBA')
    fc = font(24, 'SemiBold'); lab = CATS.get(cat, '')
    w = tl(d, lab, fc)
    d.rounded_rectangle([R - w - 36, 68, R, 118], radius=25, fill=(6, 171, 174, 60), outline=(6, 171, 174, 160), width=2)
    d.text((R - 18, 72), lab, font=fc, fill='#bff1f1', direction='rtl', language='ar', anchor='ra')
    size = 60
    while True:
        ft = font(size); lines = wrap(d, title, ft, 800)
        if len(lines) <= 3 or size <= 42: break
        size -= 4
    y = 150
    for ln in lines:
        d.text((R, y), ln, font=ft, fill='white', direction='rtl', language='ar', anchor='ra'); y += int(size * 1.45)
    d.rectangle([R - 90, 552, R, 558], fill=ACCENT.get(cat, '#fa8606'))
    logo = Image.open(LOGO).convert('RGBA'); logo.thumbnail((230, 80)); im.paste(logo, (R - logo.width, 565), logo)
    im.save(out, 'WEBP', quality=85); print('cover', slug)
