import { useMemo } from 'react';
import { useReveal } from '@/hooks/useReveal';

const SIZE = 240;
const SAMPLES = 420;

/** Traces x = sin(at + δ), y = sin(bt) — one equation, one closing mark. */
function curve(a: number, b: number, delta: number, radius: number): string {
  let d = '';
  for (let i = 0; i <= SAMPLES; i++) {
    const t = (i / SAMPLES) * Math.PI * 2;
    const x = SIZE / 2 + Math.sin(a * t + delta) * radius;
    const y = SIZE / 2 + Math.sin(b * t) * radius;
    d += `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return d.trim();
}

/**
 * The closing graphic: two Lissajous figures that draw themselves once, on
 * arrival. Deliberately terminal — nothing loops, so the page ends on a held
 * note rather than perpetual motion.
 */
export function LissajousMark({ className }: { className?: string }) {
  const ref = useReveal<HTMLDivElement>();

  const paths = useMemo(
    () => [
      { d: curve(3, 4, Math.PI / 2, 96), stroke: 'var(--flare)', width: 1.25, delay: 0 },
      { d: curve(5, 4, Math.PI / 3, 78), stroke: 'var(--cobalt)', width: 1, delay: 260 },
      { d: curve(2, 3, Math.PI / 4, 108), stroke: 'var(--rule-strong)', width: 1, delay: 520 },
    ],
    [],
  );

  return (
    <div ref={ref} className={className}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full" role="presentation" aria-hidden="true">
        <g fill="none" strokeLinecap="round">
          {paths.map((path) => (
            <path
              key={path.stroke}
              className="mark-path"
              d={path.d}
              stroke={path.stroke}
              strokeWidth={path.width}
              pathLength={1}
              style={{ transitionDelay: `${path.delay}ms` }}
            />
          ))}
        </g>
        <rect x="0.5" y="0.5" width={SIZE - 1} height={SIZE - 1} fill="none" stroke="var(--rule)" />
      </svg>
    </div>
  );
}
