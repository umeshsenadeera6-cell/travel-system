import React from 'react';
import { motion } from 'framer-motion';

// Import the generated logos
import jetwingLogo from '../assets/jetwing-logo.png';
import cinnamonLogo from '../assets/hotel-logo-1.png'; // Placeholder for Cinnamon
import ugaLogo from '../assets/hotel-logo-2.png';      // Placeholder for Uga Escapes

const PARTNERS = [
  { id: 1, name: 'Jetwing Hotels', logo: jetwingLogo },
  { id: 2, name: 'Cinnamon Hotels', logo: cinnamonLogo },
  { id: 3, name: 'Uga Escapes', logo: ugaLogo },
  { id: 4, name: 'Aman Resorts', logo: cinnamonLogo }, 
  { id: 5, name: 'Shangri-La Hotels', logo: ugaLogo },
  { id: 6, name: 'Resplendent Ceylon', logo: jetwingLogo },
];

const PartnerLogos = ({ accentColor = 'hsl(var(--primary))' }) => {
  return (
    <section style={{ padding: '40px 0 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          style={{ 
            textTransform: 'uppercase', 
            letterSpacing: '3px', 
            fontSize: '0.8rem', 
            fontWeight: 700,
            color: accentColor,
            marginBottom: '1rem'
          }}
        >
          Our Trusted Hospitality Partners
        </motion.p>
      </div>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '3rem',
        opacity: 0.8
      }}>
        {PARTNERS.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, opacity: 1 }}
            style={{ 
              width: '180px', 
              height: '100px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              filter: 'grayscale(100%)',
              transition: 'filter 0.3s ease',
              padding: '1rem',
              borderRadius: '1rem',
              backgroundColor: 'hsl(var(--primary) / 0.03)',
              border: '1px solid hsl(var(--primary) / 0.05)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%)'}
            onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%)'}
          >
            <img 
              src={partner.logo} 
              alt={partner.name} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain' 
              }} 
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PartnerLogos;
