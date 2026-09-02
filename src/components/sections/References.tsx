import { Section } from '@/components/system/Section';
import { Reveal } from '@/components/system/Reveal';
import { recommendations } from '@/content/portfolio';
import { cn } from '@/lib/utils';

export function References() {
  return (
    <Section id="references" index="08" label="References" caption="What others say about my work">
      <div className="grid gap-x-10 gap-y-16 lg:grid-cols-12">
        {recommendations.map((rec, i) => (
          <Reveal
            key={rec.name}
            as="figure"
            delay={i * 120}
            className={cn(
              'group relative',
              i % 2 === 0 ? 'lg:col-span-6' : 'lg:col-span-5 lg:col-start-8 lg:mt-24',
            )}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-2 -top-10 select-none text-[7rem] leading-none text-[rgba(236,232,225,0.07)] transition-colors duration-700 ease-out group-hover:text-[rgba(255,59,20,0.22)]"
            >
              &ldquo;
            </span>

            <blockquote className="relative">
              <p className="display-sm max-w-[38ch] font-light leading-[1.55] tracking-[-0.01em] text-paper-dim transition-colors duration-500 ease-out group-hover:text-paper">
                {rec.text}
              </p>
            </blockquote>

            <div className="rule-draw mt-8" />

            <figcaption className="mt-5 flex items-start gap-4">
              <span className="meta-sm mt-1 text-flare">{(i + 1).toString().padStart(2, '0')}</span>
              <div>
                <p className="meta text-paper">{rec.name}</p>
                <p className="meta-sm mt-1.5">{rec.position}</p>
                <p className="meta-sm mt-1">{rec.company}</p>
              </div>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
