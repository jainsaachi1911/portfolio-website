import { PlateViewer } from '@/components/graphics/PlateViewer';
import { Section } from '@/components/system/Section';
import { Reveal, RevealGroup } from '@/components/system/Reveal';
import { about, profile } from '@/content/portfolio';

const spec = [
  { key: 'Based', value: profile.location },
  { key: 'Coordinates', value: profile.coordinates },
  { key: 'Status', value: profile.availability },
  { key: 'Focus', value: profile.role },
];

export function About() {
  return (
    <Section id="about" index="01" label="About" caption={profile.summary} ghostIndex>
      <div className="grid gap-x-8 gap-y-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-6 xl:col-span-5">
          <PlateViewer plates={about.plates} />
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-8 xl:col-span-6 xl:col-start-7">
          <RevealGroup>
            <h3 className="display-md mask-line">
              <span>{about.heading}</span>
            </h3>
          </RevealGroup>

          {about.paragraphs.map((paragraph, i) => (
            <Reveal key={i} as="p" className="prose-body mt-6 max-w-[58ch]" delay={80 + i * 90}>
              {paragraph}
            </Reveal>
          ))}

          <dl className="mt-12 border-t border-rule">
            {spec.map((row, i) => (
              <Reveal
                key={row.key}
                className="flex flex-col gap-1 border-b border-rule py-3.5 sm:flex-row sm:items-baseline sm:gap-6"
                delay={i * 70}
              >
                <dt className="meta-sm w-32 shrink-0">{row.key}</dt>
                <dd className="text-[0.8125rem] font-light text-paper-dim">{row.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
