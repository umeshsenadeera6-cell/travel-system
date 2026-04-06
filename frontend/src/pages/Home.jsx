import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroCarousel from '../components/HeroCarousel';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import ReviewCarousel from '../components/ReviewCarousel';
import LimitedTimeTours from '../components/LimitedTimeTours';
import TourModal from '../components/TourModal';

export default function Home({ currentLanguage = 'en' }) {
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

  return (
    <main style={{ width: '100%', overflowX: 'hidden' }}>
      <section>
        <HeroCarousel />
      </section>

      <LimitedTimeTours onOpenTour={openTour} />
      
      <section style={{ padding: '80px 5% 40px', maxWidth: '1440px', margin: '0 auto' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'hsl(var(--secondary))', marginBottom: '1.5rem' }}>
            Our Signature Collections
          </h2>
          <div style={{ width: '80px', height: '4px', background: 'hsl(var(--primary))', margin: '0 auto 1.5rem', borderRadius: '2px' }} />
          <p style={{ fontSize: '1.2rem', color: 'hsl(var(--foreground))', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            Choose your path: Serene Island Escapes or Global Wonders.
          </p>
        </motion.div>
        <Hero />
      </section>

      <section style={{ padding: '40px 0', background: 'hsl(var(--primary) / 0.02)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 5%' }}>
          <AboutUs />
        </div>
      </section>
      
      <section style={{ padding: '80px 0 100px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 5%' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="serif" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800 }}>
              Wall of Love
            </h2>
            <p style={{ color: 'hsl(var(--primary))', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Testimonials from our travelers
            </p>
          </div>
          <ReviewCarousel />
        </div>
      </section>

      <TourModal 
        isOpen={tourOpen} 
        onClose={closeTour} 
        tour={selectedTour} 
        lang={currentLanguage} 
      />
    </main>
  );
}
