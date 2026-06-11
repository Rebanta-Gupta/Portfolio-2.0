import { useEffect, useRef, useState } from 'react';

export type CursorVariant = 'default' | 'hover' | 'text' | 'drag' | 'hidden';

export function useCursorState() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [variant, setVariant] = useState<CursorVariant>('default');
  const raf = useRef<number>(0);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    const loop = () => {
      // Smooth lerp
      current.current.x += (target.current.x - current.current.x) * 0.14;
      current.current.y += (target.current.y - current.current.y) * 0.14;
      setPos({ x: current.current.x, y: current.current.y });
      raf.current = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return { pos, variant, setVariant };
}