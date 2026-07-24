# Cherryland Website Rebuild
 
## Overview
 
A full redesign of [cherryland.la](https://www.cherryland.la/) — Cherryland's existing site is a bare-bones Wix build with minimal visual identity. This rebuild aims for an artistic, sleek, and sexy aesthetic that reflects Cherryland's work with musical artists, with their portfolio and case studies as the centerpiece.

## Tech Stack
 
- **Framework:** Next.js (TypeScript)
- **CMS:** Sanity (headless), dataset: `production` (public)
  - Public dataset chosen for CDN-cached, tokenless reads on the live site. Studio editing remains authenticated regardless of dataset visibility.
  - Scaffolded from a clean project template — no predefined schema, since content types are fully custom to this build.
- **Styling:** TBD
- **Hosting/Deployment:** TBD
## Content Model (Sanity Schema)
 
| Type | Purpose |
|---|---|
| `caseStudy` | Individual portfolio pieces — hero media, gallery (image/video/embed), body copy, linked artist, service categories, display variant, year |
| `artist` | Musical artists/clients Cherryland has worked with — name, bio, logo/headshot, website |
| `service` | Service offerings, grouped by category (Marketing / Design / Production) |
| `siteSettings` | Global site data — footer text, social links |
 
Schema files live in `schemaTypes/`, registered via `schemaTypes/index.ts` and wired into `sanity.config.ts`.
 
## Component Architecture
 
Built around a small set of reusable, data-driven components so the same building blocks power the homepage, filtered portfolio views, and individual case study pages:
 
- **`CaseStudyCard`** — image, title, client, category tag; supports `standard` / `featured` / `videoHover` variants (variant is authored per-entry in Sanity, not computed client-side)
- **`CaseStudyGrid`** — renders a collection of `CaseStudyCard`s; supports filtering by artist, category, or year
- **`HeroSection`** — full-bleed image/video header, reused across homepage and case study pages
- **`ServiceCategoryList`** — accordion (mobile) / columns (desktop) rendering of `service` entries by category
- **`ClientLogoMarquee`** — scrolling logo strip, data-driven from `artist` references
- **`PullQuoteSection`** — editorial statement blocks for brand/philosophy copy
- **`ContactCTA`** — closing call-to-action band, reused site-wide
Frontend types for all of the above live in `types/sanity.ts` (content shapes) and `types/components.ts` (component props), kept in sync with the Sanity schema.
 
## Content
 
Cherryland has a large existing library of imagery, video, and media to populate the site. Plan: build and refine the component/design system against a representative subset of case studies first, then batch-import the remainder via Sanity's CLI/API once the schema and visual treatment are locked.
 
## Status
 
- [x] CMS selected (Sanity) and reasoning documented
- [x] Sanity project scaffolded (clean template, TypeScript, public dataset)
- [x] Schema defined: `caseStudy`, `artist`, `service`, `siteSettings`
- [ ] Frontend scaffolded (Next.js + TypeScript)
- [ ] Core components built (`CaseStudyCard`, `CaseStudyGrid`, etc.)
- [ ] Content migration from existing Cherryland library
- [ ] Design pass (masonry/hover treatments per design reference)
- [ ] Client walkthrough of Sanity Studio editing flow