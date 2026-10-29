import { createClient, type SanityClient } from '@sanity/client';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const hasSanity = Boolean(projectId);

const base = { projectId, dataset, apiVersion: '2024-10-01' } as const;

// Server-side only, and tag-revalidated, so skip the API CDN (it would serve stale data right after a publish)
const publishedClient: SanityClient | null = hasSanity ? createClient({ ...base, useCdn: false }) : null;

const token = process.env.SANITY_API_READ_TOKEN;
const draftClient: SanityClient | null =
  hasSanity && token ? createClient({ ...base, useCdn: false, token, perspective: 'drafts' }) : null;

/** Draft Mode reads drafts (needs SANITY_API_READ_TOKEN); everything else reads published content. */
export const getClient = (preview = false) => (preview && draftClient ? draftClient : publishedClient);

/** Preview requests are never cached; published requests are cached until a webhook revalidates their tags. */
export const fetchOptions = (tags: string[], preview = false) =>
  preview && draftClient ? ({ cache: 'no-store' } as const) : ({ next: { tags } } as const);
