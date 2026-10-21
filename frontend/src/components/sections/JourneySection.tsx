import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useContent } from '../../services/contentService';
import { Reveal } from '../ui/Reveal';
import { useReducedMotion } from '../../hooks/useMedia';

export const JourneySection: React.FC = () => {
  const { journey: JOURNEY_MILESTONES } = useContent();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <section id="journey" className="section" aria-labelledby="journey-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow mb-4">02 — Journey</p>
              <h2 id="journey-title" className="h2 text-balance">My Professional <b>Journey So Far.</b></h2>
              <p className="lede mt-6 max-w-sm text-pretty">Key Milestones From Academics, Hackathons, Internships And Entrepreneurship.</p>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[.18em] text-[var(--ink-3)]">{JOURNEY_MILESTONES.length} milestones · 2025 — 2026</p>
            </Reveal>
          </div>
        </div>

        <ol ref={ref} className="relative lg:col-span-8">
          <span className="absolute bottom-2 left-[5px] top-2 w-px bg-[var(--line-2)]" aria-hidden="true" />
          <motion.span className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-[var(--ink)]" style={{ scaleY: reduced ? 1 : draw }} aria-hidden="true" />
          {JOURNEY_MILESTONES.map((m, i) => (
            <li key={m.role + m.period}>
              <Reveal className={`relative pl-9 sm:pl-12 ${i < JOURNEY_MILESTONES.length - 1 ? 'pb-12 sm:pb-14' : ''}`}>
                <span className={`absolute left-0 top-[7px] h-[11px] w-[11px] rounded-full border-2 border-[var(--ink)] ${i === 0 ? 'bg-[var(--ink)] ring-4 ring-[var(--accent-soft)]' : 'bg-[var(--bg)]'}`} aria-hidden="true" />
                <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--ink-3)]">{m.period}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-[1.75rem]">{m.role}</h3>
                <p className="mt-1.5 text-[15px] font-medium text-[var(--ink-2)]">{m.organization}{m.location ? ` · ${m.location}` : ''}</p>
                <p className="mt-3 max-w-2xl leading-relaxed text-[var(--ink-2)] text-pretty">{m.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};