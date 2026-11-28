import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ProjectItem, ProjectCategory } from '../../types';
import { filterByCategory, categoryLabel } from '../../utils/portfolio';
import ProjectCard from '../ui/ProjectCard';

const FILTERS: (ProjectCategory | 'all')[] = ['all', 'software', 'hardware', 'games', 'hackathon'];

interface ProjectsProps {
  projects: ProjectItem[];
}

/**
 * Bento layout on a 3-column grid: rows alternate wide+narrow, then narrow+wide.
 * A lone last item fills the whole row.
 */
function bentoSpan(index: number, count: number): { wide: boolean; className: string } {
  const isLoneLast = index === count - 1 && index % 2 === 0;
  if (isLoneLast) return { wide: true, className: 'md:col-span-3' };
  const row = Math.floor(index / 2);
  const wide = (row % 2 === 0) === (index % 2 === 0);
  return { wide, className: wide ? 'md:col-span-2' : 'md:col-span-1' };
}

export default function Projects({ projects }: ProjectsProps) {
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState<ProjectCategory | 'all'>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const featured = projects.filter(p => p.featured);
  const visible = showAll ? filterByCategory(projects, active) : featured;

  const openProject = (id: string) => navigate(`/projects/${id}`);

  const toggleAll = () => {
    if (showAll) {
      setShowAll(false);
      setActive('all');
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setShowAll(true);
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="section px-6 py-24 max-[480px]:px-4 max-[480px]:py-16">
      <div className="mx-auto w-full max-w-5xl">

        <h2 className="reveal font-display text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {showAll ? 'All Projects' : 'Featured Projects'}
          <div className="mt-2 h-0.5 w-12" style={{ background: 'var(--sky)' }} />
        </h2>

        <p className="reveal mb-10 text-sm" style={{ color: 'var(--text-muted)' }}>
          {showAll
            ? `${projects.length} projects across hardware, software, games, and hackathons.`
            : `${featured.length} highlights from ${projects.length} projects across research, software, hardware, and hackathons.`}
        </p>

        {/* Filter pills: only in the full list */}
        {showAll && (
          <div className="card-in flex flex-wrap gap-2 mb-10">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                aria-pressed={active === f}
                className="font-mono text-xs px-4 py-2 rounded-full transition-all duration-200"
                style={{
                  border: '1px solid',
                  borderColor: active === f ? 'var(--sky)'   : 'var(--border)',
                  background:  active === f ? 'var(--sky-dim)' : 'transparent',
                  color:       active === f ? 'var(--sky)'   : 'var(--text-muted)',
                }}
              >
                {categoryLabel(f)}
                <span className="ml-2 opacity-60">
                  {f === 'all' ? projects.length : projects.filter(p => p.category === f).length}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Bento grid. Cards use their own entry animation, not .reveal, because
            the scroll observer only sees elements present on first mount. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visible.map((item, i) => {
            const { wide, className } = bentoSpan(i, visible.length);
            return (
              <div
                key={`${showAll ? 'all' : 'feat'}-${active}-${item.id}`}
                className={`card-in ${className}`}
                style={{ animationDelay: `${(i % 6) * 60}ms` }}
              >
                <ProjectCard item={item} onOpen={openProject} wide={wide} />
              </div>
            );
          })}
        </div>

        {visible.length === 0 && (
          <p className="text-center py-20 font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
            No projects in this category yet.
          </p>
        )}

        {/* View all / featured toggle, centred under the grid */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={toggleAll}
            aria-expanded={showAll}
            className="group inline-flex items-center gap-2 font-mono text-sm px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5"
            style={{ border: '1px solid var(--border-glow)', background: 'var(--sky-dim)', color: 'var(--sky)' }}
          >
            {showAll ? (
              <>Show featured only <ChevronUp size={16} /></>
            ) : (
              <>View all {projects.length} projects <ChevronDown size={16} className="transition-transform group-hover:translate-y-0.5" /></>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
