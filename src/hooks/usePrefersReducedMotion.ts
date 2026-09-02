import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** Tracks the OS-level motion preference so JS-driven motion can opt out too. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
