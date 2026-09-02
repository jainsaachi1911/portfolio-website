import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type CursorMode = 'default' | 'link' | 'text';

/**
 * A crosshair reticle: the dot tracks the pointer exactly, the ring trails it.
 * Elements opt into a state by declaring `data-cursor` (and optionally
 * `data-cursor-label`). Never rendered for coarse pointers or reduced motion,
 * so the native cursor stays authoritative on touch and assistive setups.
 */
export function Cursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const mql = window.matchMedia('(pointer: fine)');
    const sync = () => setEnabled(mql.matches);
    sync();
    mql.addEventListener('change', sync);
    return () => mql.removeEventListener('change', sync);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...pointer };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      setVisible(true);

      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        '[data-cursor], a, button, input, textarea, select',
      );

      if (!target) {
        setMode('default');
        setLabel('');
        return;
      }

      const declared = target.dataset.cursor as CursorMode | undefined;
      const isField = /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
      setMode(declared ?? (isField ? 'text' : 'link'));
      setLabel(target.dataset.cursorLabel ?? '');
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      // Critically damped follow — the lag is what makes it feel weighted.
      ring.x += (pointer.x - ring.x) * 0.18;
      ring.y += (pointer.y - ring.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.documentElement.classList.add('has-custom-cursor');

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="cursor-layer" data-visible={visible}>
      <div ref={dotRef} className="cursor-dot" data-mode={mode} />
      <div ref={ringRef} className="cursor-ring" data-mode={mode} data-labelled={label ? 'true' : 'false'}>
        <span className="cursor-ring__label">{label}</span>
      </div>
    </div>
  );
}
