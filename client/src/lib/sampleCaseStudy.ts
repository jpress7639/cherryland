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
  title: 'Midnight Orchard',
  slug: 'midnight-orchard',
  headline: 'Midnight Orchard:\na world built for *one album.*',
  tagline:
    "A full campaign for Wilder Grey's sophomore record: identity, film, and a rollout built to feel like one continuous story.",
  client: 'Wilder Grey',
  year: '2026',
  location: 'Los Angeles, CA',
  services: ['creative', 'production', 'social'],
  duration: '2:14',
  story: [
    block(
      "Wilder Grey came to us with a record that didn't sound like anything else in her catalog: warmer, stranger, more nocturnal. The brief wasn't a rebrand. It was a request to build a world around one specific album, one that could disappear once the era ended.",
    ),
    block(
      'We spent the first two weeks just listening, to demos, to reference playlists, to the way she talked about the songs. "Midnight Orchard" became the throughline: something cultivated in the dark, half-wild, deliberately grown.',
    ),
    block(
      "It's the first campaign where the visuals felt like they came from inside the songs, not on top of them.",
      'blockquote',
    ),
    block(
      'From there, everything (the typography, the color system, the tour visuals, the content calendar) got built from that one image. The film above was shot over three nights in a citrus grove outside Ojai, using only practical light and moonlight.',
    ),
  ],
  gallery: [],
  credits: [
    { group: 'team', label: 'Creative direction', value: 'Fiona Grey' },
    { group: 'team', label: 'Production', value: 'Celeste Tauchar' },
    { group: 'team', label: 'Video direction', value: 'Cherryland Studio' },
    { group: 'details', label: 'Location', value: 'Ojai, CA' },
    { group: 'details', label: 'Shoot length', value: '3 nights' },
    { group: 'details', label: 'Deliverables', value: 'Film, photo, social' },
  ],
  next: null,
};
