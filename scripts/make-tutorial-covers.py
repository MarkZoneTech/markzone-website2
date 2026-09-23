"""Generate 1200x630 covers for video tutorial posts (category: tutorials), English and Arabic.
Usage: python3 scripts/make-tutorial-covers.py [--force]
Reads video.series / video.lesson from front matter; uses an app screenshot when one fits (SHOTS below).
Needs Pillow with libraqm for Arabic."""
import os, re, glob, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EN_B = os.path.join(ROOT, 'node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff')
EN_M = os.path.join(ROOT, 'node_modules/@fontsource/poppins/files/poppins-latin-600-normal.woff')
AR = os.path.join(ROOT, 'scripts/fonts/Cairo.ttf')
IMG = os.path.join(ROOT, 'public/img')
FORCE = '--force' in sys.argv
W, H = 1200, 630

SERIES = {
    'oxpos': {'bg': ((3, 34, 70), (4, 71, 139)), 'accent': (223, 127, 54), 'logo': 'oxpos-logo.webp', 'name': 'OxPOS'},
    'texpos': {'bg': ((12, 14, 22), (32, 36, 52)), 'accent': (191, 155, 48), 'logo': 'texpos-icon.webp', 'name': 'TexPOS'},
    'zainaapp': {'bg': ((10, 10, 10), (40, 34, 24)), 'accent': (184, 134, 47), 'logo': 'zaina-icon.webp', 'name': 'ZainaApp'},
}
# Optional screenshot per slug (public/img/screens). Desktop shots go in a browser frame, "-m" shots in a phone frame.
SHOTS = {
    'oxpos-add-manage-products': 'oxpos-products.webp', 'oxpos-bulk-price-update': 'oxpos-products.webp',
    'oxpos-inventory-management': 'oxpos-inventory.webp', 'oxpos-purchases-suppliers': 'oxpos-purchases.webp',
    'oxpos-employees-salaries-permissions': 'oxpos-employees.webp', 'oxpos-employees-vs-users': 'oxpos-employees.webp',
    'oxpos-consignment-module': 'oxpos-consignment-m.webp',
    'texpos-full-tour': 'texpos-menu-m.webp', 'texpos-customer-measurements': 'texpos-measurements-m.webp',
}

def fm(path):
    y = re.search(r'^---\n(.*?)\n---', open(path, encoding='utf-8').read(), re.S).group(1)
    g = lambda k: (re.search(rf'^\s*{k}:\s*"?(.*?)"?\s*$', y, re.M) or [None, ''])[1]
    return g('title'), g('category'), g('cover'), g('series'), g('lesson')

def font(path, size, weight=None):
    f = ImageFont.truetype(path, size)
    if weight: f.set_variation_by_name(weight)
    return f

def bg(s):
    (a, b) = SERIES[s]['bg']
    im = Image.new('RGB', (W, H)); d = ImageDraw.Draw(im)
    for i in range(H):
        t = i / H
        d.line([(0, i), (W, i)], fill=tuple(int(b[k] + (a[k] - b[k]) * t) for k in range(3)))
    return im

def play_button(im, cx, cy, r, accent):
    ov = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    d.ellipse([cx - r - 14, cy - r - 14, cx + r + 14, cy + r + 14], fill=(255, 255, 255, 60))
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=accent + (255,))
    k = r * 0.42
    d.polygon([(cx - k * 0.7, cy - k), (cx - k * 0.7, cy + k), (cx + k * 1.05, cy)], fill=(255, 255, 255, 255))
    im.paste(ov, (0, 0), ov)

def shot(im, slug, rtl, accent):
    """Screenshot in a frame on the side opposite the text. Returns the play-button centre."""
    name = SHOTS.get(slug)
    side_x = 60 if rtl else W - 60  # outer edge
    if not name or not os.path.exists(os.path.join(IMG, 'screens', name)):
        cx = 250 if rtl else W - 250
        play_button(im, cx, 330, 92, accent); return
    s = Image.open(os.path.join(IMG, 'screens', name)).convert('RGB')
    mobile = name.endswith('-m.webp')
    if mobile:
        s.thumbnail((250, 470)); fw, fh = s.width + 24, s.height + 24
        x = side_x if rtl else side_x - fw
        x = x + 40 if rtl else x - 40
        y = (H - fh) // 2 + 10
        frame = Image.new('RGBA', (fw, fh), (0, 0, 0, 0)); fd = ImageDraw.Draw(frame)
        fd.rounded_rectangle([0, 0, fw - 1, fh - 1], radius=34, fill=(18, 18, 22, 255))
        m = Image.new('L', s.size, 0); ImageDraw.Draw(m).rounded_rectangle([0, 0, s.width - 1, s.height - 1], radius=24, fill=255)
        frame.paste(s, (12, 12), m)
    else:
        s.thumbnail((500, 330)); fw, fh = s.width, s.height + 30
        x = side_x if rtl else side_x - fw
        y = (H - fh) // 2 + 10
        frame = Image.new('RGBA', (fw, fh), (0, 0, 0, 0)); fd = ImageDraw.Draw(frame)
        fd.rounded_rectangle([0, 0, fw - 1, fh - 1], radius=14, fill=(236, 239, 244, 255))
        for i, c in enumerate([(255, 95, 87), (254, 188, 46), (40, 200, 64)]):
            fd.ellipse([14 + i * 18, 10, 24 + i * 18, 20], fill=c + (255,))
        frame.paste(s, (0, 30))
    sh = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle([x + 8, y + 16, x + fw + 8, y + fh + 16], radius=30, fill=(0, 0, 0, 110))
    im.paste(sh.filter(ImageFilter.GaussianBlur(18)), (0, 0), sh.filter(ImageFilter.GaussianBlur(18)))
    im.paste(frame, (x, y), frame)
    play_button(im, x + fw // 2, y + fh // 2, 58, accent)

def logo_chip(im, s, x, y, rtl):
    lg = Image.open(os.path.join(IMG, SERIES[s]['logo'])).convert('RGBA'); lg.thumbnail((52, 52))
    d = ImageDraw.Draw(im); f = font(EN_B, 26)
    tw = d.textlength(SERIES[s]['name'], font=f); cw = int(tw + lg.width + 50)
    x0 = x - cw if rtl else x
    d.rounded_rectangle([x0, y, x0 + cw, y + 64], radius=32, fill=(255, 255, 255))
    im.paste(lg, (x0 + 14, y + (64 - lg.height) // 2), lg)
    d.text((x0 + 26 + lg.width, y + 13), SERIES[s]['name'], font=f, fill=(20, 20, 30))

def wrap(d, text, f, width, rtl):
    kw = dict(direction='rtl', language='ar') if rtl else {}
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=f, **kw) <= width: cur = t
        else: lines.append(cur); cur = w
    lines.append(cur); return lines

def make(path, lang):
    slug = os.path.basename(path)[:-3]
    title, cat, cover, series, lesson = fm(path)
    if cat != 'tutorials' or cover or series not in SERIES: return
    out = os.path.join(IMG, 'blog', 'ar' if lang == 'ar' else '', slug + '.webp')
    if os.path.exists(out) and not FORCE: return
    rtl = lang == 'ar'; S = SERIES[series]; acc = S['accent']
    im = bg(series); d = ImageDraw.Draw(im, 'RGBA')
    # subtle orbit motif
    for r, a in [(430, 40), (360, 28)]:
        cx = 200 if rtl else W - 200
        d.ellipse([cx - r, -r // 2, cx + r, r * 1.5], outline=(6, 171, 174, a), width=12)
    shot(im, slug, rtl, acc); d = ImageDraw.Draw(im, 'RGBA')
    X = W - 64 if rtl else 64
    logo_chip(im, series, X, 58, rtl); d = ImageDraw.Draw(im, 'RGBA')
    badge = f'شرح فيديو · الدرس {lesson}' if rtl else f'VIDEO TUTORIAL · LESSON {lesson}'
    fb = font(AR, 24, 'Bold') if rtl else font(EN_M, 21)
    kw = dict(direction='rtl', language='ar') if rtl else {}
    bw = d.textlength(badge, font=fb, **kw)
    bx = X - bw - 36 if rtl else X
    d.rounded_rectangle([bx, 150, bx + bw + 36, 196], radius=23, fill=acc + (60,), outline=acc + (200,), width=2)
    d.text((bx + 18, 152 if rtl else 160), badge, font=fb, fill=(255, 240, 220), **kw)
    width = 560
    size = 54 if not rtl else 58
    while True:
        ft = font(AR, size, 'Bold') if rtl else font(EN_B, size)
        lines = wrap(d, title, ft, width, rtl)
        if len(lines) <= 4 or size <= 36: break
        size -= 4
    y = 222
    for ln in lines:
        if rtl:
            tw = d.textlength(ln, font=ft, **kw); d.text((X - tw, y), ln, font=ft, fill='white', **kw)
        else:
            d.text((X, y), ln, font=ft, fill='white')
        y += int(size * (1.45 if rtl else 1.22))
    d.rectangle([X - 90 if rtl else X, 548, X if rtl else X + 90, 554], fill=acc)
    mz = Image.open(os.path.join(IMG, 'mz-logo-rev.webp')).convert('RGBA'); mz.thumbnail((180, 54))
    im.paste(mz, (X - mz.width if rtl else X, 566), mz)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    im.save(out, 'WEBP', quality=84); print('cover', lang, slug)

for p in sorted(glob.glob(os.path.join(ROOT, 'src/content/blog/en/*.md'))): make(p, 'en')
for p in sorted(glob.glob(os.path.join(ROOT, 'src/content/blog/ar/*.md'))): make(p, 'ar')
