import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { Lightbox } from '../components';
import { usePageTransition } from '../hooks/usePageTransition';
import { findProjectById, categoryAccent } from '../utils/portfolio';
import { PortfolioIconSvg } from '../utils/icons';
import { ResumeButton } from '../components';
import type { PortfolioData } from '../types';

interface ProjectDetailsPageProps {
  data: PortfolioData;
}

interface FromState {
  scrollY?: number;
}

export default function ProjectDetailsPage({ data }: ProjectDetailsPageProps) {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate       = useNavigate();
  const location       = useLocation();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  usePageTransition();

  const project = findProjectById(data, projectId ?? null);
  const fromState = location.state as FromState | null;

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIdx]);

  const handleBack = useCallback(() => {
    navigate('/', { state: { returnScrollY: fromState?.scrollY ?? 0 } });
  }, [navigate, fromState?.scrollY]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8" style={{ background: 'var(--bg)' }}>
        <div
          className="w-full max-w-lg rounded-2xl p-8"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <p className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Project not found.
          </p>
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: 'var(--sky)' }}
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  const accent    = categoryAccent(project.category);
  const colorVar  = accent === 'amber' ? 'var(--amber)' : 'var(--sky)';
  const dimVar    = accent === 'amber' ? 'var(--amber-dim)' : 'var(--sky-dim)';
  const borderVar = accent === 'amber' ? 'var(--border-amber)' : 'var(--border-glow)';

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
      {/* Dot-grid header bg */}
      <div className="dot-grid absolute inset-x-0 top-0 h-64 opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6 py-10 md:px-10">

        {/* Back button */}
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 mb-10 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 hover:-translate-x-0.5"
          style={{
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            color: 'var(--text-muted)',
          }}
        >
          <ArrowLeft size={14} /> Back to Portfolio
        </button>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">

          {/* Left — content */}
          <div>
            {/* Title row */}
            <div className="flex items-start gap-5 mb-8">
              <div
                className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl"
                style={{ background: dimVar }}
              >
                <PortfolioIconSvg
                  name={project.icon}
                  className="w-7 h-7"
                  style={{ color: colorVar } as React.CSSProperties}
                />
              </div>
              <div>
                <span
                  className="font-mono text-xs uppercase tracking-widest mb-2 block"
                  style={{ color: colorVar }}
                >
                  {project.category}
                </span>
                <h1
                  className="font-display text-2xl md:text-3xl font-bold leading-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {project.title}
                </h1>
              </div>
            </div>

            {/* Description */}
            {project.description.map((para, i) => (
              <p key={i} className="mb-5 text-base leading-8" style={{ color: 'var(--text-muted)' }}>
                {para}
              </p>
            ))}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 mb-6">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className={`tag ${accent === 'amber' ? 'tag-amber' : ''}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, var(--sky) 0%, #0ea5e9 100%)',
                    color: '#07090f',
                    boxShadow: '0 4px 18px rgba(56,189,248,0.22)',
                  }}
                >
                  <Github size={14} /> View on GitHub
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    border: `1px solid ${borderVar}`,
                    background: dimVar,
                    color: colorVar,
                  }}
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              <ResumeButton
                enabled={data.resumeEnabled}
                path={data.resumePath}
                variant="amber"
              />
            </div>
          </div>

          {/* Right — image gallery (only if images exist) */}
          {project.images.length > 0 && (
            <aside className="lg:sticky lg:top-24">
              <div className="flex flex-col gap-3">
                {project.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIdx(i)}
                    className="group relative w-full overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-0.5 text-left"
                    style={{ border: '1px solid var(--border)' }}
                    aria-label={`View image: ${img.caption}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-40 object-cover"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: 'linear-gradient(to top, rgba(7,9,15,0.85) 0%, transparent 60%)' }}
                    >
                      <p
                        className="px-3 pb-3 text-xs font-mono"
                        style={{ color: 'var(--sky)' }}
                      >
                        {img.caption}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={project.images}
          currentIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrevious={() => setLightboxIdx(i => (i === null ? 0 : (i - 1 + project.images.length) % project.images.length))}
          onNext={() => setLightboxIdx(i => (i === null ? 0 : (i + 1) % project.images.length))}
        />
      )}
    </div>
  );
}