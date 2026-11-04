import { useId } from 'react';

// Breaks the straight cut between two sections. Drop it inside a section and give it the colour of the neighbour it
// blends into (`tone`).
//   shape="wave":    drifting sea line. edge="bottom" rises from the bottom of this section (fill = the next section);
//                    edge="top" hangs from the top of this section (fill = the previous section).
//   shape="scallop": awning bumps rising from the bottom of this section.
//   shape="bite":    a strip of this section's neighbour with bites taken out that grow, hold and regrow.
const TONES = { white: 'text-white', blue: 'text-blue', yellow: 'text-yellow', black: 'text-black' };
const WAVE = { w: 2400, h: 80 };

// Period 300: Q then T repeats the reflected control point, so crests and troughs alternate. Loops seamlessly.
const WAVE_PATH = (() => {
  let d = 'M0 40Q75 0 150 40';
  for (let x = 300; x <= WAVE.w; x += 150) d += `T${x} 40`;
  return `${d}V${WAVE.h}H0Z`;
})();

// `front` puts the divider above positioned siblings (e.g. cut-out images) so they tuck into it; default is behind content.
// Everything below is multiplied by SIZE to make the bites bigger or smaller.
const SIZE = 1.3;

// Bites: each is a cluster of overlapping arcs that chomp in at the exact same moment and regrow together, like a row of teeth. Corner bites (x 0 and 100) take a
// whole corner out; the rest sit at different depths so the edge is not one straight row.
// [x position %, depth px (negative = shallower), cycle seconds, start offset seconds, hide on phones, [[offset px, radius px], ...]]
const BITES = [
  [0, 0, 10, -1, false, [[0, 62], [50, 46], [94, 34]]],
  [24, -16, 9, -3, true, [[-30, 28], [14, 42], [54, 30]]],
  [50, 6, 11, -6, false, [[-58, 38], [-6, 56], [46, 44], [90, 30]]],
  [76, -22, 9.5, -1.5, true, [[-34, 32], [10, 46], [50, 34]]],
  [100, 0, 8.5, -4.5, false, [[0, 62], [-50, 46], [-94, 34]]],
];

export default function Divider({ shape = 'wave', tone, edge = 'bottom', front = false }) {
  const layer = front ? 'z-[5]' : '-z-10';
  const maskId = useId();

  if (shape === 'bite') {
    return (
      <svg className={`pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full ${layer} ${TONES[tone]}`} aria-hidden="true">
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
          <rect width="100%" height="100%" fill="white" />
          {BITES.map(([x, depth, dur, delay, phoneHidden, arcs]) => (
            <svg key={x} x={`${x}%`} y={depth * SIZE} overflow="visible" className={phoneHidden ? 'hidden md:block' : undefined}>
              {arcs.map(([dx, r]) => (
                <circle
                  key={dx}
                  cx={dx * SIZE}
                  cy="0"
                  r={r * SIZE}
                  fill="black"
                  className="bite"
                  style={{ '--dur': `${dur}s`, '--delay': `${delay}s` }}
                />
              ))}
            </svg>
          ))}
        </mask>
        <rect width="100%" height="100%" fill="currentColor" mask={`url(#${maskId})`} />
      </svg>
    );
  }

  if (shape === 'scallop') {
    return <div className={`scallop pointer-events-none absolute inset-x-0 bottom-0 ${layer} ${TONES[tone]}`} aria-hidden="true" />;
  }

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${layer} h-10 overflow-hidden md:h-16 ${edge === 'top' ? 'top-0 rotate-180' : 'bottom-0'} ${TONES[tone]}`}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${WAVE.w} ${WAVE.h}`}
        preserveAspectRatio="none"
        className="wave-drift absolute bottom-1 left-0 h-full w-[200%] fill-current opacity-50"
        style={{ '--dur': '22s' }}
      >
        <path d={WAVE_PATH} />
      </svg>
      <svg
        viewBox={`0 0 ${WAVE.w} ${WAVE.h}`}
        preserveAspectRatio="none"
        className="wave-drift wave-drift-reverse absolute bottom-0 left-0 h-full w-[200%] fill-current"
        style={{ '--dur': '16s' }}
      >
        <path d={WAVE_PATH} />
      </svg>
    </div>
  );
}
