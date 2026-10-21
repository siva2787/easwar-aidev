import { lazy, Suspense } from 'react';

const HeroScene = lazy(() => import('./HeroScene'));

export const SceneLoader: React.FC<React.ComponentProps<typeof HeroScene>> = (props) => (
  <Suspense fallback={<div className="absolute inset-0 grid place-items-center" aria-hidden="true"><div className="h-[60%] aspect-square rounded-full border-[12px] border-[var(--line)]" /></div>}>
    <HeroScene {...props} />
  </Suspense>
);
