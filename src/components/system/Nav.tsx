import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { profile, sections } from '@/content/portfolio';
import { AnchorLink } from './AnchorLink';

const navItems = sections.filter((section) => section.inNav);

type NavProps = {
  activeId: string;
  progress: number;
  scrolled: boolean;
};

export function Nav({ activeId, progress, scrolled }: NavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[120] transition-colors duration-500 ease-out',
          scrolled ? 'bg-[rgba(8,8,10,0.82)] backdrop-blur-md' : 'bg-transparent',
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-6">
          <AnchorLink
            to="home"
            className="group flex items-center gap-3"
            data-cursor="link"
            aria-label={`${profile.fullName} — back to top`}
          >
            <span className="flex h-8 w-8 items-center justify-center border border-rule-strong text-[0.7rem] font-semibold tracking-[0.06em] transition-colors duration-300 ease-out group-hover:border-flare group-hover:text-flare">
              SJ
            </span>
            <span className="meta hidden text-paper sm:inline">{profile.fullName}</span>
          </AnchorLink>

          <nav aria-label="Sections" className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => {
              const active = activeId === item.id;
              return (
                <AnchorLink
                  key={item.id}
                  to={item.id}
                  data-cursor="link"
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'group relative flex items-baseline gap-1.5 py-1 transition-colors duration-300 ease-out',
                    active ? 'text-paper' : 'text-paper-faint hover:text-paper',
                  )}
                >
                  <span className={cn('meta-sm transition-colors duration-300', active && 'text-flare')}>
                    {item.index}
                  </span>
                  <span className="meta text-inherit">{item.nav ?? item.label}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-flare transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100',
                      active && 'origin-left scale-x-100',
                    )}
                  />
                </AnchorLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <span className="meta-sm hidden xl:block">{Math.round(progress * 100).toString().padStart(3, '0')}%</span>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="group flex items-center gap-2.5 lg:hidden"
              data-cursor="link"
              aria-expanded={open}
              aria-controls="nav-index"
            >
              <span className="meta text-paper">{open ? 'Close' : 'Index'}</span>
              <span aria-hidden="true" className="flex h-3 w-4 flex-col justify-between">
                <span
                  className={cn(
                    'h-px w-full bg-paper transition-transform duration-300 ease-out',
                    open && 'translate-y-[5.5px] rotate-45',
                  )}
                />
                <span className={cn('h-px w-full bg-paper transition-opacity duration-200', open && 'opacity-0')} />
                <span
                  className={cn(
                    'h-px w-full bg-paper transition-transform duration-300 ease-out',
                    open && '-translate-y-[5.5px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        <div className={cn('h-px w-full transition-colors duration-500', scrolled ? 'bg-rule' : 'bg-transparent')}>
          <div
            className="h-px origin-left bg-flare"
            style={{ transform: `scaleX(${progress})` }}
            role="progressbar"
            aria-label="Page scroll progress"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </header>

      {/* Mobile index */}
      <div
        id="nav-index"
        className={cn(
          'fixed inset-0 z-[110] bg-ink transition-[opacity,visibility] duration-300 ease-out lg:hidden',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <nav aria-label="Sections" className="shell flex h-full flex-col justify-center gap-1 pt-16">
          {navItems.map((item, i) => (
            <AnchorLink
              key={item.id}
              to={item.id}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-rule py-4 transition-opacity duration-500 ease-out"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'none' : 'translateY(12px)',
                transitionDelay: `${open ? 80 + i * 45 : 0}ms`,
                transitionProperty: 'opacity, transform',
              }}
            >
              <span className="meta-sm text-flare">{item.index}</span>
              <span className="display-sm uppercase tracking-[-0.01em] transition-transform duration-300 ease-out group-hover:translate-x-2">
                {item.label}
              </span>
            </AnchorLink>
          ))}
          <p className="meta-sm mt-8">
            {profile.location} — {profile.coordinates}
          </p>
        </nav>
      </div>
    </>
  );
}
