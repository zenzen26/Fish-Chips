// Margin note with a hand-drawn curved arrow. `flip` mirrors the arrow for a right-hand note.
export default function ArrowNote({ text, flip = false, className = '' }) {
  return (
    <div className={`flex w-40 flex-col xl:w-52 ${flip ? 'items-end text-right' : 'items-start'} ${className}`}>
      <p className="note text-white">{text}</p>
      <svg
        viewBox="0 0 160 100"
        className={`mt-1 w-28 text-yellow xl:w-36 ${flip ? '-scale-x-100' : ''}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M150 88C70 108 14 70 20 18" />
        <path d="M4 38L20 14L42 30" />
      </svg>
    </div>
  );
}
