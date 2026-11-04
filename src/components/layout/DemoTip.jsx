import { useEffect, useRef, useState } from 'react';

// Elements with data-demo="Some text" are for buttons whose page does not exist yet. They never navigate.
//  - Mouse: the tooltip appears on hover and follows the cursor until it leaves.
//  - Touch and keyboard: activating the element pops the tooltip for a moment.
const TAP_MS = 1700;

export default function DemoTip() {
  const [tip, setTip] = useState(null);
  const tipRef = useRef(null);
  const place = (x, y) => {
    if (!tipRef.current) return;
    tipRef.current.style.left = `${x}px`;
    tipRef.current.style.top = `${y - 16}px`;
  };

  useEffect(() => {
    const find = (event) => event.target.closest?.('[data-demo]');

    const onOver = (event) => {
      if (event.pointerType !== 'mouse') return;
      const target = find(event);
      if (!target) return;
      setTip({ id: Date.now(), text: target.dataset.demo, x: event.clientX, y: event.clientY, hover: true });
    };
    const onMove = (event) => {
      if (event.pointerType === 'mouse') place(event.clientX, event.clientY);
    };
    const onOut = (event) => {
      if (event.pointerType !== 'mouse') return;
      const from = find(event);
      if (from && !from.contains(event.relatedTarget)) setTip(null);
    };
    const onClick = (event) => {
      const target = find(event);
      if (!target) return;
      event.preventDefault();
      // A real mouse click already has the hover tooltip showing.
      if (event.detail > 0 && window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      const box = target.getBoundingClientRect();
      const keyboard = event.detail === 0;
      setTip({
        id: Date.now(),
        text: target.dataset.demo,
        x: keyboard ? box.left + box.width / 2 : event.clientX,
        y: keyboard ? box.top : event.clientY,
        hover: false,
      });
    };

    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerout', onOut);
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
      document.removeEventListener('click', onClick, true);
    };
  }, []);

  useEffect(() => {
    if (!tip || tip.hover) return undefined;
    const timer = window.setTimeout(() => setTip(null), TAP_MS);
    return () => window.clearTimeout(timer);
  }, [tip]);

  if (!tip) return null;

  return (
    <div
      key={tip.id}
      ref={tipRef}
      role="status"
      className="demo-tip pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full border-2 border-black bg-white px-4 py-1.5 text-sm font-extrabold shadow-hard-sm"
      style={{ left: tip.x, top: tip.y - 16 }}
    >
      {tip.text}
    </div>
  );
}
