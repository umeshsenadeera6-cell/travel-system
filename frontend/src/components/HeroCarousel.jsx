import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import beachImg from '../assets/carousel-beach.png';
import mountainImg from '../assets/carousel-mountain.png';
import cityImg from '../assets/carousel-city.png';

const slides = [
  {
    id: 1,
    image: beachImg,
    title: "Escape to Paradise",
    subtitle: "Discover the hidden gems of Sri Lanka's pristine coastline.",
    cta: "Explore Inbound Tours",
    link: "/inbound"
  },
  {
    id: 2,
    image: mountainImg,
    title: "Summit New Heights",
    subtitle: "Experience breathtaking alpine landscapes and luxury retreats.",
    cta: "See Global Escapes",
    link: "/outbound"
  },
  {
    id: 3,
    image: cityImg,
    title: "Vibrant City Beats",
    subtitle: "Immerse yourself in the energy of the world's most dynamic capitals.",
    cta: "Start Your Journey",
    link: "/outbound"
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const variants = {
    enter: (direction) => ({
      scale: 1.1,
      opacity: 0,
      filter: 'blur(10px)'
    }),
    center: {
      zIndex: 1,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: {
      zIndex: 0,
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 1.2
      }
    }
  };

  return (
    <div style={{
      position: 'relative',
      height: '95vh',
      width: '100%',
      overflow: 'hidden',
      backgroundColor: '#000',
    }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%'
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)',
            zIndex: 1
          }} />
          
          <img
            src={slides[current].image}
            alt={slides[current].title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />

          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            right: '10%',
            maxWidth: '1200px',
            margin: '0 auto',
            zIndex: 2,
            color: 'white'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{ 
                color: 'white', 
                opacity: 0.9,
                fontWeight: 800, 
                textTransform: 'uppercase', 
                letterSpacing: '4px',
                fontSize: '0.9rem',
                display: 'block',
                marginBottom: '1rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                borderLeft: '4px solid hsl(var(--primary))',
                paddingLeft: '1.5rem'
              }}>
                Luxury Travel Experiences
              </span>
              <h1 className="serif" style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 800,
                lineHeight: 1,
                marginBottom: '1.5rem',
                color: 'white',
                textShadow: '0 10px 40px rgba(0,0,0,0.9), 0 4px 15px rgba(0,0,0,0.7)',
              }}>
                {slides[current].title}
              </h1>

              
              <p style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                opacity: 1,
                marginBottom: '3rem',
                lineHeight: 1.6,
                maxWidth: '700px',
                fontWeight: 500,
                textShadow: '0 2px 15px rgba(0,0,0,0.8)',
              }}>
                {slides[current].subtitle}
              </p>

              
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'white', color: 'black' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(slides[current].link)}
                style={{
                  background: 'transparent',
                  backdropFilter: 'blur(12px)',
                  border: '2px solid white',
                  padding: '1.25rem 2.5rem',
                  borderRadius: '100px',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {slides[current].cta} <ArrowRight size={22} />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '10%',
        right: '10%',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          gap: '1rem'
        }}>
          {slides.map((_, idx) => (
            <motion.div
              key={idx}
              initial={false}
              animate={{ 
                width: current === idx ? '50px' : '10px',
                backgroundColor: current === idx ? 'white' : 'rgba(255,255,255,0.4)'
              }}
              onClick={() => {
                setCurrent(idx);
              }}
              style={{
                height: '4px',
                borderRadius: '2px',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <button onClick={prevSlide} style={controlBtnStyle}>
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} style={controlBtnStyle}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes reveal {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }
      `}</style>
    </div>
  );
}

const controlBtnStyle = {
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  color: 'white',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
};
