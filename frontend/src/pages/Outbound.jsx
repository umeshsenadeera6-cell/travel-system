import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PackageCard from '../components/PackageCard';
import TourModal from '../components/TourModal';
import { OUTBOUND_PACKAGES } from '../data/tours';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function Outbound() {
  const [selectedTour, setSelectedTour] = useState(null);
  const [tourOpen, setTourOpen] = useState(false);

  const openTour = (tour) => {
    setSelectedTour(tour);
    setTourOpen(true);
  };

  const closeTour = () => {
    setTourOpen(false);
    setSelectedTour(null);
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ minHeight: '100vh', padding: '160px 0 100px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 5%' }}>
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '4rem' }}>
            <p className="section-label" style={{ color: 'hsl(var(--accent))' }}>GLOBAL ESCAPES</p>
            <h2 className="section-title">Outbound Tours</h2>
            <p style={{ maxWidth: '600px', opacity: 0.6, fontSize: '1.1rem' }}>
              Experience the world with our premium international packages. Curated journeys for the global explorer.
            </p>
          </div>

          <motion.div variants={staggerContainer} className="grid-layout">
            {OUTBOUND_PACKAGES.map(p => (
              <motion.div variants={fadeInUp} key={p.id}>
                <PackageCard pkg={p} image={p.image} onViewDetails={() => openTour(p)} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
      
      <TourModal isOpen={tourOpen} onClose={closeTour} tour={selectedTour} />
    </main>
  );
}
