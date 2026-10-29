import type { Service } from './types';

/**
 * Content shown when no Sanity project is connected, and the source for `npm run seed`,
 * which copies it into Sanity. Once Sanity has the content, edit it in the Studio.
 */
export const fallbackServices: Omit<Service, 'number'>[] = [
  {
    slug: 'creative',
    name: 'Creative',
    accent: '#f2bbc5',
    blurb:
      'Brand identity, art direction, and the campaign concepting everything else gets built around.',
    headline: 'Creative direction\nwith a *point of view.*',
    lede: 'Brand identity, art direction, and campaign concepting — the point of view that everything else gets built around.',
    overviewHeadline: 'One vision, *held* across every touchpoint.',
    overviewBody:
      "Creative Direction is the thread that keeps an artist's brand identity, visuals, and campaigns feeling like one coherent world, not a pile of disconnected assets. We set the point of view early, then guard it through every deliverable that follows.",
    includes: [
      { title: 'Brand identity', body: 'Naming, mark, and the visual language an artist is remembered by.' },
      { title: 'Art direction', body: 'On-set direction for shoots, videos, and live visuals.' },
      { title: 'Visual systems', body: 'Guidelines that keep the look consistent as the team scales.' },
      { title: 'Concepting', body: 'The big idea behind a rollout, before a single asset is made.' },
    ],
    samplesHeadline: "A few worlds we've built.",
    samplesSub: 'Selected creative direction across brand and campaign work.',
    samples: [
      { title: 'Artist One', label: 'Brand identity' },
      { title: 'Artist Two', label: 'Art direction' },
      { title: 'Artist Three', label: 'Campaign concept' },
    ],
    steps: [
      { title: 'Discovery', body: "We learn the artist, the sound, and who they're trying to reach." },
      { title: 'Point of view', body: 'A creative thesis the whole project gets measured against.' },
      { title: 'System build', body: 'Guidelines, mood, and reference for every downstream team.' },
      { title: 'Oversight', body: 'We stay attached through execution to protect the vision.' },
    ],
    ctaHeadline: 'Got a brand worth\n*giving a point of view?*',
  },
  {
    slug: 'production',
    name: 'Production',
    accent: '#f8e784',
    blurb:
      'Content creation, video production, and directing, built to hold up across a feed, a stage, and a screen.',
    headline: 'Content that\nsounds like *them.*',
    lede: 'Content creation, video production, and directing, built to hold up across a feed, a stage, and a screen.',
    overviewHeadline: 'Content built *with* the artist, not just of them.',
    overviewBody:
      'We embed early — at rehearsals, in the studio, on the road — so what we shoot has the texture of the real thing. Every deliverable is cut for where it actually lives: vertical, loud, and fast for the feed; considered and widescreen for everything else.',
    includes: [
      { title: 'Content creation', body: "Photo and social-native content shot for the artist's world." },
      { title: 'Video production', body: 'Full concept-to-delivery video, from teasers to music videos.' },
      { title: 'Video directing', body: 'On-set direction to keep footage feeling intentional, not staged.' },
    ],
    samplesHeadline: 'A few reels from the archive.',
    samplesSub: 'Selected content work across photo, video, and full campaigns.',
    samples: [
      { title: 'Artist One', label: 'Tour photo' },
      { title: 'Artist Two', label: 'Music video' },
      { title: 'Artist Three', label: 'Social cutdowns' },
    ],
    steps: [
      { title: 'Immersion', body: 'We sit in on rehearsals or sessions before a single shot is planned.' },
      { title: 'Shot planning', body: 'A lean shot list built around real moments, not staged setups.' },
      { title: 'Production', body: 'On-site photo and video capture, run tight so the artist barely notices us.' },
      { title: 'Delivery', body: 'Cut across formats: feed-ready first, long-form to follow.' },
    ],
    ctaHeadline: 'Got footage worth\n*building a story around?*',
  },
  {
    slug: 'events',
    name: 'Events',
    accent: '#438f5b',
    blurb:
      'Ad production and event production: the campaigns and live moments that put the brand in front of people.',
    headline: 'Moments built\nto *show up.*',
    lede: 'Ad production and event production: the campaigns and live moments that put the brand in front of people, in person and on-screen.',
    overviewHeadline: 'From the room to the *feed*, in one motion.',
    overviewBody:
      "Events and ads aren't separate disciplines here. A good live moment is content, and a good ad campaign should feel like it belongs in the room. We plan both together so the rollout feels like one push, not two.",
    includes: [
      { title: 'Ad production', body: 'Paid and organic campaign assets, built to spread.' },
      { title: 'Event production', body: 'Tour stops, listening parties, and brand activations, run start to finish.' },
    ],
    samplesHeadline: "A few moments we've run.",
    samplesSub: 'Selected event and campaign production work.',
    samples: [
      { title: 'Artist One', label: 'Listening party' },
      { title: 'Artist Two', label: 'Ad campaign' },
      { title: 'Artist Three', label: 'Tour activation' },
    ],
    steps: [
      { title: 'Concept', body: 'We define what the moment needs to do: sell, launch, or celebrate.' },
      { title: 'Logistics', body: 'Venue, vendors, and timelines locked well ahead of the date.' },
      { title: 'Production', body: 'Full on-site run of show, or full ad campaign trafficking.' },
      { title: 'Capture', body: 'Every event doubles as a content shoot for what comes after.' },
    ],
    ctaHeadline: 'Got a moment worth\n*building a room around?*',
  },
  {
    slug: 'social',
    name: 'Social',
    accent: '#f3a978',
    blurb:
      'Social media strategy and community & influencer partnerships, built to grow a real audience.',
    headline: 'Community that\nactually *shows up.*',
    lede: 'Social media strategy and community partnerships & influencer collaborations, built to grow a real audience, not just a follower count.',
    overviewHeadline: 'Strategy that respects the *community.*',
    overviewBody:
      "Social only works if it feels like the artist, not a marketing account wearing their name. We build a posting strategy around who's actually listening, then bring in partners and collaborators who reach real, relevant audiences.",
    includes: [
      { title: 'Social media strategy', body: 'Platform strategy, posting cadence, and voice guidelines.' },
      {
        title: 'Community & influencer partnerships',
        body: 'Collaborations and partnerships that reach real, relevant audiences.',
      },
    ],
    samplesHeadline: "A few campaigns we've grown.",
    samplesSub: 'Selected social strategy and partnership work.',
    samples: [
      { title: 'Artist One', label: 'Platform strategy' },
      { title: 'Artist Two', label: 'Influencer push' },
      { title: 'Artist Three', label: 'Community partnership' },
    ],
    steps: [
      { title: 'Audience research', body: "We find out who's actually listening, and where." },
      { title: 'Strategy', body: 'A posting and partnership plan built around real behavior.' },
      { title: 'Activation', body: 'Partnerships and collaborations go live, tracked closely.' },
      { title: 'Iterate', body: 'We adjust the approach based on what the data actually shows.' },
    ],
    ctaHeadline: 'Got a community worth\n*growing for real?*',
  },
];


/** Road map stops for the fallback: the four services plus an About stop. */
export const fallbackStops: {
  service?: string;
  label?: string;
  blurb?: string;
  href?: string;
  accent?: string;
  x: number;
  y: number;
  labelSide: 'top' | 'bottom';
}[] = [
  { service: 'creative', x: 140, y: 140, labelSide: 'bottom' },
  { service: 'production', x: 420, y: 320, labelSide: 'bottom' },
  { service: 'events', x: 700, y: 100, labelSide: 'top' },
  { service: 'social', x: 980, y: 320, labelSide: 'bottom' },
  {
    label: 'About Us',
    blurb: 'Cherryland is Fiona Grey and Celeste Tauchar, telling stories, not just making more content.',
    href: '/about',
    accent: '#90babf',
    x: 1260,
    y: 160,
    labelSide: 'top',
  },
];
