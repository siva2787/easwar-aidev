import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface Props {
  isDark: boolean;
  reduced: boolean;
  mobile: boolean;
  /** Live 0..1 narration level, written by the parent; read inside the render loop (no re-renders). */
  levelRef: React.MutableRefObject<number>;
}

const hasWebGL = (): boolean => {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch { return false; }
};

/** Faceted crystal orb with a glowing core, small orbiting beads and a light particle field. No rings. */
export default function HeroScene({ isDark, reduced, mobile, levelRef }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const crystalMat = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (!hasWebGL()) { setOk(false); return; }

    const w = () => el.clientWidth || 600;
    const h = () => el.clientHeight || 600;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, w() / h(), 0.1, 50);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
    renderer.setSize(w(), h());
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    el.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    const disposables: { dispose(): void }[] = [pmrem, envTex];

    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xdfe5ff, metalness: 0.35, roughness: 0.08, clearcoat: 1, flatShading: true, envMapIntensity: 1.5,
    });
    crystalMat.current = mat;
    const geo = new THREE.IcosahedronGeometry(1.25, 1);
    const crystal = new THREE.Mesh(geo, mat);
    const coreGeo = new THREE.SphereGeometry(0.42, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x5560f0 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    const orb = new THREE.Group();
    orb.add(crystal, core);
    orb.position.set(0, 0, 0);
    orb.scale.setScalar(mobile ? 0.75 : 0.85);
    scene.add(orb);
    disposables.push(geo, mat, coreGeo, coreMat);

    // small orbiting beads
    const beadGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const beadMat = new THREE.MeshPhysicalMaterial({ color: 0xb9c2ff, metalness: 0.6, roughness: 0.15 });
    disposables.push(beadGeo, beadMat);
    const beads = [0, 1, 2].map((i) => {
      const pivot = new THREE.Group();
      const b = new THREE.Mesh(beadGeo, beadMat);
      b.position.set(2.2 + i * 0.35, 0, 0);
      pivot.add(b);
      pivot.rotation.set(0.6 * i, 0, 0.9 * i);
      orb.add(pivot);
      return pivot;
    });

    let pts: THREE.Points | null = null;
    if (!mobile) {
      const n = 160;
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) pos.set([(Math.random() - 0.5) * 14, (Math.random() - 0.5) * 9, -2 - Math.random() * 3], i * 3);
      const pg = new THREE.BufferGeometry();
      pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const pm = new THREE.PointsMaterial({ size: 0.035, color: 0x5560f0, transparent: true, opacity: 0.5, depthWrite: false });
      pts = new THREE.Points(pg, pm);
      scene.add(pts);
      disposables.push(pg, pm);
    }
    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(4, 5, 6);
    scene.add(key);

    let mx = 0, my = 0, tx = 0, ty = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      mx = (e.clientX / innerWidth - 0.5) * 2;
      my = (e.clientY / innerHeight - 0.5) * 2;
    };
    if (!reduced && !mobile) addEventListener('pointermove', onMove, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0, visible = true, lost = false;
    const frame = () => {
      raf = 0;
      if (!visible || lost) return;
      const t = clock.getElapsedTime();
      const sy = Math.min(scrollY, 1200);
      tx += (mx * 0.5 - tx) * 0.05;
      ty += (my * 0.35 - ty) * 0.05;
      crystal.rotation.set(t * 0.15 + ty, t * 0.22 + tx + sy * 0.001, 0);
      orb.position.y = Math.sin(t * 0.8) * 0.15 + sy * 0.0015;
      beads.forEach((b, i) => { b.rotation.y = t * (0.35 + i * 0.12); });
      if (pts) pts.rotation.z = t * 0.01;
      const s = 1 + levelRef.current * 0.06;
      core.scale.setScalar(s);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (!raf && !reduced) raf = requestAnimationFrame(frame); };
    if (reduced) renderer.render(scene, camera); else start();

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }, { threshold: 0 });
    io.observe(el);
    const ro = new ResizeObserver(() => {
      camera.aspect = w() / h();
      camera.updateProjectionMatrix();
      renderer.setSize(w(), h());
      if (reduced) renderer.render(scene, camera);
    });
    ro.observe(el);
    const onLost = (e: Event) => { e.preventDefault(); lost = true; setOk(false); };
    renderer.domElement.addEventListener('webglcontextlost', onLost);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      removeEventListener('pointermove', onMove);
      renderer.domElement.removeEventListener('webglcontextlost', onLost);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [mobile, reduced, levelRef]);

  useEffect(() => {
    const m = crystalMat.current;
    if (!m) return;
    m.color.setHex(isDark ? 0x8f9aff : 0xdfe5ff);
    m.envMapIntensity = isDark ? 0.9 : 1.5;
  }, [isDark]);

  if (!ok) return <div className="absolute inset-0" aria-hidden="true" />;
  return <div ref={host} className="pointer-events-none absolute inset-0" />;
}