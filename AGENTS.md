# Tide & Chips: rules for AI coding agents

Single source of truth for any LLM or agent working in this repo. `CLAUDE.md` and
`.github/copilot-instructions.md` only point here. **Edit this file, not those.**

Demo site for a made-up seaside fish and chips shop. Static React, no backend. Everything is
fictional: no real business, address, phone, prices, reviews or awards. The build plan is
`PLAN.md`; the visual reference is `mockups/f-blue-sardine.html`.

## Stack

- Vite 8, React 19, react-router-dom 7 (`BrowserRouter`), Tailwind CSS v4 via `@tailwindcss/vite`.
- Tokens live in `@theme` in `src/styles/theme.css`. No `tailwind.config.js`.
- Plain JavaScript (JSX). No TypeScript, state library, animation library, UI kit or CSS-in-JS.
  No runtime dependencies beyond react, react-dom, react-router-dom.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Production build to `dist/`. **Must finish with no errors or warnings.** |
| `npm run preview` | Serve the built site |

## Colours and typography

Palette tokens (`theme.css`): `blue` #004aad, `yellow` #ffc83a, `fog` #e5e6e3, `black`, `white`.
This supersedes the colour table in PLAN.md.

| Role | Font | Classes |
| --- | --- | --- |
| Display | Titan One (Google Fonts, 400 only) | `.display-hero`, `.display-section`, `.display-card` (h1/h2/h3 default to it) |
| Body / UI / notes | Montserrat 400/700/800, 400 italic | default body, `.lead`, `.ui-label`, `.note` (italic margin note, under about 6 words) |

Titan One loads from the Google Fonts link in `index.html`; it can be self-hosted later with an `@font-face` (woff2)
and the link removed. Dingo Stamp was the original pick but is not on Google Fonts, and Rubik Dirt was tried and dropped
(its speckle was hard to read).
The display face is very heavy: short headings, large sizes only. Sizes use `clamp()` in
`styles/primitive/typography.css`.

Dividers: `Divider` (`components/primitive/Divider.jsx`) breaks the straight cut between sections: `shape="wave"` (drifting sea line, `edge="top"` hangs from the top of a section, default rises from the bottom) `shape="scallop"` (awning bumps) or `shape="bite"` (bites taken out of the neighbour's edge that regrow). `tone` is the neighbour colour it blends into. The Home page uses bite yellow (Picks bottom), wave white (Testimonials bottom). About to Picks and Contact to Footer are plain straight edges.

Entrance animations: spread `{...reveal(kind, delay)}` (`lib/reveal.js`) on any element. Kinds: rise, drop, left, right, pop, zoom, tilt, spin, fade. `ScrollEffects` adds `.is-in` on first view; keyframes in `styles/primitive/motion.css` only define a `from` state, so elements finish on their own transform. Never use pop/zoom/spin on an element that uses `-scale-x-100` (it would flip mid-animation). Skip elements that already run their own `animation` (e.g. `.fish-bob`). Reduced motion shows everything instantly.

Demo tooltip: put `data-demo="Demo menu"` (any text) on a button or link whose page is not built. It never navigates; a mouse sees the text in a tooltip that follows the cursor on hover, touch and keyboard see it pop on activation (`components/layout/DemoTip.jsx`). It also gets the disabled cursor.

Cursors: fish and rubber-hose SVG cursors in `public/cursors/` (fish = default, hand = links/buttons, click = pressed, type = text fields, disabled = `data-demo`/disabled), wired in `styles/primitive/cursor.css` (unlayered so it beats Tailwind `cursor-pointer`). Do not write "demo" wording into page copy.

Icons: `components/primitive/Icon.jsx` is the one icon set (clock, pin, phone, mail, globe, github, linkedin, copy, check, external, menu, close, chevron, star). Add new icons there, never as one-off inline SVG.

Chrome: `components/layout/Header.jsx` (floating pill header: status pill, centred nav pill with CTA and mobile menu, copy-email pill; nav links in `src/data/nav.json`) and `Footer.jsx` (black footer; site details, portfolio and GitHub links in `src/data/site.json`). Styles: `styles/primitive/chrome.css` (`.pill`, `.nav-link`).

Buttons: `Button` (`components/primitive/Button.jsx`, styles in `styles/primitive/button.css`): `to` = router link, `href` = anchor (silky glossy sheen sweep on hover, flat press on click). Only the `primary` variant exists so far.

Patterns: `.grid-bg` (blue squared paper, the only grid) and `.tape` (the "AND" label) in
`styles/primitive/pattern.css`. Images are looked up by filename with `image('name')` from
`src/lib/images.js`.

## Reuse before you create

1. Search `components/primitive/` and `styles/primitive/` first. Use it as is.
2. Nearly fits: add a variant or prop. Do not fork a copy.
3. Used 3+ times: make it a primitive. One-offs stay inline Tailwind utilities.

## CSS rules

- Primitive-first with grouped selectors: variants share one base rule, then only the
  differences (`.btn-primary, .btn-line, .btn-ink {...}`).
- Component classes are plain CSS in `@layer components`, body written with `@apply`. You cannot
  `@apply` another component class in Tailwind v4: spell out the utilities.
- One declaration per line; selector and `}` on their own lines.
- Theme tokens only (`bg-blue`, `text-black`), never raw hex in components or CSS.
- Hard offset shadows only (`--shadow-hard*`), never soft blurs.
- Responsive by one prefix chain (`md:px-8 lg:px-12`), not extra `@media` blocks. Custom
  breakpoint `6xl` = 120rem.
- A new CSS file must be `@import`ed in `src/styles/index.css`. Page-only CSS in
  `styles/pages/<page>/`, shared CSS in `styles/primitive/`.
- No inline `style=""` except per-instance CSS variables (e.g. `--i`, `--r`).

## Content

All content in `src/data/*.json`; components only render. No hardcoded price, hours, address,
phone, email or URL in JSX. Each page is an ordered array of section ids in
`src/data/pages.json` (see PLAN.md section 8).

## Motion

Use `--ease-fluid`, `--ease-spring`, `--ease-bounce`. Use independent transform properties
(`translate`, `rotate`, `scale`). Every animation is disabled under `prefers-reduced-motion`
(global clamp in the base layer; JS effects check `matchMedia`).

## Accessibility (non-negotiable)

Skip link, one `<main id="main">`, labelled sections, visible `:focus-visible`, never colour
alone, decorative SVG `aria-hidden="true"`. Flag any new colour pair's contrast.

## Do not

- Push, force-push or rewrite history unless asked. Commit only when asked; small commits.
- Add dependencies without asking.
- Hand-edit `package-lock.json` or commit `dist/`.

## Before you finish any change

1. `npm run build` passes with no warnings.
2. Checked in the browser at ~375px and desktop; no horizontal scroll.
3. Reduced motion works; focus visible.
4. Update this file's rules if you added a primitive, route, data file or convention.
5. Report anything you could not verify.
