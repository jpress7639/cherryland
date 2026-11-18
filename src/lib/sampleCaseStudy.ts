import type { CaseStudy } from './types';

let key = 0;
const block = (text: string, style: 'normal' | 'blockquote' = 'normal') => ({
  _type: 'block' as const,
  _key: `sample-${key++}`,
  style,
  children: [{ _type: 'span' as const, _key: `sample-span-${key++}`, text, marks: [] }],
});

/** Placeholder used until a Sanity project is connected. Replace with a real project. */
export const sampleCaseStudy: CaseStudy = {
  title: 'Tiffany Haddish',
  slug: 'tiffany-haddish',
  headline: 'Tiffany Haddish:\npartnership built for *Super King Markets.*',
  tagline:
    "A full campaign for Tiffany Haddish's project: identity, film, and a rollout built to feel like one continuous story.",
  client: 'Super King Markets',
  year: '2026',
  location: 'Los Angeles, CA',
  services: ['brand', 'content', 'strategy'],
  duration: '2:14',
  story: [
    block(
      "We produced a partnership with Tiffany Haddish, Super King Markets, and former California gubernatorial candidate Stephen J. Cloobeck called “Affordability Day”. ",
    ),
    block(
      'Haddish and Cloobeck paid for groceries for everyone at the Altadena Super King location, to directly provide relief for families impacted by the Eaton Fire.',
    ),
    block(
      "Cherryland coordinated the partnership logistics, ran production on-site, and handled all post-production and rollout on socials.",
    ),
    block(
      'This partnership was featured on Jimmy Kimmel Live! during Tiffany Haddish’s appearance later that same month.',
    ),
  ],
  gallery: [],
  credits: [
    { group: 'team', label: 'Creative direction', value: 'Fiona Grey' },
    { group: 'team', label: 'Production', value: 'Celeste Tauchar' },
    { group: 'team', label: 'Video direction', value: 'Cherryland Studio' },
    { group: 'details', label: 'Location', value: 'Los Angeles, CA' },
    { group: 'details', label: 'Shoot length', value: '1 day' },
    { group: 'details', label: 'Deliverables', value: 'Film, photo, social' },
  ],
  next: null,
};
