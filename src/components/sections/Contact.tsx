import { LissajousMark } from '@/components/graphics/LissajousMark';
import { AnchorLink } from '@/components/system/AnchorLink';
import { GlyphText } from '@/components/system/GlyphText';
import { Reveal, RevealGroup } from '@/components/system/Reveal';
import { profile, socials } from '@/content/portfolio';

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-rule pt-[--sec-y]">
      <div className="shell relative">
        <RevealGroup className="flex items-baseline justify-between gap-4">
          <div className="mask-line">
            <div className="flex items-baseline gap-3">
              <span className="section-title text-flare">09</span>
              <span aria-hidden="true" className="section-title text-paper-ghost">
                /
              </span>
              <h2 className="section-title">Contact</h2>
            </div>
          </div>
          <span className="meta-sm">End of index</span>
        </RevealGroup>

        <div className="relative mt-[clamp(2.5rem,6vw,4.5rem)]">
          <LissajousMark className="pointer-events-none absolute -top-16 right-0 hidden w-[clamp(180px,20vw,300px)] opacity-70 lg:block" />

          <RevealGroup as="h3" className="masthead relative z-10 uppercase">
            <span className="mask-line">
              <GlyphText text="Let's" className="block" />
            </span>
            <span className="mask-line" style={{ ['--reveal-delay' as string]: '90ms' }}>
              <span className="block lg:pl-[10%]">
                <GlyphText text="Connect" />
                <span className="text-flare">.</span>
              </span>
            </span>
          </RevealGroup>
        </div>

        <div className="mt-[clamp(2.5rem,6vw,4rem)] grid gap-x-10 gap-y-12 border-t border-rule pt-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal as="p" className="prose-body max-w-[44ch]">
              I'm always interested in new opportunities and collaborations
            </Reveal>

            <Reveal delay={100} className="mt-9">
              <a
                href={`mailto:${profile.email}`}
                data-cursor="link"
                data-cursor-label="Write"
                className="group inline-block max-w-full break-all text-[clamp(1.1rem,4.2vw,2.6rem)] font-medium leading-tight tracking-[-0.03em] transition-colors duration-500 ease-out"
              >
                <GlyphText text={profile.email} />
                <span
                  aria-hidden="true"
                  className="mt-4 block h-px w-full origin-left scale-x-0 bg-flare transition-transform duration-700 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </a>
            </Reveal>

            <Reveal delay={180} className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                className="action action--flare justify-between sm:justify-start"
                href={`mailto:${profile.email}`}
                data-cursor="link"
                data-cursor-label="Write"
              >
                Get in touch <span aria-hidden="true">→</span>
              </a>
              <a
                className="action justify-between sm:justify-start"
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                data-cursor-label="Open"
              >
                Download CV <span aria-hidden="true">↗</span>
              </a>
            </Reveal>
          </div>

          <ul className="lg:col-span-4 lg:col-start-9">
            {socials.map((social, i) => (
              <Reveal as="li" key={social.label} delay={i * 70}>
                <a
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  data-cursor="link"
                  data-cursor-label="Open"
                  className="group flex items-center justify-between gap-4 border-b border-rule py-4 transition-colors duration-300 ease-out"
                >
                  <span className="flex items-baseline gap-4 overflow-hidden">
                    <span className="meta-sm shrink-0 transition-colors duration-300 group-hover:text-flare">
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="meta text-paper">{social.label}</span>
                    <span className="meta-sm truncate">{social.handle}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-paper-faint transition-[transform,color] duration-500 ease-out group-hover:translate-x-1 group-hover:text-flare"
                  >
                    ↗
                  </span>
                </a>
              </Reveal>
            ))}

            <li className="mt-8">
              <p className="meta-sm flex items-center gap-2.5">
                <span aria-hidden="true" className="live-dot" />
                {profile.availability}
              </p>
              <p className="meta-sm mt-3">
                {profile.location} — {profile.coordinates}
              </p>
            </li>

            <li className="mt-12 lg:hidden">
              <LissajousMark className="mx-auto w-[min(240px,72%)] opacity-80" />
            </li>
          </ul>
        </div>
      </div>

      <footer className="mt-[clamp(4rem,9vw,7rem)] border-t border-rule">
        <div className="shell flex flex-col items-start justify-between gap-3 py-7 sm:flex-row sm:items-center">
          <p className="meta-sm">{profile.footer}</p>
          <AnchorLink to="home" className="link-line meta text-paper-faint hover:text-paper" data-cursor="link">
            Back to top <span aria-hidden="true">↑</span>
          </AnchorLink>
        </div>
      </footer>
    </section>
  );
}
