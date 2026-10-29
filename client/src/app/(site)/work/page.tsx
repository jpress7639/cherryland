import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { draftMode } from 'next/headers';
import { getCaseStudies } from '@/lib/content';

export const metadata: Metadata = { title: 'Work' };

export default async function WorkPage() {
  const { isEnabled } = await draftMode();
  const studies = await getCaseStudies(isEnabled);
  return (
    <section className="service-hero">
      <div className="wrap">
        <h1 className="display service-hero__title">
          Selected <em>work.</em>
        </h1>
        <ul className="work-grid">
          {studies.map((s) => (
            <li key={s.slug}>
              <Link href={`/work/${s.slug}`} className="work-card">
                <div className="work-card__art">
                  {s.poster && <Image src={s.poster} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />}
                </div>
                <h2 className="display">{s.title}</h2>
                <p>{[s.client, s.year].filter(Boolean).join(', ')}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
