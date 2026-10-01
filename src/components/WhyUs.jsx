import React from 'react';
import { whyUs } from '../data/siteData';
import { Reveal, SplitLines } from './ui/motion';
import Icon from './ui/Icon';

export default function WhyUs() {
  return (
    <section id="why" className="why section">
      <span className="topo" />
      <div className="container" style={{ position: 'relative' }}>
        <div className="section-head section-head--center">
          <Reveal><span className="kicker kicker--center">The Resco Star difference</span></Reveal>
          <SplitLines lines={['Why clients choose us']} className="serif serif--lg" />
          <Reveal delay={0.1}>
            <p className="lead">
              We are not a showroom that outsources. We are the workshop — and it changes everything about how a project feels.
            </p>
          </Reveal>
        </div>

        <div className="why__stack">
          {whyUs.map((w, i) => (
            <Reveal
              key={w.number}
              as="article"
              y={40}
              className={`why-card why-card--${w.tone}`}
              style={{ top: `calc(var(--nav-h) + ${16 + i * 22}px)`, zIndex: i + 1 }}
            >
              <span className="why-card__leaf" aria-hidden="true" />
              <div className="why-card__left">
                <span className="why-card__icon"><Icon name={w.icon} size={30} /></span>
                <span className="why-card__num">{w.number}</span>
              </div>
              <div className="why-card__right">
                <h3>{w.title}</h3>
                <p>{w.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
