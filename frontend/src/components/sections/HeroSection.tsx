import { useEffect, useRef, useState } from 'react';
import { animate, motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Captions, Mail, Pause, Play, RotateCcw, Square, Volume2, VolumeX } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons';
import { PERSONAL_IDENTITY as P, FEATURED_PROJECTS, NARRATION_SCRIPTS } from '../../data/portfolioData';
import { Magnetic } from '../ui/Magnetic';
import { useReducedMotion } from '../../hooks/useMedia';

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></svg>
);

const ease = [0.22, 1, 0.36, 1] as const;

const CSS = `
@keyframes hx-drift{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(40px,-30px,0) scale(1.15)}}
@keyframes hx-drift2{0%,100%{transform:translate3d(0,0,0) scale(1.1)}50%{transform:translate3d(-50px,30px,0) scale(.95)}}
@keyframes hx-shine{0%{background-position:200% 0}100%{background-position:-200% 0}}
@keyframes hx-sweep{0%{transform:translateX(-120%) skewX(-20deg)}60%,100%{transform:translateX(320%) skewX(-20deg)}}
@keyframes hx-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes hx-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes hx-pulse{0%{box-shadow:0 0 0 0 var(--accent)}70%,100%{box-shadow:0 0 0 10px transparent}}
@keyframes hx-pan{from{background-position:0 0}to{background-position:56px 56px}}
.hx-grid{background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:56px 56px;-webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 40%,#000 30%,transparent 80%);mask-image:radial-gradient(ellipse 70% 60% at 50% 40%,#000 30%,transparent 80%);animation:hx-pan 8s linear infinite;opacity:.55}
.hx-blob{position:absolute;border-radius:9999px;filter:blur(80px);opacity:.45;will-change:transform}
.hx-shimmer{background:linear-gradient(100deg,var(--accent) 20%,#a78bfa 40%,#67e8f9 50%,#a78bfa 60%,var(--accent) 80%);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:hx-shine 6s linear infinite}
.hx-cta{position:relative;overflow:hidden}
.hx-cta::after{content:"";position:absolute;inset:0;width:40%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);animation:hx-sweep 3.6s ease-in-out infinite}
.hx-card{position:relative;overflow:hidden;transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s;transform-style:preserve-3d}
.hx-card::before{content:"";position:absolute;inset:0;opacity:0;transition:opacity .3s;background:radial-gradient(240px circle at var(--cx,50%) var(--cy,50%),var(--accent-soft),transparent 70%);pointer-events:none}
.hx-card:hover::before{opacity:1}
.hx-chip{animation:hx-bob 5s ease-in-out infinite}
.hx-dot{animation:hx-pulse 2s infinite}
.hx-track{animation:hx-marquee 28s linear infinite;width:max-content}
.hx-mq:hover .hx-track{animation-play-state:paused}
@keyframes hx-eq{0%,100%{transform:scaleY(.15)}50%{transform:scaleY(1)}}
@keyframes hx-spin{to{transform:rotate(360deg)}}
.hx-bar{height:100%;transform-origin:bottom;transform:scaleY(.12);opacity:.4;transition:opacity .3s}
.hx-live .hx-bar{opacity:1;animation:hx-eq 1.1s ease-in-out infinite}
.hx-ring{position:absolute;inset:-100%;background:conic-gradient(from 0deg,transparent 0 60%,var(--accent) 80%,#a78bfa 90%,transparent);animation:hx-spin 6s linear infinite;opacity:.9}
.hx-fade{-webkit-mask-image:linear-gradient(to bottom,#000 84%,transparent);mask-image:linear-gradient(to bottom,#000 84%,transparent)}
@media (prefers-reduced-motion:reduce){.hx-grid,.hx-track,.hx-shimmer,.hx-cta::after,.hx-dot,.hx-live .hx-bar{animation:none}}`;

const Line: React.FC<{ children: React.ReactNode; delay: number; reduced: boolean }> = ({ children, delay, reduced }) => (
  <span className="block overflow-hidden pb-[0.1em]">
    <motion.span className="block" initial={reduced ? false : { y: '110%', rotate: 3 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1, delay, ease }}>{children}</motion.span>
  </span>
);

const CountUp: React.FC<{ to: number; reduced: boolean }> = ({ to, reduced }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) { el.textContent = String(to); return; }
    const c = animate(0, to, { duration: 1.6, delay: 1.2, ease, onUpdate: (v) => { el.textContent = String(Math.round(v)); } });
    return () => c.stop();
  }, [to, reduced]);
  return <span ref={ref}>{reduced ? to : 0}</span>;
};

export const HeroSection: React.FC<{ isDark?: boolean; onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  const reduced = useReducedMotion();
  const vid = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [prog, setProg] = useState(0);
  const [time, setTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [caps, setCaps] = useState(true);
  useEffect(() => { if (vid.current) vid.current.muted = muted; }, [muted]);
  const meta = NARRATION_SCRIPTS.hero;
  const script = meta.script;
  const cut = Math.floor(prog * script.length);
  const paused = !speaking && time > 0 && prog < 1;
  const sentences = script.match(/[^.!?]+[.!?]+\s*/g) ?? [script];
  let acc = 0;
  const current = sentences.find((t) => (acc += t.length) > cut) ?? sentences[sentences.length - 1];
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting || e.intersectionRatio < 0.3) v.pause(); }, { threshold: [0, 0.3] });
    io.observe(v);
    const hide = () => { if (document.hidden) v.pause(); };
    document.addEventListener('visibilitychange', hide);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', hide); v.pause(); };
  }, []);
  const ready = () => { const v = vid.current; return !!v && !v.error && v.readyState >= 1; };
  const play = (from0: boolean) => {
    const v = vid.current;
    if (!v) return;
    setHasVideo(true);
    if (from0 || v.ended) v.currentTime = 0;
    v.play().catch(() => { });
  };
  const toggle = () => { if (!ready()) return; if (vid.current?.paused) play(false); else vid.current?.pause(); };
  const stop = () => {
    const v = vid.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setSpeaking(false); setProg(0); setTime(0);
  };
  const restart = () => { if (ready()) play(true); };
  const status = speaking ? 'Playing' : paused ? 'Paused' : 'Ready';
  const onTime = (v: HTMLVideoElement) => {
    if (!v.duration) return;
    const S = 0.82, E = v.duration - 0.15;
    setTime(v.currentTime);
    setProg(Math.min(1, Math.max(0, (v.currentTime - S) / (E - S))));
  };
  const ctl = 'grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--ink-2)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] sm:h-10 sm:w-10';
  const stats: { v: number | string; l: string }[] = [
    { v: FEATURED_PROJECTS.length, l: 'Projects' },
    { v: 1, l: 'Year experience' },
    { v: 'AI/ML', l: 'Specialization' },
    { v: 'CEO', l: 'StormForge Technologies' },
  ];
  const social = 'grid h-11 w-11 place-items-center rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]';

  return (
    <section id="hero" className="relative isolate overflow-hidden pt-24 sm:pt-28" aria-labelledby="hero-title">
      <style>{CSS}</style>
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="hx-grid absolute inset-0" />
      </div>

      <div className="wrap grid items-center gap-8 pb-2 lg:min-h-[calc(100svh-11rem)] lg:grid-cols-12 lg:gap-8">
        <div className="relative z-10 lg:col-span-7">
          <motion.p initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-[var(--surface)]/80 px-4 py-2 text-xs font-medium text-[var(--ink-2)] shadow-[var(--shadow-1)] backdrop-blur-md">
            <span className="hx-dot h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            Open to Internships & Opportunities
          </motion.p>

          <h1 id="hero-title" className="text-[clamp(2.75rem,6.4vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            <Line delay={0.25} reduced={reduced}>Turning</Line>
            <Line delay={0.35} reduced={reduced}>Ideas Into</Line>
            <Line delay={0.45} reduced={reduced}><span className="hx-shimmer">Real Impact</span></Line>
          </h1>

          <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease }}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--ink-2)] sm:text-lg lg:text-xl">
              AI/ML Engineer and Full-Stack Developer building intelligent solutions that solve real-world problems.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic><button onClick={() => onNavigate('projects')} className="btn btn-dark h-12 px-6 shadow-none sm:h-14 sm:px-7">Explore My Work <ArrowUpRight className="h-4 w-4" /></button></Magnetic>
              <button onClick={restart} className="btn btn-ghost group h-12 border-[var(--line)] bg-[var(--surface)]/70 px-5 backdrop-blur-md shadow-[var(--shadow-1)] sm:h-14 sm:px-6" aria-label="Watch intro: play voice narration with captions">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)] transition-transform group-hover:scale-110"><Play className="h-4 w-4 fill-current" /></span>Watch Intro
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease }} className="relative z-10 mx-auto w-full max-w-[380px] sm:max-w-[420px] lg:col-span-5 lg:w-[min(100%,calc((100svh_-_15rem)*0.75))] lg:max-w-none lg:justify-self-end">
          <div className="relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <div className="absolute inset-0" style={{ transform: 'translate(-10.2%,-7.61%) rotate(2.35deg) scale(1.1621)', transformOrigin: '0 0' }}><img src="/portrait-cutout.webp" alt="Portrait of Easwar S" width={1086} height={1448} fetchPriority="high" className="h-full w-full object-cover" /></div>
              <video ref={vid} src="/intro.mp4" playsInline preload="auto" aria-label="Video introduction by Easwar S" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${hasVideo && (speaking || paused) ? 'opacity-100' : 'opacity-0'}`}
                onLoadedMetadata={() => setHasVideo(true)} onCanPlay={() => setHasVideo(true)} onError={() => setHasVideo(false)}
                onPlay={() => setSpeaking(true)} onPause={() => setSpeaking(false)} onEnded={() => { setSpeaking(false); setProg(1); }}
                onTimeUpdate={(e) => onTime(e.currentTarget)} />
            </div>
            {caps && (speaking || paused) && (
              <p className="absolute inset-x-4 bottom-10 rounded-xl bg-black/60 px-3 py-2 text-center text-[13px] font-medium leading-snug text-white backdrop-blur-sm" aria-live="off">{current.trim()}</p>
            )}
          </div>

          <div className="relative z-10 mt-4 flex items-center gap-2 sm:gap-3">
            <button onClick={toggle} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--ink)] text-[var(--bg)] sm:h-14 sm:w-14" aria-label={speaking ? 'Pause narration' : paused ? 'Resume narration' : 'Play narration'}>
              {speaking ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-[10px] uppercase tracking-[.18em] text-[var(--ink-3)]">{meta.sectionTitle} · {status}</p>
              <div className={`mt-1.5 flex h-6 items-center gap-[2px] ${speaking ? 'hx-live' : ''}`} aria-hidden="true">
                {Array.from({ length: 32 }).map((_, i) => (
                  <span key={i} className="hx-bar flex-1 rounded-full bg-gradient-to-t from-[var(--accent)] to-violet-400" style={{ transform: `scaleY(${0.18 + ((i * 7) % 11) / 16})`, animationDelay: `${-i * 0.09}s`, animationDuration: `${0.8 + (i % 5) * 0.15}s` }} />
                ))}
              </div>
            </div>
            <div className="flex shrink-0 items-center">
              <button onClick={restart} className={`${ctl}`} aria-label="Restart narration"><RotateCcw className="h-4 w-4" /></button>
              <button onClick={() => setMuted((m) => !m)} className={ctl} aria-pressed={muted} aria-label={muted ? 'Unmute voice' : 'Mute voice (captions only)'}>
                {muted ? <VolumeX className="h-4 w-4 text-rose-500" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <button onClick={() => setCaps((c) => !c)} className={`${ctl} ${caps ? 'text-[var(--accent)]' : ''}`} aria-pressed={caps} aria-label="Toggle captions"><Captions className="h-[18px] w-[18px]" /></button>
              <button onClick={stop} disabled={!speaking && !paused} className={`${ctl} disabled:opacity-40`} aria-label="Stop intro"><Square className="h-4 w-4 fill-current" /></button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="wrap relative z-10 mt-10 sm:mt-6">
        <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.9, ease }} className="panel grid items-center gap-y-2 px-5 py-4 backdrop-blur-md sm:px-8 md:grid-cols-[1fr_auto]">
          <dl className="grid grid-cols-2 gap-y-5 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.l} className={`flex flex-col ${i > 0 ? 'sm:border-l sm:border-[var(--line)] sm:pl-6' : ''} ${i % 2 ? 'pl-4 max-sm:border-l max-sm:border-[var(--line)]' : ''}`}>
                <dd className="text-2xl font-medium tracking-tight sm:text-3xl">{typeof s.v === 'number' ? <CountUp to={s.v} reduced={reduced} /> : s.v}</dd>
                <dt className="whitespace-nowrap text-[11px] tracking-tight text-[var(--ink-3)] sm:text-xs sm:tracking-normal">{s.l}</dt>
              </div>
            ))}
          </dl>
          <div className="mt-1 flex items-center justify-center gap-3 border-t border-[var(--line)] pt-3 md:mt-0 md:justify-start md:gap-1 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <a href={P.github} target="_blank" rel="noopener noreferrer" className={social} aria-label="GitHub (opens in new tab)"><GithubIcon className="h-5 w-5" /></a>
            <a href={P.linkedin} target="_blank" rel="noopener noreferrer" className={social} aria-label="LinkedIn (opens in new tab)"><LinkedinIcon className="h-5 w-5" /></a>
            <a href="https://instagram.com/stormforge_tech" target="_blank" rel="noopener noreferrer" className={social} aria-label="Instagram (opens in new tab)"><InstagramIcon className="h-5 w-5" /></a>
            <a href={`mailto:${P.email}`} className={social} aria-label="Email Easwar"><Mail className="h-5 w-5" /></a>
          </div>
        </motion.div>
      </div>

      <div className="wrap relative z-10 flex items-center justify-center py-5 text-[11px] uppercase tracking-[.18em] text-[var(--ink-3)]">
        <button onClick={() => onNavigate('about')} className="mx-auto flex items-center gap-2 transition-colors hover:text-[var(--accent)]" aria-label="Scroll to About section">
          <ArrowDown className="h-4 w-4 animate-float" aria-hidden="true" />Scroll to explore
        </button>
      </div>
    </section>
  );
};