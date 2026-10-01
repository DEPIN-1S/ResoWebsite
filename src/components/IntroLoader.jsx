import React from 'react';
import { motion } from 'framer-motion';
import { EASE } from './ui/motion';

const WORD = 'RESCO STAR';

export default function IntroLoader() {
  return (
    <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE } }}>
      <span className="gridlines" />
      <motion.div
        className="loader__center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
      >
        <motion.div
          className="loader__mark"
          initial={{ scale: 0.6, rotate: -12, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          R
        </motion.div>
        <div className="loader__word" aria-label={WORD}>
          {WORD.split('').map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              initial={{ y: '60%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.04, ease: EASE }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </motion.span>
          ))}
        </div>
        <span className="loader__small">Bespoke joinery · Dubai</span>
        <div className="loader__bar"><i /></div>
      </motion.div>
    </motion.div>
  );
}
