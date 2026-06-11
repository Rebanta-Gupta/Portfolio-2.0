import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export function usePageTransition() {
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create overlay once
    if (!overlayRef.current) {
      const el = document.createElement('div');
      el.className = 'page-transition';
      el.style.transform = 'translateY(100%)';
      document.body.appendChild(el);
      overlayRef.current = el;
    }
  }, []);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    // Slide in from bottom, then out to top
    const tl = gsap.timeline();
    tl.to(el, { y: '0%', duration: 0.32, ease: 'power3.inOut' })
      .to(el, { y: '-100%', duration: 0.32, ease: 'power3.inOut', delay: 0.05 })
      .set(el, { y: '100%' });

    return () => { tl.kill(); };
  }, [location.pathname]);
}