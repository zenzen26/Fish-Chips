import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Adds `is-in` to every [data-reveal] element the first time it scrolls into view. Re-scans on route change.
export default function ScrollEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    const targets = [...document.querySelectorAll('[data-reveal]:not(.is-in)')];
    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-in'));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }),
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
