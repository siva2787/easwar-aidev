import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { SKILL_GROUPS } from '../../data/portfolioData';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

const DEVICON = (s: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${s}/${s}-original.svg`;
const SIMPLE = (s: string) => `https://cdn.simpleicons.org/${s}`;

const LOGOS: Record<string, string[]> = {
  'Python': [DEVICON('python')],
  'JavaScript (ES6+)': [DEVICON('javascript')],
  'TypeScript': [DEVICON('typescript')],
  'HTML5 / Modern CSS': [DEVICON('html5'), DEVICON('css3')],
  'PyTorch': [DEVICON('pytorch')],
  'scikit-learn': [DEVICON('scikitlearn')],
  'HuggingFace': [SIMPLE('huggingface')],
  'Pandas & NumPy': [DEVICON('pandas'), DEVICON('numpy')],
  'React 18 / 19': [DEVICON('react')],
  'Tailwind CSS': [DEVICON('tailwindcss')],
  'Three.js / WebGL': [DEVICON('threejs')],
  'Framer Motion': [SIMPLE('framer')],
  'FastAPI': [DEVICON('fastapi')],
  'Node.js & Express': [DEVICON('nodejs'), DEVICON('express')],
  'PostgreSQL': [DEVICON('postgresql')],
  'MongoDB': [DEVICON('mongodb')],
  'Git & GitHub': [DEVICON('git'), DEVICON('github')],
  'Docker': [DEVICON('docker')],
  'Linux / Bash': [DEVICON('linux'), DEVICON('bash')],
  'Vercel / Cloud': [DEVICON('vercel')],
};

const levelBars = (l: string) => (l === 'Advanced' ? 3 : l === 'Intermediate' ? 2 : 1);

const Logo: React.FC<{ name: string; letter: string }> = ({ name, letter }) => {
  const [failed, setFailed] = useState(false);
  const urls = LOGOS[name];
  const multi = !!urls && urls.length > 1;

  return (
    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[var(--line)] bg-white shadow-sm transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
      {!urls ? (
        <Sparkles className="h-6 w-6 text-[var(--ink)]" />
      ) : failed ? (
        <span className="font-mono text-xs font-semibold text-[var(--ink-2)]">{letter}</span>
      ) : (
        <span className={multi ? 'grid grid-cols-2 gap-1' : 'grid'}>
          {urls.map((u) => (
            <img key={u} src={u} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} className={multi ? 'h-[17px] w-[17px] object-contain' : 'h-7 w-7 object-contain'} />
          ))}
        </span>
      )}
    </span>
  );
};

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="section overflow-x-clip" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHeading index="04" label="Skills" lede="Grouped by how I use them. Each technology appears in at least one project.">
          <span id="skills-title">Skills & <b>Expertise.</b></span>
        </SectionHeading>

        <div className="grid gap-6 lg:grid-cols-2">
          {SKILL_GROUPS.map((g, gi) => {
            const wide = SKILL_GROUPS.length % 2 === 1 && gi === SKILL_GROUPS.length - 1;
            return (
              <Reveal key={g.category} delay={(gi % 2) * 0.08} className={`h-full ${wide ? 'lg:col-span-2' : ''}`}>
                <div className="flex h-full flex-col rounded-[28px] border border-[var(--line)] bg-[var(--card,var(--bg-2))] p-6 shadow-[0_1px_2px_rgba(0,0,0,.04),0_20px_40px_-28px_rgba(0,0,0,.18)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,.28)] sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--ink)] font-mono text-xs font-medium text-[var(--bg)]">{String(gi + 1).padStart(2, '0')}</span>
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl">{g.category}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-3)] text-pretty">{g.description}</p>
                    </div>
                  </div>

                  <ul className={`mt-7 grid flex-1 gap-3 border-t border-[var(--line)] pt-6 sm:grid-cols-2 ${wide ? 'lg:grid-cols-4' : ''}`}>
                    {g.skills.map((s) => {
                      const bars = levelBars(s.level);
                      return (
                        <li key={s.name} className="group flex items-start gap-3.5 rounded-2xl border border-transparent p-3 transition-all duration-300 hover:border-[var(--line-2)] hover:bg-[var(--hov,var(--bg))]">
                          <Logo name={s.name} letter={s.iconLetter} />
                          <span className="min-w-0">
                            <span className="block text-[15px] font-semibold leading-tight">{s.name}</span>
                            <span className="mt-1 block text-[13px] leading-snug text-[var(--ink-3)]">{s.context}</span>
                            <span className="mt-2 flex items-center gap-2" aria-label={`Proficiency: ${s.level}`}>
                              <span className="flex gap-1" aria-hidden="true">
                                {[1, 2, 3].map((n) => (
                                  <span key={n} className={`h-1 w-5 rounded-full ${n <= bars ? 'bg-[var(--ink)]' : 'bg-[var(--line-2)]'}`} />
                                ))}
                              </span>
                              <span className="font-mono text-[10px] uppercase tracking-[.12em] text-[var(--ink-3)]">{s.level}</span>
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};