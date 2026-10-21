import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NarrationService } from './narrationService';

describe('NarrationService state machine', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('does not speak before a visitor gesture', () => {
    const n = new NarrationService();
    n.setSection('about');
    vi.advanceTimersByTime(2000);
    expect(n.getSnapshot().state).toBe('idle');
    expect(n.getSnapshot().currentSectionId).toBe('about');
  });

  it('plays, pauses, resumes and stops (captions-only path, no speechSynthesis in jsdom)', () => {
    const n = new NarrationService();
    n.play('hero');
    expect(n.getSnapshot().state).toBe('speaking');
    n.pause();
    expect(n.getSnapshot().state).toBe('paused');
    n.resume();
    expect(n.getSnapshot().state).toBe('speaking');
    n.stop();
    expect(n.getSnapshot().state).toBe('idle');
    n.dispose();
  });

  it('queues a scrolled-to section instead of interrupting a playing clip', () => {
    const n = new NarrationService();
    n.toggleAutoNarrate(); // opt-in; starts hero
    expect(n.getSnapshot().state).toBe('speaking');
    n.setSection('about');
    vi.advanceTimersByTime(800);
    expect(n.getSnapshot().currentSectionId).toBe('about');
    expect(n.getSnapshot().state).toBe('speaking'); // hero clip continues
    vi.advanceTimersByTime(20000); // hero finishes, queued about plays
    expect(n.getSnapshot().currentSectionId).toBe('about');
    n.dispose();
  });

  it('does not auto-replay a section that already auto-narrated', () => {
    const n = new NarrationService();
    n.toggleAutoNarrate();
    vi.advanceTimersByTime(20000);
    expect(n.getSnapshot().state).toBe('idle');
    n.setSection('about'); vi.advanceTimersByTime(20000);
    n.setSection('hero'); vi.advanceTimersByTime(1000);
    expect(n.getSnapshot().state).toBe('idle');
    n.dispose();
  });

  it('toggles mute and captions', () => {
    const n = new NarrationService();
    n.toggleMute(); n.toggleCaptions();
    expect(n.getSnapshot().isMuted).toBe(true);
    expect(n.getSnapshot().showCaptions).toBe(false);
  });
});
