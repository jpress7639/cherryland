import { cache } from 'react';
import type { CASE_STUDY_QUERYResult } from '../../sanity.types';
import { fallbackServices, fallbackStops } from './fallback';
import { CASE_STUDIES_QUERY, CASE_STUDY_QUERY, ROAD_MAP_QUERY, SERVICES_QUERY } from './queries';
import { fetchOptions, getClient } from './sanity';
import { sampleCaseStudy } from './sampleCaseStudy';
import type { CaseStudy, CaseStudyCard, MapStop, Service } from './types';

/**
 * Content access layer. Every page reads through here.
 * - With a Sanity project configured: GROQ queries (result types come from `sanity.types.ts`).
 * - Without one: the fallback content in `fallback.ts`, so the site runs out of the box.
 * Cache tags ('service', 'roadMap', 'caseStudy', 'caseStudy:<slug>') are what the webhook revalidates.
 */

const pad = (n: number) => String(n).padStart(2, '0');
const orUndefined = <T>(value: T | null | undefined) => value ?? undefined;

const withNumbers = (list: Omit<Service, 'number'>[]): Service[] =>
  list.map((s, i) => ({ ...s, number: pad(i + 1) }));

// ---------- services ----------

export const getServices = cache(async (preview = false): Promise<Service[]> => {
  const client = getClient(preview);
  if (!client) return withNumbers(fallbackServices);

  const rows = await client.fetch(SERVICES_QUERY, {}, fetchOptions(['service'], preview));
  return rows.map((row, i) => ({
    slug: row.slug,
    number: pad(i + 1),
    name: row.name,
    accent: row.accent,
    blurb: row.blurb,
    headline: row.headline,
    lede: row.lede,
    featureImage: row.featureImage?.url
      ? { url: row.featureImage.url, alt: orUndefined(row.featureImage.alt) }
      : undefined,
    overviewHeadline: row.overviewHeadline,
    overviewBody: row.overviewBody,
    includes: row.includes,
    samplesHeadline: row.samplesHeadline,
    samplesSub: row.samplesSub,
    samples: row.samples.map((s) => ({ title: s.title, label: s.label, image: orUndefined(s.image) })),
    steps: row.steps,
    ctaHeadline: row.ctaHeadline,
  }));
});

export async function getService(slug: string, preview = false): Promise<Service | null> {
  const all = await getServices(preview);
  return all.find((s) => s.slug === slug) ?? null;
}

// ---------- road map ----------

export const getRoadMap = cache(async (preview = false): Promise<MapStop[]> => {
  const client = getClient(preview);

  if (!client) {
    const services = withNumbers(fallbackServices);
    return fallbackStops.map((stop, i) => {
      const service = stop.service ? services.find((s) => s.slug === stop.service) : undefined;
      const label = service?.name ?? stop.label ?? '';
      return {
        id: stop.service ?? `stop-${i}`,
        label,
        tag: `${pad(i + 1)} — ${label}`,
        blurb: service?.blurb ?? stop.blurb ?? '',
        href: service ? `/services/${service.slug}` : (stop.href ?? '/'),
        accent: service?.accent ?? stop.accent ?? '#a31e34',
        x: stop.x,
        y: stop.y,
        labelSide: stop.labelSide,
      };
    });
  }

  const rows = (await client.fetch(ROAD_MAP_QUERY, {}, fetchOptions(['roadMap', 'service'], preview))) ?? [];
  // Drop stops that couldn't be resolved (for example a linked service that was unpublished)
  return rows.flatMap((row, i): MapStop[] =>
    row.label && row.href && row.accent
      ? [
          {
            id: row._key,
            label: row.label,
            tag: `${pad(i + 1)} — ${row.label}`,
            blurb: row.blurb ?? '',
            href: row.href,
            accent: row.accent,
            x: row.x,
            y: row.y,
            labelSide: row.labelSide,
          },
        ]
      : [],
  );
});

// ---------- case studies ----------

type CaseStudyRow = NonNullable<CASE_STUDY_QUERYResult>;

const toCaseStudy = (row: CaseStudyRow): CaseStudy => ({
  title: row.title,
  slug: row.slug,
  headline: orUndefined(row.headline),
  tagline: orUndefined(row.tagline),
  client: orUndefined(row.client),
  year: orUndefined(row.year),
  location: orUndefined(row.location),
  services: orUndefined(row.services),
  videoUrl: orUndefined(row.videoUrl),
  poster: orUndefined(row.poster),
  duration: orUndefined(row.duration),
  story: orUndefined(row.story),
  gallery: row.gallery?.flatMap((g) =>
    g.url ? [{ url: g.url, alt: g.alt, caption: orUndefined(g.caption), size: g.size }] : [],
  ),
  credits: row.credits?.flatMap((c) => (c.group ? [{ group: c.group, label: c.label, value: c.value }] : [])),
  next: row.next ? { title: row.next.title, slug: row.next.slug, tagline: orUndefined(row.next.tagline) } : null,
});

export async function getCaseStudy(slug: string, preview = false): Promise<CaseStudy | null> {
  const client = getClient(preview);
  if (!client) return slug === sampleCaseStudy.slug ? sampleCaseStudy : null;

  const row = await client.fetch(CASE_STUDY_QUERY, { slug }, fetchOptions(['caseStudy', `caseStudy:${slug}`], preview));
  return row ? toCaseStudy(row) : null;
}

export async function getCaseStudies(preview = false): Promise<CaseStudyCard[]> {
  const client = getClient(preview);
  if (!client) return [sampleCaseStudy];

  const rows = await client.fetch(CASE_STUDIES_QUERY, {}, fetchOptions(['caseStudy'], preview));
  return rows.map((r) => ({
    title: r.title,
    slug: r.slug,
    tagline: orUndefined(r.tagline),
    client: orUndefined(r.client),
    year: orUndefined(r.year),
    poster: orUndefined(r.poster),
  }));
}
