import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle, label, accentColor = 'hsl(var(--primary))', center = false }) => {
  return (
    <div style={{ 
      marginBottom: '4rem', 
      textAlign: center ? 'center' : 'inherit',
      display: 'flex',
      flexDirection: 'column',
      alignItems: center ? 'center' : 'flex-start'
    }}>
      {label && (
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label" 
          style={{ color: accentColor }}
        >
          {label}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="section-title"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ 
            maxWidth: '600px', 
            opacity: 0.6, 
            fontSize: '1.1rem',
            margin: center ? '0 auto' : '0'
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
