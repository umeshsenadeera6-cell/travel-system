import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function TourModal({ isOpen, onClose, tour }) {
  const navigate = useNavigate();
  if (!isOpen || !tour) return null;

  const stops = tour.route?.stops ?? [];
  const rawPath = tour.route?.path ?? stops.map((s) => ({ lat: s.lat, lng: s.lng }));

  const hasRoute = Array.isArray(stops) && stops.length > 0 && Array.isArray(rawPath) && rawPath.length > 0;

  // Project lat/lng into a simple 2D box (schematic route map).
  const project = (point, bounds, width, height, padding) => {
    const { minLat, maxLat, minLng, maxLng } = bounds;
    const latRange = Math.max(1e-6, maxLat - minLat);
    const lngRange = Math.max(1e-6, maxLng - minLng);
    const x = ((point.lng - minLng) / lngRange) * (width - padding * 2) + padding;
    const y = ((maxLat - point.lat) / latRange) * (height - padding * 2) + padding;
    return { x, y };
  };

  let routeSvg = null;
  if (hasRoute) {
    const width = 560;
    const height = 220;
    const padding = 22;

    const lats = rawPath.map((p) => p.lat).filter((v) => typeof v === 'number');
    const lngs = rawPath.map((p) => p.lng).filter((v) => typeof v === 'number');
    if (lats.length === 0 || lngs.length === 0) {
      routeSvg = null;
    } else {
      const bounds = {
        minLat: Math.min(...lats),
        maxLat: Math.max(...lats),
        minLng: Math.min(...lngs),
        maxLng: Math.max(...lngs),
      };

      const projectedPath = rawPath.map((p) => project(p, bounds, width, height, padding));
      const d = projectedPath
        .map((p, idx) => `${idx === 0 ? 'M' : 'L'}${p.x},${p.y}`)
        .join(' ');

      routeSvg = (
        <div style={{ width: '100%' }}>
          <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="220" role="img" aria-label="Route map">
            <defs>
              <linearGradient id="routeStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            <motion.path
              d={d}
              fill="none"
              stroke="url(#routeStroke)"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength={1}
              initial={{ strokeDashoffset: 1 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ strokeDasharray: 1 }}
            />

            {stops.map((s, idx) => {
              const { x, y } = project({ lat: s.lat, lng: s.lng }, bounds, width, height, padding);
              return (
                <g key={`${s.label ?? idx}-${idx}`}>
                  <circle cx={x} cy={y} r={7} fill="white" stroke="hsl(var(--primary))" strokeWidth={3} />
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={10}
                    fill="hsl(var(--primary) / 0.08)"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.08, duration: 0.3 }}
                  />
                  {s.label ? (
                    <text
                      x={x + 10}
                      y={y - 10}
                      fontSize="12"
                      fill="hsl(var(--foreground))"
                      opacity={0.75}
                    >
                      {s.label}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>

          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {stops.map((s, idx) => (
              <div key={`${s.label ?? idx}-${idx}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                    color: 'hsl(var(--primary))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '0.75rem',
                  }}
                >
                  {idx + 1}
                </div>
                <div style={{ fontSize: '0.95rem', color: 'hsl(var(--foreground) / 0.75)' }}>
                  {s.label ?? `Stop ${idx + 1}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

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
                {tour.description ?? 'Experience an unforgettable journey with our premium curated package.'}
              </p>

              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem', color: 'hsl(var(--secondary))' }}>
                Itinerary
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {(tour.itinerary ?? []).map((step, idx) => {
                  const isObject = typeof step === 'object' && step !== null;
                  const time = isObject ? step.time : undefined;
                  const location = isObject ? step.location : undefined;
                  const text = isObject ? step.text : step;

                  return (
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
                      <div>
                        {(time || location) ? (
                          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.45rem' }}>
                            {time ? (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', opacity: 0.9, color: 'hsl(var(--secondary))', fontWeight: '800' }}>
                                <Clock size={16} />
                                {time}
                              </span>
                            ) : null}
                            {location ? (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', opacity: 0.9, color: 'hsl(var(--primary))', fontWeight: '800' }}>
                                <MapPin size={16} />
                                {location}
                              </span>
                            ) : null}
                          </div>
                        ) : null}
                        <p style={{ fontSize: '0.95rem', color: 'hsl(var(--foreground) / 0.8)', lineHeight: 1.5 }}>
                          {text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Route Map */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem', color: 'hsl(var(--secondary))', marginTop: '2rem' }}>
                Route Map
              </h3>
              <div style={{
                backgroundColor: 'hsl(var(--primary) / 0.03)',
                border: '1px solid hsl(var(--primary) / 0.1)',
                padding: '1.5rem',
                borderRadius: '1.5rem'
              }}>
                {routeSvg ?? (
                  <p style={{ color: 'hsl(var(--foreground) / 0.7)', lineHeight: 1.7 }}>
                    Route map will be shown when route coordinates are available for this tour.
                  </p>
                )}
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
                  {(tour.inclusions ?? []).map((item, idx) => (
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
                  Confirm Booking <ShieldCheck size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
