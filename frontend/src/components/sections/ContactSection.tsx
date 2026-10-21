import { useState } from 'react';
import { ArrowUpRight, Check, Loader2, Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons';
import { PERSONAL_IDENTITY as P } from '../../data/portfolioData';
import { Reveal } from '../ui/Reveal';
import { validateContact } from '../../utils/validate';
import type { ContactErrors, ContactForm } from '../../utils/validate';

const API = (import.meta.env.VITE_API_URL as string | undefined) ?? (import.meta.env.DEV ? 'http://localhost:4000' : '');
const INSTAGRAM = 'https://www.instagram.com/stormforge_tech';
const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const Err: React.FC<{ id: string; msg?: string }> = ({ id, msg }) => (msg ? <p id={id} className="mt-1.5 text-xs text-rose-500" role="alert">{msg}</p> : null);
const empty: ContactForm = { name: '', email: '', message: '', honeypot: '' };
const iconBtn = 'grid h-12 w-12 place-items-center rounded-full border border-[var(--line)] bg-[var(--card,var(--bg-2))] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--line-2)] hover:shadow-md';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState<ContactForm>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [note, setNote] = useState('');

  const set = (k: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validateContact(form);
    setErrors(v);
    if (Object.keys(v).length) return;
    setStatus('loading');
    setNote('');
    if (!API) {
      setStatus('error');
      setNote('The Contact Service Is Not Configured On This Deployment Yet. Please Email Me Directly.');
      return;
    }
    try {
      const res = await fetch(`${API}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, subject: 'Portfolio inquiry' }) });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (res.ok && data.success) { setStatus('success'); setNote(data.message ?? 'Message Sent.'); setForm(empty); }
      else { setStatus('error'); setNote(data.message ?? 'Could Not Send Your Message. Please Email Me Directly.'); }
    } catch {
      setStatus('error');
      setNote('Could Not Reach The Server. Please Email Me Directly.');
    }
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow mb-4">05 — Contact</p>
              <h2 id="contact-title" className="h2 text-balance">Let’s Build <b>Something Together.</b></h2>
              <p className="lede mt-6 max-w-sm text-pretty">Have A Role To Fill, An AI Problem Or A Product Idea? Send A Note — I’d Love To Hear What You’re Working On.</p>
              <ul className="mt-8 flex flex-wrap items-center gap-3">
                <li><a href={`mailto:${P.email}`} className={iconBtn} aria-label="Email" title={P.email}><Mail className="h-5 w-5" /></a></li>
                <li><a href={P.linkedin} target="_blank" rel="noopener noreferrer" className={iconBtn} aria-label="LinkedIn (opens in new tab)" title="LinkedIn"><LinkedinIcon className="h-5 w-5" /></a></li>
                <li><a href={P.github} target="_blank" rel="noopener noreferrer" className={iconBtn} aria-label="GitHub (opens in new tab)" title="GitHub"><GithubIcon className="h-5 w-5" /></a></li>
                <li><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className={iconBtn} aria-label="Instagram (opens in new tab)" title="Instagram"><InstagramIcon className="h-5 w-5" /></a></li>
                <li><span className={iconBtn} role="img" aria-label={P.location} title={P.location}><MapPin className="h-5 w-5" /></span></li>
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="lg:col-span-8">
          <form onSubmit={submit} noValidate className="space-y-5 rounded-[28px] border border-[var(--line)] bg-[var(--card,var(--bg-2))] p-6 shadow-[0_1px_2px_rgba(0,0,0,.04),0_20px_40px_-28px_rgba(0,0,0,.18)] sm:p-8" aria-label="Contact form">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium">Name</label>
                <input id="c-name" className="field" autoComplete="name" value={form.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} />
                <Err id="e-name" msg={errors.name} />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium">Email</label>
                <input id="c-email" type="email" className="field" autoComplete="email" value={form.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'e-email' : undefined} />
                <Err id="e-email" msg={errors.email} />
              </div>
            </div>
            <div>
              <label htmlFor="c-msg" className="mb-1.5 block text-sm font-medium">Message</label>
              <textarea id="c-msg" rows={7} className="field resize-y" value={form.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'e-msg' : undefined} />
              <Err id="e-msg" msg={errors.message} />
            </div>
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label>Leave empty<input tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={set('honeypot')} /></label>
            </div>
            <button type="submit" disabled={status === 'loading'} className="btn btn-dark w-full disabled:opacity-60">
              {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" />Sending…</> : <>Send Message <ArrowUpRight className="h-4 w-4" /></>}
            </button>
            <div role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
              {status === 'success' && <p className="flex items-center gap-2 text-[var(--ink)]"><Check className="h-4 w-4" />{note}</p>}
              {status === 'error' && <p className="text-rose-500">{note} <a className="underline" href={`mailto:${P.email}`}>{P.email}</a></p>}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};