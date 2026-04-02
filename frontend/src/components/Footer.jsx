import React from 'react';
import { motion } from 'framer-motion';
import { Camera, MessageCircle, Users, Heart } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Footer() {
  return (
    <footer style={{
      padding: '100px 5% 50px',
      backgroundColor: 'hsl(var(--secondary))',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Gradient Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(to right, transparent, hsla(142, 76%, 36%, 0.3), transparent)',
      }} />

      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '5rem'
      }}>
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <img 
              src={logoImg} 
              alt="Serendib Logo" 
              style={{ height: '60px', width: 'auto', filter: 'brightness(0) invert(1)' }} 
            />
            <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '2px', lineHeight: 1 }}>
                SERENDIB
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '4px', color: 'hsl(var(--primary))', marginTop: '4px' }}>
                TRAVEL & TOURS
              </span>
            </div>
          </div>
          <p style={{ opacity: 0.6, lineHeight: 1.8, marginBottom: '3rem', maxWidth: '500px', fontSize: '1.1rem' }}>
            Crafting unforgettable journeys across Sri Lanka and beyond. 
            We provide luxury adventures that resonate with the soul and create lasting memories.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[Camera, MessageCircle, Users].map((Icon, idx) => (
              <motion.a 
                key={idx}
                whileHover={{ y: -5, color: 'hsl(var(--primary))', backgroundColor: 'white' }}
                href="#" 
                style={{ 
                  color: 'white', 
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                <Icon size={22} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="serif" style={{ color: 'white', marginBottom: '2rem', fontSize: '1.4rem', fontWeight: 600 }}>Explore</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem', opacity: 0.6, fontSize: '1.1rem' }}>
            <li style={{ cursor: 'pointer' }}>Inbound Tours</li>
            <li style={{ cursor: 'pointer' }}>Global Wonders</li>
            <li style={{ cursor: 'pointer' }}>Luxury Stays</li>
            <li style={{ cursor: 'pointer' }}>Curated Blogs</li>
          </ul>
        </div>

        <div>
          <h4 className="serif" style={{ color: 'white', marginBottom: '2rem', fontSize: '1.4rem', fontWeight: 600 }}>Newsletter</h4>
          <p style={{ opacity: 0.6, marginBottom: '2rem', lineHeight: 1.6 }}>Subscribe for exclusive travel insights and offers.</p>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '1rem',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: 'white',
                outline: 'none',
                fontSize: '1rem'
              }}
            />
            <button 
              className="btn btn-primary" 
              style={{ padding: '1.25rem', borderRadius: '1rem', width: '100%', fontWeight: 700 }}
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1440px',
        margin: '80px auto 0',
        paddingTop: '30px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
        opacity: 0.4,
        fontSize: '0.95rem'
      }}>
        <p>© 2026 Serendib Travel & Tours. Elevating every journey.</p>
        <div style={{ display: 'flex', gap: '3rem' }}>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Cookies</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Made with <Heart size={16} fill="currentColor" /> for the curious traveler
        </div>
      </div>
    </footer>
  );
}
