import Image from 'next/image';
import Link from 'next/link';
import { draftMode } from 'next/headers';
import { Rich } from '@/components/Rich';
import { getCaseStudies } from '@/lib/content';
import { fallbackArtists, recentWorkSlots } from '@/lib/fallback';

export default async function HomePage() {
  const { isEnabled } = await draftMode();
  const cases = await getCaseStudies(isEnabled);

  return (
    <>
      <section className="hero" id="services">
        <div className="wrap">
          <p className="hero__eyebrow">Creative Agency</p>
          <h1 className="display hero__title">
            <Rich text={'Welcome to\n*Cherryland.*'} />
          </h1>
          <p className="hero__lede">
            We tell stories we&apos;re passionate about for those who are ready to challenge convention. No matter how
            you roll the dice, your next move should include intention and strategy. Should tell a story.
          </p>
          <p className="hero__tags">Music • Brands • Politics</p>
        </div>
      </section>

      <section className="artists" aria-label="Selected projects">
        <ul className="wrap artists__list">
          <li className="artists__lead">Selected Projects</li>
          {fallbackArtists.map((name) => (
            <li key={name}>
              <span className="artists__sep" aria-hidden="true" />
              {name}
            </li>
          ))}
        </ul>
      </section>

      <section className="recent">
        <div className="wrap">
          <h2 className="display recent__title">
            <Rich text={'Recent work, made for\nrooms that get loud.'} />
          </h2>
          <ul className="recent__grid">
            {recentWorkSlots.map((slot, i) => {
              const study = cases[i];
              const image = study?.poster ?? slot.image;
              const title = study?.title ?? slot.title;
              const label = study?.client ?? slot.label;
              const art = (
                <>
                  {image && <Image src={image} alt="" fill sizes="(max-width: 900px) 100vw, 66vw" />}
                  <span className="recent__caption">
                    <strong>{title}</strong>
                    <small>{label}</small>
                  </span>
                </>
              );
              return (
                <li key={slot.title} className="recent__tile" data-size={slot.size}>
                  {study ? (
                    <Link href={`/work/${study.slug}`} aria-label={`${study.title}, case study`}>
                      {art}
                    </Link>
                  ) : (
                    <div>{art}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="statement">
        <p className="statement__text">
          <Rich text="At Cherryland *we focus on making stories.* We build the world around the sound – sleek where it needs to move fast, artful where it needs to linger." />
        </p>
      </section>

      <section className="cta cta--home">
        <div className="wrap">
          <h2 className="display">
            <Rich text={'Got a story worth\n*building a world around?*'} />
          </h2>
          <Link href="/contact" className="link-underline link-underline--light">
            Start a project →
          </Link>
        </div>
      </section>
    </>
  );
}
