import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer, MainSections } from '../components';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { usePageTransition } from '../hooks/usePageTransition';
import type { PortfolioData } from '../types';

interface HomeRouteState {
  returnScrollY?: number;
}

interface HomePageProps {
  data: PortfolioData;
}

export default function HomePage({ data }: HomePageProps) {
  const location = useLocation();
  const navigate  = useNavigate();

  useRevealOnScroll(true);
  usePageTransition();

  // Restore scroll position when navigating back from a project page
  useEffect(() => {
    const state = location.state as HomeRouteState | null;
    if (typeof state?.returnScrollY === 'number') {
      requestAnimationFrame(() => {
        window.scrollTo({ top: state.returnScrollY, behavior: 'auto' });
        navigate('.', { replace: true, state: null });
      });
    }
  }, [location.state, navigate]);

  return (
    <>
      <MainSections data={data} />
      <Footer />
    </>
  );
}