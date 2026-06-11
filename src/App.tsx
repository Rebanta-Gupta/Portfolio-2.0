import { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { usePortfolioData }  from './hooks/usePortfolioData';
import { useTheme }          from './hooks/useTheme';
import { useCursorState }    from './hooks/useCursorState';
import { useEasterEgg }      from './hooks/useEasterEgg';
import { Navbar }            from './components/layout';
import { LoadingScreen, CustomCursor } from './components/effects';
import EasterEggOverlay      from './components/effects/EasterEggOverlay';
import HomePage              from './pages/HomePage';
import ProjectDetailsPage    from './pages/ProjectDetailsPage';

// Detect touch/mobile — disable custom cursor on touch devices
const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

export default function App() {
  const { data }                = usePortfolioData();
  const { theme, toggle }       = useTheme();
  const { variant, setVariant } = useCursorState();
  const easterEgg               = useEasterEgg();
  const [loaded, setLoaded]     = useState(false);

  // Attach cursor variant listeners to the document
  // Sections/cards set data-cursor attribute; we read it here
  const handleMouseOver = (e: React.MouseEvent) => {
    const el = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null;
    if (el) {
      setVariant(el.dataset.cursor as Parameters<typeof setVariant>[0] ?? 'default');
    } else {
      setVariant('default');
    }
  };

  return (
    <div onMouseOver={handleMouseOver}>
      {/* Custom cursor — hidden automatically on touch via CSS */}
      {!isTouch && <CustomCursor variant={variant} />}

      {/* Easter egg overlay */}
      <EasterEggOverlay active={easterEgg} />

      {/* Loading screen — shown once on first visit */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Main app — rendered beneath loading screen so it's ready instantly */}
      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <Navbar theme={theme} onThemeToggle={toggle} />

        <Routes>
          <Route path="/"                    element={<HomePage data={data} />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsPage data={data} />} />
          <Route path="*"                    element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}