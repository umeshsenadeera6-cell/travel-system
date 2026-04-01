import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PackageCard from '../components/PackageCard';
import TourModal from '../components/TourModal';
import { INBOUND_PACKAGES } from '../data/tours';
import ContactSection from '../components/ContactSection';

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

export default function Inbound() {
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
            <p className="section-label">SRI LANKA'S HIDDEN GEMS</p>
            <h2 className="section-title">Inbound Tours</h2>
            <p style={{ maxWidth: '600px', opacity: 0.6, fontSize: '1.1rem' }}>
              Explore the untouched beauty of the pearl of the Indian Ocean. From ancient cities to golden beaches.
            </p>
          </div>

          <motion.div variants={staggerContainer} className="grid-layout">
            {INBOUND_PACKAGES.map(p => (
              <motion.div variants={fadeInUp} key={p.id}>
                <PackageCard pkg={p} image={p.image} onViewDetails={() => openTour(p)} />
              </motion.div>
            ))}
          </motion.div>
          
          <ContactSection type="inbound" />
        </motion.section>
      </div>
      
      <TourModal isOpen={tourOpen} onClose={closeTour} tour={selectedTour} />
    </main>
  );
}
