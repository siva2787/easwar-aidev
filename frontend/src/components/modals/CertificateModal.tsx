import { useEffect, useRef } from 'react';
import { X, Calendar, ShieldCheck } from 'lucide-react';
import type { CertificateItem } from '../../types/portfolio';

interface Props { cert: CertificateItem | null; onClose: () => void }

export const CertificateModal: React.FC<Props> = ({ cert, onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!cert) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const key = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', key);
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = ''; prev?.focus(); };
  }, [cert, onClose]);

  if (!cert) return null;
  return (
    <div className="animate-fadeIn fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="cert-title">
      <div className="panel relative my-8 w-full max-w-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[var(--line)] p-5">
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--ink-3)]"><ShieldCheck className="h-4 w-4 text-emerald-500" />Credential</span>
          <button ref={closeRef} onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full hover:bg-[var(--accent-soft)]" aria-label="Close credential details"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-5 p-6 sm:p-8">
          <div>
            <h3 id="cert-title" className="text-2xl font-semibold tracking-tight">{cert.name}</h3>
            <p className="mt-1 font-medium" style={{ color: cert.color }}>{cert.issuer}</p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--ink-3)]"><Calendar className="h-4 w-4" />{cert.date} · {cert.type}</p>
          </div>
          {cert.image && <img src={cert.image} alt={`${cert.name} certificate`} loading="lazy" className="w-full rounded-xl border border-[var(--line)]" />}
          <p className="leading-relaxed text-[var(--ink-2)]">{cert.description}</p>
          <ul className="flex flex-wrap gap-2">{cert.skills.map((s) => <li key={s} className="chip">{s}</li>)}</ul>
          {cert.verifiedBy && <p className="border-t border-[var(--line)] pt-4 text-xs text-[var(--ink-3)]">{cert.verifiedBy}</p>}
          {cert.credentialUrl && <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Verify credential<span className="sr-only"> (opens in new tab)</span></a>}
        </div>
      </div>
    </div>
  );
};
