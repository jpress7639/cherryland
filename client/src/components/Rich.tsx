import { Fragment } from 'react';

/**
 * Renders a string where "\n" is a line break and *text* is emphasis.
 * Keeps headline copy in plain data (services.ts) while still allowing the italic accent.
 */
export function Rich({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line.split(/(\*[^*]+\*)/g).map((part, j) =>
            part.length > 2 && part.startsWith('*') && part.endsWith('*') ? (
              <em key={j}>{part.slice(1, -1)}</em>
            ) : (
              part
            ),
          )}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}
