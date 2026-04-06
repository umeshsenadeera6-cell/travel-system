import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Clock, MapPin, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import MapComponent from './MapComponent';
import { TRANSLATIONS } from '../data/translations';

export default function TourModal({ isOpen, onClose, tour, lang = 'en' }) {
  const navigate = useNavigate();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  if (!isOpen || !tour) return null;

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  
  // Localized Content
  const localized = tour.localizations?.[lang] || {};
  const displayTitle = localized.title || tour.title;
  const displayDescription = localized.description || tour.description;
  const displayItinerary = localized.itinerary || tour.itinerary;
  const displayInclusions = localized.inclusions || tour.inclusions;

  const stops = tour.route?.stops ?? [];
  const rawPath = tour.route?.path ?? stops.map((s) => ({ lat: s.lat, lng: s.lng }));
  const hasRoute = Array.isArray(stops) && stops.length > 0 && Array.isArray(rawPath) && rawPath.length > 0;

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
          zIndex: 1000,
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
            backgroundColor: 'rgba(5, 46, 32, 0.9)',
            backdropFilter: 'blur(8px)'
          }}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1000px',
            maxHeight: '90vh',
            backgroundColor: 'white',
            borderRadius: '2rem',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            textAlign: lang === 'ar' ? 'right' : 'left'
          }}
        >
          {/* Header Image/Video Section */}
          <div style={{ position: 'relative', height: '300px', flexShrink: 0, overflow: 'hidden' }}>
            {tour.video || tour.videoUrl ? (
              <video
                src={tour.video || tour.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  filter: 'brightness(0.8)'
                }}
              />
            ) : (
              <img
                src={tour.image}
                alt={displayTitle}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))',
              backdropFilter: 'contrast(1.1) saturate(1.1)'
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
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            <div style={{
              position: 'absolute',
              bottom: '2rem',
              left: lang === 'ar' ? 'auto' : '2rem',
              right: lang === 'ar' ? '2rem' : 'auto',
              textAlign: lang === 'ar' ? 'right' : 'left',
              color: 'white',
              zIndex: 5
            }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                {displayTitle}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'rgba(255, 255, 255, 0.9)', justifyContent: lang === 'ar' ? 'flex-end' : 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={18} />
                  <span style={{ fontWeight: '600' }}>{tour.duration}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={18} />
                  <span style={{ fontWeight: '600' }}>Sri Lanka</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content Section */}
          <div style={{ padding: '3rem', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '4rem' }}>
            <div>
              {/* Description */}
              <div style={{ marginBottom: '4rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.25rem', color: 'hsl(var(--secondary))', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {t.uiDescription || 'Description'}
                </h3>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'hsl(var(--foreground) / 0.7)' }}>
                  {displayDescription}
                </p>
              </div>

              {/* Itinerary */}
              <div style={{ marginBottom: '4rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem', color: 'hsl(var(--secondary))', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {t.uiItinerary || 'Itinerary'}
                </h3>

                {/* Day Selector */}
                {displayItinerary[0]?.day && (
                  <div style={{ 
                    display: 'flex', 
                    gap: '0.75rem', 
                    marginBottom: '2.5rem',
                    overflowX: 'auto',
                    paddingBottom: '0.5rem'
                  }}>
                    {displayItinerary.map((dayObj, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedDayIndex(idx)}
                        style={{
                          padding: '0.75rem 1.75rem',
                          borderRadius: '999px',
                          border: '1px solid',
                          borderColor: selectedDayIndex === idx ? 'hsl(var(--primary))' : 'hsl(var(--glass-border))',
                          backgroundColor: selectedDayIndex === idx ? 'hsl(var(--primary))' : 'transparent',
                          color: selectedDayIndex === idx ? 'white' : 'hsl(var(--foreground) / 0.6)',
                          fontWeight: '700',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      >
                        {dayObj.day}
                      </button>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedDayIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      {(displayItinerary[0]?.day ? displayItinerary[selectedDayIndex].activities : displayItinerary).map((item, idx) => (
                        <div key={idx} style={{ 
                          display: 'flex', 
                          gap: '1.5rem', 
                          padding: '1.5rem',
                          borderRadius: '1.5rem',
                          backgroundColor: 'hsl(var(--primary) / 0.03)',
                          border: '1px solid hsl(var(--primary) / 0.05)',
                          marginBottom: '1rem'
                        }}>
                          <div style={{ 
                            width: '48px', 
                            height: '48px', 
                            borderRadius: '14px', 
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                            flexShrink: 0,
                            fontWeight: '900',
                            color: 'hsl(var(--primary))',
                            fontSize: '0.9rem'
                          }}>
                            {idx + 1}
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                              <span style={{ fontWeight: '800', color: 'hsl(var(--secondary))', fontSize: '1.05rem' }}>{item.time}</span>
                              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'hsl(var(--primary) / 0.3)' }} />
                              <span style={{ fontWeight: '600', color: 'hsl(var(--primary))', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.location}</span>
                            </div>
                            <p style={{ color: 'hsl(var(--foreground) / 0.65)', lineHeight: 1.6 }}>{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Inclusions */}
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'hsl(var(--secondary))', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {t.uiInclusions || 'What\'s Included'}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                  {displayInclusions.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'hsl(var(--foreground) / 0.7)' }}>
                      <div style={{ color: 'hsl(var(--primary))' }}>
                        <CheckCircle2 size={18} />
                      </div>
                      <span style={{ fontSize: '1rem', fontWeight: '500' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Route Map */}
              <div style={{ marginTop: '4rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.25rem', color: 'hsl(var(--secondary))', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {t.uiRouteMap || 'Route Map'}
                </h3>
                <div style={{
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  backgroundColor: 'hsl(var(--primary) / 0.03)',
                  border: '1px solid hsl(var(--primary) / 0.1)'
                }}>
                  {hasRoute ? (
                    <MapComponent stops={stops} path={rawPath} />
                  ) : (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>
                      <p style={{ color: 'hsl(var(--foreground) / 0.7)', lineHeight: 1.7 }}>
                        Route map will be shown when route coordinates are available for this tour.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '2rem',
                padding: '2rem',
                border: '1px solid hsl(var(--glass-border))',
                boxShadow: 'var(--shadow)',
                position: 'sticky',
                top: '2rem'
              }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'hsl(var(--foreground) / 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {t.uiPriceFrom || 'Starting From'}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: '900', color: 'hsl(var(--secondary))' }}>${tour.price}</span>
                    <span style={{ color: 'hsl(var(--foreground) / 0.5)', fontWeight: '600' }}>/person</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onClose();
                    navigate('/booking', { state: { tour } });
                  }}
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
                  {t.uiConfirmBooking || 'Confirm Booking'} <ShieldCheck size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
