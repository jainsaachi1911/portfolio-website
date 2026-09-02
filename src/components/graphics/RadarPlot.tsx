import { useMemo } from 'react';
import { useReveal } from '@/hooks/useReveal';

type Axis = { name: string; value: number };

const R = 68;
const C = 100;
const RINGS = [0.25, 0.5, 0.75, 1];

const polar = (index: number, count: number, radius: number) => {
  const angle = -Math.PI / 2 + (index / count) * Math.PI * 2;
  return { x: C + Math.cos(angle) * radius, y: C + Math.sin(angle) * radius };
};

/**
 * A wireframe radar drawn from scratch — six axes, four reference rings, one
 * plotted polygon. Replaces the charting library entirely, which keeps the
 * bundle small and lets the plot inherit the site's line weights.
 */
export function RadarPlot({ axes, label }: { axes: Axis[]; label: string }) {
  const ref = useReveal<HTMLDivElement>();

  const { polygon, vertices } = useMemo(() => {
    const points = axes.map((axis, i) => polar(i, axes.length, (axis.value / 100) * R));
    return {
      polygon: points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' '),
      vertices: points,
    };
  }, [axes]);

  return (
    <div ref={ref} className="plot">
      {/* The viewBox is padded asymmetrically wide so axis labels never clip. */}
      <svg viewBox="-58 -22 316 246" className="w-full" role="img" aria-label={`${label} proficiency radar`}>
        <g stroke="var(--rule)" fill="none">
          {RINGS.map((ring) => (
            <polygon
              key={ring}
              points={axes
                .map((_, i) => {
                  const p = polar(i, axes.length, R * ring);
                  return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
                })
                .join(' ')}
            />
          ))}
          {axes.map((axis, i) => {
            const p = polar(i, axes.length, R);
            return <line key={axis.name} x1={C} y1={C} x2={p.x} y2={p.y} />;
          })}
        </g>

        <polygon
          className="plot-poly"
          points={polygon}
          fill="var(--cobalt-dim)"
          stroke="var(--cobalt)"
          strokeWidth="1.25"
        />

        <g className="plot-poly">
          {vertices.map((vertex, i) => (
            <rect
              key={`v-${i}`}
              x={vertex.x - 2}
              y={vertex.y - 2}
              width="4"
              height="4"
              fill="var(--cobalt)"
            />
          ))}
        </g>

        <g fontSize="8" letterSpacing="0.08em" fill="var(--paper-48)">
          {axes.map((axis, i) => {
            const p = polar(i, axes.length, R + 18);
            const anchor = Math.abs(p.x - C) < 6 ? 'middle' : p.x > C ? 'start' : 'end';
            return (
              <text key={axis.name} x={p.x} y={p.y + 3} textAnchor={anchor}>
                {axis.name.toUpperCase()}
                <tspan fill="var(--paper-30)"> {axis.value}</tspan>
              </text>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
