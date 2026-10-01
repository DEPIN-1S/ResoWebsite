import React from 'react';
import { ArrowUpRight, Clock, MapPin, MessageCircle } from 'lucide-react';
import { siteMeta, whatsappUrl } from '../data/siteData';
import { Reveal, SplitLines } from './ui/motion';

export default function VisitSection() {
  const office = siteMeta.offices[0];
  const studio = siteMeta.offices[1];

  return (
    <section className="visit section" aria-label="Visit us">
      <div className="visit__bg"><img src="/gallery/workshop-console.jpg" alt="" loading="lazy" /></div>
      <div className="visit__shade" />

      <div className="container">
        <div className="section-head" style={{ marginBottom: 0 }}>
          <Reveal><span className="kicker">Visit us</span></Reveal>
          <SplitLines lines={['Journey to the', 'workshop.']} className="serif serif--lg" />
        </div>

        <div className="visit__cards">
          <Reveal className="vcard">
            <span className="vcard__icon"><MapPin size={20} /></span>
            <h3>Resco Star Interiors</h3>
            <p>{office.city}<br />{office.address}</p>
            <div className="vcard__foot">
              <span>{siteMeta.coords}</span>
              <a href={siteMeta.mapUrl} target="_blank" rel="noreferrer" className="link-arrow">Navigate <ArrowUpRight size={14} /></a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="vcard">
            <span className="vcard__icon"><Clock size={20} /></span>
            <small>Hours</small>
            <p>{siteMeta.hours.days}</p>
            <span className="vcard__big">{siteMeta.hours.time}</span>
            <div className="vcard__foot"><span>Design studio · {studio.address}</span></div>
          </Reveal>

          <Reveal delay={0.2} className="vcard">
            <span className="vcard__icon"><MessageCircle size={20} /></span>
            <small>WhatsApp</small>
            <a className="vcard__big" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Message the studio</a>
            <p>Send a photo of the room. We reply on WhatsApp.</p>
            <div className="vcard__foot">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="link-arrow">Open chat <ArrowUpRight size={14} /></a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
