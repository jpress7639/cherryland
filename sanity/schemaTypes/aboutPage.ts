import { defineArrayMember, defineField, defineType } from 'sanity';

/** Singleton: the About Us page. */
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      type: 'string',
      description: 'Wrap words in *asterisks* for the italic cherry accent, e.g. About *Us.*',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Wide, full-width photo under the headline.',
      fields: [defineField({ name: 'alt', type: 'string' })],
    }),
    defineField({
      name: 'founders',
      type: 'array',
      description: 'Shown as two columns under the photo. The last word of the name is set in cherry red.',
      validation: (r) => r.required().min(1).max(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'founder',
          fields: [
            defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'role', type: 'string' }),
            defineField({ name: 'bio', type: 'text', rows: 8, validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'name', subtitle: 'role' } },
        }),
      ],
    }),
    defineField({ name: 'crewHeading', type: 'string', initialValue: 'Meet Our Talented Crew' }),
    defineField({
      name: 'crew',
      type: 'array',
      validation: (r) => r.max(12),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'crewMember',
          fields: [
            defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'role', type: 'string' }),
            defineField({ name: 'bio', type: 'text', rows: 3 }),
            defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'About page' }) },
});
