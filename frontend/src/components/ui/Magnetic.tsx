import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useMedia';

/** Subtle magnetic pull for CTAs. Pointer-fine devices only; reduced-motion safe. */
export const Magnetic: React.FC<{ children: ReactNode; strength?: number }> = ({ children, strength = 0.25 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const move = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ''; };
  return (
    <span ref={ref} onPointerMove={move} onPointerLeave={leave} className="inline-block transition-transform duration-300 ease-out">
      {children}
    </span>
  );
};
