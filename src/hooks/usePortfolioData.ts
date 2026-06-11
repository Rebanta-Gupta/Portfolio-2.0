import portfolioData from '../content/portfolioData';
import type { PortfolioData } from '../types';

export function usePortfolioData(): { data: PortfolioData } {
  return { data: portfolioData };
}