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
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div style={{
      height: '80vh',
      minHeight: '600px',
      width: '100vw',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      backgroundColor: '#000',
      cursor: 'default'
    }} className="hero-split-container">
      
      {/* Left Side: Inbound (Sri Lanka) */}
      <motion.div 
        onMouseEnter={() => setHovered('left')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate('/inbound')}
        style={{
          position: 'relative',
          flex: hovered === 'left' ? 1.4 : (hovered === 'right' ? 0.6 : 1),
          transition: 'flex 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
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
            filter: hovered === 'left' ? 'brightness(0.7)' : 'brightness(0.5) grayscale(20%)'
          }}
          animate={{ scale: hovered === 'left' ? 1.05 : 1 }}
          transition={{ duration: 1.2 }}
        />
        
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: 'white',
          padding: '4rem'
        }}>
          <motion.div initial="hidden" whileInView="visible" variants={itemVariants}>
            <span style={{ 
              fontSize: '0.85rem', 
              fontWeight: '800', 
              letterSpacing: '0.3em', 
              marginBottom: '1.5rem',
              color: 'hsl(var(--primary))',
              display: 'block'
            }}>AUTHENTIC SRI LANKA</span>
            <h2 className="serif" style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
              fontWeight: 800, 
              marginBottom: '2rem',
              lineHeight: 1,
              color: 'white',
              textShadow: '0 4px 30px rgba(0,0,0,0.5)'
            }}>Explore <br/> Serendib</h2>
            <div className="btn" style={{ 
              backgroundColor: 'white', 
              color: 'black',
              padding: '1rem 2.5rem'
            }}>
              View Packages <ChevronRight size={20} />
            </div>
          </motion.div>
        </div>

        {/* Overlay Gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.6), transparent)',
          zIndex: 1
        }} />
      </motion.div>

      {/* Vertical Divider (Desktop) */}
      <div style={{
        width: '1px',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.15)',
        zIndex: 3
      }} className="hero-divider" />

      {/* Right Side: Outbound (Global) */}
      <motion.div 
        onMouseEnter={() => setHovered('right')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate('/outbound')}
        style={{
          position: 'relative',
          flex: hovered === 'right' ? 1.4 : (hovered === 'left' ? 0.6 : 1),
          transition: 'flex 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
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
            filter: hovered === 'right' ? 'brightness(0.7)' : 'brightness(0.5) grayscale(20%)'
          }}
          animate={{ scale: hovered === 'right' ? 1.05 : 1 }}
          transition={{ duration: 1.2 }}
        />

        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: 'white',
          padding: '4rem'
        }}>
          <motion.div initial="hidden" whileInView="visible" variants={itemVariants}>
            <span style={{ 
              fontSize: '0.85rem', 
              fontWeight: '800', 
              letterSpacing: '0.3em', 
              marginBottom: '1.5rem',
              color: 'hsl(var(--accent))',
              display: 'block'
            }}>GLOBAL EXPLORATION</span>
            <h2 className="serif" style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
              fontWeight: 800, 
              marginBottom: '2rem',
              lineHeight: 1,
              color: 'white',
              textShadow: '0 4px 30px rgba(0,0,0,0.5)'
            }}>World of <br/> Wonder</h2>
            <div className="btn" style={{ 
              backgroundColor: 'white', 
              color: 'black',
              padding: '1rem 2.5rem'
            }}>
              Discover More <ChevronRight size={20} />
            </div>
          </motion.div>
        </div>

        {/* Overlay Gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to left, rgba(0,0,0,0.6), transparent)',
          zIndex: 1
        }} />
      </motion.div>
    </div>
  );
}
