# Fortis website

Marketing site for **Fortis**: security testing on every release, between your annual pentests, for African fintech.

A static site (HTML, CSS and vanilla JavaScript), with no build step and no dependencies.

## Run locally

```bash
npx serve .
```

Or open `index.html` directly in a browser.

## Deploy

The site works on any static host. For Vercel, Netlify or Cloudflare Pages, import the repo with no build command and an output directory of `/`. For GitHub Pages, go to Settings → Pages and deploy from the `main` branch at the root.

## Structure

```
index.html            all sections and copy
assets/css/styles.css design tokens, layout, components, animations
assets/js/main.js     reveals, mega menus, tabs, terminal typing, pricing toggle, FAQ, form
assets/img/           photos, avatars, favicon
```

## Editing

- **Colours, fonts and spacing:** the `:root` tokens at the top of `styles.css`.
- **Copy:** all text lives in `index.html`. Headlines use `<span class="it accent">…</span>` for the serif-italic accent words.
- **"How it works" terminal lines:** `SCRIPTS` in `main.js`.
- **Pricing:** the `.plan` cards in `index.html`. The annual figures live in the `data-m` and `data-y` attributes.
- **Early-access form:** `main.js` shows a success state but doesn't send data yet. Connect it to Formspree, a serverless function or your CRM where the code says `Placeholder`.

## Notes

- Photos are AI-generated placeholders. Replace them with real team and customer photos before launch.
- The characters and company in the examples (Tunde, Amaka, PayWave) are illustrative.
- All motion respects `prefers-reduced-motion`.
