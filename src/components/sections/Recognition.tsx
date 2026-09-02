import { Section } from '@/components/system/Section';
import { Reveal, RevealGroup } from '@/components/system/Reveal';
import { achievements, certifications } from '@/content/portfolio';

export function Recognition() {
  return (
    <Section
      id="achievements"
      index="07"
      label="Recognition"
      caption="Awards and leadership positions"
      className="bg-ink-100"
    >
      <ol className="grid border-t border-rule lg:grid-cols-2 lg:gap-x-14">
        {achievements.map((achievement, i) => (
          <Reveal
            key={achievement}
            as="li"
            delay={i * 80}
            className="group flex gap-5 border-b border-rule py-7 lg:gap-7"
          >
            <span className="display-md shrink-0 leading-none tracking-[-0.04em] tabular-nums text-[rgba(236,232,225,0.14)] transition-colors duration-500 ease-out group-hover:text-flare">
              {(i + 1).toString().padStart(2, '0')}
            </span>
            <p className="prose-body max-w-[46ch] pt-1 transition-colors duration-500 ease-out group-hover:text-paper">
              {achievement}
            </p>
          </Reveal>
        ))}
      </ol>

      {/* Certifications */}
      <div className="mt-[clamp(3.5rem,8vw,7rem)]">
        <RevealGroup>
          <a
            href={certifications.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border-t border-rule pt-8"
            data-cursor="link"
            data-cursor-label="Coursera"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="meta">Certifications</span>
              <span className="meta-sm flex items-center gap-2 transition-colors duration-300 group-hover:text-paper">
                Coursera Profile
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </span>
            </div>

            <h3 className="display-lg mask-line mt-6 uppercase">
              <span className="block transition-colors duration-500 ease-out group-hover:text-flare">
                {certifications.headline}
              </span>
            </h3>

            <div className="rule-draw mt-6" />
            <p className="prose-body mt-5">{certifications.caption}</p>
          </a>
        </RevealGroup>

        <ol className="mt-12 grid gap-x-14 lg:grid-cols-2">
          {certifications.items.map((item, i) => (
            <Reveal
              key={item}
              as="li"
              delay={i * 55}
              className="group flex items-baseline gap-4 border-b border-rule py-4"
            >
              <span className="meta-sm shrink-0 tabular-nums transition-colors duration-300 group-hover:text-flare">
                {(i + 1).toString().padStart(2, '0')}
              </span>
              <span className="text-[0.8125rem] font-light leading-relaxed text-paper-dim transition-colors duration-300 group-hover:text-paper">
                {item}
              </span>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
