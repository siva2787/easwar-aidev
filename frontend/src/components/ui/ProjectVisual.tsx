import { useRef } from 'react';
import { useReducedMotion } from '../../hooks/useMedia';

/** Screenshot with subtle pointer-driven 3D perspective (fine pointers only). */
export const ProjectVisual: React.FC<{ src: string; alt: string; eager?: boolean }> = ({ src, alt, eager }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const move = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(1100px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale3d(1.015,1.015,1.015)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ''; };
  return (
    <div onPointerMove={move} onPointerLeave={leave} className="[perspective:1100px]">
      <div ref={ref} className="overflow-hidden rounded-2xl border border-[var(--line-2)] bg-[var(--bg-2)] shadow-[var(--shadow-2)] transition-transform duration-300 ease-out will-change-transform">
        <div className="flex items-center gap-1.5 border-b border-[var(--line)] px-3 py-2" aria-hidden="true">
          <i className="h-2 w-2 rounded-full bg-[var(--line-2)]" /><i className="h-2 w-2 rounded-full bg-[var(--line-2)]" /><i className="h-2 w-2 rounded-full bg-[var(--line-2)]" />
        </div>
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" width={1919} height={907} className="block aspect-[1919/907] w-full object-cover object-top" />
      </div>
    </div>
  );
};
