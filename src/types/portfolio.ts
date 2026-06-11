export interface HeroData {
  greeting: string;
  name: string;
  highlight: string;
  taglines: string[]; // multiple for typewriter rotation
}

export interface ExperienceItem {
  title: string;
  org: string;
  date: string;
  location: string;
  description: string;
  skills: string[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
  description: string;
}

export type PortfolioIcon =
  | 'atom'
  | 'beaker'
  | 'boxes'
  | 'chart-column'
  | 'code'
  | 'cpu'
  | 'gamepad-2'
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'terminal'
  | 'wrench'
  | 'zap';

export type ProjectCategory = 'software' | 'hardware' | 'games' | 'hackathon';

export interface ProjectItem {
  id: string;
  icon: PortfolioIcon;
  category: ProjectCategory;
  title: string;
  brief: string;
  description: string[];
  images: ProjectImage[];
  tags: string[];
  link: string | null;
  liveLink?: string | null;
  featured?: boolean;
}

export interface SkillGroup {
  icon: PortfolioIcon;
  category: string;
  items: string[];
}

export interface ContactItem {
  icon: PortfolioIcon;
  label: string;
  value: string;
  url: string;
}

export interface PortfolioData {
  hero: HeroData;
  about: string[];
  experience: ExperienceItem[];
  projects: ProjectItem[];   // all projects, games, hackathons unified — filter by .category
  skills: SkillGroup[];
  contact: ContactItem[];
  resumeEnabled: boolean;    // set false to hide resume button everywhere
  resumePath: string;        // path relative to public/ e.g. "resume.pdf"
}