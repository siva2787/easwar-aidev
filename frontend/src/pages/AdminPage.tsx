import { useEffect, useState } from 'react';
import { Loader2, LogOut, Plus, Trash2 } from 'lucide-react';
import { FEATURED_PROJECTS, JOURNEY_MILESTONES } from '../data/portfolioData';
import { buildProject, journeyKey, readRemote, writeRemote } from '../services/contentService';
import type { DynamicContent, Milestone } from '../services/contentService';

const KEY = 'portal_gh_token';
const card = 'rounded-[28px] border border-[var(--line)] bg-[var(--card,var(--bg-2))] p-6 shadow-[0_1px_2px_rgba(0,0,0,.04),0_20px_40px_-28px_rgba(0,0,0,.18)] sm:p-8';
const noProj = { github: '', live: '', title: '', tagline: '', summary: '', category: '' };
const noJour = { period: '', role: '', organization: '', location: '', description: '' };

const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void; area?: boolean; type?: string; placeholder?: string }> = ({ label, value, onChange, area, type, placeholder }) => (
    <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{label}</span>
        {area
            ? <textarea rows={4} className="field resize-y" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
            : <input type={type ?? 'text'} className="field" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />}
    </label>
);

export const AdminPage: React.FC = () => {
    const [token, setToken] = useState(() => { try { return localStorage.getItem(KEY) ?? ''; } catch { return ''; } });
    const [authed, setAuthed] = useState(false);
    const [data, setData] = useState<DynamicContent>({ projects: [], journey: [] });
    const [sha, setSha] = useState<string>();
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState('');
    const [tab, setTab] = useState<'projects' | 'journey'>('projects');
    const [pf, setPf] = useState(noProj);
    const [jf, setJf] = useState(noJour);

    const run = async (fn: () => Promise<void>) => {
        setBusy(true);
        setMsg('');
        try { await fn(); } catch (e) { setMsg((e as Error).message); } finally { setBusy(false); }
    };

    const publish = async (next: DynamicContent, message: string) => {
        setSha(await writeRemote(token, next, sha, message));
        setData(next);
    };

    const connect = (t: string) => run(async () => {
        const r = await readRemote(t.trim());
        setData(r.content);
        setSha(r.sha);
        setToken(t.trim());
        setAuthed(true);
        try { localStorage.setItem(KEY, t.trim()); } catch { /* ignore */ }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if (token) void connect(token); }, []);

    const disconnect = () => {
        try { localStorage.removeItem(KEY); } catch { /* ignore */ }
        setToken('');
        setAuthed(false);
        setData({ projects: [], journey: [], hidden: [] });
    };

    const addProject = (e: React.FormEvent) => {
        e.preventDefault();
        if (!pf.github.trim() || !pf.live.trim()) { setMsg('GitHub Link And Live Link Are Required'); return; }
        void run(async () => {
            const p = await buildProject(pf.github, pf.live, token, pf);
            await publish({ ...data, projects: [...data.projects, p] }, `Add project: ${p.title}`);
            setPf(noProj);
            setMsg('Project Added Successfully');
        });
    };

    const hidden = data.hidden ?? [];
    const projList = [...FEATURED_PROJECTS, ...data.projects].filter((p) => !hidden.includes(p.id));
    const jourList = [...JOURNEY_MILESTONES, ...data.journey].filter((m) => !hidden.includes(journeyKey(m)));

    const removeProject = (id: string, title: string) => {
        if (!window.confirm(`Delete "${title}" From Portfolio?`)) return;
        void run(async () => {
            const dyn = data.projects.some((p) => p.id === id);
            await publish(dyn ? { ...data, projects: data.projects.filter((p) => p.id !== id) } : { ...data, hidden: [...hidden, id] }, 'Remove project');
            setMsg('Project Deleted');
        });
    };

    const addJourney = (e: React.FormEvent) => {
        e.preventDefault();
        if (!jf.period.trim() || !jf.role.trim() || !jf.organization.trim() || !jf.description.trim()) { setMsg('Period, Role, Organization And Description Are Required'); return; }
        void run(async () => {
            const m = { period: jf.period.trim(), role: jf.role.trim(), organization: jf.organization.trim(), location: jf.location.trim() || undefined, description: jf.description.trim() } as unknown as Milestone;
            await publish({ ...data, journey: [...data.journey, m] }, `Add journey: ${jf.role.trim()}`);
            setJf(noJour);
            setMsg('Journey Entry Added Successfully');
        });
    };

    const removeJourney = (m: Milestone) => {
        if (!window.confirm(`Delete "${m.role}" From Journey?`)) return;
        void run(async () => {
            const key = journeyKey(m);
            const dyn = data.journey.some((x) => journeyKey(x) === key);
            await publish(dyn ? { ...data, journey: data.journey.filter((x) => journeyKey(x) !== key) } : { ...data, hidden: [...hidden, key] }, 'Remove journey entry');
            setMsg('Journey Entry Deleted');
        });
    };

    const Status = () => (msg ? <p role="status" className="text-sm text-[var(--ink-2)]">{msg}</p> : null);
    const Submit: React.FC<{ label: string }> = ({ label }) => (
        <button type="submit" disabled={busy} className="btn btn-dark w-full disabled:opacity-60">
            {busy ? <><Loader2 className="h-4 w-4 animate-spin" />Working…</> : <><Plus className="h-4 w-4" />{label}</>}
        </button>
    );

    return (
        <section className="section" aria-labelledby="portal-title">
            <div className="wrap max-w-3xl">
                <p className="eyebrow mb-4">Portal</p>
                <h1 id="portal-title" className="h2">Content <b>Portal.</b></h1>

                {!authed ? (
                    <form onSubmit={(e) => { e.preventDefault(); void connect(token); }} className={`${card} mt-10 space-y-5`}>
                        <Field label="GitHub Access Token" type="password" value={token} onChange={setToken} placeholder="github_pat_…" />
                        <button type="submit" disabled={busy || !token.trim()} className="btn btn-dark w-full disabled:opacity-60">
                            {busy ? <><Loader2 className="h-4 w-4 animate-spin" />Connecting…</> : 'Connect'}
                        </button>
                        <Status />
                    </form>
                ) : (
                    <div className="mt-10 space-y-8">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex gap-2">
                                {(['projects', 'journey'] as const).map((t) => (
                                    <button key={t} onClick={() => { setTab(t); setMsg(''); }} aria-pressed={tab === t} className={`rounded-full border px-5 py-2 text-sm font-medium capitalize ${tab === t ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]' : 'border-[var(--line-2)]'}`}>{t}</button>
                                ))}
                            </div>
                            <button onClick={disconnect} className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-2)]" aria-label="Disconnect" title="Disconnect"><LogOut className="h-4 w-4" /></button>
                        </div>

                        {tab === 'projects' ? (
                            <>
                                <form onSubmit={addProject} className={`${card} space-y-5`}>
                                    <Field label="GitHub Repository Link" value={pf.github} onChange={(v) => setPf({ ...pf, github: v })} placeholder="https://github.com/user/repo" />
                                    <Field label="Live Website Link" value={pf.live} onChange={(v) => setPf({ ...pf, live: v })} placeholder="https://my-project.vercel.app" />
                                    <details>
                                        <summary className="cursor-pointer text-sm font-medium text-[var(--ink-2)]">Optional Details</summary>
                                        <div className="mt-4 space-y-5">
                                            <Field label="Title" value={pf.title} onChange={(v) => setPf({ ...pf, title: v })} />
                                            <Field label="Category" value={pf.category} onChange={(v) => setPf({ ...pf, category: v })} />
                                            <Field label="Tagline" value={pf.tagline} onChange={(v) => setPf({ ...pf, tagline: v })} />
                                            <Field label="Summary" area value={pf.summary} onChange={(v) => setPf({ ...pf, summary: v })} />
                                        </div>
                                    </details>
                                    <Submit label="Add Project" />
                                    <Status />
                                </form>
                                <ul className="space-y-3">
                                    {projList.map((p) => (
                                        <li key={p.id} className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--line)] p-4">
                                            <span className="min-w-0"><span className="block truncate font-semibold">{p.title}</span><span className="block truncate text-sm text-[var(--ink-3)]">{p.githubUrl}</span></span>
                                            <button onClick={() => removeProject(p.id, p.title)} disabled={busy} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line-2)]" aria-label={`Remove ${p.title}`}><Trash2 className="h-4 w-4" /></button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <>
                                <form onSubmit={addJourney} className={`${card} space-y-5`}>
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <Field label="Period" value={jf.period} onChange={(v) => setJf({ ...jf, period: v })} placeholder="Jan 2026 — Present" />
                                        <Field label="Location (Optional)" value={jf.location} onChange={(v) => setJf({ ...jf, location: v })} />
                                        <Field label="Role" value={jf.role} onChange={(v) => setJf({ ...jf, role: v })} />
                                        <Field label="Organization" value={jf.organization} onChange={(v) => setJf({ ...jf, organization: v })} />
                                    </div>
                                    <Field label="Description" area value={jf.description} onChange={(v) => setJf({ ...jf, description: v })} />
                                    <Submit label="Add Journey Entry" />
                                    <Status />
                                </form>
                                <ul className="space-y-3">
                                    {jourList.map((m, i) => (
                                        <li key={`${m.role}${m.period}${i}`} className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--line)] p-4">
                                            <span className="min-w-0"><span className="block truncate font-semibold">{m.role}</span><span className="block truncate text-sm text-[var(--ink-3)]">{m.period}</span></span>
                                            <button onClick={() => removeJourney(m)} disabled={busy} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line-2)]" aria-label={`Remove ${m.role}`}><Trash2 className="h-4 w-4" /></button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};