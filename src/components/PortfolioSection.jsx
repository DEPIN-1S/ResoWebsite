import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projectsData, whatsappUrl } from '../data/siteData';
import { Reveal, SplitLines, EASE } from './ui/motion';

const SPRING = { stiffness: 70, damping: 20, mass: 0.5 };
const ROTATES = [-8, 6, -5, 9, -7, 5, 8, -6, 7, -4, 5];
const SPEED = 38;

export default function PortfolioSection({ onSelect }) {
  const items = useMemo(() => projectsData.filter((p) => p.cover), []);
  const loop = useMemo(() => [...items, ...items], [items]);
  const stageRef = useRef(null);
  const pitchRef = useRef(176);
  const [finePointer, setFinePointer] = useState(true);
  const [inside, setInside] = useState(false);
  const [hoverId, setHoverId] = useState(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const runX = useMotionValue(0);
  const sx = useSpring(mx, SPRING);
  const sy = useSpring(my, SPRING);

  const mouseX = useTransform(sx, [-1, 1], [70, -70]);
  const stripY = useTransform(sy, [-1, 1], [18, -18]);
  const stripRotate = useTransform(sx, [-1, 1], [-2.5, 2.5]);
  const stripX = useTransform([runX, mouseX], ([run, mouse]) => run + mouse);
  const ghostX = useTransform(sx, [-1, 1], [-70, 70]);
  const ghostY = useTransform(sy, [-1, 1], [-24, 24]);
  const ghost2X = useTransform(sx, [-1, 1], [50, -90]);
  const ghost2Y = useTransform(sy, [-1, 1], [18, -30]);
  const lightX = useTransform(sx, [-1, 1], ['22%', '78%']);
  const lightY = useTransform(sy, [-1, 1], ['32%', '70%']);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const measure = () => {
      const card = stageRef.current?.querySelector('.work__card');
      if (!card) return;
      const mr = Number.parseFloat(getComputedStyle(card).marginRight) || 0;
      pitchRef.current = Math.max(80, card.offsetWidth + mr);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [items.length]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduce || items.length < 2) return undefined;

    let frame = 0;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const width = pitchRef.current * items.length;
      let next = runX.get() - SPEED * dt;
      if (next <= -width) next += width;
      runX.set(next);
      const raw = Math.round(-next / pitchRef.current) % items.length;
      const index = raw < 0 ? raw + items.length : raw;
      setActive((prev) => (prev === index ? prev : index));
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [paused, items.length, runX]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden || inside);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [inside]);

  const onPointer = useCallback((e) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    mx.set(Math.max(-1, Math.min(1, nx)));
    my.set(Math.max(-1, Math.min(1, ny)));
    cx.set(e.clientX - r.left);
    cy.set(e.clientY - r.top);
  }, [cx, cy, mx, my]);

  const resetPointer = useCallback(() => {
    mx.set(0);
    my.set(0);
    setInside(false);
    setHoverId(null);
    setPaused(false);
  }, [mx, my]);

  const activeIndex = useMemo(() => {
    if (hoverId) {
      const found = items.findIndex((p) => p.id === hoverId);
      return found >= 0 ? found : active;
    }
    return active;
  }, [hoverId, items, active]);

  const featured = items[activeIndex] ?? items[0];
  const hotCursor = Boolean(hoverId);

  return (
    <section
      id="work"
      ref={stageRef}
      className={`work ${finePointer ? 'work--cursor' : ''}`}
      aria-label="Explore our work"
      onPointerMove={(e) => {
        if (e.pointerType === 'mouse') setInside(true);
        setPaused(true);
        onPointer(e);
      }}
      onPointerLeave={resetPointer}
    >
      <span className="work__blob work__blob--a" aria-hidden="true" />
      <span className="work__blob work__blob--b" aria-hidden="true" />
      <motion.span
        className="work__light"
        style={{ left: lightX, top: lightY }}
        aria-hidden="true"
      />

      <motion.span className="work__ghost work__ghost--a" style={{ x: ghostX, y: ghostY }} aria-hidden="true">
        Work
      </motion.span>
      <motion.span className="work__ghost work__ghost--b" style={{ x: ghost2X, y: ghost2Y }} aria-hidden="true">
        Work
      </motion.span>

      <div className="work__head">
        <Reveal><span className="kicker kicker--light">Explore our work</span></Reveal>
        <SplitLines lines={['Real rooms,', 'real joinery.']} className="serif serif--lg" />
      </div>

      <div className="work__stage">
        <div className="work__origin">
          <motion.div
            className="work__strip"
            style={{ x: stripX, y: stripY, rotate: stripRotate }}
          >
            {loop.map((project, i) => {
              const realIndex = i % items.length;
              const dist = Math.abs(realIndex - activeIndex);
              const featuredCard = realIndex === activeIndex;
              const mid = (items.length - 1) / 2;
              return (
                <motion.button
                  key={`${project.id}-${i}`}
                  type="button"
                  className={`work__card ${featuredCard ? 'is-active' : ''}`}
                  aria-label={`Open ${project.title}`}
                  aria-current={featuredCard ? 'true' : undefined}
                  onClick={() => onSelect(project)}
                  onMouseEnter={() => setHoverId(project.id)}
                  onMouseLeave={() => setHoverId(null)}
                  initial={false}
                  animate={{
                    rotate: ROTATES[realIndex % ROTATES.length],
                    y: (realIndex - mid) * 12,
                    scale: 1,
                    zIndex: featuredCard ? 24 : 12 - dist,
                  }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <img src={project.cover} alt="" loading="lazy" draggable="false" />
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="work__meta">
        <div>
          <span className="caps">{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
          <strong>{featured.title}</strong>
          <em>{featured.location}</em>
        </div>
        <a href={whatsappUrl()} className="work__cta" target="_blank" rel="noopener noreferrer">
          Plan something similar <ArrowUpRight size={14} />
        </a>
      </div>

      {finePointer && inside && (
        <motion.div
          className={`work__cursor ${hotCursor ? 'is-hot' : ''}`}
          style={{ left: cx, top: cy }}
          aria-hidden="true"
        >
          {hotCursor ? 'View' : ''}
        </motion.div>
      )}
    </section>
  );
}
