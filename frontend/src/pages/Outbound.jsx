import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PackageCard from '../components/PackageCard';
import TourModal from '../components/TourModal';
import { OUTBOUND_PACKAGES } from '../data/tours';
import ContactSection from '../components/ContactSection';
import LanguagePicker from '../components/LanguagePicker';
import { TRANSLATIONS } from '../data/translations';
import API_URL from '../config';

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
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [dynamicPackages, setDynamicPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const openTour = (tour) => {
    setSelectedTour(tour);
    setTourOpen(true);
  };

  const closeTour = () => {
    setTourOpen(false);
    setSelectedTour(null);
  };

  // Scroll to top and fetch data on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch(`${API_URL}/packages`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      // Filter for Outbound only
      setDynamicPackages(data.filter(p => p.category === 'Outbound'));
    } catch (err) {
      console.error("Error fetching packages:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Merge static and dynamic packages
  const allPackages = [...OUTBOUND_PACKAGES, ...dynamicPackages];

  const t = TRANSLATIONS[selectedLanguage] || TRANSLATIONS.en;

  return (
    <main 
      dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}
      style={{ minHeight: '100vh', padding: '160px 0 100px 0', textAlign: selectedLanguage === 'ar' ? 'right' : 'left' }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 5%' }}>
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <p className="section-label" style={{ color: 'hsl(var(--accent))' }}>{t.outboundLabel}</p>
                <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>{t.outboundTitle}</h2>
                <p style={{ maxWidth: '600px', opacity: 0.6, fontSize: '1.1rem' }}>
                  {t.outboundDesc}
                </p>
              </div>
              <div style={{ alignSelf: 'flex-start', marginTop: '2.5rem' }}>
                <LanguagePicker currentLang={selectedLanguage} onSelect={setSelectedLanguage} />
              </div>
            </div>
          </div>

          <motion.div variants={staggerContainer} className="grid-layout">
            {allPackages.map(p => (
              <motion.div variants={fadeInUp} key={p._id || p.id}>
                <PackageCard pkg={p} image={p.image} onViewDetails={() => openTour(p)} lang={selectedLanguage} />
              </motion.div>
            ))}
          </motion.div>
          
          <ContactSection type="outbound" lang={selectedLanguage} />
        </motion.section>
      </div>
      
      <TourModal isOpen={tourOpen} onClose={closeTour} tour={selectedTour} lang={selectedLanguage} />
    </main>
  );
}
