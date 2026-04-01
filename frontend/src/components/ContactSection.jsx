import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

const CONTACT_DATA = {
  inbound: {
    title: 'Sri Lanka Support Office',
    subtitle: 'Local expertise for your island adventure.',
    address: 'No 45, Galle Road, Colombo 03, Sri Lanka',
    phone: '+94 11 234 5678',
    email: 'inbound@serendibtravel.com',
    hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    accent: 'hsl(var(--primary))'
  },
  outbound: {
    title: 'International Hub (Dubai)',
    subtitle: 'Global coordination for the modern explorer.',
    address: 'Level 12, Emirates Towers, Sheikh Zayed Road, Dubai, UAE',
    phone: '+971 4 330 0000',
    email: 'outbound@serendibtravel.com',
    hours: 'Sun - Thu: 9:00 AM - 6:00 PM',
    accent: 'hsl(var(--accent))'
  }
};

export default function ContactSection({ type = 'inbound' }) {
  const data = CONTACT_DATA[type] || CONTACT_DATA.inbound;

  return (
    <section style={{ marginTop: '6rem', marginBottom: '4rem' }}>
      <div 
        style={{ 
          padding: '4rem',
          borderRadius: '2.5rem',
          background: 'linear-gradient(135deg, hsl(var(--secondary) / 0.03) 0%, hsl(var(--primary) / 0.05) 100%)',
          border: '1px solid hsl(var(--primary) / 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Decorative Element */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          backgroundColor: data.accent,
          opacity: 0.03,
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Text Content */}
          <div>
            <p className="section-label" style={{ color: data.accent }}>NEED ASSISTANCE?</p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem' }}>{data.title}</h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.7, marginBottom: '2.5rem', maxWidth: '450px' }}>
              {data.subtitle} Our dedicated {type} team is ready to help you plan your perfect journey.
            </p>

            <motion.div 
              whileHover={{ x: 10 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', color: data.accent, fontWeight: '800', cursor: 'pointer' }}
            >
              Get a Personalized Quote <ArrowRight size={20} />
            </motion.div>
          </div>

          {/* Details Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '2.5rem',
            borderRadius: '2rem',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)',
            border: '1px solid hsl(var(--glass-border))',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <DetailItem icon={<MapPin size={20} color={data.accent} />} label="Address" value={data.address} />
            <DetailItem icon={<Phone size={20} color={data.accent} />} label="Hotline" value={data.phone} />
            <DetailItem icon={<Mail size={20} color={data.accent} />} label="Email" value={data.email} />
            <DetailItem icon={<Clock size={20} color={data.accent} />} label="Office Hours" value={data.hours} />
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', gap: '1.25rem' }}>
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        backgroundColor: 'hsl(var(--primary) / 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.4, marginBottom: '0.25rem' }}>
          {label}
        </p>
        <p style={{ fontSize: '1rem', fontWeight: '600', color: 'hsl(var(--secondary))' }}>
          {value}
        </p>
      </div>
    </div>
  );
}
