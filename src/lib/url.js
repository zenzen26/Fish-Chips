// Prefixes an internal path with Vite's base URL so links keep working when the site is served from a sub-path
// (GitHub Pages serves it at /Fish-Chips/). withBase('/#about') -> '/Fish-Chips/#about' there, '/#about' elsewhere.
export function withBase(path) {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
}
