import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { studioContent, workshopContent } from '../data/siteData';
import { Parallax, Reveal, SplitLines } from './ui/motion';

export default function StudioSection() {
  return (
    <section id="studio" className="studio section">
      <div className="container">
        <div className="studio__grid">
          <div className="studio__copy">
            <Reveal><span className="kicker">{studioContent.kicker}</span></Reveal>
            <SplitLines lines={studioContent.headline} className="serif serif--lg" />
            {studioContent.copy.map((p, i) => (
              <Reveal key={i} delay={0.12 + i * 0.08}>
                <p className="copy">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3} className="studio__facts">
              {workshopContent.facts.map((f) => (
                <div key={f.label} className="studio__fact">
                  <strong>{f.value}</strong>
                  <span>{f.label}</span>
                </div>
              ))}
            </Reveal>
            <Reveal delay={0.4}>
              <a href="#process" className="link-arrow">How we work <ArrowUpRight size={14} /></a>
            </Reveal>
          </div>

          <div className="studio__media">
            <Parallax speed={-60} className="studio__img studio__img--a">
              <img src={studioContent.imageA} alt="Curved walk-in wardrobe in light oak" loading="lazy" />
            </Parallax>
            <Parallax speed={80} className="studio__img studio__img--b">
              <img src={studioContent.imageB} alt="Sculptural walnut chairs" loading="lazy" />
            </Parallax>
            <Parallax speed={40} className="studio__img studio__img--c">
              <img src={studioContent.imageC} alt="Joinery in production at the Resco Star workshop" loading="lazy" />
            </Parallax>
            <Reveal delay={0.3} className="studio__pill" y={12}>
              <i /> Own workshop · DIP, Dubai
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
