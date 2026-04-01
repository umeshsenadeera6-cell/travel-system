import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Menu, X, Phone, Globe } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inbound', href: '#inbound' },
    { name: 'Outbound', href: '#outbound' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '1rem 0' : '1.5rem 0',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: scrolled ? 'hsla(0, 0%, 100%, 0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid hsl(var(--glass-border))' : 'none',
      }}
    >
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            backgroundColor: 'hsl(var(--primary))',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px hsla(var(--primary) / 0.3)'
          }}>
            <Compass size={24} />
          </div>
          <span style={{ 
            fontSize: '1.5rem', 
            fontWeight: '900', 
            letterSpacing: '-1px',
            color: scrolled ? 'hsl(var(--foreground))' : 'hsl(var(--foreground))'
          }}>
            SERENDIB<span style={{ color: 'hsl(var(--primary))', marginLeft: '4px' }}>TRAVEL & TOURS</span>
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="desktop-only">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ y: -2 }}
              style={{
                textDecoration: 'none',
                color: 'hsl(var(--foreground))',
                fontSize: '0.95rem',
                fontWeight: '600',
                opacity: 0.8,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.opacity = 1}
              onMouseLeave={(e) => e.target.style.opacity = 0.8}
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="btn btn-ghost hide-mobile" style={{ padding: '0.6rem 1.25rem' }}>
            <Globe size={18} />
            EN
          </button>
          <button className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
            Book Now
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            style={{ 
              display: 'none', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              color: 'hsl(var(--foreground))'
            }} 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Basic responsive CSS for demo since I can't add media queries easily in inline style */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-only, .hide-mobile { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </motion.header>
  );
}
