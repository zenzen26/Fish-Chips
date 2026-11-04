import { useState } from 'react';
import Button from '../../primitive/Button';
import Select from '../../primitive/Select';
import Divider from '../../primitive/Divider';
import { image } from '../../../lib/images';
import home from '../../../data/home.json';
import site from '../../../data/site.json';
import Icon from '../../primitive/Icon';
import { reveal } from '../../../lib/reveal';

const { title, lede, fields, enquiryTypes, defaultType, submitLabel, plateAlt } = home.contact;

export default function Contact() {
  const [type, setType] = useState(defaultType);

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate -mt-px overflow-clip bg-white">
      <img
        src={image('red-checkered-cloth')}
        alt=""
        width="1290"
        height="864"
        className="absolute left-0 top-2 -z-10 w-[min(62%,20rem)] -scale-y-100 [mask-image:linear-gradient(to_right,black_66%,transparent_75%)] lg:w-[min(30vw,32rem)] lg:[mask-image:none]"
        {...reveal('fade', 0.1)}
      />
      <img
        src={image('red-checkered-cloth')}
        alt=""
        width="1290"
        height="864"
        className="absolute bottom-0 right-0 -z-10 w-[min(70%,22rem)] -scale-x-100 translate-y-[14%] lg:w-[min(50vw,52rem)]"
        {...reveal('fade', 0.2)}
      />
      <Divider shape="wave" tone="white" edge="top" />
      <img
        src={image('crayon-fish')}
        alt=""
        width="817"
        height="319"
        className="fish-swim pointer-events-none absolute right-[8%] top-[5.5rem] hidden w-36 rotate-6 md:block lg:top-24 lg:w-52"
      />
      <div className="mx-auto max-w-[80rem] px-4 pt-16 text-center md:pt-24">
        <h2 id="contact-title" className="display-section text-blue" {...reveal('rise')}>
          {title}
        </h2>
        <p className="lead mx-auto mt-4 max-w-[40rem]" {...reveal('rise', 0.1)}>
          {lede}
        </p>
        <p className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-1 font-extrabold text-blue" {...reveal('rise', 0.2)}>
          <a href={`tel:${site.phoneHref}`} className="inline-flex items-center gap-2">
            <Icon name="phone" className="h-5 w-5" />
            <span className="underline underline-offset-4">{site.phone}</span>
          </a>
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2">
            <Icon name="mail" className="h-5 w-5" />
            <span className="underline underline-offset-4">{site.email}</span>
          </a>
        </p>
      </div>

      <div className="relative mx-auto mt-10 max-w-[80rem] pb-8 md:pb-12">
        <div className="absolute -bottom-8 -left-[5%] z-0 hidden w-[25%] lg:block" {...reveal('left', 0.3)}>
          <img src={image('left-hand-fork')} alt="" width="273" height="794" className="hand-wiggle w-full" />
        </div>
        <div className="absolute -bottom-8 -right-[5%] z-0 hidden w-[25%] lg:block" {...reveal('right', 0.3)}>
          <img
            src={image('right-hand-knife')}
            alt=""
            width="276"
            height="794"
            className="hand-wiggle w-full [animation-delay:-1.4s] [animation-direction:alternate-reverse]"
          />
        </div>

        <div
          className="relative left-1/2 z-10 w-[150vw] -translate-x-1/2 lg:left-auto lg:mx-auto lg:w-[50rem] lg:translate-x-0"
          {...reveal('zoom', 0.1)}
        >
          <img src={image('yellow-plate')} alt={plateAlt} width="1241" height="1257" className="block w-full" />

          <form
            onSubmit={(event) => event.preventDefault()}
            className="absolute left-1/2 top-1/2 w-[60%] -translate-x-1/2 -translate-y-1/2 space-y-3 lg:space-y-3.5"
          >
            <div {...reveal('rise', 0.45)}>
              <label htmlFor="contact-name" className="field-label">
                {fields.name}
              </label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required className="field-input" />
            </div>
            <div {...reveal('rise', 0.53)}>
              <label htmlFor="contact-email" className="field-label">
                {fields.email}
              </label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required className="field-input" />
            </div>
            <div {...reveal('rise', 0.61)}>
              <Select label={fields.type} name="type" options={enquiryTypes} value={type} onChange={setType} />
            </div>
            <div {...reveal('rise', 0.69)}>
              <label htmlFor="contact-message" className="field-label">
                {fields.message}
              </label>
              <textarea id="contact-message" name="message" rows="3" required className="field-input" />
            </div>
            <div className="flex justify-center pt-1" {...reveal('rise', 0.77)}>
              <Button type="submit" variant="ink" data-demo="Demo form">
                {submitLabel}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
