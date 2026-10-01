import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Parallax — moves its children vertically as the element travels through the viewport.
 * `speed` is the total travel in px (negative = moves up as you scroll down).
 */
export function Parallax({ children, speed = -60, className, style, as = 'div', ...rest }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const raw = useTransform(scrollYProgress, [0, 1], [-speed / 2, speed / 2]);
  const y = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.6 });
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag ref={ref} className={className} style={{ ...style, y }} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Reveal — fades/slides content in once, when it scrolls into view.
 */
export function Reveal({ children, delay = 0, y = 34, className, style, once = true, as = 'div', ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-10% 0px -10% 0px' });
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * SplitLines — reveals each line of a heading with a staggered clip animation.
 */
export function SplitLines({ lines, className, delay = 0, tag = 'h2' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const Tag = tag;
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: delay + i * 0.12, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export { EASE, useMotionValue, useSpring, useTransform };
