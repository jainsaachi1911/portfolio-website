import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const SPACING = 38;
const POINTER_RADIUS = 240;
const FRAME_BUDGET = 1000 / 30;

type Palette = { base: string; structure: string; hot: string };

const PALETTE: Palette = {
  base: 'rgba(236, 232, 225, 0.22)',
  structure: 'rgba(75, 99, 255, 0.5)',
  hot: 'rgba(255, 59, 20, 0.85)',
};

/**
 * A vector field rendered as short plotter strokes: every cell reads its angle
 * from a sum of sine waves, so the whole image is derived rather than drawn.
 * The pointer bends the field locally, which is the only "interaction" — the
 * rest is the system minding its own business.
 *
 * Cost control: strokes are batched into three paths (one per colour), the
 * loop is capped at 30fps, and it suspends entirely when scrolled out of view
 * or when the tab is hidden.
 */
export function FlowField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let time = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      const len = SPACING * 0.46;

      const paths = {
        base: new Path2D(),
        structure: new Path2D(),
        hot: new Path2D(),
      };

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * SPACING;
          const y = j * SPACING;

          // Layered sines stand in for noise: cheap, smooth, deterministic.
          let angle =
            Math.sin(x * 0.0042 + time) * 1.15 +
            Math.cos(y * 0.0051 - time * 0.72) * 1.05 +
            Math.sin((x + y) * 0.0023 + time * 0.4) * 0.85;

          let path = paths.base;

          if (pointer.active) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < POINTER_RADIUS) {
              // Strokes swing tangential to the pointer, like iron filings.
              const falloff = 1 - dist / POINTER_RADIUS;
              angle += (Math.atan2(dy, dx) + Math.PI / 2 - angle) * falloff * 0.85;
              if (falloff > 0.55) path = paths.hot;
              else if (falloff > 0.2) path = paths.structure;
            }
          }

          if (path === paths.base && (i * 7 + j * 13) % 47 === 0) path = paths.structure;

          const cos = Math.cos(angle) * len;
          const sin = Math.sin(angle) * len;
          path.moveTo(x - cos, y - sin);
          path.lineTo(x + cos, y + sin);
        }
      }

      ctx.lineWidth = 1;
      ctx.lineCap = 'square';
      (Object.keys(paths) as Array<keyof typeof paths>).forEach((key) => {
        ctx.strokeStyle = PALETTE[key];
        ctx.stroke(paths[key]);
      });
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (now - last < FRAME_BUDGET) return;
      last = now;
      time += 0.012;
      draw();
    };

    const start = () => {
      if (frame || reduced) return;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onResize = () => {
      resize();
      draw();
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };

    resize();
    draw();

    if (!reduced) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) start();
          else stop();
        },
        { threshold: 0 },
      );
      observer.observe(canvas);

      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerleave', onPointerLeave);
      document.addEventListener('visibilitychange', onVisibility);
      window.addEventListener('resize', onResize);

      return () => {
        stop();
        observer.disconnect();
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerleave', onPointerLeave);
        document.removeEventListener('visibilitychange', onVisibility);
        window.removeEventListener('resize', onResize);
      };
    }

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
