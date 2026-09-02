import { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

type Plate = { src: string; alt: string };

const pad = (n: number) => n.toString().padStart(2, '0');

/**
 * Photographs presented as numbered plates rather than a carousel: a fixed
 * frame, an index you can jump around, and arrow-key navigation once focused.
 * Slides crossfade in place so the frame itself never moves.
 */
export function PlateViewer({ plates, className }: { plates: readonly Plate[]; className?: string }) {
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (delta: number) => setIndex((current) => (current + delta + plates.length) % plates.length),
    [plates.length],
  );

  return (
    <figure
      className={cn('group/plate relative', className)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          go(1);
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          go(-1);
        }
      }}
    >
      <div className="tick-frame relative aspect-[4/3] w-full overflow-hidden border border-rule bg-ink-100">
        {plates.map((plate, i) => (
          <img
            key={plate.src}
            src={plate.src}
            alt={plate.alt}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            aria-hidden={i !== index}
            className={cn(
              'absolute inset-0 h-full w-full object-contain transition-[opacity,transform] duration-700 ease-out',
              i === index ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]',
            )}
          />
        ))}

        <span className="meta-sm absolute left-3 top-3 bg-ink/70 px-1.5 py-1 backdrop-blur-sm">
          Plate {pad(index + 1)} / {pad(plates.length)}
        </span>
      </div>

      <figcaption className="mt-3 flex items-center justify-between gap-4 border-t border-rule pt-3">
        <p className="meta-sm min-w-0 pr-2 leading-relaxed">{plates[index].alt}</p>

        <div className="flex shrink-0 items-center gap-1">
          <div className="mr-3 hidden items-center gap-1.5 sm:flex">
            {plates.map((plate, i) => (
              <button
                key={plate.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show plate ${pad(i + 1)}`}
                aria-current={i === index}
                data-cursor="link"
                className={cn(
                  'h-px w-6 transition-colors duration-300 ease-out',
                  i === index ? 'bg-flare' : 'bg-rule-strong hover:bg-paper',
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous plate"
            data-cursor="link"
            className="flex h-8 w-8 items-center justify-center border border-rule text-paper-faint transition-colors duration-300 ease-out hover:border-paper hover:text-paper"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next plate"
            data-cursor="link"
            className="flex h-8 w-8 items-center justify-center border border-rule text-paper-faint transition-colors duration-300 ease-out hover:border-paper hover:text-paper"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
