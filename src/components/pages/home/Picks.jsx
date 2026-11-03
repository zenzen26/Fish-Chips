import { useState } from 'react';
import Button from '../../primitive/Button';
import { image } from '../../../lib/images';
import { money } from '../../../lib/money';
import home from '../../../data/home.json';

const { title, lede, items, cta, demoNote, foodAlt } = home.picks;

export default function Picks() {
  // Touch screens have no hover: tapping a plate toggles the same lift.
  const [active, setActive] = useState(null);

  return (
    <section id="picks" aria-labelledby="picks-title" className="relative isolate overflow-clip grid-bg text-white">
      <div className="mx-auto max-w-[80rem] px-4 py-16 md:py-24">
        <h2 id="picks-title" className="display-section">
          {title}
        </h2>
        <p className="lead mt-4 max-w-[40rem]">{lede}</p>

        <ul className="mt-16 grid gap-16 md:mt-24 md:grid-cols-[1fr_1.25fr_1fr] md:items-end md:gap-6">
          {items.map((item, index) => {
            const on = active === index;
            return (
              <li key={item.name}>
                <button
                  type="button"
                  aria-pressed={on}
                  data-active={on}
                  onClick={() => setActive(on ? null : index)}
                  className="group block w-full cursor-pointer text-center"
                >
                  <span className="relative mx-auto block w-full max-w-[28rem] md:max-w-none">
                    <img src={image('tray-sheets')} alt="" width="709" height="406" className="block w-full" />
                    <img
                      src={image('fish-chip-set')}
                      alt={foodAlt}
                      width="550"
                      height="316"
                      className="absolute left-[4%] top-[-14%] w-[92%] transition duration-500 ease-(--ease-spring) group-hover:-translate-y-4 group-hover:scale-110 group-focus-visible:-translate-y-4 group-focus-visible:scale-110 group-data-[active=true]:-translate-y-4 group-data-[active=true]:scale-110"
                    />
                  </span>
                  <span className="mt-6 block text-xl font-extrabold">{item.name}</span>
                  <span className="mt-1 block font-display text-3xl text-yellow">{money(item.price)}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 text-center lg:mt-28">
          <Button to={cta.to}>
            {cta.label}
          </Button>
          <p className="note mt-6 text-white/70 !text-base">{demoNote}</p>
        </div>
      </div>
    </section>
  );
}
