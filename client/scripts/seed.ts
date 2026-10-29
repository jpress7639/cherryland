/**
 * Copies the fallback content (src/lib/fallback.ts) into Sanity: the four services and the road map.
 *
 *   npm run seed:dry   print the documents, change nothing
 *   npm run seed       write them (needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local)
 *
 * Uses createOrReplace with fixed IDs, so re-running resets those documents to the seed content.
 * Images are not seeded; add them in the Studio.
 */
import { createClient, type IdentifiedSanityDocumentStub } from '@sanity/client';
import { fallbackServices, fallbackStops } from '../src/lib/fallback';

const withKeys = <T extends object>(prefix: string, items: T[]) =>
  items.map((item, i) => ({ _key: `${prefix}-${i + 1}`, ...item }));

export function buildDocuments(): IdentifiedSanityDocumentStub[] {
  const services = fallbackServices.map((s, i) => ({
    _id: `service-${s.slug}`,
    _type: 'service' as const,
    name: s.name,
    slug: { _type: 'slug' as const, current: s.slug },
    order: i + 1,
    accent: s.accent,
    blurb: s.blurb,
    headline: s.headline,
    lede: s.lede,
    overviewHeadline: s.overviewHeadline,
    overviewBody: s.overviewBody,
    includes: withKeys(`${s.slug}-inc`, s.includes),
    samplesHeadline: s.samplesHeadline,
    samplesSub: s.samplesSub,
    samples: withKeys(`${s.slug}-sample`, s.samples.map(({ title, label }) => ({ title, label }))),
    steps: withKeys(`${s.slug}-step`, s.steps),
    ctaHeadline: s.ctaHeadline,
  }));

  const roadMap = {
    _id: 'roadMap',
    _type: 'roadMap' as const,
    stops: fallbackStops.map((stop, i) => ({
      _key: `stop-${i + 1}`,
      x: stop.x,
      y: stop.y,
      labelSide: stop.labelSide,
      ...(stop.service
        ? { service: { _type: 'reference' as const, _ref: `service-${stop.service}` } }
        : { label: stop.label, blurb: stop.blurb, href: stop.href, accent: stop.accent }),
    })),
  };

  return [...services, roadMap];
}

async function main() {
  const docs = buildDocuments();

  if (process.argv.includes('--dry')) {
    console.log(JSON.stringify(docs, null, 2));
    console.log(`\n${docs.length} documents (dry run, nothing written)`);
    return;
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) {
    throw new Error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local first.');
  }

  const client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-10-01',
    token,
    useCdn: false,
  });

  const tx = client.transaction();
  for (const doc of docs) tx.createOrReplace(doc);
  await tx.commit();
  console.log(`Seeded ${docs.length} documents: ${docs.map((d) => d._id).join(', ')}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
