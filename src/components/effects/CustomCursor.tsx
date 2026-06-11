import { useEffect, useRef } from 'react';
import type { CursorVariant } from '../../hooks/useCursorState';

interface CustomCursorProps {
  pos: { x: number; y: number };
  variant: CursorVariant;
}

export default function CustomCursor({ pos, variant }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    el.style.transform = `translate(${pos.x - 16}px, ${pos.y - 16}px)`;
  }, [pos]);

  const isHover  = variant === 'hover';
  const isHidden = variant === 'hidden';
  const isText   = variant === 'text';

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         isHover ? 44 : 32,
        height:        isHover ? 44 : isText ? 24 : 32,
        borderRadius:  isText ? 2 : '50%',
        border:        `1.5px solid ${isHover ? 'var(--amber)' : 'var(--sky)'}`,
        pointerEvents: 'none',
        zIndex:        99999,
        opacity:       isHidden ? 0 : 0.85,
        transition:    'width 0.15s, height 0.15s, border-color 0.15s, opacity 0.15s, border-radius 0.15s',
        willChange:    'transform',
      }}
    />
  );
}