import React from 'react';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import ReviewCarousel from '../components/ReviewCarousel';

export default function Home() {
  return (
    <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 5%' }}>
      <Hero />
      <AboutUs />
      <ReviewCarousel />
    </main>
  );
}
