import { Fragment } from 'react';

type MarqueeProps = {
  items: readonly string[];
};

/**
 * A single continuous band between the masthead and the body of the site.
 * The list is duplicated once and translated by exactly -50%, which is what
 * makes the loop seamless without measuring anything at runtime.
 */
export function Marquee({ items }: MarqueeProps) {
  const run = [...items, ...items];

  return (
    <div className="marquee relative overflow-hidden border-y border-rule py-3.5" aria-hidden="true">
      <div className="marquee-track">
        {run.map((item, i) => (
          <Fragment key={`${item}-${i}`}>
            <span className="meta whitespace-nowrap px-6 text-paper-faint">{item}</span>
            <span className="meta select-none text-flare">✳</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
