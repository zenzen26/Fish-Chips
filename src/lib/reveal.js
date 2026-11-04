// Spread onto an element to play an entrance animation when it scrolls into view:
//   <h2 {...reveal('rise', 0.1)}>
// Kinds: rise, drop, left, right, pop, zoom, tilt, spin, fade. Delay is in seconds.
// ScrollEffects adds the `is-in` class; the keyframes live in styles/primitive/motion.css.
export const reveal = (kind, delay = 0) => ({ 'data-reveal': kind, style: { '--d': `${delay}s` } });
