import { Section } from '@/components/system/Section';
import { Reveal } from '@/components/system/Reveal';
import { education } from '@/content/portfolio';

export function Education() {
  return (
    <Section id="education" index="02" label="Education" caption="Academic journey and achievements">
      <ol className="border-t border-rule">
        {education.map((entry, i) => (
          <Reveal
            key={entry.degree}
            as="li"
            delay={i * 90}
            className="group grid gap-x-8 gap-y-4 border-b border-rule py-8 lg:grid-cols-12 lg:py-10"
          >
            <div className="flex items-baseline gap-4 lg:col-span-3">
              <span className="meta-sm text-flare">{(i + 1).toString().padStart(2, '0')}</span>
              <span className="display-sm tabular-nums text-paper-dim transition-colors duration-500 ease-out group-hover:text-paper">
                {entry.period}
              </span>
            </div>

            <div className="relative lg:col-span-8 lg:col-start-5 lg:border-l lg:border-rule lg:pl-9">
              <span
                aria-hidden="true"
                className="absolute -left-[3px] top-[0.55em] hidden h-[5px] w-[5px] bg-rule-strong transition-colors duration-500 ease-out group-hover:bg-flare lg:block"
              />
              <h3 className="display-sm max-w-[46ch] text-balance">{entry.degree}</h3>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                <p className="meta">{entry.institution}</p>
                <p className="meta text-flare">{entry.grade}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
