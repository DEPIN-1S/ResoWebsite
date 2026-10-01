import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { statsData } from '../data/siteData';
import { Reveal } from './ui/motion';

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1500;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <strong ref={ref}>{n}<em>{suffix}</em></strong>;
}

export default function StatsRow() {
  return (
    <section className="stats" aria-label="Key numbers">
      <div className="container">
        <Reveal className="stats__row" y={20}>
          {statsData.map((s) => (
            <div key={s.label} className="stat">
              <Counter value={s.value} suffix={s.suffix} />
              <span>{s.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
