/**
 * Cherryland wordmark: two cherries + CHERRY (bold) LAND (regular).
 * Stand-in for the logo artwork in the Figma file. To use the real PNG/SVG, put it in /public and swap the
 * contents of this component for a next/image <Image> (keep the aria-label on the link in Header).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`logo ${className ?? ''}`}>
      <svg className="logo__mark" viewBox="0 0 44 40" aria-hidden="true">
        <path d="M14 22 C 16 12, 22 6, 31 3" fill="none" stroke="#3f6b3a" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M31 22 C 30 14, 30 8, 31 3" fill="none" stroke="#3f6b3a" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M31 3 C 36 1, 41 3, 42 7 C 37 8, 33 7, 31 3 Z" fill="#4f8a47" />
        <circle cx="13" cy="28" r="10" fill="#6d0f20" />
        <circle cx="32" cy="28" r="10" fill="#8f1a2c" />
        <circle cx="10" cy="25" r="2.6" fill="#fff" opacity=".45" />
        <circle cx="29" cy="25" r="2.6" fill="#fff" opacity=".45" />
      </svg>
      <span className="logo__word">
        CHERRY<span>LAND</span>
      </span>
    </span>
  );
}
