import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '../data/siteData';

export default function WhatsAppFAB() {
  const dragged = useRef(false);

  return (
    <motion.a
      className="wa-fab"
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp — drag to move"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.2, duration: 0.55, type: 'spring', bounce: 0.35 }}
      drag
      dragMomentum={false}
      dragElastic={0.16}
      dragConstraints={{ left: -300, right: 20, top: -560, bottom: 20 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      onDragStart={() => { dragged.current = true; }}
      onClick={(e) => {
        if (dragged.current) {
          e.preventDefault();
          dragged.current = false;
        }
      }}
    >
      <span className="wa-fab__orb">
        <i />
        <MessageCircle size={26} />
      </span>
    </motion.a>
  );
}
