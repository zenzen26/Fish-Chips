import Icon from '../primitive/Icon';
import nav from '../../data/nav.json';
import site from '../../data/site.json';
import { reveal } from '../../lib/reveal';

const LINK = 'underline-offset-4 hover:underline';
const ROW = 'flex items-center gap-3';
const ICON = 'h-5 w-5 shrink-0 text-yellow';

function External({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${LINK} inline-flex items-center gap-1.5`}>
      {children}
      <Icon name="external" className="h-4 w-4" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-clip bg-black text-white">
      <div className="mx-auto max-w-[80rem] px-4 pb-8 pt-16 md:pt-20" {...reveal('rise')}>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="display-section text-yellow">{site.name}</p>
            <p className="mt-4 max-w-[22rem] text-white/80">{site.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <p className="ui-label text-yellow">Explore</p>
            <ul className="mt-4 grid gap-2">
              {nav.links.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className={LINK}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="ui-label text-yellow">Visit</p>
            <ul className="mt-4 grid gap-3">
              <li className={ROW}>
                <Icon name="pin" className={ICON} />
                {site.address}
              </li>
              <li className={ROW}>
                <Icon name="clock" className={ICON} />
                {site.hours}
              </li>
              <li className={ROW}>
                <Icon name="phone" className={ICON} />
                <a href={`tel:${site.phoneHref}`} className={LINK}>
                  {site.phone}
                </a>
              </li>
              <li className={ROW}>
                <Icon name="mail" className={ICON} />
                <a href={`mailto:${site.email}`} className={LINK}>
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="ui-label text-yellow">Elsewhere</p>
            <ul className="mt-4 grid gap-3">
              <li className={ROW}>
                <Icon name="globe" className={ICON} />
                <External href={site.portfolio.url}>{site.portfolio.label}</External>
              </li>
              <li className={ROW}>
                <Icon name="github" className={ICON} />
                <External href={site.github.url}>{site.github.label}</External>
              </li>
              <li className={ROW}>
                <Icon name="linkedin" className={ICON} />
                <External href={site.linkedin.url}>{site.linkedin.label}</External>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/20 pt-6 text-sm text-white/70 md:flex-row md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <p>
            Designed and built by <External href={site.portfolio.url}>{site.builtBy}</External>
          </p>
        </div>
      </div>
    </footer>
  );
}
