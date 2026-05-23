# Dermaheal Skin & Hair Clinic

Marketing site for [Dermaheal Skin & Hair Clinic](https://dermaheal.co.in),
an MD-led dermatology, aesthetics and trichology practice in Dwarka, New
Delhi. Built on **Next.js 16** (App Router, Turbopack), **React 19**,
TypeScript, and **Sanity Studio** as the admin CMS.

The public site is statically generated. Content lives in Sanity once
configured, with a graceful fallback to bundled TypeScript data so the
site keeps building during the CMS setup.

---

## Routes

| Path | Type |
|---|---|
| `/` | Static — homepage with hero, concerns, treatments, doctors, results teaser, testimonials, FAQs, booking and contact |
| `/treatments` | Static — all 27 treatments grouped by category |
| `/treatments/[slug]` | SSG — 27 dedicated treatment detail pages |
| `/concerns` | Static — 12-concern hub |
| `/concerns/[slug]` | SSG — 12 dedicated concern detail pages |
| `/doctors` | Static — three-doctor listing |
| `/doctors/[slug]` | SSG — three doctor profile pages |
| `/results` | Static — patient before-and-after gallery |
| `/studio` | The Sanity Studio admin panel |
| `/sitemap.xml`, `/robots.txt` | Auto-generated |

---

## Local development

```bash
npm install
npm run dev    # http://localhost:3000
```

The Studio mount lives at `http://localhost:3000/studio` once env vars are
set (see below). Until then, `/studio` shows a configuration error while
the public site continues to render from the bundled TypeScript fallback
data.

Useful scripts:

```bash
npm run dev    # dev server (also serves /studio)
npm run build  # production build
npm run start  # serve the built site
npm run lint   # eslint
```

---

## Admin panel — Sanity setup

The Studio at `/studio` lets staff edit:

- **Clinic settings** — name, address, phones, hours, social links, logo
- **Site settings & SEO defaults** — title template, default meta description, default OG image, footer columns
- **Announcement bar** — top bar message + link
- **Treatments** (27) — every field including URL slug, hero image, key
  points, four-step process, six benefits, FAQs and per-page SEO
- **Concerns** (12) — slug, hero image, symptoms, causes, approach,
  recommended treatments, FAQs and per-page SEO
- **Doctors** — slug, portrait, home-card bio, listing bio, detail bio,
  credentials, education timeline, expertise pills, treatments performed,
  patient quotes and per-page SEO
- **Patient results** — before/after photos with consent flag, protocol,
  weeks, concern, and linked treatment
- **Testimonials, homepage FAQs, EEAT pillars, trust strip items**
- **URL redirects** — old path → new path (301 / 302), automatically
  picked up by Next.js at build time

### One-time setup

1. Create a free Sanity project at [sanity.io](https://www.sanity.io/manage):
   - Pick a project name (e.g. `dermaheal`).
   - Use the default `production` dataset.
   - Note the **Project ID** shown on the project page.

2. Add API access:
   - Under **API → CORS Origins**, add
     `http://localhost:3000` and your production domain
     (e.g. `https://dermaheal.co.in`) — both with **Allow credentials**
     enabled so editors stay signed in.
   - Under **API → Tokens**, create a token with **Editor** permissions.
     Copy it — you'll only see the value once.

3. Add env vars in `.env.local` (copy from `.env.local.example`):

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=sk... # editor token, server-only
   ```

4. Seed your project with the bundled content:

   ```bash
   npm run sanity:seed
   ```

   This uploads every current treatment, concern, doctor, result,
   testimonial, FAQ and the clinic settings into your Sanity dataset.

5. Open `http://localhost:3000/studio`, sign in with the same email you
   used to create the Sanity project, and start editing.

### Inviting other staff

Visit your project on [sanity.io/manage](https://www.sanity.io/manage),
open **Members → Invite**, and add an editor by email. They get a sign-in
link and full edit access — Sanity handles auth for you.

### How content flows to the live site

The pages are statically generated. After editing in Studio, Sanity
content reaches the live site at the next build (e.g. when you push to
`main` and Vercel rebuilds). For instant updates, configure on-demand
revalidation in a follow-up iteration.

---

## SEO & URL structure

- Every routable document type (treatments, concerns, doctors) has a
  collapsible **SEO** group in Studio with meta title, meta description,
  social share image override, canonical URL override and noindex toggle.
- URL slugs are editable per document. Use the **URL redirects**
  collection in Studio to map any old slug to a new one — Next.js picks
  these up at build time and serves a proper 301 (or 302) redirect.
- `sitemap.xml` and the `MedicalBusiness` JSON-LD schema are emitted
  automatically.

---

## Deploying on Vercel

1. Sign in to [vercel.com](https://vercel.com), pick **Add New → Project**
   and import the GitHub repo. Vercel detects Next.js automatically.
2. Add the same env vars from `.env.local` under **Settings →
   Environment Variables** (Production scope at minimum).
3. (Optional) Add the production domain under **Settings → Domains**.

Every push to `main` deploys to production; other branches/PRs get a
preview URL.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx           # html/body, fonts (no chrome)
│   ├── globals.css          # full design system
│   ├── (site)/              # public site routes
│   │   ├── layout.tsx       # nav / footer / FAB / booking modal
│   │   ├── page.tsx         # homepage
│   │   ├── treatments/      # listing + [slug] detail
│   │   ├── concerns/        # listing + [slug] detail
│   │   ├── doctors/         # listing + [slug] detail
│   │   └── results/         # before/after gallery
│   └── studio/[[...tool]]/  # Sanity Studio mount
├── components/              # shared UI + home sections
├── data/                    # bundled TS fallback content
└── sanity/
    ├── env.ts               # env var handling, sanityEnabled flag
    ├── lib/
    │   ├── client.ts        # read + write clients
    │   ├── image.ts         # image URL builder
    │   ├── queries.ts       # GROQ strings
    │   └── fetchers.ts      # high-level fetchers w/ TS fallback
    ├── schemas/             # every content type
    └── structure.ts         # Studio sidebar layout
sanity.config.ts             # Studio config (mounted at /studio)
public/                      # logo, whatsapp icon, favicon
```
