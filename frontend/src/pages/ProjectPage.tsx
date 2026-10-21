import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../components/icons/BrandIcons';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { ProjectVisual } from '../components/ui/ProjectVisual';
import { Reveal } from '../components/ui/Reveal';

const Block: React.FC<{ n: string; title: string; children: React.ReactNode }> = ({ n, title, children }) => (
  <Reveal className="grid gap-4 border-t border-[var(--line)] py-10 md:grid-cols-12 md:gap-10">
    <h2 className="md:col-span-4"><span className="eyebrow mb-2 block">{n}</span><span className="text-xl font-semibold tracking-tight">{title}</span></h2>
    <div className="md:col-span-8">{children}</div>
  </Reveal>
);

export const ProjectPage: React.FC<{ slug: string; onNavigate: (id: string) => void }> = ({ slug, onNavigate }) => {
  const i = FEATURED_PROJECTS.findIndex((p) => p.slug === slug);
  const p = FEATURED_PROJECTS[i];

  useEffect(() => {
    document.title = p ? `${p.title} — Case Study | Easwar S` : 'Project not found | Easwar S';
    window.scrollTo(0, 0);
    return () => { document.title = 'Easwar S — AI/ML Engineer & Full-Stack Developer'; };
  }, [p]);

  if (!p) {
    return (
      <div className="wrap grid min-h-[70vh] place-content-center gap-4 pt-28 text-center">
        <p className="eyebrow">404</p>
        <h1 className="h2">Project not found</h1>
        <button onClick={() => onNavigate('hero')} className="btn btn-dark mx-auto">Back to portfolio</button>
      </div>
    );
  }
  const next = FEATURED_PROJECTS[(i + 1) % FEATURED_PROJECTS.length];
  const steps = p.architecture;

  return (
    <article className="wrap pb-20 pt-28 sm:pt-32">
      <button onClick={() => onNavigate('projects')} className="link-u mb-10 inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-2)]"><ArrowLeft className="h-4 w-4" />All projects</button>
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">Case study · {p.category}</p>
        <h1 className="text-[clamp(2.2rem,5.4vw,4.4rem)] font-light leading-[1.05]"><b className="font-semibold">{p.title}</b></h1>
        <p className="lede mt-5">{p.tagline}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Live demo <ArrowUpRight className="h-4 w-4" /><span className="sr-only"> (opens in new tab)</span></a>}
          {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><GithubIcon className="h-4 w-4" />Source code<span className="sr-only"> (opens in new tab)</span></a>}
          {!p.liveUrl && <span className="chip">No public demo yet</span>}
        </div>
      </header>

      {p.image && <div className="my-12"><ProjectVisual src={p.image} alt={`${p.title} interface screenshot`} eager /></div>}

      <div className={p.image ? '' : 'mt-12'}>
        <Block n="01" title="Overview"><p className="lede">{p.summary}</p></Block>
        <Block n="02" title="Problem & motivation"><p className="lede">{p.problem}</p></Block>
        <Block n="03" title="Solution"><p className="lede">{p.solution}</p></Block>
        <Block n="04" title="Architecture">
          <ol className="space-y-0">
            {steps.map((s, k) => (
              <li key={s} className="relative flex gap-4 pb-6 last:pb-0">
                {k < steps.length - 1 && <span className="absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px bg-[var(--line-2)]" aria-hidden="true" />}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--line-2)] bg-[var(--surface)] font-mono text-xs text-[var(--accent)]">{k + 1}</span>
                <span className="pt-1 leading-relaxed text-[var(--ink-2)]">{s}</span>
              </li>
            ))}
          </ol>
        </Block>
        <Block n="05" title="Key features"><ul className="space-y-3">{p.highlights.map((h) => <li key={h} className="flex gap-3 leading-relaxed text-[var(--ink-2)]"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />{h}</li>)}</ul></Block>
        <Block n="06" title="Tech stack"><ul className="flex flex-wrap gap-2">{p.techStack.map((t) => <li key={t} className="chip text-sm">{t}</li>)}</ul></Block>
      </div>

      <a href={`#/projects/${next.slug}`} className="group mt-6 flex items-center justify-between rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--accent)] sm:p-8">
        <span><span className="eyebrow block">Next project</span><span className="mt-1 block text-2xl font-semibold tracking-tight">{next.title}</span></span>
        <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </a>
    </article>
  );
};
