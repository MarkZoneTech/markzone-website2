// Makes small, well-compressed WebP copies of site images for responsive srcset.
// Runs automatically before every build (npm "prebuild"). Safe to re-run: only
// regenerates when the source image is newer than its variants.
//   Source:  public/img/*.webp and public/img/screens/*.webp
//   Output:  public/img/r/<name>-<width>.webp  +  src/data/img-manifest.json
import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = join(ROOT, 'public');
const OUT = join(PUB, 'img', 'r');
const DIRS = ['img', 'img/screens'];
const LADDER = [80, 120, 160, 240, 320, 400, 480, 640, 800, 1000, 1200];

mkdirSync(OUT, { recursive: true });
const manifest = {};
let made = 0;

for (const dir of DIRS) {
  for (const file of readdirSync(join(PUB, dir))) {
    if (extname(file) !== '.webp') continue;
    if (/^img-.+-\d+\.webp$/.test(file)) continue; // a generated variant in the wrong folder, not a source
    const srcPath = join(PUB, dir, file);
    const url = `/${dir}/${file}`;
    const meta = await sharp(srcPath).metadata();
    const { width: w, height: h, hasAlpha } = meta;
    const widths = [...new Set([...LADDER.filter((x) => x < w), w])];
    const stem = `${dir.replace(/\//g, '-')}-${basename(file, '.webp')}`;
    const srcTime = statSync(srcPath).mtimeMs;
    const variants = [];
    for (const vw of widths) {
      const name = `${stem}-${vw}.webp`;
      const out = join(OUT, name);
      if (!existsSync(out) || statSync(out).mtimeMs < srcTime) {
        await sharp(srcPath)
          .resize({ width: vw, withoutEnlargement: true })
          .webp(hasAlpha
            ? { quality: 75, alphaQuality: 60, effort: 6, smartSubsample: true }
            : { quality: 72, effort: 6, smartSubsample: true })
          .toFile(out);
        made++;
      }
      variants.push(vw);
    }
    manifest[url] = { w, h, stem, variants };
  }
}

writeFileSync(join(ROOT, 'src/data/img-manifest.json'), JSON.stringify(manifest, null, 1) + '\n');
console.log(`responsive-images: ${Object.keys(manifest).length} images, ${made} variants written`);
