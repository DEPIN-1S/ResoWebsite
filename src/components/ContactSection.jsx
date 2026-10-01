import React, { useRef, useState } from 'react';
import { Clock, Mail, MessageCircle, Send } from 'lucide-react';
import { contactTypes, siteMeta, whatsappUrl } from '../data/siteData';
import { Reveal, SplitLines } from './ui/motion';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  message: '',
  website: '',
};

function validateForm(values) {
  if (!values.name.trim() || !values.email.trim() || !values.phone.trim() || !values.message.trim()) {
    return 'Please complete all required fields.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    return 'Please enter a valid email address.';
  }

  if (!/^[0-9+().\-\s]{7,30}$/.test(values.phone.trim())) {
    return 'Please enter a valid phone number.';
  }

  if (values.name.trim().length > 100 || values.email.trim().length > 254 || values.phone.trim().length > 30 || values.message.trim().length > 3000) {
    return 'One or more fields are too long.';
  }

  return '';
}

export default function ContactSection() {
  const [activeChannel, setActiveChannel] = useState('whatsapp');
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formStartedAt = useRef(Date.now());

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (status.message) setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validationMessage = validateForm(form);
    if (validationMessage) {
      setStatus({ type: 'error', message: validationMessage });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/send-enquiry.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
          website: form.website,
          formStartedAt: formStartedAt.current,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Unable to send your enquiry. Please try again.');
      }

      setForm(initialForm);
      formStartedAt.current = Date.now();
      setStatus({ type: 'success', message: data.message });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to send your enquiry. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact section">
      <span className="ghost">Enquire</span>
      <div className="container">
        <div className="contact__grid">
          <div className="contact__intro">
            <Reveal><span className="kicker">Start a project</span></Reveal>
            <SplitLines lines={['Tell us about', 'your project.']} className="serif serif--xl" />
            <Reveal delay={0.15}>
              <p className="lead">
                Send a quick WhatsApp message or share a detailed brief by email. A Resco Star designer will reply with the next steps.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="contact__hours">
              <Clock size={16} />
              <span>{siteMeta.hours.days} · {siteMeta.hours.time} · Dubai</span>
            </Reveal>
          </div>

          <div className="contact__channels">
            <Reveal delay={0.12} className="contact-card">
              <div className="contact-switch" role="tablist" aria-label="Choose enquiry method">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeChannel === 'whatsapp'}
                  className={activeChannel === 'whatsapp' ? 'is-active' : ''}
                  onClick={() => setActiveChannel('whatsapp')}
                >
                  <MessageCircle size={17} />
                  WhatsApp
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeChannel === 'email'}
                  className={activeChannel === 'email' ? 'is-active' : ''}
                  onClick={() => setActiveChannel('email')}
                >
                  <Mail size={17} />
                  Email
                </button>
              </div>

              {activeChannel === 'whatsapp' ? (
                <div className="contact-panel contact-panel--whatsapp" role="tabpanel">
                  <span className="wa-card__mark" aria-hidden="true">
                    <MessageCircle size={28} />
                  </span>
                  <h3>WhatsApp enquiry</h3>
                  <p>Send a photo, room details or a quick question. We usually reply within a few hours on working days.</p>

                  <div className="wa-card__numbers">
                    {siteMeta.whatsappNumbers
                      .filter(({ number }) => number)
                      .map(({ label, number }) => (
                        <a
                          key={number}
                          className="btn wa-card__btn"
                          href={whatsappUrl(undefined, number)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle size={18} />
                          {label}
                        </a>
                      ))}
                  </div>

                  <div className="wa-card__types">
                    <small>Or start with a service</small>
                    <div className="chips">
                      {contactTypes.map((t) => (
                        <a
                          key={t}
                          className="chip"
                          href={whatsappUrl(`Hello Resco Star, I am interested in a ${t.toLowerCase()} project in Dubai.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="contact-panel" role="tabpanel">
                  <div className="enquiry-card__head">
                    <span className="enquiry-card__mark" aria-hidden="true">
                      <Mail size={24} />
                    </span>
                    <div>
                      <h3>Email enquiry</h3>
                      <p>Share your details and project brief.</p>
                    </div>
                  </div>

                  <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
                    <div className="enquiry-form__row">
                      <label>
                        <span>Name</span>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          autoComplete="name"
                          maxLength={100}
                          required
                        />
                      </label>
                      <label>
                        <span>Email</span>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          autoComplete="email"
                          maxLength={254}
                          required
                        />
                      </label>
                    </div>

                  <label>
                    <span>Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      inputMode="tel"
                      maxLength={30}
                      required
                    />
                  </label>

                  <label>
                    <span>Message</span>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      maxLength={3000}
                      required
                    />
                  </label>

                    <label className="enquiry-form__honeypot" aria-hidden="true">
                      <span>Website</span>
                      <input
                        type="text"
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </label>

                    {status.message && (
                      <p className={`enquiry-form__status is-${status.type}`} role="status" aria-live="polite">
                        {status.message}
                      </p>
                    )}

                    <button className="btn btn--dark enquiry-form__submit" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending…' : 'Send enquiry'}
                      {!isSubmitting && <Send size={16} />}
                    </button>
                  </form>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
