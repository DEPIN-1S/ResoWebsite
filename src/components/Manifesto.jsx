import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Hammer } from 'lucide-react';
import { manifesto } from '../data/siteData';
import { Reveal } from './ui/motion';

export default function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={ref} className="manifesto" aria-label="Our philosophy">
      <motion.div className="manifesto__bg" style={{ y, scale }}>
        <img src={manifesto.image} alt="" loading="lazy" />
      </motion.div>
      <div className="manifesto__shade" />

      <div className="manifesto__inner">
        <Reveal y={10}><span className="manifesto__small">{manifesto.small}</span></Reveal>
        <Reveal delay={0.08} y={10}><span className="manifesto__script">Bespoke joinery studio</span></Reveal>
        <Reveal delay={0.15} y={26}><h2 className="manifesto__line">{manifesto.lineA}</h2></Reveal>
        <Reveal delay={0.25} y={10}><span className="manifesto__caps">{manifesto.caps}</span></Reveal>
        <Reveal delay={0.32} y={26}><h2 className="manifesto__line"><em>{manifesto.lineB}</em></h2></Reveal>
        <Reveal delay={0.42} y={14}><p className="manifesto__copy">{manifesto.copy}</p></Reveal>
        <Reveal delay={0.5} y={10}>
          <span className="manifesto__orb"><Hammer size={22} /></span>
        </Reveal>
      </div>
    </section>
  );
}
