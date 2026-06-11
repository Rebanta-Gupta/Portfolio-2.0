import { useState } from 'react';
import type { SkillGroup } from '../../types';
import { PortfolioIconSvg } from '../../utils/icons';

interface SkillsProps {
  skills: SkillGroup[];
}

export default function Skills({ skills }: SkillsProps) {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  return (
    <section id="skills" className="section px-6 py-24 max-[480px]:px-4 max-[480px]:py-16">
      <div className="mx-auto w-full max-w-5xl">

        <h2 className="reveal font-display text-3xl font-bold mb-14" style={{ color: 'var(--text-primary)' }}>
          Skills
          <div className="mt-2 h-0.5 w-12" style={{ background: 'var(--sky)' }} />
        </h2>

        <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((group, gi) => (
            <div
              key={gi}
              className="rounded-2xl p-6 cursor-pointer transition-all duration-300"
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${activeGroup === gi ? 'var(--border-glow)' : 'var(--border)'}`,
                boxShadow: activeGroup === gi ? '0 8px 32px rgba(56,189,248,0.10)' : 'none',
              }}
              onMouseEnter={() => setActiveGroup(gi)}
              onMouseLeave={() => setActiveGroup(null)}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-lg"
                  style={{ background: 'var(--sky-dim)' }}
                >
                  <PortfolioIconSvg
                    name={group.icon}
                    className="w-4 h-4"
                    style={{ color: 'var(--sky)' } as React.CSSProperties}
                  />
                </div>
                <h3 className="font-display text-sm font-semibold tracking-wide uppercase"
                    style={{ color: 'var(--text-primary)', letterSpacing: '0.08em' }}>
                  {group.category}
                </h3>
              </div>

              {/* Floating skill tags */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, si) => (
                  <span
                    key={si}
                    className="tag skill-tag"
                    style={{
                      animationDelay: activeGroup === gi ? `${si * 35}ms` : '0ms',
                      animationPlayState: activeGroup === gi ? 'running' : 'paused',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}