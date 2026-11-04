import ArrowNote from '../../primitive/ArrowNote';
import { image } from '../../../lib/images';
import home from '../../../data/home.json';
import { reveal } from '../../../lib/reveal';

const { lines, noteLeft, noteRight, plateAlt } = home.hero;
const [top, joiner, bottom] = lines;

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative bg-white isolate flex max-h-[95vh] flex-col overflow-clip">
      <div aria-hidden="true" className="grid-bg absolute inset-x-0 top-0 -z-10 h-[74%]" />

      <img
        src={image('cilantro')}
        alt=""
        width="612"
        height="505"
        className="absolute -left-[6%] -top-[3%] w-[clamp(9rem,27vw,26rem)] -scale-x-100 -rotate-6"
        {...reveal('left', 0.1)}
      />
      <img
        src={image('tomato')}
        alt=""
        width="319"
        height="368"
        className="absolute -right-[3%] -top-[2%] w-[clamp(5.5rem,15vw,15rem)] -scale-x-100 rotate-6"
        {...reveal('right', 0.1)}
      />
      <img
        src={image('tomato')}
        alt=""
        width="319"
        height="368"
        className="absolute -bottom-[1%] -left-[3%] z-20 w-[clamp(5.5rem,15vw,15rem)] -rotate-12"
        {...reveal('left', 0.25)}
      />
      <img
        src={image('cilantro')}
        alt=""
        width="612"
        height="505"
        className="absolute -bottom-[3%] -right-[5%] z-20 w-[clamp(8rem,24vw,22rem)] rotate-12"
        {...reveal('right', 0.25)}
      />

      <div className="relative mx-auto flex min-h-0 w-full max-w-[80rem] flex-1 flex-col px-4 pt-[clamp(4rem,12vh,8rem)] text-center">
        <h1 id="hero-title" className="relative z-20 flex flex-col items-center text-yellow">
          <span className="display-hero relative -rotate-2" {...reveal('drop', 0.15)}>
            {top}
            <svg
              viewBox="-50 -50 100 100"
              className="absolute -right-[0.3em] -top-[0.12em] z-30 w-[0.55em] rotate-12 text-white"
              {...reveal('spin', 0.95)}
              fill="currentColor"
              aria-hidden="true"
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <path key={deg} d="M0 0L-12 -36A12 12 0 0 1 12 -36Z" transform={`rotate(${deg})`} />
              ))}
            </svg>
          </span>
          <span
            className="ui-label z-10 -my-2 -rotate-3 tape px-6 py-1 text-[clamp(1rem,3vw,2rem)] text-blue md:-my-5 md:px-9"
            {...reveal('pop', 0.55)}
          >
            {joiner}
          </span>
          <span className="display-hero rotate-2" {...reveal('rise', 0.35)}>
            {bottom}
          </span>
        </h1>

        <ArrowNote text={noteLeft} className="absolute left-[3%] top-[48%] z-30 hidden lg:flex" {...reveal('left', 0.9)} />
        <ArrowNote text={noteRight} flip className="absolute right-[3%] top-[44%] z-30 hidden lg:flex" {...reveal('right', 0.9)} />

        <img
          src={image('fish-chip-hero')}
          alt={plateAlt}
          width="1224"
          height="642"
          className="relative z-10 mx-auto -mt-[4vw] min-h-0 w-[min(100%,72rem)] flex-1 object-contain pb-6 md:pb-10"
          {...reveal('rise', 0.6)}
        />
      </div>
    </section>
  );
}
