import { AnchorLink } from '@/components/system/AnchorLink';
import { Cursor } from '@/components/system/Cursor';
import { Marquee } from '@/components/system/Marquee';
import { Nav } from '@/components/system/Nav';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Education } from '@/components/sections/Education';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Publications } from '@/components/sections/Publications';
import { Recognition } from '@/components/sections/Recognition';
import { References } from '@/components/sections/References';
import { Contact } from '@/components/sections/Contact';
import { profile, sections } from '@/content/portfolio';
import { useScrollState } from '@/hooks/useScrollState';

const SECTION_IDS = sections.map((section) => section.id);

const MARQUEE_ITEMS = [
  'Spring Boot',
  'Microservices',
  'Docker',
  'Kubernetes',
  'GitLab CI/CD',
  'System Design',
  profile.location,
  profile.availability,
];

const Portfolio = () => {
  const { activeId, progress, scrolled } = useScrollState(SECTION_IDS);

  return (
    <div className="relative">
      <AnchorLink
        to="about"
        moveFocus
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-flare focus:px-4 focus:py-2 focus:text-[0.7rem] focus:uppercase focus:tracking-[0.2em] focus:text-paper"
      >
        Skip to content
      </AnchorLink>

      <Cursor />
      <Nav activeId={activeId} progress={progress} scrolled={scrolled} />

      <main>
        <Hero />
        <Marquee items={MARQUEE_ITEMS} />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Publications />
        <Recognition />
        <References />
        <Contact />
      </main>
    </div>
  );
};

export default Portfolio;
