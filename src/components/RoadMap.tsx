'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { MapStop } from '@/lib/types';

const VIEWBOX = { w: 1440, h: 420 };
const PATH =
  'M 140 150 C 260 150, 320 300, 440 300 C 560 300, 600 90, 720 90 C 840 90, 880 300, 1000 300 C 1120 300, 1180 150, 1300 150';

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

const ctaText = (stop: MapStop) =>
  stop.href === '/about' ? 'Meet the team' : `View our ${stop.label.toLowerCase()} services`;

/**
 * The header road map: a compact trail of stops. Each stop is a link. Hovering or focusing one opens a
 * preview card below the map; clicking goes straight to the page. Only rendered on wide screens; small screens use the hamburger menu.
 */
export function RoadMap({ stops }: { stops: MapStop[] }) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const active = stops.find((s) => s.id === activeId) ?? null;

  // Close on Escape, and on a tap/click outside the map (touch has no hover-out)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActiveId(null);
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setActiveId(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, []);

  // Navigating closes the card
  useEffect(() => setActiveId(null), [pathname]);

  return (
    <div className="trail" ref={rootRef} onMouseLeave={() => setActiveId(null)}>
      <div className="trail__canvas">
        <svg
          className="trail__svg"
          viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="trail__dash" d={PATH} />
        </svg>

        {stops.map((stop) => {
          const current = stop.href === '/' ? pathname === '/' : pathname.startsWith(stop.href);
          return (
            <Link
              key={stop.id}
              href={stop.href}
              className="stop"
              data-open={activeId === stop.id || undefined}
              data-current={(current && stop.href !== '/') || undefined}
              data-label={stop.labelSide}
              style={
                {
                  left: pct(stop.x, VIEWBOX.w),
                  top: pct(stop.y, VIEWBOX.h),
                  '--accent': stop.accent,
                } as CSSProperties
              }
              aria-current={current ? 'page' : undefined}
              onMouseEnter={() => setActiveId(stop.id)}
              onFocus={() => setActiveId(stop.id)}
            >
              <span className="stop__tile" />
              <span className="stop__label">{stop.label}</span>
            </Link>
          );
        })}
      </div>

      {active && (
        <div className="trail-pop">
          <div
            id="trail-card"
            className="trail-card"
            role="dialog"
            aria-label={active.label}
            style={{ '--accent': active.accent } as CSSProperties}
          >
            <div className="trail-card__image" aria-hidden="true" />
            <div className="trail-card__body">
              <p className="trail-card__tag">{active.tag}</p>
              <h3>{active.label}</h3>
              <p>{active.blurb}</p>
              <Link href={active.href}>{ctaText(active)} →</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
