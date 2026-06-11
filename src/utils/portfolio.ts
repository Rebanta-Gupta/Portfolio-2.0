import type { PortfolioData, ProjectItem, ProjectCategory } from '../types';

export function findProjectById(data: PortfolioData, projectId: string | null): ProjectItem | undefined {
  if (!projectId) return undefined;
  return data.projects.find(p => p.id === projectId);
}

export function filterByCategory(projects: ProjectItem[], category: ProjectCategory | 'all'): ProjectItem[] {
  if (category === 'all') return projects;
  return projects.filter(p => p.category === category);
}

export function categoryLabel(cat: ProjectCategory | 'all'): string {
  const labels: Record<string, string> = {
    all:       'All',
    software:  'Software',
    hardware:  'Hardware',
    games:     'Games',
    hackathon: 'Hackathons',
  };
  return labels[cat] ?? cat;
}

export function categoryAccent(cat: ProjectCategory | string): 'sky' | 'amber' {
  return cat === 'hardware' || cat === 'hackathon' ? 'amber' : 'sky';
}