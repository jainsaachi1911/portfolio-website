import { useEffect, useState } from 'react';

/**
 * Arms the entrance animation one paint after mount, so the browser has a
 * "before" frame to transition from. Used by above-the-fold content, which
 * never intersects and so can't rely on the scroll observer.
 */
export function useMountReveal(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setReady(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);

  return ready;
}
