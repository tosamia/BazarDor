# Deployment and verification notes

## Status

The app is production-buildable and Vercel-compatible. A public deployment URL has not been provided yet; add it to the top of `README.md` and to the submission form after deploying.

## Deployment target

Vercel is the recommended target because this is a standard Next.js 16 App Router project. No custom `vercel.json` is required: automatic framework detection, dynamic `[slug]` routes, Cache Components, and refresh handling work with the default Next.js settings in `next.config.ts`.

### Vercel steps

1. Import the GitHub repository into Vercel.
2. Keep the detected framework as **Next.js** and the default build command `npm run build`.
3. Add the environment variables from `.env.example` in the Vercel project settings:
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL` = the deployed origin, e.g. `https://<project>.vercel.app`
   - `NEXT_PUBLIC_APP_URL` = the same deployed origin
   - `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`
   - optional `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`
4. If social login is enabled, add these callback URLs in the provider dashboards:
   - `https://<project>.vercel.app/api/auth/callback/google`
   - `https://<project>.vercel.app/api/auth/callback/github`
5. Deploy, then open `/`, `/category/chal`, `/signin`, and `/profile` on the live origin.
6. Paste the live URL into `README.md` and the assignment submission form.

> Use a MySQL database that is reachable from the deployment runtime. The isolated local check below intentionally uses dummy auth values and has no database, so auth API calls there can log a database access error; this does not indicate a production build failure.

## Local production verification

All checks were run on **2026-11-23** in an isolated copy of the source at `C:\Users\HP\AppData\Local\Temp\opencode\bazardor-buildcheck`, with no `.env.local` and only safe dummy auth values set in the shell. The project's own `.next` directory and `.env.local` were not touched.

### Static checks

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS — Next.js 16.4.6, 10 routes generated |
| Cache Components | Enabled; no blocking-prerender error |
| Partial Prefetching | Enabled |

Build route summary:

```text
○ /
○ /_not-found
ƒ /api/auth/[...all]
◐ /category/[slug]
◐ /product/[slug]
○ /profile
○ /profile/update
○ /signin
○ /signup
```

### Production server route smoke test

`npx next start -p 3100` was started with dummy auth values and each route was fetched directly to verify that refresh/deep links do not hard-404.

| Route | HTTP | Result |
| --- | --- | --- |
| `/` | 200 | PASS |
| `/category/chal` | 200 | PASS |
| `/product/sorno-machi-chal` | 200 | PASS |
| `/signin` | 200 | PASS |
| `/signup` | 200 | PASS |
| `/profile` | 200 | PASS |
| `/profile/update` | 200 | PASS |
| `/does-not-exist` | 404 | PASS — friendly not-found page |

### Development server content smoke test

`npx next dev -p 3101` was used for DOM-level checks because Cache Components stream a partial shell in production responses.

Verified content included:

- `/`: hero heading/CTA, `৩৩` products, top risers, top fallers, live product `স্বর্ণমাছি চাল`, hero image, and responsive grid classes.
- `/category/chal`: category heading, all three exact sort labels, product count, and responsive grid.
- `/signin` and `/signup`: page titles, Google/GitHub buttons, and `data-rht-toaster`.
- `/profile`: protected session skeleton.
- `/does-not-exist`: `হোম পেজে ফিরে যান` CTA.
- The dev server log had no Cache Components warning after the shared navbar was wrapped in `Suspense`.

## Final pre-submission checklist

- [ ] Deploy to Vercel or another Next.js-compatible host.
- [ ] Set all production environment variables with real values.
- [ ] Confirm Google/GitHub callback URLs if social login is used.
- [ ] Replace the live-link placeholder in `README.md`.
- [ ] Confirm at least 8 meaningful Git commits exist (`git log --oneline`).
- [ ] Confirm `git status` has no unintended secrets or generated build output staged.
