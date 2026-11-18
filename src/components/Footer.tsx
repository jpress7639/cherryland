import Link from 'next/link';
import { getServices } from '@/lib/content';

export async function Footer() {
  const services = await getServices();
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <div className="site-footer__logo">Cherryland</div>
        <div className="site-footer__col">
          <h4>Services</h4>
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`}>
              {s.name}
            </Link>
          ))}
        </div>
        <div className="site-footer__col">
          <h4>Studio</h4>
          <Link href="/work">Work</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="site-footer__col">
          <h4>Connect</h4>
          <a href="#">Instagram</a>
          <a href="#">Email</a>
        </div>
      </div>
      <div className="wrap site-footer__legal">
        <span>© Cherryland</span>
        <span>Los Angeles</span>
      </div>
    </footer>
  );
}
