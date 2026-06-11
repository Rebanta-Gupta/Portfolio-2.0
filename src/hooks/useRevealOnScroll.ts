import { useEffect } from 'react';

export function useRevealOnScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const observe = () => {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      return observer;
    };

    // Small defer so all components have mounted
    const timer = setTimeout(() => {
      const observer = observe();
      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [enabled]);
}