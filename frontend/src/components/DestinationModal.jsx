import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Info, Calendar, Wind, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DestinationModal({ isOpen, onClose, destination }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !destination) return null;

  const images = destination.images || [destination.image];
  const hasMultipleImages = images.length > 1;

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(5, 46, 32, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            maxHeight: '90vh',
            backgroundColor: 'white',
            borderRadius: '2.5rem',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header Image Section (Carousel) */}
          <div style={{ position: 'relative', height: '450px', flexShrink: 0, overflow: 'hidden', backgroundColor: '#000' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`${destination.name} - ${currentImageIndex + 1}`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </AnimatePresence>

            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)',
              pointerEvents: 'none'
            }} />

            {/* Navigation Arrows */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  style={{
                    position: 'absolute',
                    left: '1.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  style={{
                    position: 'absolute',
                    right: '1.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ChevronRight size={24} />
                </button>

                {/* Dots Indicators */}
                <div style={{
                  position: 'absolute',
                  bottom: '2rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '0.6rem',
                  zIndex: 10
                }}>
                  {images.map((_, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      style={{
                        width: currentImageIndex === idx ? '28px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        backgroundColor: currentImageIndex === idx ? 'white' : 'rgba(255,255,255,0.4)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 15
              }}
            >
              <X size={24} />
            </button>

            <div style={{
              position: 'absolute',
              bottom: '3rem',
              left: '3rem',
              color: 'white',
              zIndex: 5,
              pointerEvents: 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <MapPin size={18} color="hsl(var(--primary))" />
                <span style={{ fontWeight: '800', letterSpacing: '0.1em', fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.9 }}>DISCOVER SRI LANKA</span>
              </div>
              <h2 style={{ fontSize: '3.5rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem', letterSpacing: '-0.02em', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                {destination.name}
              </h2>
            </div>
          </div>

          {/* Scrollable Content */}
          <div style={{ padding: '3.5rem', overflowY: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '4rem' }}>
              <div>
                <section style={{ marginBottom: '3rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'hsl(var(--secondary))', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Info size={22} color="hsl(var(--primary))" /> About {destination.name}
                  </h3>
                  <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'hsl(var(--foreground) / 0.85)', fontWeight: '450' }}>
                    {destination.fullDescription}
                  </p>
                </section>
              </div>

              <aside>
                <div style={{ 
                  backgroundColor: 'hsl(var(--primary) / 0.03)', 
                  borderRadius: '2rem', 
                  padding: '2rem',
                  border: '1px solid hsl(var(--primary) / 0.1)'
                }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.5rem', color: 'hsl(var(--secondary))', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Quick Facts
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {destination.facts?.map((fact, idx) => (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'hsl(var(--foreground) / 0.4)', textTransform: 'uppercase' }}>
                          {fact.label}
                        </span>
                        <span style={{ fontSize: '1.05rem', fontWeight: '700', color: 'hsl(var(--secondary))' }}>
                          {fact.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  style={{
                    width: '100%',
                    marginTop: '2rem',
                    padding: '1.25rem',
                    backgroundColor: 'hsl(var(--secondary))',
                    color: 'white',
                    border: 'none',
                    borderRadius: '1.25rem',
                    fontWeight: '800',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 10px 20px -5px hsl(var(--secondary) / 0.3)'
                  }}
                >
                  Explore Tours
                </motion.button>
              </aside>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
