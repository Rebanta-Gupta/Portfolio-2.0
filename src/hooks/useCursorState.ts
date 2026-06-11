import { useEffect, useRef, useState } from 'react';

export type CursorVariant = 'default' | 'hover' | 'text' | 'drag' | 'hidden';

export function useCursorState() {
  const [pos, setPos]         = useState({ x: -100, y: -100 });
  const [variant, setVariant] = useState<CursorVariant>('default');
  const rafRef                = useRef<number>(0);
  const pendingPos            = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pendingPos.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPos({ ...pendingPos.current });
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { pos, variant, setVariant };
}