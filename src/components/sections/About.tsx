import { useRef } from 'react';

interface AboutProps {
  about: string[];
}

export default function About({ about }: AboutProps) {
  const portraitWrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = portraitWrapRef.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = ((e.clientX - left) / width  - 0.5) * 14;
      const y = ((e.clientY - top)  / height - 0.5) * 14;
      el.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.03,1.03,1.03)`;
    });
  };

  const onMouseLeave = () => {
    cancelAnimationFrame(rafRef.current);
    const el = portraitWrapRef.current;
    if (el) el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
  };

  return (
    <section id="about" className="section px-6 py-24 max-[480px]:px-4 max-[480px]:py-16">
      <div className="mx-auto w-full max-w-5xl">

        <h2 className="reveal font-display text-3xl font-bold mb-14" style={{ color: 'var(--text-primary)' }}>
          About <span style={{ color: 'var(--sky)' }}>Me</span>
          <div className="mt-2 h-0.5 w-12" style={{ background: 'var(--sky)' }} />
        </h2>

        <div className="grid items-start gap-12 md:grid-cols-[1fr_280px]">
          {/* Text */}
          <div className="reveal">
            {about.map((para, i) => (
              <p
                key={i}
                className="mb-5 text-base leading-8"
                style={{ color: 'var(--text-muted)' }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Portrait */}
          <div className="reveal flex justify-center md:justify-end">
            <div
              ref={portraitWrapRef}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              className="relative w-64 h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden select-none"
              style={{
                transition: 'transform 0.12s ease-out',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                border: '1px solid var(--border-glow)',
                boxShadow: '0 20px 60px rgba(56,189,248,0.12)',
              }}
            >
              <img
                src="/images/rebanta-portrait.jpeg"
                alt="Rebanta Gupta"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}