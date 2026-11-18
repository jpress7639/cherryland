'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Logo } from './Logo';
import { RoadMap } from './RoadMap';
import type { MapStop } from '@/lib/types';

/**
 * Site header: logo on the left, the road map on the right (wide screens).
 * Below 900px the map is replaced by a hamburger button that opens a full-screen menu with the same stops.
 */
export function Header({ stops }: { stops: MapStop[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  // Close the menu when the route changes
  useEffect(() => setOpen(false), [pathname]);

  // While open: lock page scroll, close on Escape, move focus into the menu
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    firstLink.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // If the window grows past the mobile breakpoint, drop the menu so scroll isn't left locked
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const isCurrent = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header className="site-header" data-menu-open={open || undefined}>
      <div className="wrap site-header__inner">
        <div className="site-header__brand">
          <Link href="/" aria-label="Cherryland home">
            <Logo />
          </Link>
          <p className="site-header__hint">
            <span aria-hidden="true" className="site-header__diamond" />
            Select a stop to explore
          </p>
        </div>

        <div className="site-header__map">
          <RoadMap stops={stops} />
        </div>

        <button
          ref={button}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-toggle__bars" aria-hidden="true" />
        </button>
      </div>

      <nav id="mobile-menu" className="mobile-menu" aria-label="Primary" hidden={!open}>
        <ul>
          {stops.map((stop, i) => (
            <li key={stop.id} style={{ '--accent': stop.accent } as CSSProperties}>
              <Link
                href={stop.href}
                ref={i === 0 ? firstLink : undefined}
                aria-current={isCurrent(stop.href) ? 'page' : undefined}
              >
                <span className="stop__tile" aria-hidden="true" />
                <span className="mobile-menu__label">{stop.label}</span>
                <span className="mobile-menu__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-menu__secondary">
          <Link href="/work" aria-current={isCurrent('/work') ? 'page' : undefined}>
            Work
          </Link>
          <Link href="/contact" aria-current={isCurrent('/contact') ? 'page' : undefined}>
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
