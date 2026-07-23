export interface SanityRuntimeConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
}

export function getSanityRuntimeConfig(overrides?: {
  projectId?: string;
  dataset?: string;
  apiVersion?: string;
}): SanityRuntimeConfig {
  const projectId = overrides?.projectId ?? process.env.SANITY_PROJECT_ID;
  const dataset = overrides?.dataset ?? process.env.SANITY_DATASET;
  const apiVersion = overrides?.apiVersion ?? process.env.SANITY_API_VERSION ?? '2025-01-01';

  if (!projectId || !dataset) {
    throw new Error('SANITY_PROJECT_ID and SANITY_DATASET are required to generate the site.');
  }

  return {projectId, dataset, apiVersion};
}
