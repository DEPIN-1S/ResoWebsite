import React from 'react';
import { trustItems } from '../data/siteData';
import { Reveal } from './ui/motion';

export default function TrustBar() {
  const items = [...trustItems, ...trustItems];
  return (
    <section className="trust" aria-label="Credentials">
      <div className="container">
        <Reveal as="h3" y={14}>We are trusted across Dubai</Reveal>
      </div>
      <div className="trust__track-wrap">
        <div className="trust__track">
          {items.map((t, i) => (
            <span key={`${t}-${i}`} className="trust__item">
              <i />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
