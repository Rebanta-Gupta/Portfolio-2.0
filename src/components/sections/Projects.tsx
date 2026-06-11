import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProjectItem, ProjectCategory } from '../../types';
import { filterByCategory, categoryLabel } from '../../utils/portfolio';
import ProjectCard from '../ui/ProjectCard';

const FILTERS: (ProjectCategory | 'all')[] = ['all', 'software', 'hardware', 'games', 'hackathon'];

interface ProjectsProps {
  projects: ProjectItem[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [active, setActive] = useState<ProjectCategory | 'all'>('all');
  const navigate = useNavigate();

  const filtered = filterByCategory(projects, active);

  const openProject = (id: string) => navigate(`/projects/${id}`);

  return (
    <section id="projects" className="section px-6 py-24 max-[480px]:px-4 max-[480px]:py-16">
      <div className="mx-auto w-full max-w-5xl">

        <h2 className="reveal font-display text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Projects
          <div className="mt-2 h-0.5 w-12" style={{ background: 'var(--sky)' }} />
        </h2>

        <p className="reveal mb-10 text-sm" style={{ color: 'var(--text-muted)' }}>
          {projects.length} projects across hardware, software, games, and hackathons.
        </p>

        {/* Filter pills */}
        <div className="reveal flex flex-wrap gap-2 mb-10">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="reveal"
              style={{ transitionDelay: `${(i % 6) * 60}ms` }}
            >
              <ProjectCard item={item} onOpen={openProject} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-20 font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}