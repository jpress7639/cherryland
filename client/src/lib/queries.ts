import { defineQuery } from 'groq';

// Queries are kept as static strings so `npm run typegen` can generate result types for them.

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(order asc) {
    "slug": slug.current,
    order,
    name,
    accent,
    blurb,
    headline,
    lede,
    "featureImage": featureImage{ "url": asset->url, alt },
    overviewHeadline,
    overviewBody,
    includes[]{ title, body },
    samplesHeadline,
    samplesSub,
    samples[]{ title, label, "image": image.asset->url },
    steps[]{ title, body },
    ctaHeadline
  }
`);

export const ROAD_MAP_QUERY = defineQuery(`
  *[_type == "roadMap"][0].stops[]{
    _key,
    x,
    y,
    labelSide,
    "label": coalesce(label, service->name),
    "blurb": coalesce(blurb, service->blurb),
    "accent": coalesce(accent, service->accent),
    "href": select(defined(service) => "/services/" + service->slug.current, href)
  }
`);

export const CASE_STUDY_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    headline,
    tagline,
    client,
    year,
    location,
    services,
    videoUrl,
    "poster": poster.asset->url,
    duration,
    story,
    gallery[]{ "url": asset->url, alt, caption, "size": coalesce(size, "half") },
    credits[]{ group, label, value },
    "next": nextProject->{ title, "slug": slug.current, tagline }
  }
`);

export const CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy"] | order(year desc) {
    title,
    "slug": slug.current,
    tagline,
    client,
    year,
    "poster": poster.asset->url
  }
`);
