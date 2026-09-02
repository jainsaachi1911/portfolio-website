import { cn } from '@/lib/utils';

/**
 * Renders text as individually hoverable glyphs. Used only on the two
 * display-scale moments — the masthead and the sign-off — where the letterforms
 * are large enough for the interaction to read as intentional.
 */
export function GlyphText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn('inline-block', className)}>
      {text.split('').map((char, i) => (
        <span key={`${char}-${i}`} className="glyph" aria-hidden={char === ' '}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
