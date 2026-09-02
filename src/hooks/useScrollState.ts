import { useEffect, useState } from 'react';

type ScrollState = {
  /** 0 → 1 through the full document. */
  progress: number;
  /** id of the section currently occupying the reading line. */
  activeId: string;
  /** True once the page has left the masthead. */
  scrolled: boolean;
};

/**
 * One rAF-throttled scroll listener feeds the nav, the progress rule and the
 * section index — cheaper and better synced than a listener per consumer.
 */
export function useScrollState(sectionIds: string[]): ScrollState {
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    activeId: sectionIds[0] ?? '',
    scrolled: false,
  });

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      const readingLine = scrollY + window.innerHeight * 0.32;

      let activeId = sectionIds[0] ?? '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (readingLine >= el.offsetTop) activeId = id;
      }

      // The last section rarely reaches the reading line on tall viewports.
      if (progress > 0.985) activeId = sectionIds[sectionIds.length - 1] ?? activeId;

      const scrolled = scrollY > 80;
      setState((prev) =>
        prev.progress === progress && prev.activeId === activeId && prev.scrolled === scrolled
          ? prev
          : { progress, activeId, scrolled },
      );
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sectionIds]);

  return state;
}
