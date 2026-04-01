import React from 'react';
import { motion } from 'framer-motion';
import { Camera, MessageCircle, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      marginTop: '12rem',
      padding: '8rem 5% 4rem 5%',
      backgroundColor: 'hsl(var(--secondary))',
      color: 'white',
      borderTop: '1px solid hsl(var(--glass-border))'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '4rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ height: '48px', width: 'auto' }}>
              <img 
                src="/assets/logo.png" 
                alt="Serendib Logo" 
                style={{ height: '100%', width: 'auto', filter: 'brightness(1.2)' }} 
              />
            </div>
            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '1px', lineHeight: 1 }}>
                  SERENDIB
                </span>
                <span style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '3px', color: 'hsl(var(--primary))', marginTop: '2px' }}>
                  TRAVEL & TOURS
                </span>
              </div>
            </Link>
          </div>
          <p style={{ opacity: 0.6, lineHeight: 1.8, marginBottom: '2rem' }}>
            Crafting unforgettable journeys across Sri Lanka and beyond. 
            Our mission is to provide luxury adventures that resonate with the soul.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[Camera, MessageCircle, Users].map((Icon, idx) => (
              <motion.a 
                key={idx}
                whileHover={{ y: -5, color: 'hsl(var(--primary))' }}
                href="#" 
                style={{ color: 'white', opacity: 0.8 }}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Experience</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.7 }}>
            <li>Cultural Tours</li>
            <li>Beach Escapes</li>
            <li>Mountain Hiking</li>
            <li>Wildlife Safari</li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Company</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.7 }}>
            <li>Our Story</li>
            <li>Work With Us</li>
            <li>Blog</li>
            <li>Sustainability</li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Subscribe</h4>
          <p style={{ opacity: 0.6, marginBottom: '1.5rem' }}>Get the latest updates on luxury travel.</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="Email address" 
              style={{
                flex: 1,
                padding: '1rem 1.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.2)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: 'white',
                outline: 'none'
              }}
            />
            <button 
              className="btn btn-primary" 
              style={{ padding: '0 1.5rem', borderRadius: '12px' }}
            >
              Join
            </button>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1440px',
        margin: '6rem auto 0 auto',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        opacity: 0.5,
        fontSize: '0.9rem'
      }}>
        <p>© 2026 Serendib Travel & Tours. All Rights Reserved.</p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Made with <Heart size={16} fill="currentColor" /> by the Design Teams
        </div>
      </div>
    </footer>
  );
}
