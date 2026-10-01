import React from 'react';
import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react';
import { navLinks, servicesData, siteMeta, whatsappUrl } from '../data/siteData';
import { Reveal, SplitLines } from './ui/motion';
import { Brand } from './Navbar';

export default function Footer() {
  const office = siteMeta.offices[0];
  return (
    <footer className="footer">
      <span className="ghost">Resco</span>
      <div className="container">
        <div className="footer__cta">
          <div style={{ display: 'grid', gap: 18 }}>
            <Reveal><span className="kicker kicker--light">Ready when you are</span></Reveal>
            <SplitLines lines={['Let’s build something', 'made to last.']} className="serif serif--lg" />
          </div>
          <Reveal delay={0.15}>
            <a href={whatsappUrl()} className="btn btn--sand" target="_blank" rel="noopener noreferrer">
              Message on WhatsApp <ArrowUpRight size={15} />
            </a>
          </Reveal>
        </div>

        <div className="footer__grid">
          <div className="footer__brand">
            <Brand />
            <p>{siteMeta.description}</p>
            <div className="footer__social">
              {siteMeta.social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>{s.short}</a>
              ))}
            </div>
          </div>

          <div className="footer__col">
            <h4>Quick links</h4>
            {navLinks.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </div>

          <div className="footer__col">
            <h4>Services</h4>
            {servicesData.map((s) => <a key={s.id} href="#services">{s.title}</a>)}
          </div>

          <div className="footer__col footer__news">
            <h4>WhatsApp</h4>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle size={14} />Chat with the studio</a>
            <a href={siteMeta.mapUrl} target="_blank" rel="noreferrer"><MapPin size={14} />{office.address}</a>
            <p>Tap to send a brief or a photo of the room. We reply on WhatsApp.</p>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {siteMeta.fullName}. All rights reserved.</span>
          <span>
            Dubai, UAE
            <a href="#top">Privacy Policy</a>
            <a href="#top">Terms of Service</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
