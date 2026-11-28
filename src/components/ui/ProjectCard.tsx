import type { ProjectItem } from '../../types';
import { PortfolioIconSvg } from '../../utils/icons';
import { categoryAccent } from '../../utils/portfolio';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  item: ProjectItem;
  onOpen: (id: string) => void;
  /** Wide cards span two columns: more tags, and the first photo when there is one. */
  wide?: boolean;
}

export default function ProjectCard({ item, onOpen, wide = false }: ProjectCardProps) {
  const accent = categoryAccent(item.category);
  const borderVar = accent === 'amber' ? 'var(--border-amber)' : 'var(--border-glow)';
  const dimVar    = accent === 'amber' ? 'var(--amber-dim)'   : 'var(--sky-dim)';
  const colorVar  = accent === 'amber' ? 'var(--amber)'       : 'var(--sky)';

  const maxTags = wide ? 7 : 4;
  const photo = wide ? item.images[0] : undefined;
  const linkLabel = item.liveLink?.includes('pypi.org') ? 'PyPI' : 'Live Demo';

  return (
    <article
      className="glass h-full rounded-2xl p-5 flex flex-col gap-4 cursor-pointer
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
      <div className={photo ? 'flex flex-col sm:flex-row gap-5 flex-1' : 'flex flex-col gap-4 flex-1'}>
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl"
              style={{ background: dimVar }}
            >
              <PortfolioIconSvg name={item.icon} className="w-5 h-5" style={{ color: colorVar } as React.CSSProperties} />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className={`font-display font-semibold leading-snug mb-1 group-hover:text-[var(--sky)] transition-colors ${wide ? 'text-base md:text-lg' : 'text-base'}`}
                  style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p className={wide ? 'text-xs leading-5 md:text-sm md:leading-6' : 'text-xs leading-5'} style={{ color: 'var(--text-muted)' }}>
                {item.brief}
              </p>
            </div>

            <span
              aria-hidden="true"
              className="flex-shrink-0 text-lg opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
              style={{ color: colorVar }}
            >
              →
            </span>
          </div>

          {/* Wide cards without a photo use the extra room for a short excerpt */}
          {wide && !photo && item.description.length > 0 && (
            <p className="text-xs leading-5 line-clamp-3 pl-[60px] max-md:hidden" style={{ color: 'var(--text-muted)', opacity: 0.85 }}>
              {item.description[1] ?? item.description[0]}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, maxTags).map((tag, i) => (
              <span key={i} className={`tag ${accent === 'amber' ? 'tag-amber' : ''}`}>{tag}</span>
            ))}
            {item.tags.length > maxTags && (
              <span className="tag" style={{ color: 'var(--text-muted)' }}>+{item.tags.length - maxTags}</span>
            )}
          </div>
        </div>

        {photo && (
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="w-full sm:w-44 h-40 sm:h-auto object-cover rounded-xl flex-shrink-0"
            style={{ border: '1px solid var(--border)' }}
          />
        )}
      </div>

      {/* Links row: pinned to the bottom so rows line up */}
      {(item.link || item.liveLink) && (
        <div className="flex gap-3 mt-auto pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
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
              <ExternalLink size={12} /> {linkLabel}
            </a>
          )}
        </div>
      )}
    </article>
  );
}
