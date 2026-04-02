import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PackageCard from '../components/PackageCard';
import TourModal from '../components/TourModal';
import { INBOUND_PACKAGES } from '../data/tours';
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

import SubHero from '../components/SubHero';
import SubAboutUs from '../components/SubAboutUs';
import SectionHeader from '../components/SectionHeader';
import DestinationsGrid from '../components/DestinationsGrid';
import ServicesGrid from '../components/ServicesGrid';
import BlogPreview from '../components/BlogPreview';
import ReviewCarousel from '../components/ReviewCarousel';
import sigiriyaImg from '../assets/sigiriya.png';
import kandyImg from '../assets/kandy.png';
import mirissaImg from '../assets/mirissa.png';
import galleImg from '../assets/galle.png';
import trincomaleeImg from '../assets/trincomalee.png';

export default function Inbound() {
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

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch(`${API_URL}/packages`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setDynamicPackages(data.filter(p => p.category === 'Inbound'));
    } catch (err) {
      console.error("Error fetching packages:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const allPackages = [...INBOUND_PACKAGES, ...dynamicPackages];
  const roundTours = allPackages.filter(p => p.type === 'Round');
  const dayTours = allPackages.filter(p => !p.type || p.type === 'Day');

  const t = TRANSLATIONS[selectedLanguage] || TRANSLATIONS.en;

  const destinations = [
    { name: "Sigiriya", description: "The iconic Lion Rock fortress.", image: sigiriyaImg },
    { name: "Kandy", description: "The cultural heart and scenic hills.", image: kandyImg },
    { name: "Mirissa", description: "Whale watching and pristine beaches.", image: mirissaImg },
    { name: "Galle", description: "Colonial charm and historic ramparts.", image: galleImg },
    { name: "Trincomalee", description: "Crystal clear waters and golden sand.", image: trincomaleeImg }
  ];

  const serviceLabels = {
    transport: t.serviceTransport,
    hotels: t.serviceHotels,
    activities: t.serviceActivities,
    events: t.serviceEvents
  };

  return (
    <main 
      dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}
      style={{ minHeight: '100vh', padding: '0 0 100px 0', textAlign: selectedLanguage === 'ar' ? 'right' : 'left' }}
    >
      <SubHero 
        title={t.inboundTitle}
        subtitle={t.inboundDesc}
        label={t.inboundLabel}
        image={sigiriyaImg}
        currentLang={selectedLanguage}
        onLangChange={setSelectedLanguage}
        accentColor="hsl(var(--primary))"
      />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 5%' }}>
        <SubAboutUs title={t.aboutTitle} content={t.aboutSriLanka} />

        {/* Round Tours Section */}
        {roundTours.length > 0 && (
          <section style={{ padding: '60px 0' }}>
            <SectionHeader title={t.roundToursTitle} label="EXCURSIONS" />
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid-layout">
              {roundTours.map(p => (
                <motion.div variants={fadeInUp} key={p._id || p.id}>
                  <PackageCard pkg={p} image={p.image} onViewDetails={() => openTour(p)} lang={selectedLanguage} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* Day Tours Section */}
        {dayTours.length > 0 && (
          <section style={{ padding: '60px 0' }}>
            <SectionHeader title={t.dayToursTitle} label="DAY TRIPS" />
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid-layout">
              {dayTours.map(p => (
                <motion.div variants={fadeInUp} key={p._id || p.id}>
                  <PackageCard pkg={p} image={p.image} onViewDetails={() => openTour(p)} lang={selectedLanguage} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        <DestinationsGrid title={t.destinationsTitle} destinations={destinations} />
        
        <ServicesGrid title={t.servicesTitle} serviceLabels={serviceLabels} />
        
        <BlogPreview title={t.guideTitle} />

        <section style={{ padding: '80px 0' }}>
          <SectionHeader title="What Travelers' Say" center={true} />
          <ReviewCarousel />
        </section>
        
        <ContactSection type="inbound" lang={selectedLanguage} />
      </div>
      
      <TourModal isOpen={tourOpen} onClose={closeTour} tour={selectedTour} lang={selectedLanguage} />
    </main>
  );
}
