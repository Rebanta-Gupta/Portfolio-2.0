import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import type { HeroData } from '../../types';
import { ParticleField } from '../effects';

interface HeroProps {
  hero: HeroData;
  resumeEnabled: boolean;
  resumePath: string;
}

function useTypewriter(strings: string[], speed = 42, pause = 2200, erase = 28) {
  const [display, setDisplay] = useState('');
  const [idx,     setIdx]     = useState(0);
  const [phase,   setPhase]   = useState<'typing' | 'pausing' | 'erasing'>('typing');

  useEffect(() => {
    const current = strings[idx];
    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (display.length < current.length) {
        timer = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), speed);
      } else {
        timer = setTimeout(() => setPhase('pausing'), pause);
      }
    } else if (phase === 'pausing') {
      timer = setTimeout(() => setPhase('erasing'), 200);
    } else {
      if (display.length > 0) {
        timer = setTimeout(() => setDisplay(d => d.slice(0, -1)), erase);
      } else {
        setIdx(i => (i + 1) % strings.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timer);
  }, [display, phase, idx, strings, speed, pause, erase]);

  return display;
}

export default function Hero({ hero, resumeEnabled, resumePath }: HeroProps) {
  const text = useTypewriter(hero.taglines);
  const scrollRef = useRef<HTMLAnchorElement>(null);

  const scrollDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="section relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6 pt-20"
    >
      {/* Particle field bg */}
      <div className="absolute inset-0 z-0">
        <ParticleField count={1600} />
      </div>

      {/* Dot-grid overlay */}
      <div className="dot-grid absolute inset-0 z-0 opacity-25 pointer-events-none" />

      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, var(--bg) 100%)',
        }}
      />

      {/* Content */}
      <div className="reveal relative z-10 max-w-3xl">
        <p
          className="font-mono text-xs tracking-[0.22em] uppercase mb-5"
          style={{ color: 'var(--sky)' }}
        >
          {hero.greeting}
        </p>

        <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.05] tracking-tight mb-6">
          <span style={{ color: 'var(--text-primary)' }}>{hero.name} </span>
          <span
            style={{
              background: 'linear-gradient(135deg, var(--sky) 0%, var(--amber) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {hero.highlight}
          </span>
        </h1>

        {/* Typewriter line */}
        <div
          className="font-mono text-base sm:text-lg min-h-[2rem] mb-10 flex items-center justify-center gap-0"
          style={{ color: 'var(--text-muted)' }}
        >
          <span>{text}</span>
          <span className="typewriter-cursor" />
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, var(--sky) 0%, #0ea5e9 100%)',
              color: '#07090f',
              boxShadow: '0 6px 24px rgba(56,189,248,0.28)',
            }}
          >
            View Projects
          </a>

          {resumeEnabled && (
            <a
              href={`/${resumePath}`}
              download
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                border: '1px solid var(--border-amber)',
                background: 'var(--amber-dim)',
                color: 'var(--amber)',
              }}
            >
              Download CV
            </a>
          )}

          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }}
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        ref={scrollRef}
        href="#about"
        onClick={scrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
        style={{ color: 'var(--text-muted)' }}
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} style={{ animation: 'float-up 1.8s ease-in-out infinite alternate' }} />
      </a>
    </section>
  );
}