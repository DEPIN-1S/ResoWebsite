import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { heroContent } from '../data/siteData';

const INTRO_HOLD = 2100;

function BounceWord({ word, delay, play }) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (play === 'static') {
      controls.set({ y: 0, opacity: 1 });
      return undefined;
    }
    if (play !== true) return undefined;

    let cancelled = false;
    (async () => {
      await new Promise((resolve) => window.setTimeout(resolve, delay * 1000));
      if (cancelled) return;
      await controls.start({
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 520, damping: 10, mass: 0.68 },
      });
      if (cancelled) return;
      controls.start({
        y: [0, -16, 0],
        opacity: 1,
        transition: {
          duration: 0.7,
          repeat: Infinity,
          repeatDelay: 2.4,
          ease: [0.34, 1.7, 0.64, 1],
        },
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [play, delay, controls]);

  if (play === 'static') {
    return <span className="hero__word">{word}</span>;
  }

  return (
    <motion.span
      className="hero__word"
      initial={{ y: 70, opacity: 0 }}
      animate={controls}
    >
      {word}
    </motion.span>
  );
}

function BounceLine({ text, delay = 0, play }) {
  return (
    <span className="hero__line">
      {text.split(' ').map((word, i) => (
        <BounceWord key={`${word}-${i}`} word={word} delay={delay + i * 0.1} play={play} />
      ))}
    </span>
  );
}

export default function Hero() {
  const { slides, interval, headline, subhead, proof } = heroContent;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [bouncePlay, setBouncePlay] = useState(false);
  const touchX = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setBouncePlay('static');
      return undefined;
    }
    const id = window.setTimeout(() => setBouncePlay(true), INTRO_HOLD);
    return () => window.clearTimeout(id);
  }, []);

  const total = slides.length;
  const current = slides[active];
  const go = useCallback((dir) => {
    setActive((i) => (i + dir + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused || total < 2) return undefined;
    const id = window.setInterval(() => setActive((i) => (i + 1) % total), interval);
    return () => window.clearInterval(id);
  }, [paused, interval, total]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('keydown', onKey);
    };
  }, [go]);

  return (
    <section
      id="top"
      className="hero"
      aria-label="Introduction"
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (dx > 56) go(-1);
        if (dx < -56) go(1);
      }}
    >
      <div className="hero__scene" aria-hidden="true">
        <div className="hero__stage">
          {slides.map((s, i) => (
            <div key={s.src} className={`hero__slide ${i === active ? 'is-active' : ''}`}>
              <img
                src={s.src}
                alt=""
                decoding="async"
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'low'}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="hero__veil" />

      <div className="hero__copy">
        <h1 className="hero__title">
          {headline.map((line, i) => (
            <BounceLine key={line} text={line} delay={0.06 + i * 0.2} play={bouncePlay} />
          ))}
        </h1>
        <p className="hero__sub">{subhead}</p>
      </div>

      <aside className="hero__proof">
        <div className="hero__avatars">
          {proof.faces.map((src) => (
            <img key={src} src={src} alt="" />
          ))}
        </div>
        <div>
          <strong>{proof.value}</strong>
          <span>{proof.label}</span>
        </div>
      </aside>

      <div
        className="hero__pager"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(document.hidden)}
      >
        <span>{String(active + 1).padStart(2, '0')}</span>
        <button
          type="button"
          className="hero__progress"
          aria-label={`Slide ${active + 1} of ${total}. Play next.`}
          onClick={() => go(1)}
        >
          <i
            key={active}
            style={{ animationDuration: `${interval}ms`, animationPlayState: paused ? 'paused' : 'running' }}
          />
        </button>
        <span>{String(total).padStart(2, '0')}</span>
      </div>

      <a className="hero__spot" href="#work">
        <div className="hero__spot-top">
          <span className="hero__spot-pin"><MapPin size={16} /></span>
          <span className="hero__spot-go"><ArrowUpRight size={16} /></span>
        </div>
        <strong>{current.title}</strong>
        <p>{current.blurb}</p>
      </a>

      {total > 1 && (
        <>
          <button type="button" className="hero__arrow hero__arrow--prev" aria-label="Previous slide" onClick={() => go(-1)}>
            <ChevronLeft size={22} />
          </button>
          <button type="button" className="hero__arrow hero__arrow--next" aria-label="Next slide" onClick={() => go(1)}>
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </section>
  );
}
