import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { RevealGroup } from './Reveal';

type SectionProps = {
  id: string;
  index: string;
  label: string;
  caption?: string;
  children: ReactNode;
  className?: string;
  /** Oversized index digits printed behind the section as composition. */
  ghostIndex?: boolean;
};

/**
 * The recurring chrome every section inherits: a top hairline, the
 * `NN / LABEL` marker, an optional caption in the right-hand column, and a
 * rule that draws itself as the header enters.
 */
export function Section({ id, index, label, caption, children, className, ghostIndex }: SectionProps) {
  return (
    <section
      id={id}
      // Programmatically focusable so the skip link can hand over keyboard focus.
      tabIndex={-1}
      className={cn('relative border-t border-rule py-[--sec-y]', ghostIndex && 'overflow-hidden', className)}
    >
      <div className="shell relative">
        {ghostIndex && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-[-0.14em] select-none text-[24vw] font-semibold leading-[0.75] tracking-[-0.06em] text-[rgba(236,232,225,0.032)] lg:text-[17vw]"
          >
            {index}
          </span>
        )}

        <RevealGroup className="mb-[clamp(2.75rem,6vw,5.5rem)]">
          <div className="grid gap-x-8 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="mask-line">
                <div className="flex items-baseline gap-3">
                  <span className="section-title text-flare">{index}</span>
                  <span aria-hidden="true" className="section-title text-paper-ghost">
                    /
                  </span>
                  <h2 className="section-title">{label}</h2>
                </div>
              </div>
              <div className="rule-draw mt-5 w-full max-w-[18rem]" />
            </div>

            {caption && (
              <p
                className="reveal prose-body max-w-[52ch] lg:col-span-6 lg:col-start-7"
                style={{ ['--reveal-delay' as string]: '120ms' }}
              >
                {caption}
              </p>
            )}
          </div>
        </RevealGroup>

        {children}
      </div>
    </section>
  );
}
