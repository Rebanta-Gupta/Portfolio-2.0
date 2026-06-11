import type { ProjectItem } from '../../types';
import { PortfolioIconSvg } from '../../utils/icons';
import { categoryAccent } from '../../utils/portfolio';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  item: ProjectItem;
  onOpen: (id: string) => void;
}

export default function ProjectCard({ item, onOpen }: ProjectCardProps) {
  const accent = categoryAccent(item.category);
  const borderVar = accent === 'amber' ? 'var(--border-amber)' : 'var(--border-glow)';
  const dimVar    = accent === 'amber' ? 'var(--amber-dim)'   : 'var(--sky-dim)';
  const colorVar  = accent === 'amber' ? 'var(--amber)'       : 'var(--sky)';

  return (
    <article
      className="glass rounded-2xl p-5 flex flex-col gap-4 cursor-pointer
                 transition-all duration-250 hover:-translate-y-1 group"
      onClick={() => onOpen(item.id)}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onOpen(item.id)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${item.title}`}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = borderVar;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${dimVar}`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Header row */}
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl"
          style={{ background: dimVar }}
        >
          <PortfolioIconSvg name={item.icon} className="w-5 h-5" style={{ color: colorVar } as React.CSSProperties} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base font-semibold leading-snug mb-1 group-hover:text-[var(--sky)] transition-colors"
              style={{ color: 'var(--text-primary)' }}>
            {item.title}
          </h3>
          <p className="text-xs leading-5" style={{ color: 'var(--text-muted)' }}>
            {item.brief}
          </p>
        </div>

        <span
          className="flex-shrink-0 text-lg opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
          style={{ color: colorVar }}
        >
          →
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {item.tags.slice(0, 4).map((tag, i) => (
          <span key={i} className={`tag ${accent === 'amber' ? 'tag-amber' : ''}`}>{tag}</span>
        ))}
        {item.tags.length > 4 && (
          <span className="tag" style={{ color: 'var(--text-muted)' }}>+{item.tags.length - 4}</span>
        )}
      </div>

      {/* Links row */}
      {(item.link || item.liveLink) && (
        <div className="flex gap-3 mt-auto pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:underline"
              style={{ color: 'var(--text-muted)' }}
            >
              <Github size={12} /> GitHub
            </a>
          )}
          {item.liveLink && (
            <a
              href={item.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:underline"
              style={{ color: 'var(--sky)' }}
            >
              <ExternalLink size={12} /> Live Demo
            </a>
          )}
        </div>
      )}
    </article>
  );
}