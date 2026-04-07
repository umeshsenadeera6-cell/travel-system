import React from 'react';
import { motion } from 'framer-motion';
import { Car, Hotel, Compass, Calendar, Building } from 'lucide-react';
import SectionHeader from './SectionHeader';

const ServicesGrid = ({ title, accentColor = 'hsl(var(--primary))', serviceLabels }) => {
  const services = [
    { 
      icon: <Car size={32} />, 
      title: serviceLabels.transport, 
      desc: "Premium fleet for all your travel needs." 
    },
    { 
      icon: <Hotel size={32} />, 
      title: serviceLabels.hotels, 
      desc: "Exclusive deals with handpicked luxury stays." 
    },
    { 
      icon: <Compass size={32} />, 
      title: serviceLabels.activities, 
      desc: "Curated experiences and local adventures." 
    },
    { 
      icon: <Calendar size={32} />, 
      title: serviceLabels.events, 
      desc: "Full event planning and MICE support." 
    },
    { 
      icon: <Building size={32} />, 
      title: "Corporate Travels", 
      desc: "Tailored business travel solutions." 
    }
  ];

  return (
    <section style={{ padding: '80px 0' }}>
      <SectionHeader title={title} center={true} accentColor={accentColor} />
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginTop: '3rem'
      }}>
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{
              padding: '3rem 2rem',
              borderRadius: '2rem',
              backgroundColor: 'white',
              border: '1px solid hsl(var(--glass-border))',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '1.5rem', 
              backgroundColor: 'hsl(var(--primary) / 0.05)', 
              color: accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '2rem'
            }}>
              {service.icon}
            </div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', color: 'hsl(var(--secondary))' }}>
              {service.title}
            </h4>
            <p style={{ fontSize: '1rem', opacity: 0.85, lineHeight: 1.6, fontWeight: '450', color: 'hsl(var(--foreground))' }}>
              {service.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;
