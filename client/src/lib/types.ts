import type { CASE_STUDY_QUERYResult } from '../../sanity.types';

export type Service = {
  slug: string;
  name: string;
  /** "01", "02"... derived from the service's sort order */
  number: string;
  /** Accent color for this service: map tile, popup, and page details */
  accent: string;
  /** One-liner used in the road map popup */
  blurb: string;
  /** Use \n for line breaks and *text* for the italic cherry emphasis */
  headline: string;
  lede: string;
  featureImage?: { url: string; alt?: string };
  overviewHeadline: string;
  overviewBody: string;
  includes: { title: string; body: string }[];
  samplesHeadline: string;
  samplesSub: string;
  samples: { title: string; label: string; image?: string }[];
  steps: { title: string; body: string }[];
  ctaHeadline: string;
};

/** A stop on the road map. Coordinates are in the 1440 x 420 SVG viewBox. */
export type MapStop = {
  id: string;
  label: string;
  tag: string;
  blurb: string;
  href: string;
  accent: string;
  x: number;
  y: number;
  labelSide: 'top' | 'bottom';
};

export type GalleryImage = {
  url: string;
  alt: string;
  caption?: string;
  size: 'half' | 'third' | 'full';
};

export type CaseStudy = {
  title: string;
  slug: string;
  /** Optional display headline. "\n" = line break, *text* = italic emphasis. Falls back to title. */
  headline?: string;
  tagline?: string;
  client?: string;
  year?: string;
  location?: string;
  services?: string[];
  videoUrl?: string;
  poster?: string;
  duration?: string;
  story?: NonNullable<NonNullable<CASE_STUDY_QUERYResult>['story']>;
  gallery?: GalleryImage[];
  credits?: { group: 'team' | 'details'; label: string; value: string }[];
  next?: { title: string; slug: string; tagline?: string } | null;
};

export type CaseStudyCard = Pick<CaseStudy, 'title' | 'slug' | 'tagline' | 'client' | 'year' | 'poster'>;
