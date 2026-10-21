import { useEffect, useState } from 'react';

export type Route = { page: 'home' } | { page: 'project'; slug: string };

export function parseHash(hash: string): Route {
  const m = hash.match(/^#\/projects\/([\w-]+)/);
  return m ? { page: 'project', slug: m[1] } : { page: 'home' };
}

export function useHashRoute(): Route {
  const [r, setR] = useState<Route>(() => parseHash(window.location.hash));
  useEffect(() => {
    const on = () => setR(parseHash(window.location.hash));
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return r;
}
