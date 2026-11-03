# Tide & Chips: build plan

A demo site for a made-up seaside **fish and chips shop**. Static React, four pages (Home, About,
Products, Contact), sample pictures only. **Plan only: no code has been written.** The next
session builds it from this file.

The look is locked to `mockups/f-blue-sardine.html` (open it as the visual reference). The
section list below is a starting point: the owner will customise sections later, so the build
must make sections cheap to add, remove and reorder (see section 8).

Everything is fictional. No real business, address, phone number, prices, reviews or awards.
All copy and prices are obvious demo placeholders. "Tide & Chips" is a placeholder name.

## 1. Vibe

Bold blue seaside poster meets picnic and doodle sketchbook.
- Royal-blue graph-grid backgrounds (like squared paper), with a white lower half behind the
  hero photo.
- Big chunky yellow headlines, a tilted white label ("AND"), hand-written margin notes with
  curved arrows, a starburst price badge.
- **Sardine doodles** as the signature decor: one hand-drawn sardine, reused everywhere (hero
  swimmers, a school of fish as a divider, corners of cards, footer).
- Light-blue vertical-stripe paper (like a tea towel) for the menu, scalloped edges, a red
  hand-drawn scribble circle around one word per page.
- Thick dark outlines and hard offset shadows, never soft blurs. Slight tilts (a few degrees).
- Overlap is a rule, not an accident: photos overlap text, text overlaps photos, circles of food
  poke out of card edges.
- Decoration stays decoration. Layout, text size and contrast stay modern and readable.

## 2. Stack and setup

Same stack and tooling as `../zenvas`:
- Vite, React 19, react-router-dom 7 (`BrowserRouter`), Tailwind CSS v4 via `@tailwindcss/vite`.
- Plain JS (JSX). No TypeScript, state library, animation library, UI kit or CSS-in-JS. No
  runtime dependencies beyond react, react-dom, react-router-dom.
- Tokens in `@theme` in `src/styles/theme.css`. No `tailwind.config.js`.
- Commands: `npm run dev`, `npm run build` (must finish with no errors or warnings), `npm run preview`.
- `vercel.json` rewrites all paths to `index.html`.
- Own git repo in this folder, no remote until asked.
- Fonts: Google Fonts `<link>` in `index.html` (`display=swap`, only used weights). Self-host later
  if wanted; not needed for the demo.

## 3. Rules to carry over (create `AGENTS.md` first)

Session 1 starts by writing `AGENTS.md` as the single source of truth, with `CLAUDE.md` and
`.github/copilot-instructions.md` as one-line pointers (as in zenvas). Copy zenvas's rules, adapted:

1. **Reuse before you create.** Search `components/primitive/` and `styles/primitive/` first.
   Nearly fits: add a variant or prop. Used 3+ times: make it a primitive. One-offs: inline utilities.
2. **Primitive-first CSS with grouped selectors.** Variants share one base rule, then only the
   differences: `.btn-primary, .btn-line, .btn-ink {...}`, `.card-base, .card-menu, .card-note {...}`,
   `.section-blue, .section-stripes, .section-white {...}`.
3. Component classes are plain CSS in `@layer components`, body written with `@apply`. In
   Tailwind v4 you cannot `@apply` another component class: spell out the utilities.
4. One declaration per line; selector and `}` on their own lines.
5. Theme tokens only (`bg-blue`, `text-ink`), never raw hex in components or CSS.
6. Responsive by one prefix chain (`md:px-8 lg:px-12`), not extra `@media` blocks.
7. A new CSS file must be `@import`ed in `src/styles/index.css`. Page-only CSS in
   `styles/pages/<page>/`, shared CSS in `styles/primitive/`.
8. **All content in `src/data/*.json`**; components only render. No hardcoded price, hours,
   address, phone, email or URL in JSX.
9. No inline `style=""` except per-instance CSS variables (e.g. `--i`, `--r`).
10. Accessibility is non-negotiable: skip link, one `<main id="main">`, labelled sections,
    visible `:focus-visible`, never colour alone, decorative SVG `aria-hidden="true"`.
11. Every animation disabled under `prefers-reduced-motion` (global clamp in the base layer).
12. Do not push, force-push or commit unless asked. Small incremental commits.
13. Before finishing: build clean, check mobile (~375px) and desktop, no horizontal scroll,
    reduced motion works, focus visible, report anything not verified.

## 4. Colour tokens (`@theme`)

| Token | Hex | Used for |
| --- | --- | --- |
| `blue` | `#1E3FD8` | Brand blue: grid sections, headings on white, primary button on white |
| `deep` | `#10279B` | Shadows under yellow type, footer, sardine outline |
| `fish` | `#7F9CEB` | Sardine body, soft fills |
| `stripe` | `#E4ECFB` | Light-blue paper stripes, soft backgrounds |
| `yellow` | `#FFD23F` | Display headlines on blue, buttons, price badge, highlights |
| `red` | `#E0302A` | Scribble circles, small accents, hand-written notes on light |
| `white` | `#FFFFFF` | Page, cards, label pills |
| `ink` | `#0A1442` | Body text, outlines, hard shadows (near-black navy) |

Contrast pairs to verify and report (flag any failure, adjust the token a step): ink on white,
white on blue, ink on yellow, yellow on blue (large display type only), `blue` text on white,
red on white (likely fails for small text: use only for large hand-written notes and
decorations, or darken), stripe behind ink text. Colour is never the only signal (labels carry
words, links are underlined).

Patterns as CSS primitives:
- `.grid-bg`: blue with two crossed 1.5px white lines at ~22% alpha, `--cell` size variable
  (44px default, smaller on mobile).
- `.stripes`: `repeating-linear-gradient` of `stripe` and white (~2.2rem bands).
- `.scallop`: scalloped bottom edge via radial-gradient, edge colour through a variable.
- `.outline`: thick ink border + hard offset shadow (the cartoon card look).

## 5. Typography

| Role | Font | Used for |
| --- | --- | --- |
| Display | **Titan One** | h1/h2/h3, price badges, buttons, logo |
| Hand-written | **Caveat Brush** | Margin notes, arrow labels, "new menu" scribble text only |
| Body / UI | **Nunito** (400, 700, 800) | Body, nav, forms, small text |

Tokens `--font-display`, `--font-hand`, `--font-body`. Fluid `clamp()` scale in
`typography.css` (h1 ~4.5rem to 14rem on the hero, h2 ~2.4rem to 4.4rem, body 1rem to 1.125rem),
so type scales without per-breakpoint overrides. Titan One is very heavy: short headings only,
large sizes only, never paragraphs or small UI text. Hand-written text stays under about 6 words.

## 6. Responsive spec

Mobile first. Tailwind default breakpoints plus custom `6xl` = 120rem (as in zenvas).

| Breakpoint | Width | Notes |
| --- | --- | --- |
| base | 0 to 639 | Single column, hamburger drawer, hand-written notes hidden, fewer swimming fish, 16px gutters |
| `sm` | 640 | 2-up menu cards |
| `md` | 768 | Inline nav, two-column splits begin |
| `lg` | 1024 | 3-up cards, arrow notes appear, hero overlap at full strength |
| `xl` | 1280 | Container at comfortable max (~74rem), larger type |
| `2xl` | 1536 | More breathing room, grid cell grows slightly |
| `6xl` | 1920 | Content capped and centred, grid and stripe backgrounds run edge to edge, hero headline caps its size |

No horizontal scroll from 320 to 2560 (the swimmers and overlapping elements use
`overflow-x: clip` on their section). Touch targets 44px or more. Images in `aspect-*` boxes so
layout never jumps. Verify at 360, 768, 1024, 1440, 1920, 2560.

## 7. Pages and sections (starting set)

Routes: `/`, `/about`, `/products`, `/contact`, `*` (NotFound). Page files are thin and only
compose sections.

**Home**
1. Hero: giant "FISH / AND / CHIPS" over the plate photo, tilted white "AND" label, two arrow
   notes ("golden fries", "soft juicy fish"), starburst price badge, two swimming sardines,
   two buttons. Blue grid top, white bottom.
2. Sardine school divider (decor strip).
3. Today's catch: 3 menu cards on stripe paper, circled word, link to Products.
4. Why us: 3 short points with doodle icons (fried to order, local fish, by the water).
5. Hours and find us on blue grid with a Contact button.

**About**: page header, story (photo + text overlapping), values (3 cards), meet the team
(sample photos, first names only), CTA to Products.

**Products**: page header, category filter pills (All, Fish, Chips and sides, Seafood, Drinks)
on stripe paper, product grid (food circle, name, line, price, dietary tag), allergen note,
order-ahead CTA.

**Contact**: page header, details card + form (name, email, topic via custom `Select`, message)
that builds a `mailto:` link, hours table, illustrated map placeholder (no third-party embed).

**Global**: skip link, header (white-outline pill logo, nav, Order ahead button), footer on deep
blue with scalloped top and a small "Demo site, not a real business" line, scroll-to-top on
route change, 404 with a lost sardine.

## 8. Built for customising sections later

The owner will rework sections, so:
- Each page is an ordered array of section ids in `src/data/pages.json`
  (`"home": ["hero","school","catch","why","hours"]`). The page component maps ids to
  section components through one registry. Reordering or removing a section is a JSON edit.
- Every section is a self-contained component in `components/pages/<page>/` that reads its own
  data from `src/data/` and owns no layout assumptions about its neighbours.
- Section tone (`blue`, `stripes`, `white`) is a prop on `Section`, so changing background does
  not mean editing CSS.
- No two adjacent sections should share a tone; the registry may warn in dev if they do.
- A section that is reused on 2+ pages moves to `components/primitive/`.
- `docs/public/content-editing.md` explains, for a non-developer: edit copy, prices and hours in
  JSON, reorder or hide sections in `pages.json`, swap photos by filename.

## 9. Components (primitives first)

`components/primitive/`:
- `Button` (variants: primary yellow, line white/blue, ink; `to` renders Link, `href` anchor)
- `Card` (variants: base, menu, note; tilt through `--r`)
- `Section` + `SectionHead` (tone prop)
- `PageHeader`
- `Sardine` (renders `<use href="#sardine">`; props: size, rotate, flip, swim) and one
  `SardineSprite` mounted once in `App` (an `aria-hidden` `<svg>` symbol, hidden with a class,
  not inline style)
- `Badge` (starburst price/"made today" badge), `Label` (tilted white pill), `Scribble`
  (red circle around a word), `ArrowNote` (hand-written note + curved arrow SVG)
- `FoodCircle` (round photo with outline, pops out of cards)
- `Icon` (small doodle set: fish, chips, shrimp, cup, clock, pin, lemon)
- `Select` (accessible custom dropdown ported from zenvas), `Tag` (dietary pills)

`components/layout/`: `Header` (drawer under `md`), `Footer`, `ScrollManager`, `ScrollEffects`.

## 10. Data (`src/data/`)

`site.json` (name, tagline, address, phone, email, hours, disclaimer), `products.json`,
`team.json`, `highlights.json` and `values.json`, `pages.json` (section order, section 8),
`nav.json`. `lib/images.js` uses `import.meta.glob` to look images up by filename;
`lib/contact.js` builds the `mailto:`; `money()` formats prices.

## 11. Sample imagery

`src/media/images/`: `hero-plate.webp`, `product-<slug>.webp`, `team-<name>.webp`,
`about-shore.webp`. Free-licence stock (Unsplash/Pexels) or generated placeholders, listed in
`docs/credits.md` with source and licence. WebP, hero ~1600px, cards ~800px, with `width` and
`height` set, `loading="lazy"` below the fold, real alt text (decorative: `alt=""`). Until photos
are in, fall back to the mockup's yellow-gradient plate with an emoji-free icon so the build
never breaks. Photos should be cut-out or on a plain background where possible so the circle
and plate frames look right.

## 12. Motion

Calm and bouncy, using shared tokens `--ease-fluid`, `--ease-spring`, `--ease-bounce`:
- Sardines bob and tilt (slow, offset delays); a few only on small phones.
- Reveal on scroll via `translate`/`opacity` (one observer component, a `REVEAL` selector list).
- Cards tilt and straighten on hover, food circles spin a little, buttons press down (hard
  shadow shrinks).
- Independent transform properties (`translate`, `rotate`, `scale`) so effects never fight.
- All of it off under `prefers-reduced-motion`.

## 13. Build order

1. Scaffold Vite + React + Tailwind v4, copy conventions from zenvas, write `AGENTS.md`,
   `CLAUDE.md`, `.github/copilot-instructions.md`, `vercel.json`. Build passes.
2. `theme.css` (tokens, fonts, `6xl`, easings, hard-shadow tokens), `index.css` base layer,
   typography, pattern primitives (grid, stripes, scallop, outline), reduced-motion clamp.
3. Primitives: Button, Card, Section, PageHeader, Sardine + sprite, Badge, Label, Scribble,
   ArrowNote, FoodCircle, Tag, Icon. Then Header, Footer, routing, skip link, ScrollManager.
4. Data files with sample content, `pages.json` registry, image helper, sample photos.
5. Pages: Home (match mockup F), Products, About, Contact, NotFound.
6. `Select`, contact form (`mailto:`), category filter.
7. Motion and reveal.
8. QA: widths 360 / 768 / 1024 / 1440 / 1920 / 2560, no horizontal scroll, contrast table from
   section 4, keyboard and focus, reduced motion, build with no warnings.
9. `README.md`, `docs/credits.md`, `docs/public/content-editing.md`. Commit in small steps only
   when asked.

## 14. Open decisions for the next session

- Final business name (placeholder: Tide & Chips).
- Photos: stock downloads or generated placeholders.
- Whether to keep a "Why us" section on Home or replace it with something the owner chooses.
- No cart is planned: ordering is by the contact form or a phone number.

## 15. Out of scope

Backend, payments, cart, accounts, CMS, analytics, third-party embeds (maps, forms), blog, any
real business claims.
