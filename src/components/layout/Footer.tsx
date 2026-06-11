export default function Footer() {
  return (
    <footer
      className="border-t text-center py-8 px-6"
      style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
    >
      <p className="font-mono text-xs tracking-widest uppercase">
        © {new Date().getFullYear()} Rebanta Gupta
        <span className="mx-3 opacity-30">·</span>
        Built with React + Vite
        <span className="mx-3 opacity-30">·</span>
        <span style={{ color: 'var(--sky)' }}>Deployed on Vercel</span>
      </p>
    </footer>
  );
}