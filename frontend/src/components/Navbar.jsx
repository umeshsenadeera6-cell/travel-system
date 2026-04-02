import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '1rem 0' : '2rem 0',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: scrolled ? 'hsla(0, 0%, 100%, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid hsla(142, 76%, 36%, 0.1)' : 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{
        maxWidth: '1440px',
        width: '100%',
        padding: '0 5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            whileHover={{ scale: 1.01 }}
            style={{ 
              display: 'flex', 
              flexDirection: 'row',
              alignItems: 'center', 
              gap: '2rem', 
              cursor: 'pointer' 
            }}
          >
            {/* Brand Logo Image */}
            <motion.img 
              src={logoImg}
              alt="Serendib Logo"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{
                height: scrolled ? '60px' : '80px',
                width: 'auto',
                transition: 'height 0.4s ease'
              }}
            />

            {/* Vertical Separator */}
            <motion.div 
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{
                width: '1.5px',
                height: scrolled ? '40px' : '60px',
                backgroundColor: scrolled ? 'hsla(0, 0%, 0%, 0.1)' : 'hsla(0, 0%, 100%, 0.2)',
                transition: 'all 0.4s ease'
              }}
            />

            {/* Brand Name Text */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <span style={{ 
                fontSize: scrolled ? '1.5rem' : '2.2rem', 
                fontWeight: '900', 
                letterSpacing: '2px',
                color: scrolled ? 'hsl(240, 10%, 4%)' : 'white',
                lineHeight: 1,
                transition: 'all 0.4s ease'
              }}>
                SERENDIB
              </span>
              <span style={{ 
                fontSize: scrolled ? '0.7rem' : '0.9rem', 
                fontWeight: '700', 
                letterSpacing: '5px',
                color: scrolled ? 'hsl(142, 76%, 36%)' : '#34d399',
                marginTop: '4px',
                opacity: 0.9,
                transition: 'all 0.4s ease'
              }}>
                TRAVEL & TOURS
              </span>
            </motion.div>
          </motion.div>
        </Link>
      </div>
    </motion.header>
  );
}
