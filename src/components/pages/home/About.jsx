import { image } from '../../../lib/images';
import home from '../../../data/home.json';
import { reveal } from '../../../lib/reveal';

const { title, paragraphs, puffAlt } = home.about;

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative isolate overflow-clip bg-white">
      <img
        src={image('red-checkered-cloth')}
        alt=""
        width="1290"
        height="864"
        className="absolute bottom-0 left-0 -z-10 w-[min(120%,38rem)] lg:w-[min(56vw,60rem)] lg:translate-y-[18%]"
        {...reveal('fade', 0.2)}
      />
      <div className="mx-auto grid max-w-[80rem] items-center gap-10 px-4 pb-64 pt-16 md:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:py-24">
        <div className="relative mx-auto w-full max-w-[34rem] lg:-mb-24 lg:mx-0 lg:max-w-none">
          <div className="relative lg:-translate-x-[7%]" {...reveal('tilt')}>
            <img
              src={image('photo-frame')}
              alt=""
              width="890"
              height="991"
              className="relative w-full"
            />
            <img
              src={image('pufferfish')}
              alt={puffAlt}
              width="804"
              height="849"
              className="absolute left-[7%] top-[3%] w-[82%] -rotate-12"
              {...reveal('pop', 0.55)}
            />
          </div>
        </div>

        <div className="ml-auto max-w-[34rem] text-right">
          <h2 id="about-title" className="display-section text-blue" {...reveal('rise', 0.1)}>
            {title.map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </h2>
          <div className="mt-6 space-y-5">
            {paragraphs.map((text, index) => (
              <p key={text} {...reveal('rise', 0.25 + index * 0.15)}>
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
