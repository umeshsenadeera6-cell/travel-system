import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, ArrowRight, DollarSign } from 'lucide-react';

export default function PackageCard({ pkg, image, onViewDetails }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: 'hsl(var(--card))',
        borderRadius: '2rem',
        overflow: 'hidden',
        boxShadow: 'var(--shadow)',
        border: '1px solid hsl(var(--glass-border))',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        cursor: onViewDetails ? 'pointer' : 'default'
      }}
      onClick={onViewDetails}
    >
      {/* Image Container */}
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={image}
          alt={pkg.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(4px)',
          padding: '0.4rem 0.8rem',
          borderRadius: '999px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: '0.85rem',
          fontWeight: '700',
          color: 'hsl(var(--secondary))',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <Star size={14} fill="#f59e0b" color="#f59e0b" />
          4.9
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'hsl(var(--primary))', marginBottom: '0.5rem' }}>
          <MapPin size={16} />
          <span style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Available Now
          </span>
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          {pkg.title}
        </h3>

        <p style={{ color: 'hsl(var(--foreground) / 0.6)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          Experience the ultimate getaway with our curated premium travel package.
        </p>

        <div style={{ 
          marginTop: 'auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingTop: '1.5rem',
          borderTop: '1px solid hsl(var(--glass-border))'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'hsl(var(--foreground) / 0.5)', textTransform: 'uppercase' }}>
              Starts From
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.1rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: '900', color: 'hsl(var(--secondary))' }}>
                ${pkg.price}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'hsl(var(--foreground) / 0.5)' }}>/person</span>
            </div>
          </div>

          <motion.button
            whileHover={{ x: 5, backgroundColor: 'hsl(var(--primary))', color: 'white' }}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              border: '1px solid hsl(var(--glass-border))',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              color: 'hsl(var(--primary))'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.();
            }}
          >
            <ArrowRight size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
