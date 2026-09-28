# Beauty Index landing page

Single-route editorial beauty directory built with React, TypeScript, Vite and Tailwind CSS v4.

## Local development

```bash
npm install
npm run dev
```

The local site runs on `http://localhost:5176`. Create a local `.env` from `.env.example` when real configuration is available. Analytics and Impact scripts remain inert when their environment variables are blank.

## Production build

```bash
npm run build
```

Cloudflare Pages settings:

- Build command: `npm run build`
- Output directory: `dist`
- Preview deployments remain `noindex` through `public/_headers` and `public/robots.txt`.

Before a public launch, replace the preview brand data and temporary name, add verified HTTPS affiliate URLs and tracking IDs, configure `VITE_SITE_URL`, generate a real sitemap, and remove every `noindex` directive. Search the repository for `Sample brand`, `Beauty Index`, `noindex`, and empty or placeholder URLs before enabling indexing.

## Editorial images

The five original generated source PNGs live in `assets/source-images`. Run `npm run images:optimize` after replacing a source image to regenerate the delivery-friendly WebP assets in `public/images`.
