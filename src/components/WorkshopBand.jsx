import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { workshopContent } from '../data/siteData';
import { Reveal, SplitLines } from './ui/motion';

export default function WorkshopBand() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ghostX = useTransform(scrollYProgress, [0, 1], ['-58%', '-42%']);
  const yA = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yB = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const yC = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const [ca, cb, cc] = workshopContent.cards;

  return (
    <section ref={ref} className="band" aria-label="Inside the workshop">
      <motion.span className="ghost" style={{ x: ghostX, y: '-50%' }}>{workshopContent.ghost}</motion.span>

      <div className="container band__inner">
        <div className="band__copy">
          <Reveal><span className="kicker">{workshopContent.kicker}</span></Reveal>
          <SplitLines lines={workshopContent.title} className="serif serif--md" />
          <Reveal delay={0.2}><p>{workshopContent.copy}</p></Reveal>
          <Reveal delay={0.3} className="band__facts">
            {workshopContent.facts.map((f) => (
              <div key={f.label}>
                <strong>{f.value}</strong>
                <span>{f.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="band__cards">
          <motion.figure className="tilt tilt--a" style={{ y: yA, rotate: ca.rotate }}>
            <img src={ca.src} alt={ca.alt} loading="lazy" />
          </motion.figure>
          <motion.figure className="tilt tilt--b" style={{ y: yB, rotate: cb.rotate }}>
            <video autoPlay muted loop playsInline preload="metadata">
              <source src={workshopContent.video} type="video/mp4" />
            </video>
          </motion.figure>
          <motion.figure className="tilt tilt--c" style={{ y: yC, rotate: cc.rotate }}>
            <img src={cc.src} alt={cc.alt} loading="lazy" />
          </motion.figure>
          <Reveal delay={0.3} className="band__pill" y={20}>
            <a href="#contact" className="btn btn--dark">Visit the workshop <ArrowUpRight size={15} /></a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
