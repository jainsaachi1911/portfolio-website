import { useEffect, useRef } from 'react';

type RevealOptions = {
  /** Fraction of the element that must be visible before it commits. */
  threshold?: number;
  /** Shifts the trigger line up from the viewport bottom. */
  rootMargin?: string;
};

/**
 * Threshold stays at 0 so elements taller than the viewport still commit —
 * the trigger line is set by rootMargin instead, which can't be out-run.
 */

/**
 * Flips `data-revealed` on the element once it enters the viewport, then
 * unsubscribes. The animation itself lives in CSS so it stays off the main
 * thread and honours `prefers-reduced-motion` without extra JS.
 */
export function useReveal<T extends HTMLElement>({
  threshold = 0,
  rootMargin = '0px 0px -12% 0px',
}: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      node.dataset.revealed = 'true';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.revealed = 'true';
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
