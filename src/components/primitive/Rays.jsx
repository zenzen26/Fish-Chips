// Three short "shine" lines that burst out from a corner, like the click cursor. Hidden until the surrounding .group is
// hovered, focused or data-active="true" (see .rays in styles/primitive/motion.css). Colour comes from the text colour.
// `flip` mirrors it for the left-hand corner. Position and size come from className.
const LINES = ['M6 24V6', 'M13 27L27 13', 'M16 34H34'];

export default function Rays({ flip = false, className = '' }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={`rays pointer-events-none ${className}`}>
      <g
        transform={flip ? 'translate(40 0) scale(-1 1)' : undefined}
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      >
        {LINES.map((d, index) => (
          <path key={d} d={d} pathLength="1" style={{ '--i': index }} />
        ))}
      </g>
    </svg>
  );
}
