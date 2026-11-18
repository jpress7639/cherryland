import Image from 'next/image';
import Link from 'next/link';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import type { CaseStudy } from '@/lib/types';
import { Rich } from './Rich';

const storyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote className="pull-quote">{children}</blockquote>,
  },
};

export function CaseStudyView({
  study,
  serviceNames,
}: {
  study: CaseStudy;
  /** service slug -> display name */
  serviceNames: Record<string, string>;
}) {
  const meta = [
    { label: 'Client', value: study.client },
    { label: 'Services', value: study.services?.map((slug) => serviceNames[slug] ?? slug).join(', ') },
    { label: 'Year', value: study.year },
    { label: 'Location', value: study.location },
  ].filter((m) => m.value);

  const team = study.credits?.filter((c) => c.group === 'team') ?? [];
  const details = study.credits?.filter((c) => c.group === 'details') ?? [];

  return (
    <>
      <section className="case-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/work">Work</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{study.title}</span>
          </nav>
          <h1 className="display case-hero__title">
            <Rich text={study.headline ?? study.title} />
          </h1>
          {study.tagline && <p className="lede">{study.tagline}</p>}

          {meta.length > 0 && (
            <dl className="meta-row">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="label">{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <div className="wrap">
        <div className="video-header">
          {study.videoUrl ? (
            <video
              controls
              playsInline
              preload="metadata"
              poster={study.poster}
              src={study.videoUrl}
              aria-label={`${study.title} film`}
            />
          ) : (
            <div className="video-header__empty">
              <span>Add a film URL in Sanity to show the video here.</span>
            </div>
          )}
          {study.duration && <span className="video-header__duration">{study.duration}</span>}
        </div>
      </div>

      {study.story && study.story.length > 0 && (
        <section className="section storyline">
          <div className="wrap storyline__inner">
            <div>
              <h2 className="display">The story</h2>
            </div>
            <div className="storyline__body">
              {/* Generated block types (markDefs: null) are narrower than PortableTextBlock; the shapes are compatible at runtime */}
              <PortableText value={study.story as PortableTextBlock[]} components={storyComponents} />
            </div>
          </div>
        </section>
      )}

      {study.gallery && study.gallery.length > 0 && (
        <section className="section gallery">
          <div className="wrap">
            <h2 className="display">Selected frames from the campaign.</h2>
            <div className="gal-grid">
              {study.gallery.map((img, i) => (
                <figure key={img.url + i} className={`gtile gtile--${img.size}`}>
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    sizes={img.size === 'full' ? '100vw' : img.size === 'half' ? '50vw' : '33vw'}
                  />
                  {img.caption && <figcaption>{img.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {(team.length > 0 || details.length > 0) && (
        <section className="section credits">
          <div className="wrap credits__inner">
            {[
              { title: 'Cherryland team', rows: team },
              { title: 'Project details', rows: details },
            ]
              .filter((g) => g.rows.length > 0)
              .map((g) => (
                <div key={g.title}>
                  <h2 className="label">{g.title}</h2>
                  <dl>
                    {g.rows.map((r) => (
                      <div key={r.label} className="credit-row">
                        <dt>{r.label}</dt>
                        <dd>{r.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
          </div>
        </section>
      )}

      {study.next && (
        <section className="cta">
          <div className="wrap">
            <p className="label">Next case study</p>
            <h2 className="display">
              <Rich text={`*${study.next.title}*`} />
            </h2>
            {study.next.tagline && <p className="cta__sub">{study.next.tagline}</p>}
            <Link href={`/work/${study.next.slug}`} className="link-underline link-underline--light">
              View case study
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
