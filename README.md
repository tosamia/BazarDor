# বাজার দর — BazarDor

A Bengali-first daily market price dashboard built with Next.js 16. It shows live commodity prices, price movement, category-wise listings, and protected product details using the official BazarDor API from Programming Hero.

**Live link:** _to be added after deployment_  
**Assignment brief:** [`ASSIGNMENT-README.md`](./ASSIGNMENT-README.md)  
**Phase-by-phase report:** [`BAZARDOR_PROGRESS.md`](./BAZARDOR_PROGRESS.md)

---

## Features

1. **Live market data** — all products, categories, and market tables come from `https://openapi.programming-hero.com/api/bazardor`; no fake product data is stored in the app.
2. **Figma-matched navbar** — logo and Bengali date, second-row category navigation with active highlighting, auth/profile actions, and an infinite price ticker.
3. **Hero banner** — eyebrow text, headline, subtitle, a green CTA that scrolls to `#সব-পণ্য`, and responsive hero artwork.
4. **Product sections** — top 6 price risers, top 6 price fallers, and all products in a responsive card grid.
5. **Shared product card** — emoji, Bengali name, unit line, today’s price in Bengali digits, and green/red/gray change badge; every card links to its slug-based detail page.
6. **Product details** — protected `/product/[slug]` route with summary, minimum/maximum/average price cards, and a market-wise price table.
7. **Category pages** — live category header, exact Bengali sort options, numeric sorting, loading skeletons, empty state, and friendly 404 handling.
8. **Authentication** — BetterAuth email/password plus Google and GitHub sign-in, toast feedback, protected profile routes, and a separate name-update page.
9. **Bengali formatting** — prices, counts, percentages, and the current date use `Intl.NumberFormat("bn-BD")` / `Intl.DateTimeFormat("bn-BD")`.
10. **Responsive and resilient** — mobile/tablet/desktop layouts, reduced-motion support, global loading states, and a reusable 404 page.

---

## Technologies

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router, Cache Components, Partial Prerendering) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Auth | BetterAuth with MySQL (`mysql2`) |
| Notifications | `react-hot-toast` |
| Fonts | `next/font/google` with Hind Siliguri |
| Lint / types | ESLint 9, TypeScript 5 |
| Data source | Official BazarDor live REST API |

---

## Routes

| Route | Description |
| --- | --- |
| `/` | Hero, top risers, top fallers, and all live products |
| `/category/[slug]` | Products for one live category, with sorting |
| `/product/[slug]` | Login-required product and market-price details |
| `/signin` | Email/password and social sign-in |
| `/signup` | Email/password and social registration |
| `/profile` | Protected account overview and sign-out |
| `/profile/update` | Protected BetterAuth `updateUser()` form |
| Unknown routes | Friendly 404 with `হোম পেজে ফিরে যান` |

---

## Getting started

### Prerequisites

- Node.js 20+
- npm
- A MySQL database reachable from the app for BetterAuth

### Install and run

```bash
npm install
cp .env.example .env.local
# Fill .env.local with your own values. Never commit it.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy [`.env.example`](./.env.example) to `.env.local` and set:

| Variable | Required | Purpose |
| --- | --- | --- |
| `BETTER_AUTH_SECRET` | Yes | Secret used by BetterAuth to sign tokens |
| `BETTER_AUTH_URL` | Yes | Full app origin used by BetterAuth, e.g. `http://localhost:3000` |
| `NEXT_PUBLIC_APP_URL` | Yes | Browser-visible app origin used by the auth client |
| `MYSQL_HOST` | Yes | MySQL host |
| `MYSQL_PORT` | Yes | MySQL port, usually `3306` |
| `MYSQL_USER` | Yes | MySQL user |
| `MYSQL_PASSWORD` | Yes | MySQL password |
| `MYSQL_DATABASE` | Yes | MySQL database name |
| `GOOGLE_CLIENT_ID` | Optional | Enables the Google social button |
| `GOOGLE_CLIENT_SECRET` | Optional | Enables the Google social button |
| `GITHUB_CLIENT_ID` | Optional | Enables the GitHub social button |
| `GITHUB_CLIENT_SECRET` | Optional | Enables the GitHub social button |

Generate a local secret with:

```bash
openssl rand -base64 32
```

> `.env.local` is ignored by Git. Do not put real credentials in `.env.example`, README, logs, or commits.

---

## Scripts

```bash
npm run dev     # start the development server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
npx tsc --noEmit # type-check without emitting files
```

---

## Live API

Base URL:

```text
https://openapi.programming-hero.com/api/bazardor
```

Used endpoints:

```text
/products
/products?category=chal
/products/1
/categories
/categories/chal
```

The shared helpers in `src/lib/api.ts` normalize and type the API response, then cache it with Next.js Cache Components (`use cache: remote`, `cacheLife`, and `cacheTag`). Product detail slugs are resolved through `/products`, and full details are fetched by numeric ID.

---

## Verification and deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the production build, route smoke-test results, environment setup, and Vercel deployment steps. The project is a standard Next.js App Router app; dynamic `[slug]` routes work on refresh without extra rewrites.

Before submitting, replace the live-link placeholder near the top of this README with the deployed URL.
