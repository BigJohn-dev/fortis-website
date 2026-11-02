// Builds the static pages from src/ into the repo root. No dependencies.
// Usage: node build.mjs
//
// Each file in src/pages/ starts with a meta comment:
//   <!--meta {"title": "...", "description": "...", "nav": "pricing", "cta": true} -->
// The page body is inserted into src/layout.html in place of {{content}}.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('.', import.meta.url).pathname;
const layout = readFileSync(join(root, 'src/layout.html'), 'utf8');

const CTA = `<section class="cta-band">
  <div class="container cta-inner">
    <div>
      <span class="eyebrow">Early access</span>
      <h2 class="h2 words">Ship every day. <span class="it accent-mint">Prove it's safe.</span></h2>
    </div>
    <div class="cta-actions reveal">
      <p>We're onboarding a small group of fintechs, PSPs, MFBs and lenders in Nigeria as design partners.</p>
      <div class="cta-btns">
        <a href="contact.html" class="btn btn-primary">Become a design partner <svg><use href="#i-arrow"/></svg></a>
        <a href="pricing.html" class="btn btn-ghost light">See pricing <svg><use href="#i-arrow"/></svg></a>
      </div>
    </div>
  </div>
</section>`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const pages = readdirSync(join(root, 'src/pages')).filter((f) => f.endsWith('.html'));
for (const file of pages) {
  const src = readFileSync(join(root, 'src/pages', file), 'utf8');
  const m = src.match(/^<!--meta\s+(\{[\s\S]*?\})\s*-->\n?/);
  if (!m) throw new Error(`${file}: missing <!--meta {...} --> header`);
  const meta = JSON.parse(m[1]);
  const body = src.slice(m[0].length);
  const page = file.replace(/\.html$/, '');

  let html = layout
    .replaceAll('{{title}}', esc(meta.title))
    .replaceAll('{{description}}', esc(meta.description))
    .replaceAll('{{page}}', page)
    .replace('{{cta}}', meta.cta ? CTA : '')
    .replace('{{content}}', body.trimEnd());

  if (meta.nav) {
    html = html.replace(`data-nav="${meta.nav}"`, `data-nav="${meta.nav}" data-current`);
  }
  writeFileSync(join(root, file), html);
  console.log(`built ${file}`);
}
