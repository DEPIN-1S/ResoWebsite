import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { processSteps, whatsappUrl } from '../data/siteData';
import { Reveal, SplitLines, EASE } from './ui/motion';

export default function ProcessTimeline() {
  return (
    <section id="process" className="process section">
      <span className="topo" />
      <div className="container">
        <div className="process__grid">
          <div className="process-intro">
            <Reveal><span className="kicker">Step by step</span></Reveal>
            <SplitLines lines={['Path to', 'handover.']} className="serif serif--lg" />
            <Reveal delay={0.12}>
              <p className="lead">
                Five phases, one team. From the first measure to keys in hand, the same studio designs, makes and installs.
              </p>
            </Reveal>
          </div>

          {processSteps.map((step, i) => (
            <motion.article
              key={step.number}
              className="svc-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-6% 0px' }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: EASE }}
            >
              <span className="svc-card__img"><img src={step.image} alt="" loading="lazy" /></span>
              <span className="svc-card__top">
                <span className="svc-card__num">{step.number}</span>
              </span>
              <span className="svc-card__body">
                <h3>{step.title}</h3>
                <p>{step.subtitle}</p>
              </span>
              <span className="svc-card__foot">
                <span>Phase {step.number} of 05</span>
                <span>On site</span>
              </span>
            </motion.article>
          ))}

          <motion.a
            href={whatsappUrl('Hello Resco Star, I would like to start with a design consultation in Dubai.')}
            className="svc-cta"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-6% 0px' }}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
          >
            <span className="svc-cta__ring"><ArrowUpRight size={26} /></span>
            <strong>Begin with a consultation</strong>
            <p>Message us on WhatsApp — we will map your path to handover.</p>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
