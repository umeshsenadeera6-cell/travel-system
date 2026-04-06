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
import InternalNav from '../components/InternalNav';
import sigiriyaImg from '../assets/sigiriya.png';
import kandyImg from '../assets/kandy.png';
import mirissaImg from '../assets/mirissa.png';
import galleImg from '../assets/galle.png';
import trincomaleeImg from '../assets/trincomalee.png';

export default function Inbound({ selectedLanguage = 'en', setSelectedLanguage }) {
  const [selectedTour, setSelectedTour] = useState(null);
  const [tourOpen, setTourOpen] = useState(false);
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

  const navLinks = [
    { label: t.navAbout, id: 'about-section' },
    { label: t.navTours, id: 'tours-section' },
    { label: t.navDestinations, id: 'destinations-section' },
    { label: t.navServices, id: 'services-section' },
    { label: t.navGuides, id: 'guides-section' },
    { label: t.navReviews, id: 'reviews-section' },
    { label: t.navTerms, id: 'terms-section' },
    { label: t.navContact, id: 'contact-section' }
  ];

  const termsData = [
    {
      id: 1,
      title: "1. Introduction",
      content: "Welcome to Serendib Travels and Tours (“we”, “our”, “us”). By booking any tour, package, or service with us, you agree to the following Terms & Conditions."
    },
    {
      id: 2,
      title: "2. Booking & Confirmation",
      points: [
        "All bookings must be made via email, phone, or our official platforms.",
        "A booking is confirmed only after receiving the required deposit or full payment.",
        "You are responsible for providing accurate personal and travel details."
      ]
    },
    {
      id: 3,
      title: "3. Payments",
      points: [
        "A deposit (usually 20%–50%) is required to confirm bookings.",
        "Full payment must be completed before the start of the tour.",
        "Payments can be made via bank transfer, online payment gateways, or other agreed methods."
      ]
    },
    {
      id: 4,
      title: "4. Cancellation & Refund Policy",
      points: [
        "Cancellations must be made in writing.",
        "Cancellation charges may apply depending on the timing.",
        "Refunds (if applicable) will be processed within a reasonable period."
      ]
    },
    {
      id: 13,
      title: "5. Governing Law",
      content: "These Terms & Conditions are governed by the laws of Sri Lanka."
    }
  ];

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
        accentColor="hsl(var(--primary))"
      />

      <InternalNav links={navLinks} accentColor="hsl(var(--primary))" />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 5%' }}>
        <div id="about-section">
          <SubAboutUs title={t.aboutTitle} content={t.aboutSriLanka} />
        </div>

        <div id="tours-section">
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
        </div>

        <div id="destinations-section">
          <DestinationsGrid title={t.destinationsTitle} destinations={destinations} />
        </div>
        
        <div id="services-section">
          <ServicesGrid title={t.servicesTitle} serviceLabels={serviceLabels} />
        </div>
        
        <div id="guides-section">
          <BlogPreview title={t.guideTitle} />
        </div>

        <section id="reviews-section" style={{ padding: '80px 0' }}>
          <SectionHeader title="What Travelers' Say" center={true} />
          <ReviewCarousel />
        </section>
        
        <section id="terms-section" style={{ padding: '80px 0' }}>
          <SectionHeader title={t.navTerms} label="LEGAL POLICIES" center={true} />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {termsData.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{
                  padding: '2rem',
                  borderRadius: '1.5rem',
                  background: 'hsla(var(--background) / 0.4)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid hsla(var(--primary) / 0.1)',
                  boxShadow: '0 8px 32px -8px rgba(0,0,0,0.05)',
                }}
              >
                <h4 className="serif" style={{ 
                  fontSize: '1.25rem', 
                  color: 'hsl(var(--secondary))',
                  marginBottom: '1rem',
                  borderBottom: '1px solid hsla(var(--primary) / 0.1)',
                  paddingBottom: '0.5rem'
                }}>
                  {section.title}
                </h4>
                {section.content && (
                  <p style={{ fontSize: '0.95rem', opacity: 0.8, lineHeight: 1.6 }}>
                    {section.content}
                  </p>
                )}
                {section.points && (
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {section.points.map((p, i) => (
                      <li key={i} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.9rem', opacity: 0.7 }}>
                        <span style={{ color: 'hsl(var(--primary))' }}>•</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        <div id="contact-section">
          <ContactSection type="inbound" lang={selectedLanguage} />
        </div>
      </div>
      
      <TourModal isOpen={tourOpen} onClose={closeTour} tour={selectedTour} lang={selectedLanguage} />
    </main>
  );
}
