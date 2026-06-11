import { useEffect, useRef } from 'react';
import type { CursorVariant } from '../../hooks/useCursorState';

interface CustomCursorProps {
  variant: CursorVariant;
}

export default function CustomCursor({ variant }: CustomCursorProps) {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const rafRef  = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      // Dot: instant
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
      }
      // Ring: lerp for smooth trail
      ring.current.x += (mouse.current.x - ring.current.x) * 0.22;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.22;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isHover  = variant === 'hover';
  const isHidden = variant === 'hidden';

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         8,
          height:        8,
          borderRadius:  '50%',
          background:    isHover ? 'var(--amber)' : 'var(--sky)',
          pointerEvents: 'none',
          zIndex:        99999,
          opacity:       isHidden ? 0 : 1,
          transition:    'background 0.15s, opacity 0.15s',
          willChange:    'transform',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         36,
          height:        36,
          borderRadius:  '50%',
          border:        `1px solid ${isHover ? 'var(--amber)' : 'var(--sky)'}`,
          pointerEvents: 'none',
          zIndex:        99998,
          opacity:       isHidden ? 0 : 0.4,
          transition:    'border-color 0.15s, opacity 0.15s',
          willChange:    'transform',
        }}
      />
    </>
  );
}