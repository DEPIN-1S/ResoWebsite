import React from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '../data/siteData';
import { Reveal, SplitLines } from './ui/motion';

export default function TestimonialsSection() {
  return (
    <section className="reviews section" aria-label="Client testimonials">
      <div className="container">
        <div className="section-head section-head--split">
          <div style={{ display: 'grid', gap: 18 }}>
            <Reveal><span className="kicker">Client experience</span></Reveal>
            <SplitLines lines={['Kind words from', 'Dubai homes.']} className="serif serif--lg" />
          </div>
          <Reveal delay={0.1}>
            <p className="lead">
              Villas, penthouses and offices across Dubai — here is what clients say after the last door is hung.
            </p>
          </Reveal>
        </div>

        <div className="reviews__grid">
          {testimonials.map((t, i) => (
            <Reveal key={t.quote} as="article" delay={i * 0.08} className="review">
              <div className="review__img"><img src={t.image} alt={t.role} loading="lazy" /></div>
              <div className="review__stars" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={13} fill="currentColor" />)}
              </div>
              <blockquote>“{t.quote}”</blockquote>
              <div className="review__who">
                <strong>{t.name}</strong>
                <span>{t.role} · {t.location}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
