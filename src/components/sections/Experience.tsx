import { Section } from '@/components/system/Section';
import { Reveal } from '@/components/system/Reveal';
import { experience } from '@/content/portfolio';

export function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      label="Experience"
      caption="Professional journey across engineering, security and applied research"
    >
      <ol className="border-t border-rule">
        {experience.map((entry, i) => (
          <Reveal
            key={entry.company}
            as="li"
            delay={i * 100}
            className="group grid gap-x-8 gap-y-6 border-b border-rule py-10 lg:grid-cols-12 lg:py-14"
          >
            <div className="lg:col-span-3">
              <p className="display-md leading-none tracking-[-0.04em] text-[rgba(236,232,225,0.16)] transition-colors duration-500 ease-out group-hover:text-flare">
                {(i + 1).toString().padStart(2, '0')}
              </p>
              <p className="meta mt-4">{entry.period}</p>
            </div>

            <div className="relative lg:col-span-8 lg:col-start-5 lg:border-l lg:border-rule lg:pl-9">
              <span
                aria-hidden="true"
                className="absolute -left-[3px] top-[0.55em] hidden h-[5px] w-[5px] bg-rule-strong transition-colors duration-500 ease-out group-hover:bg-flare lg:block"
              />
              <h3 className="display-sm">{entry.role}</h3>
              <p className="meta mt-2 text-flare">{entry.company}</p>
              <p className="prose-body mt-6 max-w-[62ch]">{entry.description}</p>

              <ul className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-2">
                {entry.tech.map((tech) => (
                  <li
                    key={tech}
                    className="meta-sm border border-rule px-2.5 py-1.5 transition-colors duration-300 ease-out hover:border-rule-strong hover:text-paper"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
