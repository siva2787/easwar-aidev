import { NARRATION_SCRIPTS } from '../data/portfolioData';

const MALE = /Ravi|Prabhat|Rishi|David|Mark|Guy|Ryan|Christopher|Eric|Brian|Andrew|Daniel|Alex|Fred|Aaron|Arthur|Oliver|Thomas|Male/i;
const FEMALE = /Female|Zira|Heera|Neerja|Samantha|Karen|Moira|Tessa|Susan|Hazel|Aria|Jenny|Emma|Libby|Sonia|Fiona|Veena|Kalpana|Victoria|Kathy/i;

export type NarrationState = 'idle' | 'speaking' | 'paused';

export interface NarrationListenerState {
  state: NarrationState;
  currentSectionId: string;
  currentScript: string;
  isMuted: boolean;
  autoNarrateOnScroll: boolean;
  showCaptions: boolean;
  audioLevel: number;
  progress: number; // 0..1 caption progress
  hasStarted: boolean;
}

type Listener = (s: NarrationListenerState) => void;

/**
 * Section-aware narration state machine.
 * - Never speaks before a visitor gesture (play / auto toggle).
 * - Never interrupts a clip: a scroll-triggered section is queued and plays after the current clip.
 * - Each section auto-narrates at most once per session; manual play always works.
 * - Voice source: browser speech synthesis (optional). Replace `speak()` with recorded clips if desired.
 */
export class NarrationService {
  private state: NarrationState = 'idle';
  private sectionId = 'hero';
  private muted = false;
  private auto = false;
  private captions = true;
  private progress = 0;
  private level = 0;
  private interacted = false;
  private pending: string | null = null;
  private autoDone = new Set<string>();
  private listeners = new Set<Listener>();
  private lvlTimer: number | null = null;
  private fallbackTimer: number | null = null;
  private debounce: number | null = null;
  private token = 0;

  private get synth(): SpeechSynthesis | null {
    return typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
  }

  subscribe(l: Listener): () => void {
    this.listeners.add(l);
    l(this.getSnapshot());
    return () => { this.listeners.delete(l); };
  }

  getSnapshot(): NarrationListenerState {
    const item = NARRATION_SCRIPTS[this.sectionId] ?? NARRATION_SCRIPTS.hero;
    return {
      state: this.state, currentSectionId: this.sectionId, currentScript: item.script,
      isMuted: this.muted, autoNarrateOnScroll: this.auto, showCaptions: this.captions,
      audioLevel: this.level, progress: this.progress, hasStarted: this.interacted,
    };
  }

  private snap = this.getSnapshot();
  private notify() {
    this.snap = this.getSnapshot();
    this.listeners.forEach((l) => l(this.snap));
  }

  /** Called by the scroll observer. Debounced so rapid scrolling settles on one section. */
  setSection(id: string): void {
    if (!NARRATION_SCRIPTS[id] || id === this.sectionId) return;
    this.sectionId = id;
    if (this.state === 'idle') this.progress = 0;
    this.notify();
    if (!this.auto || !this.interacted || this.muted || this.autoDone.has(id)) return;
    if (this.debounce) window.clearTimeout(this.debounce);
    this.debounce = window.setTimeout(() => {
      if (this.sectionId !== id) return;
      if (this.state === 'speaking') this.pending = id; // never interrupt a playing clip
      else this.play(id, true);
    }, 700);
  }

  play(id?: string, fromAuto = false): void {
    this.interacted = true;
    if (id && NARRATION_SCRIPTS[id]) this.sectionId = id;
    if (fromAuto) this.autoDone.add(this.sectionId);
    this.cancelOutput();
    this.pending = null;
    const item = NARRATION_SCRIPTS[this.sectionId] ?? NARRATION_SCRIPTS.hero;
    const my = ++this.token;
    this.state = 'speaking';
    this.progress = 0;
    this.startLevel();
    this.notify();

    const done = () => {
      if (my !== this.token) return;
      this.stopLevel();
      this.state = 'idle';
      this.progress = 1;
      this.notify();
      const next = this.pending;
      this.pending = null;
      if (next && this.auto && !this.muted && !this.autoDone.has(next)) this.play(next, true);
    };

    if (this.muted || !this.synth) {
      // Captions-only playback: advance progress by estimated duration.
      const total = item.estimatedDurationSeconds * 1000;
      const t0 = Date.now();
      const tick = () => {
        if (my !== this.token) return;
        if (this.state === 'speaking') {
          this.progress = Math.min(1, (Date.now() - t0) / total);
          this.notify();
        }
        if (this.progress >= 1) return done();
        this.fallbackTimer = window.setTimeout(tick, 250);
      };
      tick();
      return;
    }

    const u = new SpeechSynthesisUtterance(item.script);
    u.rate = 0.95;
    const v = this.pickVoice();
    if (v) { u.voice = v; u.lang = v.lang; }
    u.pitch = v && MALE.test(v.name) ? 1 : 0.8;
    u.onboundary = (e) => {
      if (my !== this.token) return;
      this.progress = Math.min(1, e.charIndex / item.script.length);
      this.notify();
    };
    u.onend = done;
    u.onerror = done;
    this.synth.speak(u);
  }

  private pickVoice(): SpeechSynthesisVoice | null {
    const all = this.synth?.getVoices() ?? [];
    const en = all.filter((x) => x.lang.toLowerCase().startsWith('en'));
    const notF = en.filter((x) => !FEMALE.test(x.name));
    return (
      notF.find((x) => x.lang.toLowerCase().replace('_', '-') === 'en-in' && MALE.test(x.name)) ??
      notF.find((x) => MALE.test(x.name)) ??
      notF[0] ?? en[0] ?? null
    );
  }

  pause(): void {
    if (this.state !== 'speaking') return;
    this.synth?.pause();
    this.state = 'paused';
    this.stopLevel();
    this.notify();
  }

  resume(): void {
    if (this.state !== 'paused') return this.play();
    if (this.synth && this.synth.paused) this.synth.resume();
    this.state = 'speaking';
    this.startLevel();
    this.notify();
  }

  stop(): void {
    this.token++;
    this.cancelOutput();
    this.pending = null;
    this.state = 'idle';
    this.progress = 0;
    this.stopLevel();
    this.notify();
  }

  toggleMute(): void {
    this.muted = !this.muted;
    if (this.state !== 'idle') this.play(); // restart in the new mode (audio vs captions-only)
    else this.notify();
  }

  toggleAutoNarrate(): void {
    this.auto = !this.auto;
    if (this.auto) {
      this.interacted = true;
      if (this.state === 'idle' && !this.muted && !this.autoDone.has(this.sectionId)) this.play(undefined, true);
    }
    this.notify();
  }

  toggleCaptions(): void {
    this.captions = !this.captions;
    this.notify();
  }

  /** Release timers and speech; call on app unmount. */
  dispose(): void {
    this.stop();
    if (this.debounce) window.clearTimeout(this.debounce);
    this.listeners.clear();
  }

  private cancelOutput() {
    this.synth?.cancel();
    if (this.fallbackTimer) window.clearTimeout(this.fallbackTimer);
    this.fallbackTimer = null;
  }

  private startLevel() {
    this.stopLevel();
    if (this.muted) return;
    this.lvlTimer = window.setInterval(() => {
      const r = Math.random();
      this.level = r > 0.85 ? 0.95 : r > 0.3 ? 0.4 + Math.random() * 0.4 : 0.15;
      this.notify();
    }, 140);
  }

  private stopLevel() {
    if (this.lvlTimer) window.clearInterval(this.lvlTimer);
    this.lvlTimer = null;
    this.level = 0;
  }
}

export const narrationService = new NarrationService();