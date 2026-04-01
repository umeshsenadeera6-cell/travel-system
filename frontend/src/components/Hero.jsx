import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play, Star } from 'lucide-react';
import heroImg from '../assets/hero.png';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section style={{
      minHeight: '92vh',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '80px',
      borderRadius: '2.5rem',
      backgroundColor: '#000',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    }}>
      {/* Background Image with Zoom Effect */}
      <motion.img 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.75 }}
        transition={{ duration: 2, ease: "easeOut" }}
        src={heroImg} 
        alt="Luxury Travel Resort" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none'
        }} 
      />

      {/* Hero Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-dark" 
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(2rem, 8vw, 4rem)',
          borderRadius: '2.5rem',
          textAlign: 'center',
          maxWidth: '900px',
          margin: '2rem',
          color: '#fff',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)'
        }}
      >
        <motion.div 
          variants={itemVariants}
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            marginBottom: '1.5rem',
            padding: '0.5rem 1.25rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '999px',
            fontSize: '0.9rem',
            fontWeight: '600',
            letterSpacing: '0.05em'
          }}
        >
          <Star size={16} fill="currentColor" />
          VOTED SRI LANKA'S BEST TRAVEL PARTNER 2026
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: '900',
            marginBottom: '1.5rem',
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            color: '#fff'
          }}
        >
          Discover the Soul of <span style={{ color: 'hsl(var(--primary))' }}>Serendib Paradise</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            marginBottom: '2.5rem',
            opacity: 0.9,
            fontWeight: '400',
            maxWidth: '700px',
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.6
          }}
        >
          Discover hidden gems from the misty mountains of Ella to the sun-kissed beaches of Galle. Your luxury adventure awaits.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          style={{
            display: 'flex',
            gap: '1.25rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <motion.button 
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-primary" 
            style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}
          >
            Start Your Journey
            <ChevronRight size={20} />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '1.2rem 2.5rem',
              fontSize: '1.1rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#fff',
              backdropFilter: 'blur(10px)',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'hsl(var(--primary))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Play size={16} fill="white" />
            </div>
            Watch Experience
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Decorative Gradient Overlays */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4) 100%)',
        pointerEvents: 'none'
      }} />
    </section>
  );
}
