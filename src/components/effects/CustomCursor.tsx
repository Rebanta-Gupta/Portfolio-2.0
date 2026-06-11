import { useEffect, useRef } from 'react';
import type { CursorVariant } from '../../hooks/useCursorState';

interface CustomCursorProps {
  pos: { x: number; y: number };
  variant: CursorVariant;
}

export default function CustomCursor({ pos, variant }: CustomCursorProps) {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  // Ring follows with extra lag applied via CSS transition
  useEffect(() => {
    const ring = ringRef.current;
    const dot  = dotRef.current;
    if (!ring || !dot) return;

    dot.style.transform  = `translate(${pos.x - 5}px, ${pos.y - 5}px)`;
    ring.style.transform = `translate(${pos.x - 18}px, ${pos.y - 18}px)`;
  }, [pos]);

  const ringStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0,
    width: 36, height: 36,
    borderRadius: '50%',
    border: `1.5px solid ${variant === 'hover' ? 'var(--amber)' : variant === 'text' ? 'var(--sky)' : 'var(--sky)'}`,
    pointerEvents: 'none',
    zIndex: 99999,
    mixBlendMode: 'normal',
    transition: 'width 0.2s, height 0.2s, border-color 0.25s, opacity 0.2s, transform 0.08s linear',
    opacity: variant === 'hidden' ? 0 : 1,
    transform: 'translate(-100px,-100px)',
    ...(variant === 'hover' ? { width: 48, height: 48, borderColor: 'var(--amber)' } : {}),
    ...(variant === 'drag'  ? { width: 44, height: 44, borderStyle: 'dashed' } : {}),
  };

  const dotStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0,
    width: 10, height: 10,
    borderRadius: '50%',
    background: variant === 'hover' ? 'var(--amber)' : 'var(--sky)',
    pointerEvents: 'none',
    zIndex: 100000,
    transition: 'background 0.25s, width 0.2s, height 0.2s, opacity 0.2s',
    opacity: variant === 'hidden' ? 0 : 1,
    transform: 'translate(-100px,-100px)',
    ...(variant === 'text' ? { width: 2, height: 20, borderRadius: 1 } : {}),
  };

  return (
    <>
      <div ref={ringRef} style={ringStyle} aria-hidden="true" />
      <div ref={dotRef}  style={dotStyle}  aria-hidden="true" />
    </>
  );
}