import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const barRef  = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    const root  = rootRef.current;
    const letters = nameRef.current?.querySelectorAll('span');

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.set(root, { opacity: 1 })
      .from(letters ?? [], {
        y: 40,
        opacity: 0,
        stagger: 0.055,
        ease: 'power3.out',
        duration: 0.5,
      })
      .from(barRef.current, {
        scaleX: 0,
        duration: 1.1,
        ease: 'power2.inOut',
        transformOrigin: 'left',
      }, '-=0.3')
      .from(dotsRef.current, { opacity: 0, duration: 0.3 }, '-=0.6')
      .to(root, {
        yPercent: -100,
        duration: 0.55,
        ease: 'power3.inOut',
        delay: 0.15,
      });

    return () => {
      tl.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const name = 'Rebanta Gupta';

  return (
    <div
      ref={rootRef}
      className="loading-screen"
      style={{ opacity: 0 }}
      aria-label="Loading"
      role="status"
    >
      <div className="dot-grid absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 select-none">
        <div
          ref={nameRef}
          className="font-display text-4xl sm:text-5xl font-bold tracking-tight overflow-hidden"
        >
          {name.split('').map((ch, i) =>
            ch === ' '
              ? <span key={i} className="inline-block w-4" />
              : (
                <span
                  key={i}
                  className="inline-block"
                  style={{ color: i < 7 ? 'var(--text-primary)' : 'var(--sky)' }}
                >
                  {ch}
                </span>
              )
          )}
        </div>

        <div className="w-48 h-px bg-[var(--border)] relative overflow-hidden rounded-full">
          <div
            ref={barRef}
            className="absolute inset-0 rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--sky), var(--amber))' }}
          />
        </div>

        <div ref={dotsRef} className="font-mono text-xs text-[var(--text-muted)] tracking-widest">
          initializing
          <span className="inline-flex gap-0.5 ml-1">
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="inline-block w-1 h-1 rounded-full bg-[var(--sky)]"
                style={{ animation: `blink 1.2s ${i * 0.2}s step-end infinite` }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}