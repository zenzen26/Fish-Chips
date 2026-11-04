import { useEffect, useState } from 'react';

// Click any element with data-demo="Some text" to pop a small tooltip at the cursor instead of following it.
// Used for buttons whose page does not exist yet. The click is cancelled before links navigate.
export default function DemoTip() {
  const [tip, setTip] = useState(null);

  useEffect(() => {
    const onClick = (event) => {
      const target = event.target.closest?.('[data-demo]');
      if (!target) return;
      event.preventDefault();
      // A keyboard "click" has no pointer position: anchor the tip to the element instead.
      const box = target.getBoundingClientRect();
      const fromKeyboard = event.detail === 0;
      setTip({
        id: Date.now(),
        text: target.dataset.demo,
        x: fromKeyboard ? box.left + box.width / 2 : event.clientX,
        y: fromKeyboard ? box.top : event.clientY,
      });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    if (!tip) return undefined;
    const timer = window.setTimeout(() => setTip(null), 1700);
    return () => window.clearTimeout(timer);
  }, [tip]);

  if (!tip) return null;

  return (
    <div
      key={tip.id}
      role="status"
      className="demo-tip pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full border-2 border-black bg-white px-4 py-1.5 text-sm font-extrabold shadow-hard-sm"
      style={{ left: tip.x, top: tip.y - 14 }}
    >
      {tip.text}
    </div>
  );
}
