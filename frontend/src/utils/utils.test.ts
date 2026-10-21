import { describe, expect, it, beforeEach } from 'vitest';
import { validateContact } from './validate';
import { applyTheme, getInitialTheme, THEME_KEY } from './theme';
import { parseHash } from '../hooks/useHashRoute';

describe('validateContact', () => {
  it('flags empty and invalid fields', () => {
    const e = validateContact({ name: '', email: 'nope', message: 'short', honeypot: '' });
    expect(Object.keys(e).sort()).toEqual(['email', 'message', 'name']);
  });
  it('accepts a valid submission', () => {
    expect(validateContact({ name: 'Ada', email: 'ada@x.io', message: 'Hello there, nice work!', honeypot: '' })).toEqual({});
  });
});

describe('theme persistence', () => {
  beforeEach(() => { localStorage.clear(); document.documentElement.className = ''; });
  it('persists an explicit choice and applies the class', () => {
    applyTheme('dark');
    expect(localStorage.getItem(THEME_KEY)).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(getInitialTheme()).toBe('dark');
  });
});

describe('hash routing', () => {
  it('parses project routes', () => {
    expect(parseHash('#/projects/resumeiq')).toEqual({ page: 'project', slug: 'resumeiq' });
    expect(parseHash('')).toEqual({ page: 'home' });
  });
});
