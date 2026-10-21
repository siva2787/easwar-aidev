import { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X, ArrowUpRight } from 'lucide-react';
import { Magnetic } from '../ui/Magnetic';

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;

interface Props {
  isDark: boolean;
  toggleTheme: () => void;
  activeSection: string;
  onNavigate: (id: string) => void;
}

export const Navbar: React.FC<Props> = ({ isDark, toggleTheme, activeSection, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [open]);

  const go = (id: string) => { setOpen(false); onNavigate(id); };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        background: scrolled || open ? 'color-mix(in srgb, var(--bg) 82%, transparent)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(14px)' : 'none',
        borderBottom: `1px solid ${scrolled || open ? 'var(--line)' : 'transparent'}`,
      }}
    >
      <nav className="wrap flex h-16 items-center justify-between" aria-label="Primary">
        <button onClick={() => go('hero')} className="flex items-center gap-2.5" aria-label="Easwar S — back to top">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--ink)] text-[13px] font-bold text-[var(--bg)]">E</span>
          <span className="text-[15px] font-semibold tracking-tight">Easwar S</span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                aria-current={activeSection === l.id ? 'true' : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeSection === l.id ? 'text-[var(--ink)]' : 'text-[var(--ink-2)] hover:text-[var(--ink)]'}`}
              >
                {l.label}
                <span className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-[var(--accent)] transition-transform duration-500 ${activeSection === l.id ? 'scale-x-100' : 'scale-x-0'}`} />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-2)] bg-[var(--surface)] transition-transform hover:rotate-12" aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}>
            {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>
          <span className="hidden sm:block lg:block">
            <Magnetic>
              <button onClick={() => go('contact')} className="btn btn-dark">Let’s Talk <ArrowUpRight className="h-4 w-4" /></button>
            </Magnetic>
          </span>
          <button onClick={() => setOpen((o) => !o)} className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-2)] bg-[var(--surface)] lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="animate-fadeIn border-t border-[var(--line)] lg:hidden" style={{ height: 'calc(100dvh - 4rem)', background: 'var(--bg)' }}>
          <ul className="wrap flex flex-col py-6">
            {NAV_LINKS.map((l, i) => (
              <li key={l.id} className="animate-rise" style={{ animationDelay: `${i * 45}ms` }}>
                <button onClick={() => go(l.id)} aria-current={activeSection === l.id ? 'true' : undefined} className={`flex w-full items-center justify-between border-b border-[var(--line)] py-4 text-left text-2xl font-light ${activeSection === l.id ? 'text-[var(--accent)]' : ''}`}>
                  {l.label}
                  <span className="font-mono text-xs text-[var(--ink-3)]">0{i + 1}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};