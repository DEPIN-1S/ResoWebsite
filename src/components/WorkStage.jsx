import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { workShowcase } from '../data/siteData';
import { EASE } from './ui/motion';

function wrappedOffset(index, active, length) {
  let d = index - active;
  if (d > length / 2) d -= length;
  if (d < -length / 2) d += length;
  return d;
}

const SLOTS = {
  [-2]: { x: -430, y: 36, rotate: -14, scale: 0.78 },
  [-1]: { x: -220, y: -28, rotate: -7, scale: 0.9 },
  0: { x: 0, y: 0, rotate: 2, scale: 1.08 },
  1: { x: 220, y: 24, rotate: 9, scale: 0.9 },
  2: { x: 430, y: -20, rotate: 14, scale: 0.78 },
};

export default function WorkStage() {
  const { ghost, kicker, cta, interval, cards } = workShowcase;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [factor, setFactor] = useState(1);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setFactor(w < 640 ? 0.38 : w < 900 ? 0.55 : w < 1200 ? 0.78 : 1);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (paused || cards.length < 2) return undefined;
    const id = window.setInterval(() => setActive((i) => (i + 1) % cards.length), interval);
    return () => window.clearInterval(id);
  }, [paused, interval, cards.length]);

  const featured = cards[active];
  const layout = useMemo(
    () => cards.map((card, i) => ({ card, offset: wrappedOffset(i, active, cards.length), index: i })),
    [cards, active],
  );

  return (
    <section
      className="stage"
      aria-label="Selected work"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="ghost stage__ghost">{ghost}</span>
      <span className="stage__blob stage__blob--a" aria-hidden="true" />
      <span className="stage__blob stage__blob--b" aria-hidden="true" />

      <div className="stage__head">
        <span className="kicker kicker--light kicker--center">{kicker}</span>
        <p>{featured.title}</p>
      </div>

      <div className="stage__fan" role="list">
        {layout.map(({ card, offset, index }) => {
          const slot = SLOTS[offset] ?? { x: 0, y: 80, rotate: 0, scale: 0.45 };
          const visible = Math.abs(offset) <= 2;
          return (
            <motion.button
              key={card.src}
              type="button"
              role="listitem"
              className={`stage__card ${offset === 0 ? 'is-active' : ''}`}
              aria-label={card.title}
              aria-current={offset === 0}
              onClick={() => setActive(index)}
              initial={false}
              animate={{
                x: slot.x * factor,
                y: slot.y * factor,
                rotate: visible ? slot.rotate : card.rotate,
                scale: visible ? slot.scale : 0.4,
                opacity: visible ? 1 : 0,
                zIndex: 20 - Math.abs(offset),
              }}
              transition={{ duration: 0.85, ease: EASE }}
              style={{ pointerEvents: visible ? 'auto' : 'none' }}
            >
              <img src={card.src} alt="" draggable="false" />
            </motion.button>
          );
        })}
      </div>

      <a href="#work" className="stage__cta">{cta}</a>
    </section>
  );
}
