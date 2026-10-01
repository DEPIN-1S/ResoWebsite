import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Check, Images, MapPin, X } from 'lucide-react';
import { EASE } from './ui/motion';

export default function ProjectModal({ project, onClose, onOpenInquiry }) {
  const [i, setI] = useState(0);
  const imgs = project?.gallery ?? [];

  useEffect(() => {
    setI(0);
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setI((c) => (c + 1) % imgs.length);
      if (e.key === 'ArrowLeft') setI((c) => (c - 1 + imgs.length) % imgs.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, imgs.length, onClose]);

  if (!project) return null;
  const step = (d) => setI((c) => (c + d + imgs.length) % imgs.length);

  return (
    <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} data-lenis-prevent>
      <motion.div
        className="modal__panel"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.5, ease: EASE }}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <button type="button" className="circle-btn circle-btn--sm modal__close" onClick={onClose} aria-label="Close"><X size={18} /></button>

        <div className="modal__media">
          <AnimatePresence mode="wait">
            <motion.img
              key={imgs[i]}
              src={imgs[i]}
              alt={`${project.title} ${i + 1}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </AnimatePresence>
          <span className="modal__count">{String(i + 1).padStart(2, '0')} / {String(imgs.length).padStart(2, '0')}</span>
          {imgs.length > 1 && (
            <div className="modal__arrows">
              <button type="button" className="circle-btn circle-btn--sm circle-btn--light" aria-label="Previous image" onClick={() => step(-1)}><ArrowLeft size={16} /></button>
              <button type="button" className="circle-btn circle-btn--sm circle-btn--light" aria-label="Next image" onClick={() => step(1)}><ArrowRight size={16} /></button>
            </div>
          )}
        </div>

        <div className="modal__body">
          <span className="kicker">{project.category}</span>
          <h2 className="serif">{project.title}</h2>
          <div className="modal__meta">
            <span><MapPin size={13} />{project.location}</span>
            <span><Calendar size={13} />{project.year}</span>
            <span><Images size={13} />{imgs.length} photos</span>
          </div>
          <p className="copy">{project.description}</p>
          <ul className="modal__specs">
            {project.specs.map((s) => <li key={s}><Check size={14} />{s}</li>)}
          </ul>
          {imgs.length > 1 && (
            <div className="modal__thumbs">
              {imgs.map((src, idx) => (
                <button key={src} type="button" className={idx === i ? 'is-active' : ''} onClick={() => setI(idx)} aria-label={`Image ${idx + 1}`}>
                  <img src={src.replace('.jpg', '-sm.jpg')} alt="" loading="lazy" onError={(e) => { e.currentTarget.src = src; }} />
                </button>
              ))}
            </div>
          )}
          <div className="modal__cta">
            <button type="button" className="btn btn--dark btn--sm" onClick={() => { onClose(); onOpenInquiry(); }}>
              Plan a similar project <ArrowUpRight size={14} />
            </button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={onClose}>Close</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
