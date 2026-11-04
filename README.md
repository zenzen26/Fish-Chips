# Tide & Chips

A one-page website for a made-up seaside fish and chips shop. It is a portfolio and design-practice
project: the name, address, phone number, email, menu, prices and reviews are all fictional, and there
is no backend. The look is a bold blue seaside poster crossed with a picnic sketchbook: squared-paper
backgrounds, chunky yellow headlines, hard offset shadows, doodled crayon fish and tablecloth cut-outs.

## What is on the page

One route (`/`) built from five sections, with a floating header and a black footer:

| Section | What it does |
| --- | --- |
| **Hero** | "Tide and Chips" title over the plate photo, with herbs, tomatoes and two hand-written margin notes |
| **About** | A short founder story in a tilted photo frame, with the shop's pufferfish mascot |
| **Today's pick** | Three best-seller plates that lift on hover or tap, and a "See full menu" button |
| **Testimonials** | A featured review and three taped-on notes on a yellow background |
| **Contact** | An enquiry form sitting inside a yellow dinner plate, set with a fork and a knife |

Details worth knowing:

- The enquiry form has no server. Submitting builds a `mailto:` link, so it opens the visitor's email app.
- The enquiry type is a custom accessible drop-down (keyboard, mouse and touch) instead of the browser's default list.
- Sections animate in on scroll, the section edges are waves and animated "bite" shapes instead of straight lines, and
  the cursors are custom fish and rubber-hose drawings. Every animation is switched off for visitors who prefer
  reduced motion.
- Buttons that have no page yet show a "Demo menu" tooltip instead of navigating.

## Tech stack

| Part | Choice |
| --- | --- |
| Build tool | [Vite](https://vite.dev) 8 |
| UI | [React](https://react.dev) 19, plain JavaScript (JSX), no TypeScript |
| Routing | [React Router](https://reactrouter.com) 7 (`BrowserRouter`) |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 through `@tailwindcss/vite`, tokens in `@theme` (no `tailwind.config.js`) |
| Hosting | Static site; `vercel.json` rewrites every path to `index.html` |

There is no state library, animation library, UI kit or backend. The only runtime dependencies are `react`,
`react-dom` and `react-router-dom`.

## Typography

| Role | Font | Used for |
| --- | --- | --- |
| Display | [Titan One](https://fonts.google.com/specimen/Titan+One) (400) | Hero title, section headings, prices |
| Body, UI and notes | [Montserrat](https://fonts.google.com/specimen/Montserrat) (400, 700, 800, 400 italic) | Paragraphs, navigation, forms, margin notes |

Both load from the Google Fonts link in `index.html`. Titan One is very heavy, so it is only used for short,
large headings. The sizes are fluid `clamp()` values in `src/styles/primitive/typography.css`.

## Colour palette

| Token | Hex | Used for |
| --- | --- | --- |
| `blue` | `#004aad` | Hero and menu backgrounds, headings on white, links |
| `yellow` | `#ffc83a` | Headlines on blue, buttons, the testimonials background |
| `fog` | `#e5e6e3` | Soft greys, empty star fills, tape |
| `black` | `#000000` | Body text, outlines, hard shadows, footer |
| `white` | `#ffffff` | Page background, cards |

Shadows are always hard offsets (never blurred). The tokens live in `src/styles/theme.css`.

## Getting started

Needs Node 22.12 or newer.

```bash
npm install
npm run dev       # dev server with hot reload
npm run build     # production build to dist/ (must finish with no warnings)
npm run preview   # serve the built site
```

## Deploying

**GitHub Pages** (served at `https://zenzen26.github.io/Fish-Chips/`): the workflow in
`.github/workflows/deploy.yml` builds the site with `VITE_BASE=/Fish-Chips/` and publishes `dist/` on every push to `main`.
In the repo go to **Settings, Pages, Build and deployment** and set **Source** to **GitHub Actions** (not "Deploy from a
branch", which would serve the unbuilt source and show a blank page).

**Anywhere else** (Vercel, Netlify, a custom domain): just run `npm run build` and publish `dist/`. Without `VITE_BASE` the
site is built for the domain root, and `vercel.json` already rewrites every path to `index.html`.

Internal links go through `withBase()` in `src/lib/url.js`, and the router uses Vite's base, so the site works at any sub-path.

## Project structure

```
index.html                     Fonts, favicons, page title
public/                        Favicons and the cursor SVGs (public/cursors)
src/
├── App.jsx, main.jsx          Routes and global components
├── pages/Home.jsx             Composes the five sections
├── components/
│   ├── layout/                Header, Footer, scroll effects, demo tooltip
│   ├── primitive/             Button, Select, Icon, Divider, ArrowNote
│   └── pages/home/            One component per section
├── data/                      All copy and contact details (JSON)
├── lib/                       Image lookup, mailto builder, price formatter, reveal helper
├── media/images/              Photos and cut-outs
└── styles/                    Tailwind entry, theme tokens and primitive CSS
```

All the wording, prices and contact details live in `src/data/*.json`; the components only render them. To change
the copy, edit `home.json`; to change the address, phone or email, edit `site.json`.

## For AI assistants and contributors

The coding rules (reuse before creating, CSS conventions, motion and accessibility rules) are in
[`AGENTS.md`](AGENTS.md).
