import type { ContactItem } from '../../types';
import { PortfolioIconSvg } from '../../utils/icons';

interface ContactProps {
  contact: ContactItem[];
}

export default function Contact({ contact }: ContactProps) {
  return (
    <section id="contact" className="section px-6 py-24 max-[480px]:px-4 max-[480px]:py-16">
      <div className="mx-auto w-full max-w-5xl">

        <h2 className="reveal font-display text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Get in Touch
          <div className="mt-2 h-0.5 w-12" style={{ background: 'var(--sky)' }} />
        </h2>
        <p className="reveal mb-12 text-sm" style={{ color: 'var(--text-muted)' }}>
          Have a question or want to collaborate? Email is the fastest way to reach me.
        </p>

        <div className="reveal grid gap-4 sm:grid-cols-3">
          {contact.map((item) => (
            <a
              key={item.label}
              href={item.url}
              target={item.url.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 group"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-glow)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
              }}
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0" style={{ background: 'var(--sky-dim)' }}>
                <PortfolioIconSvg name={item.icon} className="w-4 h-4" style={{ color: 'var(--sky)' } as React.CSSProperties} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-mono uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
                <p className="text-sm font-medium break-all group-hover:text-[var(--sky)] transition-colors" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
