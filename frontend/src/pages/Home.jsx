import React from 'react';
import AntiGravityHero from '../components/AntiGravityHero';
import AboutUs from '../components/AboutUs';
import ReviewCarousel from '../components/ReviewCarousel';

export default function Home() {
  return (
    <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 5%' }}>
      <AntiGravityHero />
      <AboutUs />
      <ReviewCarousel />
    </main>
  );
}
