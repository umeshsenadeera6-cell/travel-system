import React, { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Globe, Instagram, Twitter, Facebook, Heart } from "lucide-react";
import "./index.css";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PackageCard from "./components/PackageCard";

// Inbound Assets (Sri Lanka)
import sigiriyaImg from "./assets/sigiriya.png";
import ellaImg from "./assets/ella.png";
import galleImg from "./assets/galle.png";
import kandyImg from "./assets/kandy.png";

// Outbound Assets (Global)
import parisImg from "./assets/paris.png";
import tokyoImg from "./assets/tokyo.png";
import dubaiImg from "./assets/dubai.png";
import sydneyImg from "./assets/sydney.png";

const INBOUND_PACKAGES = [
  { id: 1, title: "Sigiriya Tour", price: 200, image: sigiriyaImg },
  { id: 2, title: "Ella Adventure", price: 150, image: ellaImg },
  { id: 3, title: "Galle Day Trip", price: 120, image: galleImg },
  { id: 4, title: "Kandy Cultural Show", price: 80, image: kandyImg }
];

const OUTBOUND_PACKAGES = [
  { id: 5, title: "Paris Romance", price: 1200, image: parisImg },
  { id: 6, title: "Tokyo Neon Nights", price: 1500, image: tokyoImg },
  { id: 7, title: "Dubai Luxury Desert", price: 900, image: dubaiImg },
  { id: 8, title: "Sydney Harbor Escape", price: 1100, image: sydneyImg }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function App() {
  console.log('App component rendering');
  const [inbound] = useState(INBOUND_PACKAGES);
  const [outbound] = useState(OUTBOUND_PACKAGES);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))'
    }}>
      <h1 style={{ color: 'red', textAlign: 'center', paddingTop: '100px' }}>DEV RENDERING CHECK</h1>
      <Navbar />
      
      <main style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 5%'
      }}>
        <Hero />

        {/* Inbound Section */}
        <motion.section 
          id="inbound" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          style={{ marginTop: 'clamp(6rem, 10vw, 10rem)' }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '4rem'
          }}>
            <p className="section-label">SRI LANKA'S HIDDEN GEMS</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 className="section-title">Inbound Tours</h2>
              <motion.p 
                whileHover={{ x: 5 }}
                style={{ 
                  color: 'hsl(var(--primary))', 
                  fontWeight: '700', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1rem',
                  paddingBottom: '0.75rem'
                }}
              >
                Explore the Whole Island View All <Globe size={20} />
              </motion.p>
            </div>
          </div>

          <motion.div 
            variants={staggerContainer}
            className="grid-layout"
          >
            {inbound.map(p => (
              <motion.div variants={fadeInUp} key={p.id}>
                <PackageCard pkg={p} image={p.image} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Outbound Section */}
        <motion.section 
          id="outbound" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          style={{ marginTop: 'clamp(8rem, 12vw, 12rem)' }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '4rem'
          }}>
            <p className="section-label" style={{ color: 'hsl(var(--accent))' }}>GLOBAL ESCAPES</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 className="section-title">Outbound Escapes</h2>
              <motion.p 
                whileHover={{ x: 5 }}
                style={{ 
                  color: 'hsl(var(--accent))', 
                  fontWeight: '700', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1rem',
                  paddingBottom: '0.75rem'
                }}
              >
                See International Packages <Compass size={20} />
              </motion.p>
            </div>
          </div>

          <motion.div 
            variants={staggerContainer}
            className="grid-layout"
          >
            {outbound.map(p => (
              <motion.div variants={fadeInUp} key={p.id}>
                <PackageCard pkg={p} image={p.image} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </main>
      
      {/* Footer */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Compass size={32} className="text-primary" style={{ color: 'hsl(var(--primary))' }} />
              <span style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-1px' }}>
                SERENDIB<span style={{ color: 'hsl(var(--primary))', marginLeft: '4px' }}>TRAVEL & TOURS</span>
              </span>
            </div>
            <p style={{ opacity: 0.6, lineHeight: 1.8, marginBottom: '2rem' }}>
              Crafting unforgettable journeys across Sri Lanka and beyond. 
              Our mission is to provide luxury adventures that resonate with the soul.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {[Instagram, Twitter, Facebook].map((Icon, idx) => (
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
    </div>
  );
}
