import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import ReviewCarousel from '../components/ReviewCarousel';

export default function Home() {
  return (
    <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 5%' }}>
      <HeroCarousel />
      
      <div style={{ marginTop: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.02em', color: 'hsl(var(--foreground))' }}>
            Our Signature Collections
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'hsl(var(--muted-foreground))', marginTop: '1rem' }}>
            Choose your path: Serene Island Escapes or Global Wonders.
          </p>
        </div>
        <Hero />
      </div>

      <div style={{ marginTop: '100px' }}>
        <AboutUs />
      </div>
      
      <div style={{ marginTop: '100px', marginBottom: '100px' }}>
        <ReviewCarousel />
      </div>
    </main>
  );
}
