import { RadarPlot } from '@/components/graphics/RadarPlot';
import { Section } from '@/components/system/Section';
import { Reveal, RevealGroup } from '@/components/system/Reveal';
import {
  aiMlProficiency,
  engineeringProficiency,
  skillGroups,
  waysOfWorking,
  type SkillGroup,
} from '@/content/portfolio';
import { cn } from '@/lib/utils';

const TICKS = 20;

const accentClass: Record<SkillGroup['accent'], string> = {
  flare: 'accent-flare',
  cobalt: 'accent-cobalt',
  lime: 'accent-lime',
  paper: 'accent-paper',
};

const toolCount = skillGroups.reduce((total, group) => total + group.items.length, 0);
const coreCount = skillGroups.reduce(
  (total, group) => total + group.items.filter((item) => item.core).length,
  0,
);

function Meter({ name, value, delay }: { name: string; value: number; delay: number }) {
  const on = Math.round((value / 100) * TICKS);

  return (
    <div className="meter group flex items-center gap-4 border-b border-rule py-3">
      <span className="w-[9rem] shrink-0 text-[0.625rem] font-semibold uppercase leading-tight tracking-[0.11em] text-paper transition-colors duration-300 sm:w-[11rem]">
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
      <span className="w-8 shrink-0 text-right text-[0.6875rem] font-semibold tabular-nums text-paper">
        {value}
      </span>
    </div>
  );
}

function StackCard({ group, index }: { group: SkillGroup; index: number }) {
  return (
    <Reveal
      as="article"
      delay={index * 70}
      className={cn('stack-card flex flex-col p-6 lg:p-8', accentClass[group.accent])}
    >
      <div className="flex items-baseline gap-3 border-b border-rule pb-4">
        <span className="text-[0.6875rem] font-semibold tabular-nums tracking-[0.2em] text-[var(--accent)]">
          {(index + 1).toString().padStart(2, '0')}
        </span>
        <h3 className="text-[0.95rem] font-semibold uppercase tracking-[0.12em] text-paper">
          {group.label}
        </h3>
        <span className="ml-auto text-[0.625rem] font-medium tabular-nums tracking-[0.18em] text-paper-faint">
          [{group.items.length.toString().padStart(2, '0')}]
        </span>
      </div>

      <p className="mt-5 max-w-[46ch] text-[0.8125rem] font-normal leading-[1.65] text-paper-dim">
        {group.summary}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li key={item.name}>
            <span className={cn('chip', item.core && 'chip--core')}>{item.name}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-7">
        <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-paper-faint">
          Shipped in
        </span>
        {group.shippedIn.map((work) => (
          <span
            key={work}
            className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]"
          >
            {work}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      index="05"
      label="Stack"
      caption="The stack behind the work — grouped by the systems I build with it, and tied to the projects and production roles where each part has actually shipped."
    >
      {/* Legend: what the lit chips mean, and the size of the stack. */}
      <RevealGroup className="mb-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-y border-rule py-4">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-paper">
            {skillGroups.length} domains
          </span>
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-paper">
            {toolCount} tools
          </span>
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-paper">
            {coreCount} used in production
          </span>
        </div>

        <div className="accent-flare flex items-center gap-3">
          <span className="chip chip--core pointer-events-none">Core</span>
          <span className="text-[0.625rem] font-medium uppercase tracking-[0.14em] text-paper-faint">
            = shipped in production work
          </span>
        </div>
      </RevealGroup>

      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        {skillGroups.map((group, i) => (
          <StackCard key={group.key} group={group} index={i} />
        ))}
      </div>

      <Reveal className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 border border-rule bg-ink-100 p-6">
        <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-paper-faint">
          Ways of working
        </span>
        {waysOfWorking.map((item, i) => (
          <span key={item} className="flex items-center">
            <span className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-paper">
              {item}
            </span>
            {i < waysOfWorking.length - 1 && (
              <span aria-hidden="true" className="pl-4 text-paper-ghost">
                /
              </span>
            )}
          </span>
        ))}
      </Reveal>

      {/* Calibration */}
      <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-x-10 gap-y-14 lg:grid-cols-12">
        <RevealGroup className="lg:col-span-7">
          <div className="mask-line mb-8">
            <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
              <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-paper">
                Engineering Calibration
              </h3>
              <span className="meta-sm">Self-assessed / 100</span>
            </div>
          </div>
          {engineeringProficiency.map((item, i) => (
            <Meter key={item.name} name={item.name} value={item.value} delay={i * 70} />
          ))}
        </RevealGroup>

        <RevealGroup className="lg:col-span-4 lg:col-start-9">
          <div className="mask-line mb-8">
            <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
              <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-paper">
                AI / ML
              </h3>
              <span className="meta-sm">Radar</span>
            </div>
          </div>
          <RadarPlot axes={aiMlProficiency} label="AI and ML" />
        </RevealGroup>
      </div>
    </Section>
  );
}
