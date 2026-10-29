import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';

const SINGLETONS = ['roadMap'];

const previewUrl = (path: string) => {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const secret = process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET ?? '';
  return `${origin}/api/draft?secret=${encodeURIComponent(secret)}&path=${encodeURIComponent(path)}`;
};

export default defineConfig({
  name: 'cherryland',
  title: 'Cherryland',
  basePath: '/studio',
  // placeholder keeps schema extraction and builds working before a project exists
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'unset',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Road map')
              .id('roadMap')
              .child(S.document().schemaType('roadMap').documentId('roadMap')),
            S.divider(),
            S.documentTypeListItem('service').title('Services'),
            S.documentTypeListItem('caseStudy').title('Case studies'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    // the road map is a singleton: no "create new" entry for it
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    newDocumentOptions: (prev) => prev.filter((o) => !SINGLETONS.includes(o.templateId)),
    actions: (prev, { schemaType }) =>
      SINGLETONS.includes(schemaType) ? prev.filter(({ action }) => action && !['unpublish', 'delete', 'duplicate'].includes(action)) : prev,
    productionUrl: async (prev, { document }) => {
      const slug = (document as { slug?: { current?: string } }).slug?.current;
      switch (document._type) {
        case 'service':
          return slug ? previewUrl(`/services/${slug}`) : prev;
        case 'caseStudy':
          return slug ? previewUrl(`/work/${slug}`) : prev;
        case 'roadMap':
          return previewUrl('/');
        default:
          return prev;
      }
    },
  },
});
