import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { servicesData, whatsappUrl } from '../data/siteData';
import { Reveal, SplitLines, EASE } from './ui/motion';
import Icon from './ui/Icon';

export default function ServicesSection() {
  const [open, setOpen] = useState(null);
  const svc = open != null ? servicesData[open] : null;

  return (
    <section id="services" className="services section">
      <span className="topo" />
      <div className="container">
        <div className="services__grid">
          <div className="svc-intro">
            <Reveal><span className="kicker">Signature services</span></Reveal>
            <SplitLines lines={['What we design,', 'make & install.']} className="serif serif--lg" />
            <Reveal delay={0.15}>
              <p className="lead">
                Six joinery and fit-out disciplines delivered by one studio, one workshop and one installation team. Hover a card to preview it, tap to see what is included.
              </p>
            </Reveal>
          </div>

          {servicesData.map((s, i) => (
            <motion.button
              key={s.id}
              type="button"
              className="svc-card"
              onClick={() => setOpen((cur) => (cur === i ? null : i))}
              aria-expanded={open === i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-6% 0px' }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: EASE }}
            >
              <span className="svc-card__img"><img src={s.image} alt="" loading="lazy" /></span>
              <span className="svc-card__top">
                <span className="svc-card__icon"><Icon name={s.icon} size={26} /></span>
                <span className="svc-card__num">{s.number}</span>
              </span>
              <span className="svc-card__body">
                <h3>{s.title}</h3>
                <p>{s.short}</p>
              </span>
              <span className="svc-card__foot">
                <span>{s.meta}</span>
                <span>{open === i ? 'Close' : 'Discover'} <ArrowUpRight size={12} /></span>
              </span>
            </motion.button>
          ))}

          <motion.a
            href="#work"
            className="svc-cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-6% 0px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <span className="svc-cta__ring"><ArrowUpRight size={26} /></span>
            <strong>View all projects</strong>
            <p>Real rooms, photographed on site by our own team.</p>
          </motion.a>
        </div>

        <AnimatePresence mode="wait">
          {svc && (
            <motion.div
              key={svc.id}
              className="svc-detail"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <button type="button" className="circle-btn circle-btn--sm svc-detail__close" aria-label="Close" onClick={() => setOpen(null)}>
                <X size={16} />
              </button>
              <div className="svc-detail__img"><img src={svc.image} alt={svc.title} /></div>
              <div className="svc-detail__body">
                <span className="kicker">{svc.number} · Lead time {svc.meta}</span>
                <h3 className="serif serif--md">{svc.title}</h3>
                <p className="copy">{svc.desc}</p>
                <ul>
                  {svc.points.map((p) => <li key={p}><Check size={15} />{p}</li>)}
                </ul>
                <div className="svc-detail__actions">
                  <a href={whatsappUrl(`Hello Resco Star, I would like a quote for ${svc.title} in Dubai.`)} className="btn btn--dark btn--sm" target="_blank" rel="noopener noreferrer">Request a quote <ArrowUpRight size={14} /></a>
                  <a href="#work" className="btn btn--ghost btn--sm">See related projects</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
