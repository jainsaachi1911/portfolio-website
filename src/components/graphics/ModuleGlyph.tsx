import { useMemo } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';

const SIZE = 200;
const GRID = 6;
const PAD = 18;

/** FNV-1a — small, fast, and stable across builds. */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Geometry = {
  paths: string[];
  nodes: { x: number; y: number; filled: boolean; size: number }[];
  rings: { x: number; y: number; r: number }[];
};

/**
 * Builds a wireframe node graph from the title alone. Same title, same
 * drawing, every time — the artwork is derived from the content instead of
 * being decoration placed on top of it.
 */
function buildGeometry(seed: string): Geometry {
  const rand = mulberry32(hash(seed));
  const step = (SIZE - PAD * 2) / (GRID - 1);
  const at = (i: number) => PAD + i * step;

  const taken = new Set<string>();
  const points: { gx: number; gy: number; x: number; y: number }[] = [];
  const count = 6 + Math.floor(rand() * 3);

  while (points.length < count) {
    const gx = Math.floor(rand() * GRID);
    const gy = Math.floor(rand() * GRID);
    const key = `${gx}:${gy}`;
    if (taken.has(key)) continue;
    taken.add(key);
    points.push({ gx, gy, x: at(gx), y: at(gy) });
  }

  // Route each hop as an orthogonal dogleg, the way a schematic would.
  const paths: string[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const horizontalFirst = rand() > 0.5;
    const elbow = horizontalFirst ? `L ${b.x} ${a.y}` : `L ${a.x} ${b.y}`;
    paths.push(`M ${a.x} ${a.y} ${elbow} L ${b.x} ${b.y}`);
  }

  // One long tie-back closes the circuit and stops the graph reading as a line.
  const first = points[0];
  const last = points[points.length - 1];
  paths.push(`M ${last.x} ${last.y} L ${last.x} ${SIZE - PAD} L ${first.x} ${SIZE - PAD} L ${first.x} ${first.y}`);

  const nodes = points.map((point, i) => ({
    x: point.x,
    y: point.y,
    filled: i === 0 || i === points.length - 1 || rand() > 0.72,
    size: rand() > 0.8 ? 8 : 5,
  }));

  const rings = points
    .filter(() => rand() > 0.66)
    .slice(0, 2)
    .map((point) => ({ x: point.x, y: point.y, r: 12 + rand() * 8 }));

  return { paths, nodes, rings };
}

type ModuleGlyphProps = {
  seed: string;
  active?: boolean;
  className?: string;
};

export function ModuleGlyph({ seed, active = false, className }: ModuleGlyphProps) {
  const { paths, nodes, rings } = useMemo(() => buildGeometry(seed), [seed]);
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={cn('module-glyph', className)} data-active={active}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="presentation"
        aria-hidden="true"
        className="h-full w-full overflow-visible"
        fill="none"
      >
        {/* Circuit routing — drawn once, on arrival. */}
        <g stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
          {paths.map((d, i) => (
            <path key={d} className="glyph-trace" d={d} pathLength={1} style={{ transitionDelay: `${i * 70}ms` }} />
          ))}
        </g>

        {/* Callout rings — held back for the hover state. */}
        <g>
          {rings.map((ring, i) => (
            <circle
              key={`ring-${i}`}
              className="glyph-ring"
              cx={ring.x}
              cy={ring.y}
              r={ring.r}
              stroke="var(--accent, currentColor)"
              strokeWidth="1"
              style={{
                transformOrigin: `${ring.x}px ${ring.y}px`,
                transitionDelay: `${i * 90}ms`,
              }}
            />
          ))}
        </g>

        <g>
          {nodes.map((node, i) => (
            <rect
              key={`node-${i}`}
              className="glyph-node"
              x={node.x - node.size / 2}
              y={node.y - node.size / 2}
              width={node.size}
              height={node.size}
              fill={node.filled ? 'var(--accent, currentColor)' : 'var(--ink-000)'}
              stroke={node.filled ? 'var(--accent, currentColor)' : 'currentColor'}
              strokeWidth="1"
              style={{ transitionDelay: `${i * 55}ms` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
