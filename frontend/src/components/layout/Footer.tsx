import { PERSONAL_IDENTITY as P } from '../../data/portfolioData';

const YEAR = new Date().getFullYear();

export const Footer: React.FC<{ onNavigate?: (id: string) => void }> = () => (
  <footer className="border-t border-[var(--line)] py-8">
    <div className="wrap grid gap-5 text-sm text-[var(--ink-3)] sm:grid-cols-3 sm:items-center">
      <div>
        <p className="text-lg font-semibold tracking-tight text-[var(--ink)]">Easwar S</p>
        <p className="mt-1">{P.shortTitle}</p>
      </div>
      <p className="sm:text-center">Built By StormForge Technologies - Easwar S</p>
      <p className="sm:text-right">© {YEAR} Easwar S. All Rights Reserved.</p>
    </div>
  </footer>
);