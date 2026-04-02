import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Globe, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import sigiriyaImg from '../assets/sigiriya.png';
import parisImg from '../assets/paris.png';

export default function Hero() {
  const [hovered, setHovered] = React.useState(null);
  const navigate = useNavigate();

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
      height: '70vh',
      minHeight: '500px',
      width: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      borderRadius: '2.5rem',
      overflow: 'hidden',
      backgroundColor: '#000',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      cursor: 'default'
    }} className="hero-split-container">
      
      {/* Left Side: Inbound (Sri Lanka) */}
      <motion.div 
        onMouseEnter={() => setHovered('left')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate('/inbound')}
        style={{
          position: 'relative',
          flex: hovered === 'left' ? 1.5 : (hovered === 'right' ? 0.5 : 1),
          transition: 'flex 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        <motion.img 
          src={sigiriyaImg}
          alt="Sigiriya Sri Lanka"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.6)'
          }}
          animate={{ scale: hovered === 'left' ? 1.05 : 1 }}
          transition={{ duration: 0.8 }}
        />
        
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: 'white',
          padding: '2rem'
        }}>
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <p style={{ 
              fontSize: '0.9rem', 
              fontWeight: '800', 
              letterSpacing: '0.2em', 
              marginBottom: '1rem',
              color: 'white',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}>SRI LANKA</p>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
              fontWeight: '900', 
              marginBottom: '1.5rem',
              lineHeight: 1.1,
              color: 'white',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)'
            }}>Explore <br/> Serendib</h2>
            <div className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              View Tours <ChevronRight size={18} />
            </div>
          </motion.div>
        </div>

        {/* Overlay Gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)',
          zIndex: 1
        }} />
      </motion.div>

      {/* Vertical Divider (Desktop) */}
      <div style={{
        width: '1px',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        zIndex: 3
      }} className="hero-divider" />

      {/* Right Side: Outbound (Global) */}
      <motion.div 
        onMouseEnter={() => setHovered('right')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate('/outbound')}
        style={{
          position: 'relative',
          flex: hovered === 'right' ? 1.5 : (hovered === 'left' ? 0.5 : 1),
          transition: 'flex 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        <motion.img 
          src={parisImg}
          alt="Paris Outbound"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.6)'
          }}
          animate={{ scale: hovered === 'right' ? 1.05 : 1 }}
          transition={{ duration: 0.8 }}
        />

        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: 'white',
          padding: '2rem'
        }}>
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <p style={{ 
              fontSize: '0.9rem', 
              fontWeight: '800', 
              letterSpacing: '0.2em', 
              marginBottom: '1rem',
              color: 'white',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}>WORLDWIDE</p>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
              fontWeight: '900', 
              marginBottom: '1.5rem',
              lineHeight: 1.1,
              color: 'white',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)'
            }}>World of <br/> Wonder</h2>
            <div className="btn" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              backgroundColor: 'hsl(var(--accent))',
              color: 'white'
            }}>
              Discover More <ChevronRight size={18} />
            </div>
          </motion.div>
        </div>

        {/* Overlay Gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to left, rgba(0,0,0,0.4), transparent)',
          zIndex: 1
        }} />
      </motion.div>
    </section>
  );
}
