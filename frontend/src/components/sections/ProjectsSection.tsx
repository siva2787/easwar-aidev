import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Globe } from 'lucide-react';
import { GithubIcon } from '../icons/BrandIcons';
import { useContent } from '../../services/contentService';
import type { ProjectItem } from '../../types/portfolio';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

const pad = (n: number) => String(n).padStart(2, '0');

const useComeIn = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setShown(true);
      setSettled(true);
      return;
    }
    let t: number;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          t = window.setTimeout(() => setSettled(true), 1600);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return { ref, shown, settled };
};

const Visual: React.FC<{ p: ProjectItem; i: number; flip: boolean }> = ({ p, i, flip }) => {
  const { ref, shown, settled } = useComeIn();
  const href = p.liveUrl ?? p.githubUrl ?? '#';

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] ${shown ? 'translate-x-0 scale-100 opacity-100 blur-0' : `${flip ? 'translate-x-6 sm:translate-x-16' : '-translate-x-6 sm:-translate-x-16'} scale-[.96] opacity-0 sm:scale-[.94] sm:blur-sm`
        }`}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${p.title} live website (opens in new tab)`}
        className="group relative block overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--bg-2)] p-2.5 transition-shadow duration-500 hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,.4)] sm:rounded-[32px] sm:p-4"
      >
        <div
          className={`overflow-hidden rounded-[16px] border border-[var(--line-2)] bg-[var(--bg)] shadow-2xl transition-all duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] sm:rounded-[20px] ${shown ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
            }`}
          style={{ transitionDelay: shown && !settled ? '350ms' : '0ms' }}
        >
          <img
            src={p.image}
            alt={`${p.title} interface screenshot`}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            width={1917}
            height={912}
            className={`block aspect-[1917/912] w-full object-cover object-top transition-transform duration-[1800ms] ease-out group-hover:scale-[1.03] ${shown ? 'scale-100' : 'scale-110'}`}
          />
        </div>
      </a>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const { projects: FEATURED_PROJECTS } = useContent();
  return (
    <section id="projects" className="section overflow-x-clip" aria-labelledby="projects-title">
      <div className="wrap">
        <SectionHeading index="03" label="Projects" lede="">
          <span id="projects-title">My Developed <b>Products.</b></span>
        </SectionHeading>

        <div className="space-y-24 sm:space-y-32">
          {FEATURED_PROJECTS.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={p.id} className="grid lg:grid-cols-12 lg:items-center lg:gap-x-14">
                <Reveal delay={0.1} className={`lg:row-start-1 lg:self-end ${flip ? 'lg:col-start-1' : 'lg:col-start-8'} lg:col-span-5`}>
                  <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[.18em] text-[var(--ink-3)]">
                    <span className="text-[var(--ink)]">{pad(i + 1)}</span>
                    <span className="h-px w-8 bg-[var(--line-2)]" aria-hidden="true" />
                    {p.category}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-4xl">{p.title}</h3>
                  <p className="mt-3 text-lg font-medium text-[var(--ink-2)] text-pretty">{p.tagline}</p>
                </Reveal>

                <div className={`my-7 lg:my-0 lg:row-span-2 lg:row-start-1 lg:col-span-7 ${flip ? 'lg:col-start-6' : 'lg:col-start-1'}`}>
                  <Visual p={p} i={i} flip={flip} />
                </div>

                <Reveal delay={0.1} className={`lg:row-start-2 lg:self-start ${flip ? 'lg:col-start-1' : 'lg:col-start-8'} lg:col-span-5`}>
                  <p className="leading-relaxed text-[var(--ink-3)] text-pretty lg:mt-4">{p.summary}</p>

                  <ul className="mt-6 space-y-2.5">
                    {p.highlights.slice(0, 3).map((x) => (
                      <li key={x} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--ink-2)]">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600" aria-hidden="true">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {x}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {p.techStack.map((t) => (
                      <li key={t} className="rounded-full border border-[var(--line)] bg-[var(--bg-2)] px-3 py-1 font-mono text-xs text-[var(--ink-2)]">{t}</li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark"><Globe className="h-[18px] w-[18px]" /> Live Website<span className="sr-only"> (opens in new tab)</span></a>}
                    {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><GithubIcon className="h-[18px] w-[18px]" /> Source Code<span className="sr-only"> (opens in new tab)</span></a>}
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>

        <Reveal className="mt-24 flex justify-center sm:mt-32">
          <a href="https://github.com/siva2787" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <GithubIcon className="h-[18px] w-[18px]" /> More On GitHub <ArrowUpRight className="h-4 w-4" />
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </Reveal>
      </div>
    </section>);
};