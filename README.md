# Dermaheal Skin & Hair Clinic

Marketing site for [Dermaheal Skin & Hair Clinic](https://dermaheal.co.in), an
MD-led dermatology, aesthetics and trichology practice in Dwarka, New Delhi.

Built on **Next.js 16** (App Router, Turbopack) and **React 19** with
TypeScript. All pages are statically generated at build time.

## Routes

| Path                       | Type    |
| -------------------------- | ------- |
| `/`                        | Static  |
| `/treatments`              | Static  |
| `/treatments/[slug]`       | SSG (9) |
| `/doctors`                 | Static  |
| `/doctors/[slug]`          | SSG (3) |
| `/sitemap.xml`             | Static  |
| `/robots.txt`              | Static  |

All clinic data lives in `src/data/` (`clinic`, `concerns`, `treatments`,
`doctors`, `site`). Update copy there, no component edits needed.

## Local development

```bash
npm install
npm run dev    # http://localhost:3000
```

Useful scripts:

```bash
npm run build  # production build
npm run lint   # eslint
npm start      # serve the built site locally
```

## Deploying on Vercel

The repo ships with a `vercel.json` that pins the function region to
**`bom1`** (Mumbai) for Indian users, sets the framework to Next.js, and
uses `npm ci` for installs. Security headers (HSTS, X-Frame-Options,
X-Content-Type-Options, Referrer-Policy, Permissions-Policy) are emitted
from `next.config.ts`.

**One-time setup:**

1. Sign in to [vercel.com](https://vercel.com), pick **Add New… → Project**,
   and import this repo. Vercel detects Next.js automatically.
2. Leave the default settings — `vercel.json` already specifies build,
   install and output commands. No environment variables are required.
3. (Optional) Add the production domain (`dermaheal.co.in`) under
   **Settings → Domains**.

**From the CLI (alternative):**

```bash
npm i -g vercel
vercel              # link to a Vercel project, deploy a preview
vercel --prod       # deploy to production
```

**Auto-deploys:** once linked, every push to `main` deploys to production,
and every other branch / PR gets its own preview URL.

## Project structure

```
src/
├── app/                # Next.js routes (App Router)
├── components/         # Shared chrome + section components
│   └── home/           # Homepage sections
└── data/               # All clinic copy lives here
public/
├── dermaheal-logo.png  # Brand mark
└── whatsapp-icon.png   # FAB icon
```
