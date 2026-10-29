'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { MapStop } from '@/lib/types';

const VIEWBOX = { w: 1440, h: 420 };
const PATH =
  'M 140 140 C 260 140, 300 320, 420 320 C 540 320, 580 100, 700 100 C 820 100, 860 320, 980 320 C 1100 320, 1140 160, 1260 160';

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

function cardPosition(stop: MapStop): CSSProperties {
  const flip = stop.x > 900; // open toward the left near the right edge
  const above = stop.y >= 300; // open upward for stops low on the trail
  return {
    left: pct(stop.x, VIEWBOX.w),
    top: pct(stop.y, VIEWBOX.h),
    transform: `translate(${flip ? 'calc(-100% - 30px)' : '30px'}, ${
      above ? 'calc(-100% - 30px)' : '-24px'
    })`,
  };
}

export function RoadMap({ stops }: { stops: MapStop[] }) {
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

  return (
    <div className="trail" ref={rootRef} onMouseLeave={() => setActiveId(null)}>
      {/* Desktop / tablet: the interactive trail */}
      <div className="trail__canvas">
        <svg
          className="trail__svg"
          viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="trail__dash" d={PATH} />
        </svg>

        {stops.map((stop) => (
          <button
            key={stop.id}
            type="button"
            className="stop"
            data-open={activeId === stop.id || undefined}
            data-label={stop.labelSide}
            style={
              {
                left: pct(stop.x, VIEWBOX.w),
                top: pct(stop.y, VIEWBOX.h),
                '--accent': stop.accent,
              } as CSSProperties
            }
            aria-expanded={activeId === stop.id}
            aria-controls="trail-card"
            onMouseEnter={() => setActiveId(stop.id)}
            onFocus={() => setActiveId(stop.id)}
            onClick={() => setActiveId(stop.id)}
          >
            <span className="stop__tile" />
            <span className="stop__label">{stop.label}</span>
          </button>
        ))}

        {active && (
          <div
            id="trail-card"
            className="trail-card"
            role="dialog"
            aria-label={active.label}
            style={{ ...cardPosition(active), '--accent': active.accent } as CSSProperties}
          >
            <div className="trail-card__image" aria-hidden="true" />
            <div className="trail-card__body">
              <p className="trail-card__tag">{active.tag}</p>
              <h3>{active.label}</h3>
              <p>{active.blurb}</p>
              <Link href={active.href}>View {active.label === 'About Us' ? 'page' : 'service'}</Link>
            </div>
          </div>
        )}
      </div>

      {/* Small screens: the same destinations as a plain list */}
      <ul className="trail__list">
        {stops.map((stop) => (
          <li key={stop.id} style={{ '--accent': stop.accent } as CSSProperties}>
            <Link href={stop.href}>
              <span className="stop__tile" aria-hidden="true" />
              <span>
                <strong>{stop.label}</strong>
                <small>{stop.blurb}</small>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
