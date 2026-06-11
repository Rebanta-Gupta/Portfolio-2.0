import { Download } from 'lucide-react';

interface ResumeButtonProps {
  enabled: boolean;       // set to false in portfolioData.ts to hide everywhere
  path: string;           // e.g. "resume.pdf" — file must exist in /public/
  className?: string;
  variant?: 'amber' | 'sky';
}

export default function ResumeButton({
  enabled,
  path,
  className = '',
  variant = 'amber',
}: ResumeButtonProps) {
  if (!enabled) return null;

  const isAmber = variant === 'amber';

  return (
    <a
      href={`/${path}`}
      download
      className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
                  transition-all duration-200 hover:-translate-y-0.5 ${className}`}
      style={{
        border:     `1px solid ${isAmber ? 'var(--border-amber)' : 'var(--border-glow)'}`,
        background: isAmber ? 'var(--amber-dim)' : 'var(--sky-dim)',
        color:      isAmber ? 'var(--amber)'     : 'var(--sky)',
        boxShadow:  isAmber
          ? '0 4px 16px rgba(245,158,11,0.12)'
          : '0 4px 16px rgba(56,189,248,0.12)',
      }}
    >
      <Download size={14} />
      Download CV
    </a>
  );
}