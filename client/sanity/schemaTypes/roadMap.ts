import { defineArrayMember, defineField, defineType } from 'sanity';

/** Singleton: the stops on the home page road map, in the order they appear along the trail. */
export const roadMap = defineType({
  name: 'roadMap',
  title: 'Road map',
  type: 'document',
  fields: [
    defineField({
      name: 'stops',
      type: 'array',
      description:
        'Stops run left to right along the trail. Link a stop to a service to inherit its name, blurb, color, and page. For anything else (like About), fill in the fields manually. Position is in the trail canvas: x from 0 to 1440, y from 0 to 420.',
      validation: (r) => r.required().min(1).max(8),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stop',
          fields: [
            defineField({ name: 'service', type: 'reference', to: [{ type: 'service' }] }),
            defineField({ name: 'label', type: 'string', description: 'Only needed when no service is linked.' }),
            defineField({ name: 'blurb', type: 'text', rows: 2, description: 'Only needed when no service is linked.' }),
            defineField({ name: 'href', title: 'Link', type: 'string', description: 'Only needed when no service is linked. Use a site path like /about.' }),
            defineField({ name: 'accent', type: 'string', description: 'Only needed when no service is linked.', validation: (r) => r.regex(/^#[0-9a-fA-F]{6}$/, { name: 'hex color' }) }),
            defineField({ name: 'x', type: 'number', initialValue: 700, validation: (r) => r.required().min(0).max(1440) }),
            defineField({ name: 'y', type: 'number', initialValue: 200, validation: (r) => r.required().min(0).max(420) }),
            defineField({
              name: 'labelSide',
              type: 'string',
              initialValue: 'bottom',
              options: { list: [{ title: 'Above the tile', value: 'top' }, { title: 'Below the tile', value: 'bottom' }], layout: 'radio' },
              validation: (r) => r.required(),
            }),
          ],
          validation: (r) =>
            r.custom((stop) => {
              const s = stop as { service?: unknown; label?: string; href?: string; blurb?: string; accent?: string } | undefined;
              if (s?.service) return true;
              return s?.label && s?.href && s?.blurb && s?.accent
                ? true
                : 'Link a service, or fill in label, blurb, link, and accent.';
            }),
          preview: {
            select: { title: 'label', service: 'service.name', x: 'x', y: 'y' },
            prepare: ({ title, service, x, y }) => ({ title: service ?? title ?? 'Stop', subtitle: `x ${x}, y ${y}` }),
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Road map' }) },
});
