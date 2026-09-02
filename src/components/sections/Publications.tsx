import { Section } from '@/components/system/Section';
import { Reveal } from '@/components/system/Reveal';
import { publications } from '@/content/portfolio';

export function Publications() {
  return (
    <Section
      id="publications"
      index="06"
      label="Research"
      caption="Contributing to the advancement of AI and computer vision research"
    >
      <ol className="border-t border-rule">
        {publications.map((paper, i) => {
          const published = paper.status === 'Published in IEEE Xplore';

          return (
            <Reveal
              key={paper.title}
              as="li"
              delay={i * 100}
              className="group grid gap-x-8 gap-y-6 border-b border-rule py-10 lg:grid-cols-12 lg:py-14"
            >
              <div className="lg:col-span-3">
                <p className="display-md leading-none tracking-[-0.04em] tabular-nums text-[rgba(236,232,225,0.16)] transition-colors duration-500 ease-out group-hover:text-cobalt">
                  {paper.year}
                </p>
                <p className="meta-sm mt-4 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={
                      published
                        ? 'block h-[6px] w-[6px] bg-cobalt'
                        : 'block h-[6px] w-[6px] border border-rule-strong'
                    }
                  />
                  {paper.status}
                </p>
              </div>

              <div className="lg:col-span-9 lg:col-start-4">
                <h3 className="display-sm max-w-[54ch] text-balance">{paper.title}</h3>
                <p className="meta mt-4 text-flare">{paper.venue}</p>
                <p className="prose-body mt-6 max-w-[62ch]">{paper.description}</p>

                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a
                    href={paper.paperLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line meta text-paper"
                    data-cursor="link"
                    data-cursor-label="Read"
                  >
                    Read paper <span aria-hidden="true">↗</span>
                  </a>
                  {published && paper.ieeexploreLink && (
                    <a
                      href={paper.ieeexploreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-line meta text-paper-faint transition-colors duration-300 hover:text-paper"
                      data-cursor="link"
                      data-cursor-label="Open"
                    >
                      IEEE Xplore <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
