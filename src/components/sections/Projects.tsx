import { useState } from 'react';
import { ModuleGlyph } from '@/components/graphics/ModuleGlyph';
import { Section } from '@/components/system/Section';
import { Reveal } from '@/components/system/Reveal';
import { projects, type Project } from '@/content/portfolio';
import { cn } from '@/lib/utils';

const accentClass: Record<Project['accent'], string> = {
  flare: 'accent-flare',
  cobalt: 'accent-cobalt',
  lime: 'accent-lime',
  paper: 'accent-paper',
};

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [active, setActive] = useState(false);
  const id = (index + 1).toString().padStart(3, '0');

  return (
    <Reveal
      as="li"
      delay={index * 80}
      className={cn('project-row group relative border-b border-rule', accentClass[project.accent])}
    >
      {/* Paint sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[var(--accent-wash)] transition-transform duration-700 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-[var(--accent)] transition-transform duration-500 ease-out group-hover:scale-y-100 group-focus-within:scale-y-100"
      />

      <article
        className="relative grid gap-x-8 gap-y-7 px-1 py-10 lg:grid-cols-12 lg:py-14"
        onPointerEnter={() => setActive(true)}
        onPointerLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      >
        <div className="flex items-start justify-between gap-4 lg:col-span-1">
          <span className="meta-sm tabular-nums text-[var(--accent)]">{id}</span>
          {/* Compact glyph keeps the motif alive where the wide column can't fit. */}
          <div aria-hidden="true" className="w-12 shrink-0 text-[rgba(236,232,225,0.3)] lg:hidden">
            <ModuleGlyph seed={project.title} active={active} />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-2">
          <h3 className="display-md max-w-[22ch] text-balance transition-transform duration-500 ease-out group-hover:translate-x-2">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                data-cursor-label={project.status ? 'Preview' : 'View code'}
                className="outline-offset-8 after:absolute after:inset-0 after:content-['']"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>

          <p className="prose-body mt-6 max-w-[58ch]">{project.description}</p>

          <div className="mt-7 flex items-center gap-4">
            {project.status ? (
              <span className="meta-sm flex items-center gap-2 text-lime">
                <span aria-hidden="true" className="live-dot" />
                {project.status}
              </span>
            ) : (
              <span className="meta flex items-center gap-2 text-paper-faint transition-colors duration-300 group-hover:text-paper">
                View code
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-out group-hover:translate-x-1.5"
                >
                  ↗
                </span>
              </span>
            )}
          </div>
        </div>

        <ul className="flex flex-wrap gap-2 self-start lg:col-span-3 lg:col-start-8">
          {project.tech.map((tech) => (
            <li key={tech}>
              <span className="chip">{tech}</span>
            </li>
          ))}
        </ul>

        <div
          aria-hidden="true"
          className="hidden self-start text-[rgba(236,232,225,0.22)] transition-colors duration-500 ease-out group-hover:text-[rgba(236,232,225,0.5)] lg:col-span-2 lg:col-start-11 lg:block"
        >
          <div className="ml-auto aspect-square w-full max-w-[160px]">
            <ModuleGlyph seed={project.title} active={active} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      index="04"
      label="Selected Work"
      caption="Systems designed and shipped end to end — architecture and service decomposition, implementation, containerised deployment, and the measured results each one produced."
      className="bg-ink-100"
    >
      <ol className="border-t border-rule">
        {projects.map((project, i) => (
          <ProjectRow key={project.title} project={project} index={i} />
        ))}
      </ol>
    </Section>
  );
}
