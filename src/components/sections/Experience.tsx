import type { ExperienceItem } from '../../types';

interface ExperienceProps {
  experience: ExperienceItem[];
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" className="section px-6 py-24 max-[480px]:px-4 max-[480px]:py-16">
      <div className="mx-auto w-full max-w-5xl">

        <h2 className="reveal font-display text-3xl font-bold mb-14" style={{ color: 'var(--text-primary)' }}>
          Experience
          <div className="mt-2 h-0.5 w-12" style={{ background: 'var(--sky)' }} />
        </h2>

        <div className="relative pl-8 md:pl-12">
          {/* Timeline rail */}
          <div
            className="absolute left-0 top-2 bottom-2 w-px"
            style={{ background: 'linear-gradient(to bottom, var(--sky), var(--amber), transparent)' }}
          />

          {experience.map((exp, i) => (
            <div key={i} className="reveal relative mb-8" style={{ transitionDelay: `${i * 80}ms` }}>
              {/* Dot */}
              <div
                className="absolute -left-[21px] md:-left-[25px] top-6 w-3 h-3 rounded-full"
                style={{
                  background: 'var(--sky)',
                  boxShadow: '0 0 12px rgba(56,189,248,0.5)',
                  border: '2px solid var(--bg)',
                }}
              />

              <div
                className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-glow)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(56,189,248,0.08)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                  <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {exp.title}
                  </h3>
                  <span className="font-mono text-xs shrink-0" style={{ color: 'var(--sky)' }}>
                    {exp.date}
                  </span>
                </div>

                <p className="text-sm mb-3" style={{ color: 'var(--amber)' }}>
                  {exp.org} &middot; <span style={{ color: 'var(--text-muted)' }}>{exp.location}</span>
                </p>

                <p className="text-sm leading-7 mb-4" style={{ color: 'var(--text-muted)' }}>
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((s, j) => (
                    <span key={j} className="tag">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}