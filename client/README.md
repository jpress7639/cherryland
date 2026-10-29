# Cherryland site

Next.js 15 (App Router) + TypeScript, with Sanity as a headless CMS. The Studio is embedded at `/studio`.

## Run it

```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
npm run typecheck
```

With no Sanity project ID the site runs on the fallback content in `src/lib/fallback.ts` (the four services, the road map, and one sample case study), so it works out of the box.

## What lives where

| Content | Where it's edited |
| --- | --- |
| Services (copy, accent color, sample work, steps, images) | Sanity: **Services** |
| Road map (which stops, their order, positions) | Sanity: **Road map** (one document) |
| Case studies (film, story, gallery, credits) | Sanity: **Case studies** |
| Layout, nav, About page, contact form | Code |

## Routes

| Route | What it does |
| --- | --- |
| `/` | Hero + road map (`components/RoadMap.tsx`) |
| `/services/[slug]` | One template for every service document |
| `/work`, `/work/[slug]` | Case study index and detail |
| `/contact` | Form -> `POST /api/contact` (Resend) |
| `/studio` | Sanity Studio |
| `/api/draft`, `/api/draft/disable` | Turn draft preview on or off |
| `/api/revalidate` | Sanity webhook: refresh pages when content is published |

Not built yet: `/about` (the "About Us" stop and "Studio" nav link point there).

## Connect Sanity

1. Create a project at sanity.io (`npm create sanity@latest` or the web dashboard). Put its ID in `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`.
2. Allow the site to talk to the Studio: in manage.sanity.io > API > CORS origins, add `http://localhost:3000` and your production URL, both with **Allow credentials**.
3. Create two API tokens (API > Tokens): a **Viewer** token for `SANITY_API_READ_TOKEN`, and an **Editor** token for `SANITY_API_WRITE_TOKEN` (only needed to seed).
4. Copy the current content into Sanity:
   ```bash
   npm run seed:dry   # prints what will be written
   npm run seed       # writes 4 services + the road map (fixed IDs, safe to re-run)
   ```
   Images are not seeded. Add them in the Studio. Case studies are not seeded either: the sample "Midnight Orchard" is placeholder copy.
5. Open `/studio`, sign in, and edit.

If Sanity is configured but a dataset has no services yet, the site shows none. Seed first.

## Publishing: webhook

Pages are cached and tagged (`service`, `roadMap`, `caseStudy`, `caseStudy:<slug>`). To refresh them the moment someone publishes, add a webhook in manage.sanity.io > API > Webhooks:

- URL: `https://<your-site>/api/revalidate`
- Trigger on: create, update, delete
- Filter: `_type in ["service", "roadMap", "caseStudy"]`
- Projection: `{_type, "slug": slug.current}`
- Secret: the value of `SANITY_REVALIDATE_SECRET`

The route verifies the signature before doing anything. Editing a service also refreshes the road map, since the map shows service names, colors, and links.

## Draft preview

In the Studio, "Open preview" on a service, case study, or the road map opens the site in Draft Mode, reading unpublished changes (needs `SANITY_API_READ_TOKEN`). A banner at the top has an exit link.

Caveat: the preview secret has to be in the Studio's browser bundle for the preview link to work, so treat it as a low-grade gate, not real access control. Drafts are marketing copy here, so I judged that acceptable. If drafts become sensitive, switch to `next-sanity`'s `defineEnableDraftMode`, which validates against Sanity instead of a shared secret.

## Types

Query results are typed from the schema, so a schema or query change shows up as a compile error instead of a runtime surprise.

- Queries live in `src/lib/queries.ts` (wrapped in `defineQuery`).
- `npm run typegen` re-extracts the schema and regenerates `sanity.types.ts`. Run it whenever you change `sanity/schemaTypes/*` or a query, and commit the result. If the CLI asks you to authenticate, run `npx sanity login`.
- `src/lib/content.ts` is the only place that reads Sanity. It maps nullable query results into the app types in `src/lib/types.ts`.

## Contact form email

Uses Resend's REST API (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`). In development with these unset, inquiries are logged to the terminal. In production the route returns an error instead of silently dropping them.

## Known rough edges

- Road map stops are placed by x/y numbers (0-1440 by 0-420) in the Studio. It works, but dragging stops on the trail would be friendlier. That's a custom input component if the editors want it.
- Service and sample images are optional. Without them the pages show the gradient placeholders.
- Footer social links and the About stop copy are stand-ins.
