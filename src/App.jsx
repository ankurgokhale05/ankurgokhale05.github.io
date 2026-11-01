import { useCallback, useEffect, useState } from 'react';
import { about, profile } from './data';
import Header from './components/Header';
import Section from './components/Section';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ResumeViewer from './components/ResumeViewer';

function useSpotlight() {
  const [pos, setPos] = useState(null);
  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return pos;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      // The active section is the last one whose top has passed the upper third of the viewport.
      const line = window.innerHeight / 3;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) current = ids[ids.length - 1];
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]);
  return active;
}

const SECTION_IDS = ['about', 'experience', 'projects'];

export default function App() {
  const pos = useSpotlight();
  const active = useActiveSection(SECTION_IDS);
  // Visiting /#resume opens the résumé directly, so the link can be shared.
  const [resumeOpen, setResumeOpen] = useState(() => window.location.hash === '#resume');
  const openResume = useCallback(() => setResumeOpen(true), []);
  const closeResume = useCallback(() => {
    setResumeOpen(false);
    if (window.location.hash === '#resume') history.replaceState(null, '', window.location.pathname);
  }, []);
  const resumeSrc = profile.resume ? `${import.meta.env.BASE_URL}${profile.resume}` : '';

  return (
    <div className="group/spotlight relative">
      {pos && (
        <div
          className="pointer-events-none fixed inset-0 z-30 hidden transition duration-300 lg:block"
          style={{ background: `radial-gradient(600px at ${pos.x}px ${pos.y}px, rgba(29, 78, 216, 0.15), transparent 80%)` }}
        />
      )}
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <a
          href="#content"
          className="absolute top-0 left-0 block -translate-x-full rounded bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white focus-visible:translate-x-0"
        >
          Skip to Content
        </a>
        <div className="lg:flex lg:justify-between lg:gap-4">
          <Header active={active} onOpenResume={resumeSrc ? openResume : null} />
          <main id="content" className="pt-24 lg:w-[52%] lg:py-24">
            <Section id="about" label="About me">
              <div className="space-y-4">
                {about.map((p, i) => (
                  <p key={i} className="[&_b]:font-medium [&_b]:text-slate-200" dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            </Section>
            <Section id="experience" label="Work experience">
              <Experience onOpenResume={resumeSrc ? openResume : null} />
            </Section>
            <Section id="projects" label="Selected projects">
              <Projects />
            </Section>
            <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
              <p>
                Want to get in touch? Email me at{' '}
                <a className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                .
              </p>
              <p className="mt-4">Built with React, Vite, and Tailwind CSS.</p>
            </footer>
          </main>
        </div>
      </div>
      {resumeSrc && <ResumeViewer src={resumeSrc} open={resumeOpen} onClose={closeResume} />}
    </div>
  );
}
