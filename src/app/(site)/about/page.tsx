import type { Metadata } from 'next';
import Image from 'next/image';
import { draftMode } from 'next/headers';
import { Rich } from '@/components/Rich';
import { getAboutPage } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the people behind Cherryland, a creative agency for music, brands, and politics.',
};

/** "Celeste Tauchar" -> first name in ink, last word in cherry */
function TwoToneName({ name }: { name: string }) {
  const i = name.lastIndexOf(' ');
  if (i < 0) return <>{name}</>;
  return (
    <>
      {name.slice(0, i)} <span>{name.slice(i + 1)}</span>
    </>
  );
}

export default async function AboutPage() {
  const { isEnabled } = await draftMode();
  const about = await getAboutPage(isEnabled);

  return (
    <>
      <section className="about-hero">
        <div className="wrap">
          <h1 className="display about-hero__title">
            <Rich text={about.headline} />
          </h1>
        </div>
        <div className="about-hero__photo">
          {about.heroImage && (
            <Image src={about.heroImage.url} alt={about.heroImage.alt ?? ''} fill priority sizes="100vw" />
          )}
        </div>
      </section>

      <section className="founders">
        <div className="wrap founders__grid">
          {about.founders.map((f) => (
            <article key={f.id} className="founder">
              <h2 className="display founder__name">
                <TwoToneName name={f.name} />
              </h2>
              {f.role && <p className="founder__role">{f.role}</p>}
              <div className="founder__bio">
                {f.bio.split(/\n{2,}/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {about.crew.length > 0 && (
        <section className="crew">
          <div className="wrap">
            <h2 className="display crew__title">{about.crewHeading}</h2>
            <ul className="crew__grid">
              {about.crew.map((c) => (
                <li key={c.id} className="crew__member">
                  <div className="crew__photo">
                    {c.photo && <Image src={c.photo} alt={c.name} fill sizes="(max-width: 700px) 100vw, 33vw" />}
                  </div>
                  <h3>{c.name}</h3>
                  {c.role && <p className="crew__role">{c.role}</p>}
                  {c.bio && <p className="crew__bio">{c.bio}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
