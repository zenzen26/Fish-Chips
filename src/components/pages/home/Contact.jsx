import { useState } from 'react';
import Button from '../../primitive/Button';
import Select from '../../primitive/Select';
import { image } from '../../../lib/images';
import { mailtoUrl } from '../../../lib/contact';
import home from '../../../data/home.json';
import site from '../../../data/site.json';
import Icon from '../../primitive/Icon';

const { title, lede, demoNote, fields, enquiryTypes, defaultType, submitLabel, sentMessage, plateAlt } = home.contact;

export default function Contact() {
  const [type, setType] = useState(defaultType);
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    window.location.href = mailtoUrl({
      to: site.email,
      subject: `${type} enquiry from ${data.get('name')}`,
      body: `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nEnquiry type: ${type}\n\n${data.get('message')}`,
    });
    setSent(true);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-clip bg-white">
      <div className="mx-auto max-w-[80rem] px-4 pt-16 text-center md:pt-24">
        <h2 id="contact-title" className="display-section text-blue">
          {title}
        </h2>
        <p className="lead mx-auto mt-4 max-w-[40rem]">{lede}</p>
        <p className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-1 font-extrabold text-blue">
          <a href={`tel:${site.phoneHref}`} className="inline-flex items-center gap-2">
            <Icon name="phone" className="h-5 w-5" />
            <span className="underline underline-offset-4">{site.phone}</span>
          </a>
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2">
            <Icon name="mail" className="h-5 w-5" />
            <span className="underline underline-offset-4">{site.email}</span>
          </a>
        </p>
        <p className="note mt-3 text-black/70 !text-base">{demoNote}</p>
      </div>

      <div className="relative mx-auto mt-10 max-w-[80rem] pb-8 md:pb-12">
        <img
          src={image('left-hand-fork')}
          alt=""
          width="273"
          height="794"
          className="absolute -bottom-8 -left-[5%] z-0 hidden w-[25%] lg:block"
        />
        <img
          src={image('right-hand-knife')}
          alt=""
          width="276"
          height="794"
          className="absolute -bottom-8 -right-[5%] z-0 hidden w-[25%] lg:block"
        />

        <div className="relative left-1/2 z-10 w-[150vw] -translate-x-1/2 lg:left-auto lg:mx-auto lg:w-[50rem] lg:translate-x-0">
          <img src={image('yellow-plate')} alt={plateAlt} width="1241" height="1257" className="block w-full" />

          <form
            onSubmit={handleSubmit}
            className="absolute left-1/2 top-1/2 w-[60%] -translate-x-1/2 -translate-y-1/2 space-y-3 lg:space-y-3.5"
          >
            <div>
              <label htmlFor="contact-name" className="field-label">
                {fields.name}
              </label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required className="field-input" />
            </div>
            <div>
              <label htmlFor="contact-email" className="field-label">
                {fields.email}
              </label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required className="field-input" />
            </div>
            <Select label={fields.type} name="type" options={enquiryTypes} value={type} onChange={setType} />
            <div>
              <label htmlFor="contact-message" className="field-label">
                {fields.message}
              </label>
              <textarea id="contact-message" name="message" rows="3" required className="field-input" />
            </div>
            <div className="flex flex-col items-center gap-2 pt-1">
              <Button type="submit" variant="ink">
                {submitLabel}
              </Button>
              <p role="status" className="min-h-5 text-center text-sm font-semibold">
                {sent ? sentMessage : ''}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
