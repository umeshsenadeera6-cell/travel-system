import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ChevronRight, Globe, Compass, Plane, Briefcase, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import assets
import heroBg from '../assets/hero_antigravity.png';
import airplaneAsset from '../assets/floating_airplane.png';
import globeAsset from '../assets/floating_globe.png';

export default function AntiGravityHero() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Parallax transforms for layers
  const bgX = useTransform(springX, [-500, 500], [-30, 30]);
  const bgY = useTransform(springY, [-500, 500], [-30, 30]);
  
  const midX = useTransform(springX, [-500, 500], [-60, 60]);
  const midY = useTransform(springY, [-500, 500], [-60, 60]);

  const frontX = useTransform(springX, [-500, 500], [-100, 100]);
  const frontY = useTransform(springY, [-500, 500], [-100, 100]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        height: '92vh',
        minHeight: '800px',
        width: '100%',
        position: 'relative',
        marginTop: '80px',
        borderRadius: '3rem',
        overflow: 'hidden',
        backgroundColor: '#020617', // Dark slate/space color
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'default'
      }}
    >
      {/* Layer 1: Deep Background (The generated scene) */}
      <motion.div 
        style={{
          position: 'absolute',
          inset: '-5%',
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7) contrast(1.1)',
          zIndex: 0,
          x: bgX,
          y: bgY
        }}
      />

      {/* Subtle Gradient Overlays */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 0%, rgba(2,6,23,0.4) 100%)',
        zIndex: 1
      }} />

      {/* Layer 2: Midground Floating Objects (The airplane) */}
      <motion.div 
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          right: '8%',
          top: '20%',
          zIndex: 2,
          x: midX,
          y: midY,
          mixBlendMode: 'screen', // Removes black background
          pointerEvents: 'none'
        }}
        animate={{ 
          y: [0, -40, 0],
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <img src={airplaneAsset} alt="Floating Airplane" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </motion.div>

      {/* Layer 3: Foreground Floating Objects (The globe) */}
      <motion.div 
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          left: '5%',
          bottom: '10%',
          zIndex: 4,
          x: frontX,
          y: frontY,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          opacity: 0.9
        }}
        animate={{ 
          y: [0, 50, 0],
          rotate: [0, -10, 10, 0],
          scale: [1, 0.95, 1]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      >
        <img src={globeAsset} alt="Floating Globe" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </motion.div>

      {/* Floating Icons (Lucide) for depth */}
      <FloatingIcon Icon={Compass} delay={0} x={frontX} y={frontY} top="25%" left="15%" size={32} />
      <FloatingIcon Icon={Briefcase} delay={3} x={midX} y={midY} bottom="30%" right="20%" size={24} />
      <FloatingIcon Icon={MapPin} delay={1.5} x={bgX} y={bgY} top="15%" right="35%" size={20} />

      {/* Central Glassmorphic Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '800px',
          textAlign: 'center',
          padding: '4rem',
          borderRadius: '2.5rem',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}
        className="glass-dark"
      >
        {/* Glowing Edge Border Effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 'inherit',
          boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05)',
          pointerEvents: 'none'
        }} />

        <motion.div
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <p style={{ 
            fontSize: '0.85rem', 
            fontWeight: '800', 
            letterSpacing: '0.5em', 
            color: '#34d399', // Emerald/Mint
            textTransform: 'uppercase'
          }}>Venture Beyond Boundaries</p>
        </motion.div>

        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
          fontWeight: '900', 
          color: 'white',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          textShadow: '0 10px 40px rgba(0,0,0,0.5)'
        }}>
          Experience <br /> 
          <span style={{ 
            background: 'linear-gradient(135deg, #fff 0%, #34d399 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Anti-Gravity</span> Travel
        </h1>

        <p style={{ 
          fontSize: '1.1rem', 
          color: 'rgba(255,255,255,0.7)', 
          maxWidth: '500px',
          fontWeight: 500
        }}>
          Discover a new dimension of exploration. From tropical paradises to global wonders, rewritten for the futuristic traveler.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
          <button 
            onClick={() => navigate('/inbound')}
            className="btn btn-primary" 
            style={{ 
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              border: 'none',
              boxShadow: '0 10px 25px rgba(5, 150, 105, 0.4)'
            }}
          >
            Serendib Tours <ChevronRight size={20} />
          </button>
          <button 
            onClick={() => navigate('/outbound')}
            className="btn glass" 
            style={{ 
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              color: 'white',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            World Wonders
          </button>
        </div>
      </motion.div>

      {/* Decorative Blur Orbs */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
        top: '-10%',
        right: '-5%',
        filter: 'blur(80px)',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
        bottom: '0',
        left: '0',
        filter: 'blur(100px)',
        zIndex: 1
      }} />

    </section>
  );
}

function FloatingIcon({ Icon, delay, x, y, size, ...pos }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        zIndex: 5,
        x, y,
        color: 'white',
        opacity: 0.4,
        ...pos
      }}
      animate={{ 
        y: [0, -20, 0],
        rotate: [0, 15, -15, 0]
      }}
      transition={{ 
        duration: 8 + Math.random() * 5, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
    >
      <Icon size={size} />
    </motion.div>
  );
}
