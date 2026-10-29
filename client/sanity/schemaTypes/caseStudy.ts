import { defineArrayMember, defineField, defineType } from 'sanity';

const serviceOptions = [
  { title: 'Creative', value: 'creative' },
  { title: 'Production', value: 'production' },
  { title: 'Events', value: 'events' },
  { title: 'Social', value: 'social' },
];

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headline',
      type: 'text',
      rows: 2,
      description: 'Optional display headline. New line = line break; wrap words in *asterisks* for the italic accent. Falls back to the title.',
    }),
    defineField({ name: 'tagline', type: 'text', rows: 2 }),
    defineField({ name: 'client', type: 'string' }),
    defineField({ name: 'year', type: 'string' }),
    defineField({ name: 'location', type: 'string' }),
    defineField({
      name: 'services',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: serviceOptions, layout: 'tags' },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Film URL',
      type: 'url',
      description: 'Direct link to an MP4 (or other file the browser can play).',
      validation: (r) => r.uri({ scheme: ['https'] }),
    }),
    defineField({ name: 'poster', title: 'Film poster', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'duration', type: 'string', description: 'For example 2:14' }),
    defineField({
      name: 'story',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Pull quote', value: 'blockquote' },
          ],
          lists: [],
          marks: { decorators: [{ title: 'Italic', value: 'em' }], annotations: [] },
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', description: 'Describe the image for screen readers.', validation: (r) => r.required() }),
            defineField({ name: 'caption', type: 'string' }),
            defineField({
              name: 'size',
              type: 'string',
              initialValue: 'half',
              options: {
                list: [
                  { title: 'Half width', value: 'half' },
                  { title: 'Third width', value: 'third' },
                  { title: 'Full width', value: 'full' },
                ],
                layout: 'radio',
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'credits',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'group',
              type: 'string',
              initialValue: 'team',
              options: {
                list: [
                  { title: 'Cherryland team', value: 'team' },
                  { title: 'Project details', value: 'details' },
                ],
                layout: 'radio',
              },
            }),
            defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'value', type: 'string', validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        }),
      ],
    }),
    defineField({ name: 'nextProject', type: 'reference', to: [{ type: 'caseStudy' }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'client', media: 'poster' } },
});
