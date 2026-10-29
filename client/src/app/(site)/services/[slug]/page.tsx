import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { draftMode } from 'next/headers';
import type { CSSProperties } from 'react';
import { Rich } from '@/components/Rich';
import { getService, getServices } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  return service ? { title: service.name, description: service.lede } : {};
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const [service, services] = await Promise.all([getService(slug, isEnabled), getServices(isEnabled)]);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug);

  return (
    <div style={{ '--accent': service.accent } as CSSProperties}>
      <section className="service-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/#services">Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.name}</span>
          </nav>
          <h1 className="display service-hero__title">
            <Rich text={service.headline} />
          </h1>
          <p className="lede">{service.lede}</p>
        </div>
      </section>

      <div className="wrap">
        <div className="feature-image">
          {service.featureImage && (
            <Image
              src={service.featureImage.url}
              alt={service.featureImage.alt ?? ''}
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          )}
        </div>
      </div>

      <section className="section overview">
        <div className="wrap overview__inner">
          <div className="overview__intro">
            <h2 className="display">
              <Rich text={service.overviewHeadline} />
            </h2>
            <p>{service.overviewBody}</p>
          </div>
          <ul className="includes" data-count={service.includes.length}>
            {service.includes.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section samples">
        <div className="wrap">
          <div className="section-head">
            <h2 className="display">{service.samplesHeadline}</h2>
            <p>{service.samplesSub}</p>
          </div>
          <ul className="sample-grid">
            {service.samples.map((s) => (
              <li key={s.title} className="sample-tile">
                <div className="sample-tile__art">
                  {s.image && <Image src={s.image} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" />}
                </div>
                <div className="sample-tile__caption">
                  <h3>{s.title}</h3>
                  <span>{s.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section process">
        <div className="wrap">
          <h2 className="label label--cherry">How it runs</h2>
          <ol className="steps">
            {service.steps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section related">
        <div className="wrap">
          <h2 className="label label--cherry">Pairs well with</h2>
          <ul className="related__list">
            {related.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>
                  {s.name}
                  <span>{s.number}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2 className="display">
            <Rich text={service.ctaHeadline} />
          </h2>
          <Link href="/contact" className="link-underline link-underline--light">
            Start a project
          </Link>
        </div>
      </section>
    </div>
  );
}
