import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InternalNav = ({ links, accentColor = 'hsl(var(--primary))' }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if sticky
      setIsSticky(window.scrollY > 400);

      // Check active section
      const scrollPosition = window.scrollY + 150;
      
      for (const link of links) {
        const element = document.getElementById(link.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav 
      className={`internal-nav ${isSticky ? 'sticky' : ''}`}
      style={{
        position: isSticky ? 'fixed' : 'relative',
        top: isSticky ? '80px' : '0',
        left: '0',
        width: '100%',
        zIndex: 40,
        transition: 'all 0.3s ease'
      }}
    >
      <div 
        className="glass-nav"
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '1rem 5%',
          display: 'flex',
          gap: '2rem',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          borderBottom: isSticky ? '1px solid hsla(var(--primary) / 0.1)' : 'none',
          boxShadow: isSticky ? '0 10px 30px -10px rgba(0,0,0,0.05)' : 'none'
        }}
      >
        <style>
          {`
            .internal-nav .glass-nav::-webkit-scrollbar {
              display: none;
            }
            .nav-link {
              white-space: nowrap;
              font-weight: 600;
              font-size: 0.9rem;
              color: hsl(var(--foreground) / 0.6);
              cursor: pointer;
              transition: all 0.2s ease;
              position: relative;
              padding: 0.5rem 0;
            }
            .nav-link:hover {
              color: ${accentColor};
            }
            .nav-link.active {
              color: ${accentColor};
            }
            .nav-link.active::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 2px;
              background-color: ${accentColor};
              border-radius: 2px;
            }
          `}
        </style>
        {links.map((link) => (
          <div
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
          >
            {link.label}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default InternalNav;
