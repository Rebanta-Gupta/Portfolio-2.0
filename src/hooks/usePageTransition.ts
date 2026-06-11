import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export function usePageTransition() {
  const location  = useLocation();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const isFirst   = useRef(true);

  useEffect(() => {
    if (!overlayRef.current) {
      const el = document.createElement('div');
      el.className = 'page-transition';
      el.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 9999;
        pointer-events: none;
        background: var(--bg);
        transform: translateY(100%);
      `;
      document.body.appendChild(el);
      overlayRef.current = el;
    }
  }, []);

  useEffect(() => {
    // Skip the very first render — loading screen already handles that
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const el = overlayRef.current;
    if (!el) return;

    // Kill any running animation on this element
    gsap.killTweensOf(el);

    const tl = gsap.timeline();
    tl.set(el, { y: '100%', pointerEvents: 'all' })
      .to(el, { y: '0%',    duration: 0.28, ease: 'power3.inOut' })
      .to(el, { y: '-100%', duration: 0.28, ease: 'power3.inOut', delay: 0.05 })
      .set(el, { y: '100%', pointerEvents: 'none' });

    return () => { tl.kill(); };
  }, [location.pathname]);
}