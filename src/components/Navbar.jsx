import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { navLinks, siteMeta, whatsappUrl } from '../data/siteData';
import { EASE } from './ui/motion';

export function Brand({ href = '#top', onClick }) {
  return (
    <a className="brand" href={href} onClick={onClick} aria-label="Resco Star home">
      <span className="brand__mark">R</span>
      <span>
        <strong>Resco Star</strong>
        <em>{siteMeta.tagline}</em>
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#top');
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 50, damping: 18, mass: 0.5 });
  const y = useSpring(my, { stiffness: 50, damping: 18, mass: 0.5 });

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 40);
      const current = navLinks
        .map((l) => ({ href: l.href, top: document.querySelector(l.href)?.getBoundingClientRect().top ?? Infinity }))
        .filter((i) => i.top < window.innerHeight * 0.45)
        .sort((a, b) => b.top - a.top)[0];
      if (current) setActive(current.href);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 16;
      const ny = (e.clientY / window.innerHeight - 0.5) * 8;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);

  const office = siteMeta.offices[0];

  return (
    <>
      <header className={`nav ${scrolled && !open ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <motion.div
          className="nav__shell"
          initial={{ y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          style={{ x, y }}
        >
          <Brand onClick={() => setOpen(false)} />

          <nav className="nav__links" aria-label="Primary">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className={active === l.href ? 'is-active' : ''}>{l.label}</a>
            ))}
          </nav>

          <div className="nav__right">
            <a className="nav__phone" href={`tel:${office.phone.replace(/\s/g, '')}`} aria-label={`Call ${office.phone}`}>
              <Phone size={15} strokeWidth={2.2} />
              <span>{office.phone}</span>
            </a>
            <a className="nav__cta" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
              <MessageCircle size={14} strokeWidth={2.2} />
              Let&apos;s Talk
            </a>
            <button type="button" className="nav__burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="drawer"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="gridlines" />
            <nav className="drawer__links" aria-label="Menu">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.5, ease: EASE }}
                >
                  <small>{String(i + 1).padStart(2, '0')}</small>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.aside
              className="drawer__side"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <img src="/gallery/walkin-curved-06.jpg" alt="Curved walk-in wardrobe by Resco Star" />
              <div>
                <h4>Workshop & head office</h4>
                <p>{office.address}</p>
                <a href={`tel:${office.phone.replace(/\s/g, '')}`}>{office.phone}</a>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp the studio</a>
              </div>
              <div className="drawer__social">
                {siteMeta.social.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>{s.short}</a>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
