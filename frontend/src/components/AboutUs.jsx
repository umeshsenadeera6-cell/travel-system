import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Star, Users } from 'lucide-react';
import ellaImg from '../assets/ella.png';

export default function AboutUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const features = [
    {
      icon: <ShieldCheck className="text-emerald-600" size={24} />,
      title: "Trusted Expertise",
      description: "Over a decade of crafting unforgettable journeys across the globe."
    },
    {
      icon: <Star className="text-emerald-600" size={24} />,
      title: "Premium Quality",
      description: "Handpicked accommodations and elite experiences for every traveler."
    },
    {
      icon: <Users className="text-emerald-600" size={24} />,
      title: "Personalized Service",
      description: "Dedicated travel specialists who treat your trip as their own."
    }
  ];

  return (
    <section id="about" style={{ 
      padding: '100px 0', 
      backgroundColor: 'hsl(var(--background))',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        alignItems: 'center'
      }}>
        
        {/* Left: Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p variants={itemVariants} className="section-label">
            Our Story
          </motion.p>
          <motion.h2 variants={itemVariants} className="section-title">
            Crafting Memories <br/> Beyond Borders
          </motion.h2>
          <motion.p variants={itemVariants} style={{ 
            fontSize: '1.1rem', 
            color: 'hsl(var(--foreground) / 0.7)',
            marginBottom: '2.5rem',
            maxWidth: '600px'
          }}>
            At Serendib Travel & Tours, we believe travel is more than just visiting a destination; it's about the stories you bring home. Founded with a passion for discovery, we specialize in creating bespoke travel experiences that blend luxury, adventure, and cultural immersion.
          </motion.p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{
                  padding: '12px',
                  backgroundColor: 'hsla(var(--primary) / 0.1)',
                  borderRadius: '1rem',
                  color: 'hsl(var(--primary))'
                }}>
                  {feature.icon}
                </div>
                <div>
                  <h4 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: '700', 
                    marginBottom: '0.25rem',
                    color: 'hsl(var(--secondary))'
                  }}>
                    {feature.title}
                  </h4>
                  <p style={{ color: 'hsl(var(--foreground) / 0.6)', fontSize: '0.95rem' }}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} style={{ marginTop: '3rem' }}>
            <button className="btn btn-primary">
              Learn More About Us
            </button>
          </motion.div>
        </motion.div>

        {/* Right: Image Component */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            position: 'relative',
            height: '600px',
            borderRadius: '2.5rem',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <img 
            src={ellaImg} 
            alt="Beautiful Sri Lanka Landscape" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          
          {/* Experience Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '2rem',
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '1.5rem',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              zIndex: 10
            }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: 'hsl(var(--primary))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '900',
              fontSize: '1.25rem'
            }}>
              10+
            </div>
            <div>
              <p style={{ fontWeight: '800', lineHeight: 1.2, color: 'hsl(var(--secondary))' }}>
                Years of <br/> Excellence
              </p>
            </div>
          </motion.div>

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 40%)',
            pointerEvents: 'none'
          }} />
        </motion.div>

      </div>
    </section>
  );
}
