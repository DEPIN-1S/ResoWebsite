import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { useLenisScroll } from './hooks/useLenisScroll';
import { whatsappUrl } from './data/siteData';

import IntroLoader from './components/IntroLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorkStage from './components/WorkStage';
import TrustBar from './components/TrustBar';
import StudioSection from './components/StudioSection';
import ServicesSection from './components/ServicesSection';
import StatsRow from './components/StatsRow';
import PortfolioSection from './components/PortfolioSection';
import ProcessTimeline from './components/ProcessTimeline';
import WhyUs from './components/WhyUs';
import TestimonialsSection from './components/TestimonialsSection';
import VisitSection from './components/VisitSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppFAB from './components/FloatingWhatsAppButton';
import ProjectModal from './components/ProjectModal';

export default function App() {
  const lenis = useLenisScroll();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 2100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!lenis.current) return;
    if (showIntro || selectedProject) lenis.current.stop();
    else lenis.current.start();
  }, [showIntro, selectedProject, lenis]);

  const openWhatsApp = useCallback((projectTitle) => {
    const msg = projectTitle
      ? `Hello Resco Star, I would like something similar to “${projectTitle}” in Dubai.`
      : undefined;
    window.open(whatsappUrl(msg), '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <WorkStage />
        <TrustBar />
        <ServicesSection />
        <StatsRow />
        <StudioSection />
        <PortfolioSection onSelect={setSelectedProject} />
        <ProcessTimeline />
        <WhyUs />
        <TestimonialsSection />
        <VisitSection />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppFAB />

      <AnimatePresence mode="wait">{showIntro && <IntroLoader />}</AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onOpenInquiry={() => openWhatsApp(selectedProject?.title)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
