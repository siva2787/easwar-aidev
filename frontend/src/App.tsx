import { useCallback, useEffect, useRef, useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { JourneySection } from './components/sections/JourneySection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ContactSection } from './components/sections/ContactSection';
import { NarratorDock } from './components/narrator/NarratorDock';
import { AdminPage } from './pages/AdminPage';
import { ProjectPage } from './pages/ProjectPage';
import { narrationService } from './services/narrationService';
import { useHashRoute } from './hooks/useHashRoute';
import { applyTheme, getInitialTheme } from './utils/theme';
import type { Theme } from './utils/theme';

const SECTION_IDS = ['hero', 'about', 'journey', 'projects', 'skills', 'contact'];

export const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [active, setActive] = useState('hero');
  const route = useHashRoute();
  const [admin, setAdmin] = useState(() => window.location.hash === '#/admin');
  useEffect(() => {
    const on = () => setAdmin(window.location.hash === '#/admin');
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const pendingScroll = useRef<string | null>(null);

  useEffect(() => { applyTheme(theme); }, [theme]);

  // Follow system theme changes until the visitor makes an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const on = (e: MediaQueryListEvent) => {
      let explicit = false;
      try { explicit = !!localStorage.getItem('easwar_portfolio_theme'); } catch { /* ignore */ }
      if (!explicit) { const t: Theme = e.matches ? 'dark' : 'light'; setTheme(t); applyTheme(t, false); }
    };
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // Single observer drives nav highlight + section-aware narration.
  useEffect(() => {
    if (route.page !== 'home' || admin) { narrationService.stop(); return; }
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { setActive(e.target.id); narrationService.setSection(e.target.id); }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [route.page, admin]);

  // After returning home from a case study, finish the pending scroll.
  useEffect(() => {
    if (route.page === 'home' && !admin && pendingScroll.current) {
      const id = pendingScroll.current;
      pendingScroll.current = null;
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    }
  }, [route.page, admin]);

  const navigate = useCallback((id: string) => {
    if (window.location.hash.startsWith('#/')) {
      pendingScroll.current = id;
      window.location.hash = '';
    } else {
      document.getElementById(id)?.scrollIntoView();
    }
  }, []);

  useEffect(() => () => narrationService.dispose(), []);

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Navbar isDark={theme === 'dark'} toggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} activeSection={route.page === 'home' && !admin ? active : ''} onNavigate={navigate} />
      <main id="main">
        {admin ? <AdminPage /> : route.page === 'home' ? (
          <>
            <HeroSection isDark={theme === 'dark'} onNavigate={navigate} />
            <AboutSection onNavigate={navigate} />
            <JourneySection />
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />
          </>
        ) : (
          <ProjectPage slug={route.slug} onNavigate={navigate} />
        )}
      </main>
      <Footer onNavigate={navigate} />
      {route.page === 'home' && !admin && <NarratorDock />}
    </>
  );
};

export default App;