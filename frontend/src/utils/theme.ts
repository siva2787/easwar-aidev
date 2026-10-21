export const THEME_KEY = 'easwar_portfolio_theme';
export type Theme = 'light' | 'dark';

export function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function applyTheme(t: Theme, persist = true): void {
  document.documentElement.classList.toggle('dark', t === 'dark');
  if (!persist) return;
  try { localStorage.setItem(THEME_KEY, t); } catch { /* storage unavailable */ }
}
