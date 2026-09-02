import { useEffect, useState } from 'react';
import { FlowField } from '@/components/graphics/FlowField';
import { GlyphText } from '@/components/system/GlyphText';
import { profile, socials } from '@/content/portfolio';
import { useMountReveal } from '@/hooks/useMountReveal';
import { cn } from '@/lib/utils';

function LocalTime() {
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date());

    setTime(format());
    const id = window.setInterval(() => setTime(format()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="meta-sm tabular-nums">
      IST {time}
    </span>
  );
}

export function Hero() {
  const ready = useMountReveal();
  const revealed = ready ? 'true' : 'false';
  const linkSocials = socials.filter((social) => social.label !== 'Email');

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-16">
      <FlowField className="canvas-mask pointer-events-none absolute inset-0 h-full w-full opacity-90" />

      {/* Instrument row */}
      <div className="shell relative z-10 flex items-center justify-between gap-4 border-b border-rule py-3">
        <span className="meta-sm">
          {profile.location} <span className="hidden sm:inline">— {profile.coordinates}</span>
        </span>
        <span className="meta-sm hidden md:block">Portfolio — Index 00</span>
        <LocalTime />
      </div>

      {/* Masthead */}
      <div className="shell relative z-10 flex flex-1 flex-col justify-center py-[clamp(2.5rem,7vw,5rem)]">
        <h1 className="masthead" data-revealed={revealed}>
          <span className="mask-line">
            <GlyphText text={profile.firstName} className="block uppercase" />
          </span>
          <span className="mask-line" style={{ ['--reveal-delay' as string]: '90ms' }}>
            <span className="block uppercase lg:pl-[14%]">
              <GlyphText text={profile.lastName} />
              <span className="text-flare">.</span>
            </span>
          </span>
        </h1>

        <div
          className="reveal mt-[clamp(1.75rem,4vw,3rem)] grid gap-x-8 gap-y-7 border-t border-rule pt-6 lg:grid-cols-12"
          data-revealed={revealed}
          style={{ ['--reveal-delay' as string]: '420ms' }}
        >
          <div className="lg:col-span-4">
            <p className="display-sm uppercase tracking-[0.02em]">
              {profile.roleParts[0]}
              <span className="text-flare"> &amp; </span>
              {profile.roleParts[1]}
            </p>
            <p className="meta-sm mt-4 flex items-center gap-2.5">
              <span aria-hidden="true" className="live-dot" />
              {profile.availability}
            </p>
          </div>

          <p className="prose-body max-w-[46ch] lg:col-span-4 lg:col-start-6">{profile.intro}</p>

          <div className="flex flex-col items-start gap-4 lg:col-span-3 lg:col-start-10">
            <a
              className="action action--flare w-full justify-between"
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              data-cursor-label="Open"
            >
              Download CV <span aria-hidden="true">↗</span>
            </a>
            <a
              className="action w-full justify-between"
              href={`mailto:${profile.email}`}
              data-cursor="link"
              data-cursor-label="Write"
            >
              Get in touch <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Base rail */}
      <div className="shell relative z-10 flex items-center justify-between gap-6 border-t border-rule py-4">
        <span className="flex items-center gap-3">
          <span aria-hidden="true" className="relative block h-6 w-px bg-rule-strong">
            <span className="absolute inset-0 block origin-top animate-[scroll-tick_2.4s_var(--e-inout)_infinite] bg-flare" />
          </span>
          <span className="meta-sm">Scroll</span>
        </span>

        <ul className="flex items-center gap-5 sm:gap-7">
          {linkSocials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn('link-line meta text-paper-faint transition-colors duration-300 hover:text-paper')}
                data-cursor="link"
                data-cursor-label="Open"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
