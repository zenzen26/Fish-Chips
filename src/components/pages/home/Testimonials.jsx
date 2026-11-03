import { image } from '../../../lib/images';
import home from '../../../data/home.json';
import Icon from '../../primitive/Icon';

const { title, lede, items, demoNote, fishAlt } = home.testimonials;
const [featured, leftNote, ...rightNotes] = items;

// Slight tilts and offsets so the notes look pinned up by hand. Tilts straighten on hover.
const NOTE_STYLES = ['rotate-2', '-rotate-1 lg:mr-8', 'rotate-1 lg:ml-6'];
const CARD =
  'group relative rounded-3xl border-2 border-black bg-white shadow-hard transition duration-300 ease-(--ease-spring) hover:-translate-y-2 hover:rotate-0 hover:shadow-hard-lg';

function Stars({ rating }) {
  return (
    <span role="img" aria-label={`${rating} out of 5 stars`} className="flex gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <Icon key={index} name="star" className={`h-5 w-5 stroke-black stroke-[1.5] ${index < rating ? 'fill-yellow' : 'fill-fog'}`} />
      ))}
    </span>
  );
}

function Person({ name, role }) {
  return (
    <figcaption className="mt-4 flex items-center gap-3 md:mt-6">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue font-display text-xl text-white" aria-hidden="true">
        {name[0]}
      </span>
      <span>
        <span className="block font-extrabold">{name}</span>
        <span className="block text-sm">{role}</span>
      </span>
    </figcaption>
  );
}

function Note({ note, className }) {
  return (
    <figure className={`${CARD} p-5 pt-8 md:p-6 md:pt-9 ${className}`}>
      <Tape />
      <Stars rating={note.rating} />
      <blockquote className="mt-3 text-lg font-semibold leading-snug">{note.quote}</blockquote>
      <Person name={note.name} role={note.role} />
    </figure>
  );
}

function Tape() {
  return <span className="tape absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-3 bg-fog/80" aria-hidden="true" />;
}

export default function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="relative isolate overflow-clip bg-yellow">
      <div className="mx-auto max-w-[80rem] px-4 py-16 md:py-24">
        <div className="grid gap-6 px-2 md:px-0 lg:grid-cols-12 lg:items-start lg:gap-x-8 lg:gap-y-10">
          <header className="mb-8 text-right lg:mb-0 lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <h2 id="testimonials-title" className="display-section text-blue">
              {title}
            </h2>
            <p className="lead ml-auto mt-4 max-w-[28rem]">{lede}</p>
          </header>

          <div className="lg:col-span-7 lg:row-span-2 lg:row-start-1">
            <figure className={`${CARD} -rotate-2 p-6 pt-10 md:p-12 md:pt-14`}>
              <Tape />
              <span className="absolute left-6 top-2 select-none font-display text-[5rem] leading-none text-blue md:left-10 md:text-[9rem]" aria-hidden="true">
                &ldquo;
              </span>
              <div className="relative pt-6 md:pt-14">
                <Stars rating={featured.rating} />
                <blockquote className="mt-3 text-xl font-bold leading-snug md:mt-4 md:text-3xl">{featured.quote}</blockquote>
              </div>
              <Person name={featured.name} role={featured.role} />

              <img
                src={image('crayon-fish')}
                alt={fishAlt}
                width="817"
                height="319"
                className="fish-bob pointer-events-none absolute -right-3 -top-12 w-36 rotate-6 md:-right-12 md:-top-14 md:w-60"
              />
              <img
                src={image('crayon-fish')}
                alt=""
                width="817"
                height="319"
                className="fish-bob pointer-events-none absolute -left-4 -top-10 hidden w-28 -scale-x-100 -rotate-12 [animation-delay:-1.8s] md:block md:-left-10 md:w-36"
              />
            </figure>

            <div className="relative z-10 -mt-1 lg:-mt-3 lg:ml-auto lg:w-[82%]">
              <Note note={leftNote} className={NOTE_STYLES[0]} />
            </div>
          </div>

          <div className="grid gap-4 lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:gap-12">
            {rightNotes.map((note, index) => (
              <Note key={note.name} note={note} className={NOTE_STYLES[index + 1]} />
            ))}
          </div>
        </div>

        <p className="note mt-16 text-right text-black/70 !text-base">{demoNote}</p>
      </div>
    </section>
  );
}
