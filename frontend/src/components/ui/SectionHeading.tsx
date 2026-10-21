import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface Props { index: string; label: string; children: ReactNode; lede?: string }

export const SectionHeading: React.FC<Props> = ({ index, label, children, lede }) => (
  <Reveal className="mb-12 sm:mb-16 grid gap-6 lg:grid-cols-12 lg:items-end">
    <div className="lg:col-span-8">
      <p className="eyebrow mb-4">{index} — {label}</p>
      <h2 className="h2">{children}</h2>
    </div>
    {lede && <p className="lede lg:col-span-4 max-w-md">{lede}</p>}
  </Reveal>
);
