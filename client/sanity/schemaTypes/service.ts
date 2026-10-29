import { defineArrayMember, defineField, defineType } from 'sanity';

const emphasisHelp = 'New line = line break. Wrap words in *asterisks* for the italic cherry accent.';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name', maxLength: 48 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Sort order in the footer and "Pairs well with" lists (lowest first). Also sets the 01, 02... numbering.',
      validation: (r) => r.required().integer().min(1),
    }),
    defineField({
      name: 'accent',
      title: 'Accent color',
      type: 'string',
      description: 'Hex color used for this service on the road map and its page, e.g. #f2bbc5.',
      validation: (r) => r.required().regex(/^#[0-9a-fA-F]{6}$/, { name: 'hex color' }),
    }),
    defineField({
      name: 'blurb',
      type: 'text',
      rows: 2,
      description: 'One or two sentences shown in the road map popup.',
      validation: (r) => r.required().max(200),
    }),
    defineField({ name: 'headline', type: 'text', rows: 2, description: emphasisHelp, validation: (r) => r.required() }),
    defineField({ name: 'lede', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({
      name: 'featureImage',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string' })],
    }),
    defineField({ name: 'overviewHeadline', type: 'string', description: 'Wrap words in *asterisks* for the italic accent.', validation: (r) => r.required() }),
    defineField({ name: 'overviewBody', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({
      name: 'includes',
      title: 'What is included',
      type: 'array',
      validation: (r) => r.required().min(1).max(6),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'body', type: 'text', rows: 2, validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        }),
      ],
    }),
    defineField({ name: 'samplesHeadline', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'samplesSub', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'samples',
      title: 'Sample work',
      type: 'array',
      validation: (r) => r.required().max(6),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'title', subtitle: 'label', media: 'image' } },
        }),
      ],
    }),
    defineField({
      name: 'steps',
      title: 'How it runs',
      type: 'array',
      validation: (r) => r.required().min(2).max(6),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'body', type: 'text', rows: 2, validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        }),
      ],
    }),
    defineField({ name: 'ctaHeadline', title: 'Closing headline', type: 'text', rows: 2, description: emphasisHelp, validation: (r) => r.required() }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'blurb', media: 'featureImage' } },
});
