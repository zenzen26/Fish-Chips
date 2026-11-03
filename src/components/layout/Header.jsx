import { useEffect, useState } from 'react';
import Button from '../primitive/Button';
import { image } from '../../lib/images';
import nav from '../../data/nav.json';
import site from '../../data/site.json';
import Icon from '../primitive/Icon';

// Marks the nav link whose section sits around the middle of the screen.
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const NAV_IDS = nav.links.map((link) => link.id);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const active = useActiveSection(NAV_IDS);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => event.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const copyEmail = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(site.email).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-4 md:px-4">
      <a
        href="#main"
        className="sr-only rounded-full bg-black px-5 py-3 font-bold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-0"
      >
        Skip to content
      </a>

      <div className="mx-auto grid max-w-[90rem] items-center xl:grid-cols-[1fr_auto_1fr]">
        <p className="pill hidden items-center gap-2.5 justify-self-start px-4 py-2 text-sm font-semibold xl:flex">
          <span className="relative flex h-3 w-3" aria-hidden="true">
            <span className="absolute inset-0 animate-ping rounded-full bg-blue/50" />
            <span className="relative h-3 w-3 rounded-full bg-blue" />
          </span>
          {site.hoursToday}
        </p>

        <nav aria-label="Main" className="pill relative flex items-center justify-between gap-1 justify-self-center px-2 py-1.5 max-lg:w-full">
          <a href="/" aria-label={`${site.name} home`} className="flex shrink-0 items-center gap-2 rounded-full px-2">
            <img src={image('crayon-fish')} alt="" width="817" height="319" className="w-12" />
            <span className="font-display text-lg uppercase leading-none text-blue lg:hidden">{site.name}</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.links.map((link) => (
              <li key={link.id}>
                <a href={link.href} className="nav-link" aria-current={active === link.id}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <Button href={nav.cta.href} className="hidden !min-h-10 !px-5 !py-2 lg:inline-flex">
            {nav.cta.label}
          </Button>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-fog lg:hidden"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} className="h-6 w-6" strokeWidth={2.5} />
          </button>

          {menuOpen && (
            <div id="mobile-menu" className="absolute inset-x-0 top-full mt-3 rounded-3xl border-2 border-black bg-white p-4 shadow-hard lg:hidden">
              <ul className="grid gap-1">
                {nav.links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="nav-link block !py-3 !text-base"
                      aria-current={active === link.id}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Button href={nav.cta.href} onClick={() => setMenuOpen(false)} className="mt-4 w-full">
                {nav.cta.label}
              </Button>
              <p className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold">
                <Icon name="clock" className="h-4 w-4" />
                {site.hoursToday}
              </p>
            </div>
          )}
        </nav>

        <button type="button" onClick={copyEmail} className="pill hidden items-center gap-2.5 justify-self-end px-4 py-2 text-sm font-semibold xl:flex">
          <Icon name={copied ? 'check' : 'copy'} className="h-4 w-4" />
          <span aria-live="polite">{copied ? 'Copied!' : site.email}</span>
          <span className="sr-only">Copy email address</span>
        </button>
      </div>
    </header>
  );
}
