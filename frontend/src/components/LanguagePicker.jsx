import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '简体中文', flag: '🇨🇳' },
];

export default function LanguagePicker({ currentLang = 'en', onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLang = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <div style={{ position: 'relative', zIndex: 100 }}>
      {/* Target/Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.6rem 1.25rem',
          borderRadius: '999px',
          backgroundColor: 'white',
          border: '1.5px solid hsl(var(--primary) / 0.1)',
          cursor: 'pointer',
          fontWeight: '700',
          fontSize: '0.9rem',
          color: 'hsl(var(--secondary))',
          boxShadow: '0 4px 10px rgba(0,0,0,0.02)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'hsl(var(--primary) / 0.3)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'hsl(var(--primary) / 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>{selectedLang.flag}</span>
        <span>{selectedLang.name}</span>
        <ChevronDown 
          size={16} 
          style={{ 
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)'
          }} 
        />
      </button>

      {/* Dropdown Card */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for closing */}
            <div 
              onClick={() => setIsOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: -1 }} 
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 4 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                width: '200px',
                backgroundColor: 'white',
                borderRadius: '1.25rem',
                padding: '0.5rem',
                border: '1px solid hsl(var(--glass-border))',
                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                overflow: 'hidden'
              }}
            >
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onSelect(lang.code);
                    setIsOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0.75rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    backgroundColor: currentLang === lang.code ? 'hsl(var(--primary) / 0.05)' : 'transparent',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (currentLang !== lang.code) e.currentTarget.style.backgroundColor = 'hsl(var(--primary) / 0.03)';
                  }}
                  onMouseLeave={(e) => {
                    if (currentLang !== lang.code) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{lang.flag}</span>
                    <span style={{ 
                      fontWeight: currentLang === lang.code ? '700' : '500',
                      color: currentLang === lang.code ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
                      fontSize: '0.95rem'
                    }}>
                      {lang.name}
                    </span>
                  </div>
                  {currentLang === lang.code && <Check size={14} color="hsl(var(--primary))" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
