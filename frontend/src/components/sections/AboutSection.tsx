import { PERSONAL_IDENTITY as P } from '../../data/portfolioData';
import { Reveal } from '../ui/Reveal';

const facts = [
  { l: 'Role', v: 'AI/ML & Full-Stack Developer' },
  { l: 'Education', v: 'B.Tech, Artificial Intelligence & Data Science' },
  { l: 'College', v: 'Arasu Engineering College, Kumbakonam' },
  { l: 'Startup', v: 'CEO, StormForge Technologies' },
  { l: 'Location', v: 'Tamil Nadu, India' },
  { l: 'Availability', v: 'Open to internships & opportunities' },
];

export const AboutSection: React.FC<{ onNavigate?: (id: string) => void }> = () => (
  <section id="about" className="section" aria-labelledby="about-title">
    <div className="wrap grid items-center lg:grid-cols-12 lg:gap-16">
      <div className="max-lg:contents lg:col-span-7">
        <Reveal>
          <p className="eyebrow mb-4">01 — About</p>
          <h2 id="about-title" className="h2 text-balance font-semibold tracking-[-0.035em] [&_b]:font-semibold"><span className="font-light text-[var(--ink)]">I’m Easwar <span className="ml-[0.16em]">S</span>,</span><br />A Developer Building <span className="whitespace-nowrap">AI-Powered</span> Apps.</h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 max-w-xl space-y-5 text-pretty">
          <p className="lede">I’m an AI/ML engineer and full-stack developer pursuing a B.Tech in Artificial Intelligence and Data Science.</p>
          <p className="lede">I turn machine-learning models into dependable products, owning the full lifecycle from data and prediction to interface and backend. Recent work includes an adaptive learning platform, an AI-powered resume analyzer and offline-first tools for students.</p>
          <p className="lede">As CEO of StormForge Technologies, I also design and deliver web and mobile applications for clients.</p>
        </Reveal>

        <Reveal delay={0.15} className="max-lg:order-2">
          <dl className="mt-10 grid max-w-2xl gap-x-10 sm:grid-cols-2">
            {facts.map(({ l, v }) => (
              <div key={l} className="border-t border-[var(--line)] py-4">
                <dt className="font-mono text-[11px] uppercase tracking-[.16em] text-[var(--ink-3)]">{l}</dt>
                <dd className="mt-1.5 text-[15px] font-medium leading-snug tracking-tight">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

      </div>

      <Reveal delay={0.1} className="mt-10 max-lg:order-1 lg:mt-0 lg:col-span-5">
        <div className="mx-auto max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-3xl border border-[var(--line)]">
            <img src={P.avatarUrl} alt="Easwar S" width={460} height={575} loading="lazy" className="aspect-[4/5] w-full object-cover object-[50%_30%]" />
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);