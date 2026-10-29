'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'Studio' },
  { href: '/#services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const isCurrent = (href: string) => !href.includes('#') && pathname.startsWith(href);

  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link href="/" className="logo" aria-label="Cherryland home">
          Cherry<span>land</span>
        </Link>
        <nav aria-label="Primary">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={isCurrent(l.href) ? 'page' : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/contact" className="btn-pill">
          Inquire
        </Link>
      </div>
    </header>
  );
}
