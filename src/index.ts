import {createClient, type SanityClient} from '@sanity/client';

export interface SiteSettings {
  title: string;
  tagline?: string;
}

export function createSanityWebsiteClient(overrides?: {
  projectId?: string;
  dataset?: string;
  apiVersion?: string;
}): SanityClient {
  const projectId = overrides?.projectId ?? process.env.SANITY_PROJECT_ID;
  const dataset = overrides?.dataset ?? process.env.SANITY_DATASET;
  const apiVersion = overrides?.apiVersion ?? process.env.SANITY_API_VERSION ?? '2025-01-01';

  if (!projectId || !dataset) {
    throw new Error('SANITY_PROJECT_ID and SANITY_DATASET are required to generate the site.');
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  });
}

export async function fetchSiteSettings(client = createSanityWebsiteClient()): Promise<SiteSettings | null> {
  return client.fetch<SiteSettings | null>(`*[_type == "siteSettings"][0]{title, tagline}`);
}

export function renderHomepage(settings: SiteSettings | null): string {
  const title = settings?.title ?? 'Cherryland';
  const tagline = settings?.tagline ? `<p>${settings.tagline}</p>` : '';

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title></head><body><h1>${title}</h1>${tagline}</body></html>`;
}
