"""Pre-release check on dist/: broken internal links, titles (<=65), descriptions (70-160),
one H1, canonical, valid JSON-LD, image alt text. Run after `npm run build`."""
import re, glob, os, html, json, sys
D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'dist')
pages = {'/'}
for f in glob.glob(f'{D}/**/*.html', recursive=True):
    pages.add('/' + os.path.relpath(f, D).replace('index.html', '').rstrip('/') or '/')
redir = [l.split()[0] for l in open(f'{D}/_redirects') if l.startswith('/')]
issues = []
for f in sorted(glob.glob(f'{D}/**/*.html', recursive=True)):
    p = '/' + os.path.relpath(f, D).replace('index.html', '').rstrip('/')
    if p.startswith('/admin'): continue
    h = open(f, encoding='utf-8').read()
    t = html.unescape((re.search(r'<title>(.*?)</title>', h, re.S) or [None, ''])[1])
    d = html.unescape((re.search(r'<meta name="description" content="([^"]*)"', h) or [None, ''])[1])
    if not t or len(t) > 65: issues.append(f'{p}: title {len(t)} chars')
    if not 70 <= len(d) <= 160: issues.append(f'{p}: description {len(d)} chars')
    if len(re.findall(r'<h1[\s>]', h)) != 1: issues.append(f'{p}: H1 count')
    if 'rel="canonical"' not in h: issues.append(f'{p}: no canonical')
    for s in re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
        try: json.loads(s)
        except Exception: issues.append(f'{p}: invalid JSON-LD')
    if any('alt=' not in i for i in re.findall(r'<img [^>]*>', h)): issues.append(f'{p}: image without alt')
    for l in re.findall(r'href="(/[^"#?]*)', h):
        l = l.rstrip('/') or '/'
        if l.startswith(('/_astro', '/img', '/favicon', '/apple', '/rss', '/admin', '/sitemap')): continue
        if l not in pages and l not in redir: issues.append(f'{p}: broken link {l}')
print(f'{len(pages)} pages checked')
print('\n'.join(sorted(set(issues))) or 'No issues')
sys.exit(1 if issues else 0)
