import { useEffect, useRef, useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#home',       label: 'Home' },
  { href: '#about',      label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects' },
  { href: '#skills',     label: 'Skills' },
  { href: '#contact',    label: 'Contact' },
];

interface NavbarProps {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

export default function Navbar({ theme, onThemeToggle }: NavbarProps) {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeLink,  setActiveLink]  = useState('#home');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.section');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveLink(`#${e.target.id}`); }),
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [menuOpen]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      id="navbar"
      className={`fixed top-0 left-0 z-[1000] w-full transition-all duration-400 ${
        scrolled
          ? 'border-b border-[var(--border)] backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
      style={{ background: scrolled ? 'rgba(7,9,15,0.92)' : 'transparent' }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">

        {/* Logo */}
        <a
          href="#home"
          className="font-display text-xl font-bold tracking-tight select-none"
          onClick={e => scrollTo(e, '#home')}
          style={{ color: 'var(--text-primary)' }}
        >
          RG<span style={{ color: 'var(--sky)' }}>.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={e => scrollTo(e, link.href)}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
                style={{
                  color: activeLink === link.href ? 'var(--sky)' : 'var(--text-muted)',
                  background: activeLink === link.href ? 'var(--sky-dim)' : 'transparent',
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onThemeToggle}
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200"
            style={{ border: '1px solid var(--border)', background: 'var(--sky-dim)', color: 'var(--sky)' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
            style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(p => !p)}
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-350`}
        style={{
          maxHeight: menuOpen ? '400px' : '0px',
          borderBottom: menuOpen ? '1px solid var(--border)' : 'none',
          background: 'rgba(7,9,15,0.97)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <ul className="flex flex-col px-6 py-4 gap-1">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={e => scrollTo(e, link.href)}
                className="block px-4 py-3 text-sm font-medium rounded-lg transition-colors"
                style={{
                  color: activeLink === link.href ? 'var(--sky)' : 'var(--text-primary)',
                  background: activeLink === link.href ? 'var(--sky-dim)' : 'transparent',
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}