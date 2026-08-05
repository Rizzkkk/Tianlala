# TIANLALA Saudi Arabia

Bilingual (Arabic / English) marketing site for TIANLALA in the Kingdom of Saudi
Arabia. Next.js 16 App Router, TypeScript, and plain CSS — no CSS framework.

Replaces the ThinkPHP/FastAdmin site at `tianlala.ph`, which served a separate
desktop and mobile template via user-agent sniffing, shipped jQuery twice and
Swiper three times, and answered every unknown URL with HTTP 200.

## Running it

```bash
npm install
cp .env.example .env.local   # optional for local work
npm run dev                  # http://localhost:3000
```

`/` redirects to `/en` or `/ar` based on the browser's `Accept-Language`.

```bash
npm run build
npm run lint
node scripts/fetch-assets.mjs   # re-pull product photos
```

## How it is put together

| Path | What it holds |
| --- | --- |
| `src/data/menu.ts` | All 33 products: SAR price, calories, category, image slot |
| `src/data/categories.ts` | The 6 categories and their card tints |
| `src/data/site.ts` | Contact, legal and branch details (mostly placeholders — see below) |
| `src/i18n/` | `en.json`, `ar.json` and the dictionary loader |
| `src/app/[lang]/` | Every page, locale-scoped. This is the root layout. |
| `src/app/api/franchise/` | Lead intake |
| `src/proxy.ts` | Locale redirect. Named `proxy`, not `middleware` — renamed in Next 16. |

### Styling

Plain CSS, no framework. Two layers:

- **`src/app/globals.css`** — design tokens as custom properties (`--brand-500`,
  `--ink-900`, `--radius-card`…), the reset, base typography, and the handful of
  primitives used everywhere: `.container`, `.btn` / `.btnPrimary`, `.srOnly`,
  `.pending`.
- **`Component.module.css`** next to each component. Scoped by Next, so class
  names cannot collide.

Change a colour or radius once in `globals.css` and it updates everywhere.

### Arabic and RTL

`<html dir>` is set per locale in the layout. All CSS uses **logical
properties** — `padding-inline`, `margin-inline-start`, `inset-inline-start`,
`text-align: start` — never `left`/`right`. That is what makes RTL work without
a second stylesheet.

**If you add CSS, use logical properties or Arabic will break.**

Two RTL details worth knowing:

- The hero cluster mirrors via `[dir="rtl"] .cluster { transform: scaleX(-1) }`
  and each cup un-mirrors itself, so the composition flips without the
  photography appearing back to front.
- Figures like `8,000+` are wrapped in `<bdi dir="ltr">`, or the bidi algorithm
  moves the trailing `+` to the front in Arabic.

Arabic uses IBM Plex Sans Arabic, Latin uses Plus Jakarta Sans, both self-hosted
through `next/font`.

### The two-tier menu card

`MenuItem.image` is `string | null`, and that drives two deliberate designs:

- **Photo card** — the 16 products with a usable photo.
- **Typographic card** — the other 17. A menu-board treatment on a
  category tint with a cup mark, not a broken-image placeholder.

Both tiers share identical geometry so a mixed grid keeps an even rhythm. To
promote an item, drop a file in `public/products/` and set `image`.

### Franchise leads

`POST /api/franchise` validates, then emails through Resend. It has a honeypot,
a 20 req/min burst guard, and a 3-per-10-min cap on *accepted* leads —
validation failures deliberately do not count, so typos never lock out a real
applicant. No personal data is ever written to logs.

With `RESEND_API_KEY` / `FRANCHISE_INBOX` unset it returns HTTP 500 and the
visitor is asked to retry. A lead is never silently dropped.

## Deploying to the Hostinger VPS

Built with `output: "standalone"`, so the server bundle is self-contained.
`next start` does not work with standalone — run `server.js` directly.

```bash
npm ci
npm run build

# standalone deliberately excludes these; copy them in
cp -r .next/static .next/standalone/.next/static
cp -r public       .next/standalone/public

PORT=3000 node .next/standalone/server.js
```

Keep it alive and put Nginx in front:

```bash
pm2 start .next/standalone/server.js --name tianlala --env PORT=3000
pm2 save && pm2 startup
```

```nginx
server {
  server_name tianlala.sa www.tianlala.sa;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

`X-Forwarded-For` matters — the rate limiter reads it to identify callers.
Then `certbot --nginx -d tianlala.sa -d www.tianlala.sa` for TLS.

## Before launch

Every item below renders as a visible "confirming" chip rather than invented
content, so nothing false can ship. Fill them in `src/data/site.ts`.

- [ ] Brand sign-off on all 33 prices and calorie figures. They came from the
      HungerStation listing, **not** from the brand. Calorie display is subject
      to SFDA menu labelling rules.
- [ ] Native review of the Arabic product names in `src/data/menu.ts`.
- [ ] Saudi phone number and email.
- [ ] CR number and VAT number for the footer.
- [ ] Branch addresses, map links and opening hours.
- [ ] Franchise package details (investment range, inclusions, process).
- [ ] Confirm the production domain, currently `https://tianlala.sa`.
- [ ] Add `opengraph-image.jpg` to `src/app/` — social cards have no image yet.
