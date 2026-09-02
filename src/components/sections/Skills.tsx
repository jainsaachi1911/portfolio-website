import { RadarPlot } from '@/components/graphics/RadarPlot';
import { Section } from '@/components/system/Section';
import { Reveal, RevealGroup } from '@/components/system/Reveal';
import { aiMlProficiency, skillGroups, webProficiency } from '@/content/portfolio';

const TICKS = 20;

function Meter({ name, value, delay }: { name: string; value: number; delay: number }) {
  const on = Math.round((value / 100) * TICKS);

  return (
    <div className="meter group flex items-center gap-4 border-b border-rule py-3">
      <span className="meta w-[9.5rem] shrink-0 text-paper-dim transition-colors duration-300 group-hover:text-paper">
        {name}
      </span>
      <span aria-hidden="true" className="flex h-4 flex-1 items-center justify-between">
        {Array.from({ length: TICKS }, (_, i) => (
          <span
            key={i}
            className="meter-tick"
            data-on={i < on ? 'true' : 'false'}
            style={{ transitionDelay: `${delay + i * 22}ms` }}
          />
        ))}
      </span>
      <span className="meta-sm w-8 shrink-0 text-right tabular-nums">{value}</span>
    </div>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      index="05"
      label="Stack"
      caption="Interactive visualization of my technical expertise"
    >
      {/* Index of everything, grouped */}
      <div className="border-t border-rule">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.key}
            delay={i * 60}
            className="group grid gap-x-8 gap-y-4 border-b border-rule py-7 lg:grid-cols-12"
          >
            <div className="flex items-baseline gap-4 lg:col-span-3">
              <span className="meta-sm text-flare">{(i + 1).toString().padStart(2, '0')}</span>
              <h3 className="meta text-paper">{group.label}</h3>
              <span className="meta-sm ml-auto tabular-nums lg:ml-0">[{group.items.length}]</span>
            </div>

            <ul className="flex flex-wrap items-baseline gap-x-1 gap-y-2 lg:col-span-9">
              {group.items.map((item, index) => (
                <li key={item} className="flex items-baseline">
                  <span className="cursor-default text-[0.875rem] font-light text-paper-dim transition-colors duration-300 ease-out hover:text-flare">
                    {item}
                  </span>
                  {index < group.items.length - 1 && (
                    <span aria-hidden="true" className="px-3 text-paper-ghost">
                      /
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      {/* Calibration */}
      <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-x-10 gap-y-14 lg:grid-cols-12">
        <RevealGroup className="lg:col-span-7">
          <div className="mask-line mb-8">
            <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
              <h3 className="meta text-paper">AI / ML Calibration</h3>
              <span className="meta-sm">Self-assessed / 100</span>
            </div>
          </div>
          {aiMlProficiency.map((item, i) => (
            <Meter key={item.name} name={item.name} value={item.value} delay={i * 70} />
          ))}
        </RevealGroup>

        <RevealGroup className="lg:col-span-4 lg:col-start-9">
          <div className="mask-line mb-8">
            <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
              <h3 className="meta text-paper">Web Technologies</h3>
              <span className="meta-sm">Radar</span>
            </div>
          </div>
          <RadarPlot axes={webProficiency} label="Web technologies" />
        </RevealGroup>
      </div>
    </Section>
  );
}
