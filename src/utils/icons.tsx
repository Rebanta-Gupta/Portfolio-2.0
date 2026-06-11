import {
  Atom,
  Beaker,
  Boxes,
  ChartColumn,
  Code,
  Cpu,
  Gamepad2,
  Github,
  Linkedin,
  Mail,
  Terminal,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { PortfolioIcon } from '../types';

const iconMap: Record<PortfolioIcon, LucideIcon> = {
  atom:          Atom,
  beaker:        Beaker,
  boxes:         Boxes,
  'chart-column': ChartColumn,
  code:          Code,
  cpu:           Cpu,
  'gamepad-2':   Gamepad2,
  github:        Github,
  linkedin:      Linkedin,
  mail:          Mail,
  terminal:      Terminal,
  wrench:        Wrench,
  zap:           Zap,
};

interface PortfolioIconProps {
  name: PortfolioIcon;
  className?: string;
  style?: React.CSSProperties;
}

export function PortfolioIconSvg({ name, className }: PortfolioIconProps) {
  const Icon = iconMap[name];
  return <Icon className={className} aria-hidden="true" />;
}