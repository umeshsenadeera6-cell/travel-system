import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function TourModal({ isOpen, onClose, tour }) {
  if (!tour) return null;

  return (
    <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}>
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
              backgroundColor: 'rgba(5, 46, 32, 0.9)', // Deep green backdrop
              backdropFilter: 'blur(8px)'
            }}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '900px',
              maxHeight: '90vh',
              backgroundColor: 'white',
              borderRadius: '2rem',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header / Image Section */}
            <div style={{ position: 'relative', height: '300px', flexShrink: 0 }}>
              <img 
                src={tour.image} 
                alt={tour.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))'
              }} />
              
              <button 
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>

              <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '2rem',
                right: '2rem',
                color: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ 
                    backgroundColor: 'hsl(var(--primary))', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: '700'
                  }}>
                    {tour.duration}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', opacity: 0.9, fontSize: '0.9rem' }}>
                    <MapPin size={14} /> Sri Lanka
                  </div>
                </div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white', lineHeight: 1.1 }}>
                  {tour.title}
                </h2>
              </div>
            </div>

            {/* Content Section */}
            <div style={{ 
              padding: '2.5rem', 
              overflowY: 'auto',
              flex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem'
            }}>
              {/* Left Column: Info & Itinerary */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem', color: 'hsl(var(--secondary))' }}>
                  Trip Highlights
                </h3>
                <p style={{ color: 'hsl(var(--foreground) / 0.7)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  {tour.description}
                </p>

                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem', color: 'hsl(var(--secondary))' }}>
                  Itinerary
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {tour.itinerary.map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ 
                        flexShrink: 0,
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        backgroundColor: 'hsl(var(--primary) / 0.1)',
                        color: 'hsl(var(--primary))',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        marginTop: '0.2rem'
                      }}>
                        {idx + 1}
                      </div>
                      <p style={{ fontSize: '0.95rem', color: 'hsl(var(--foreground) / 0.8)', lineHeight: 1.5 }}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Inclusions & CTA */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ 
                  backgroundColor: 'hsl(var(--primary) / 0.03)', 
                  padding: '2rem', 
                  borderRadius: '1.5rem',
                  border: '1px solid hsl(var(--primary) / 0.1)',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.25rem', color: 'hsl(var(--secondary))' }}>
                    What's Included
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {tour.inclusions.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <CheckCircle2 size={18} style={{ color: 'hsl(var(--primary))' }} />
                        <span style={{ fontSize: '0.9rem', color: 'hsl(var(--foreground) / 0.7)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>Total Price</span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
                      <span style={{ fontSize: '2rem', fontWeight: '900', color: 'hsl(var(--secondary))' }}>${tour.price}</span>
                      <span style={{ fontSize: '0.9rem', color: 'hsl(var(--foreground) / 0.4)' }}>/person</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      padding: '1.25rem',
                      fontSize: '1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      borderRadius: '1.25rem'
                    }}
                  >
                    Confirm Booking <ShieldCheck size={20} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
    );
}
