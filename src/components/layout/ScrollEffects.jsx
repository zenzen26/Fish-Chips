import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Adds `is-in` to every [data-reveal] element the first time it scrolls into view. Re-scans on route change.
// Maximum tilt in degrees at the edge of the section.
const TILT = 5;

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

  // Hover parallax: [data-parallax="16"] drifts up to that many px against the mouse and tilts a few degrees toward it while the
  // mouse is over its section, then eases home. Writes --px/--py/--rx/--ry only (the element reads them in its own class).
  // Mouse only, never touch.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const cleanups = [...document.querySelectorAll('[data-parallax]')].map((target) => {
      const section = target.closest('section');
      if (!section) return () => {};
      const max = Number(target.dataset.parallax);
      let frame = 0;
      const set = (nx, ny) => {
        target.style.setProperty('--px', `${-nx * max}px`);
        target.style.setProperty('--py', `${-ny * max}px`);
        target.style.setProperty('--rx', `${-ny * TILT}deg`);
        target.style.setProperty('--ry', `${nx * TILT}deg`);
      };
      const onMove = (event) => {
        if (event.pointerType !== 'mouse' || frame) return;
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          const box = section.getBoundingClientRect();
          const nx = ((event.clientX - box.left) / box.width - 0.5) * 2;
          const ny = ((event.clientY - box.top) / box.height - 0.5) * 2;
          set(nx, ny);
        });
      };
      const onLeave = () => set(0, 0);
      section.addEventListener('pointermove', onMove);
      section.addEventListener('pointerleave', onLeave);
      return () => {
        window.cancelAnimationFrame(frame);
        section.removeEventListener('pointermove', onMove);
        section.removeEventListener('pointerleave', onLeave);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
