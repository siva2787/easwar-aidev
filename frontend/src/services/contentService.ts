import { useEffect, useMemo, useState } from 'react';
import { FEATURED_PROJECTS, JOURNEY_MILESTONES } from '../data/portfolioData';
import type { ProjectItem } from '../types/portfolio';

export type Milestone = (typeof JOURNEY_MILESTONES)[number];
export interface DynamicContent { projects: ProjectItem[]; journey: Milestone[]; hidden?: string[] }
export const shot = (u: string) => `https://api.microlink.io/?url=${encodeURIComponent(u)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=685`;
export const journeyKey = (m: Milestone) => `${m.role}|${m.period}`;

export const REPO = 'siva2787/easwar-dev';
export const BRANCH = 'main';
export const FILE = 'frontend/public/content.json';

const empty: DynamicContent = { projects: [], journey: [] };
let cache: DynamicContent | null = null;
let pending: Promise<DynamicContent> | null = null;
const subs = new Set<(c: DynamicContent) => void>();

const normalize = (d: unknown): DynamicContent => {
    const o = (d ?? {}) as Partial<DynamicContent>;
    return { projects: Array.isArray(o.projects) ? o.projects : [], journey: Array.isArray(o.journey) ? o.journey : [], hidden: Array.isArray(o.hidden) ? o.hidden : [] };
};

const load = (): Promise<DynamicContent> => {
    if (!pending) {
        pending = (async () => {
            let t = '';
            try { t = localStorage.getItem('portal_gh_token') ?? ''; } catch { /* ignore */ }
            try {
                const r = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE}?ref=${BRANCH}`, {
                    cache: 'no-store',
                    headers: { Accept: 'application/vnd.github.raw+json', ...(t ? { Authorization: `Bearer ${t}` } : {}) },
                });
                if (r.ok) return normalize(await r.json());
                if (r.status === 404) return empty;
                const x = await fetch(`https://raw.githubusercontent.com/${REPO}/${BRANCH}/${FILE}?t=${Date.now()}`, { cache: 'no-store' });
                return x.ok ? normalize(await x.json()) : empty;
            } catch { return empty; }
        })().then((c) => (cache = c));
    }
    return pending;
};

export const useContent = () => {
    const [dyn, setDyn] = useState<DynamicContent>(cache ?? empty);
    useEffect(() => {
        subs.add(setDyn);
        void load().then(setDyn);
        return () => { subs.delete(setDyn); };
    }, []);
    return useMemo(() => ({
        projects: ([...FEATURED_PROJECTS, ...dyn.projects.map((p) => (p.liveUrl ? { ...p, image: shot(p.liveUrl) } : p))] as ProjectItem[]).filter((p) => !(dyn.hidden ?? []).includes(p.id)),
        journey: ([...JOURNEY_MILESTONES, ...dyn.journey] as Milestone[]).filter((m) => !(dyn.hidden ?? []).includes(journeyKey(m))),
    }), [dyn]);
};

const api = (path: string, token: string, init?: RequestInit) =>
    fetch(`https://api.github.com${path}`, {
        cache: 'no-store',
        ...init,
        headers: { Accept: 'application/vnd.github+json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });
const enc = (s: string) => btoa(unescape(encodeURIComponent(s)));
const dec = (s: string) => decodeURIComponent(escape(atob(s.replace(/\n/g, ''))));
const fail = (status: number) => new Error(status === 401 || status === 403 ? 'Invalid Token Or No Write Access' : `GitHub Error ${status}`);

export const readRemote = async (token: string) => {
    const r = await api(`/repos/${REPO}/contents/${FILE}?ref=${BRANCH}`, token);
    if (r.status === 404) {
        const u = await api('/user', token);
        if (!u.ok) throw fail(u.status);
        return { content: empty, sha: undefined as string | undefined };
    }
    if (!r.ok) throw fail(r.status);
    const j = (await r.json()) as { content: string; sha: string };
    return { content: normalize(JSON.parse(dec(j.content))), sha: j.sha as string | undefined };
};

export const writeRemote = async (token: string, content: DynamicContent, _sha: string | undefined, message: string) => {
    const cur = await api(`/repos/${REPO}/contents/${FILE}?ref=${BRANCH}`, token);
    const sha = cur.ok ? ((await cur.json()) as { sha: string }).sha : undefined;
    const r = await api(`/repos/${REPO}/contents/${FILE}`, token, {
        method: 'PUT',
        body: JSON.stringify({ message, content: enc(JSON.stringify(content, null, 2)), branch: BRANCH, ...(sha ? { sha } : {}) }),
    });
    if (!r.ok) throw fail(r.status);
    const j = (await r.json()) as { content: { sha: string } };
    cache = content;
    pending = Promise.resolve(content);
    subs.forEach((f) => f(content));
    return j.content.sha;
};

const titleCase = (s: string) => s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const url = (u: string) => { const t = u.trim(); return !t ? '' : /^https?:\/\//i.test(t) ? t : `https://${t}`; };

export const buildProject = async (
    githubUrl: string,
    liveUrl: string,
    token: string,
    o: { title?: string; tagline?: string; summary?: string; category?: string },
): Promise<ProjectItem> => {
    const m = githubUrl.trim().match(/github\.com\/([^/\s]+)\/([^/\s#?]+)/i);
    if (!m) throw new Error('Invalid GitHub Link');
    const owner = m[1];
    const repo = m[2].replace(/\.git$/, '');
    const [r, l] = await Promise.all([api(`/repos/${owner}/${repo}`, token), api(`/repos/${owner}/${repo}/languages`, token)]);
    if (!r.ok) throw new Error('Repository Not Found');
    const meta = (await r.json()) as { name: string; description: string | null; topics?: string[]; language: string | null };
    const langs = l.ok ? Object.keys((await l.json()) as Record<string, number>).slice(0, 5) : meta.language ? [meta.language] : [];
    const topics = (meta.topics ?? []).slice(0, 4).map(titleCase);
    const desc = meta.description?.trim() ?? '';
    const name = titleCase(meta.name);
    const live = url(liveUrl);
    return {
        id: `${meta.name.toLowerCase()}-${Date.now()}`,
        title: o.title?.trim() || name,
        category: o.category?.trim() || 'Web Application',
        tagline: o.tagline?.trim() || desc || `Built With ${langs.slice(0, 2).join(' & ') || 'Modern Technologies'}`,
        summary: o.summary?.trim() || desc || `${name} is a project built with ${langs.join(', ') || 'modern technologies'}, available live and open source.`,
        highlights: [
            langs.length ? `Built With ${langs.join(', ')}` : '',
            live ? 'Deployed Live And Publicly Accessible' : '',
            'Open-Source Code Available On GitHub',
        ].filter(Boolean),
        techStack: Array.from(new Set([...langs, ...topics])),
        image: live ? shot(live) : `https://opengraph.githubassets.com/1/${owner}/${repo}`,
        liveUrl: live || undefined,
        githubUrl: `https://github.com/${owner}/${repo}`,
    } as unknown as ProjectItem;
};