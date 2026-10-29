import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Tell us about the project, the artist, and the timeline.',
};

export default function ContactPage() {
  return (
    <>
      <section className="contact-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Cherryland</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Contact</span>
          </nav>
          <h1 className="display contact-hero__title">
            Let&rsquo;s build something <em>unforgettable.</em>
          </h1>
          <p className="lede">
            Tell us about the project, the artist, and the timeline. We read every inquiry and reply within two
            business days.
          </p>
        </div>
      </section>

      <section className="section contact-grid">
        <div className="wrap contact-grid__inner">
          <div className="contact-grid__form">
            <ContactForm />
          </div>
          <aside className="contact-grid__info">
            <div className="info-card">
              <h2 className="display">Cherryland</h2>
              <p>
                A creative agency for musical artists: creative direction, production, events, and social under one
                roof.
              </p>
              <p className="coords">34.0522° N, 118.2437° W. Los Angeles</p>
            </div>
            <dl className="info-card info-card--rows">
              <div>
                <dt>Response time</dt>
                <dd>Within 2 business days</dd>
              </div>
              <div>
                <dt>Booking window</dt>
                <dd>4–6 weeks out</dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>Los Angeles, CA</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
