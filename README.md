# BeaCare landing page

Single-route, multi-brand editorial beauty directory built with React, TypeScript, Vite and Tailwind CSS v4. BeaCare organises verified affiliate partners across Skin, Hair, Body and Nails while keeping commercial links clearly disclosed.

## Local development

```bash
npm install
npm run dev
```

The local site runs on `http://localhost:5176`. Create a local `.env` from `.env.example` when real configuration is available. Google Analytics remains off when `VITE_GA_ID` is blank; affiliate links continue to work without it.

## Production build

```bash
npm run build
```

Cloudflare Pages settings:

- Build command: `npm run build`
- Output directory: `dist`
- Preview deployments remain `noindex` through `public/_headers` and `public/robots.txt`.

Before a public launch, configure `VITE_SITE_URL`, generate a real sitemap, verify the custom domain and remove every `noindex` directive. Re-check merchant markets, shipping terms and all affiliate URLs immediately before enabling indexing.

## Affiliate data

Affiliate URLs are centralised in `src/data.ts`. Only featured, active brands with an HTTPS URL and tracking ID render a commercial CTA. Do not remove or rewrite the merchant-provided query parameters. GA4 records outbound `affiliate_click` events when `VITE_GA_ID` is configured; GoAffPro or Refersion remains the source of truth for orders and commissions.

## Editorial images

The five original generated source PNGs live in `assets/source-images`. Run `npm run images:optimize` after replacing a source image to regenerate the delivery-friendly WebP assets in `public/images`. Brand cards intentionally use a text-only editorial layout so merchant imagery is not required.
