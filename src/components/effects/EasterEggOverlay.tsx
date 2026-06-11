import { useEffect } from 'react';

interface EasterEggOverlayProps {
  active: boolean;
}

export default function EasterEggOverlay({ active }: EasterEggOverlayProps) {
  useEffect(() => {
    if (active) {
      // eslint-disable-next-line no-console
      console.log(
        '%c⚗️  LAB MODE ACTIVATED',
        'color:#f59e0b;font-family:monospace;font-size:16px;font-weight:bold;',
        '\nYou found the easter egg. Silver nanoparticles have been deployed. 🧪',
        '\n— Rebanta'
      );
      document.documentElement.classList.add('lab-mode');
      const t = setTimeout(() => document.documentElement.classList.remove('lab-mode'), 3500);
      return () => clearTimeout(t);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] pointer-events-none"
      aria-hidden="true"
    >
      {/* Amber vignette pulse */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(245,158,11,0.18) 100%)',
          animation: 'lab-mode-flash 0.4s ease forwards',
        }}
      />
      {/* Toast message */}
      <div
        className="absolute top-24 left-1/2 -translate-x-1/2 font-mono text-sm px-5 py-3 rounded-xl"
        style={{
          background: 'rgba(245,158,11,0.12)',
          border: '1px solid rgba(245,158,11,0.4)',
          color: 'var(--amber)',
          animation: 'float-up 0.4s ease both',
        }}
      >
        ⚗️ &nbsp;Lab mode activated — check the console
      </div>
    </div>
  );
}