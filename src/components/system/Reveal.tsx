import { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useReveal } from '@/hooks/useReveal';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in milliseconds. */
  delay?: number;
  as?: ElementType;
  threshold?: number;
};

/**
 * Wraps content in a scroll-triggered entrance. Pairs with the `.reveal` and
 * `.mask-line` classes, which own the actual animation.
 */
export function Reveal({ children, className, delay = 0, as: Tag = 'div', threshold }: RevealProps) {
  const ref = useReveal<HTMLElement>(threshold !== undefined ? { threshold } : undefined);

  return (
    <Tag
      ref={ref}
      className={cn('reveal', className)}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Reveal that only arms the `data-revealed` flag — children opt into the
 * motion themselves via `.mask-line` or `.rule-draw`.
 */
export function RevealGroup({ children, className, delay = 0, as: Tag = 'div', threshold }: RevealProps) {
  const ref = useReveal<HTMLElement>(threshold !== undefined ? { threshold } : undefined);

  return (
    <Tag
      ref={ref}
      className={className}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
