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
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.8, ease: "easeOut" }
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.8, ease: "easeIn" }
      }
    })
  };

  return (
    <div style={{
      position: 'relative',
      height: '85vh',
      width: '100%',
      overflow: 'hidden',
      borderRadius: '2.5rem',
      backgroundColor: '#000',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      marginTop: '120px'
    }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
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
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)',
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
            bottom: '15%',
            left: '8%',
            maxWidth: '600px',
            zIndex: 2,
            color: 'white'
          }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.6)',
                color: 'white'
              }}
            >
              {slides[current].title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                fontSize: '1.25rem',
                opacity: 0.9,
                marginBottom: '2.5rem',
                lineHeight: 1.6,
                fontWeight: 400,
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                color: 'white'
              }}
            >
              {slides[current].subtitle}
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.7 }}
              onClick={() => navigate(slides[current].link)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '1rem 2rem',
                borderRadius: '100px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              {slides[current].cta} <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div style={{
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        zIndex: 10,
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
      }}>
        <button onClick={prevSlide} style={controlBtnStyle}>
          <ChevronLeft size={24} />
        </button>
        <div style={{
          display: 'flex',
          gap: '0.5rem'
        }}>
          {slides.map((_, idx) => (
            <div
              key={idx}
              onClick={() => {
                setDirection(idx > current ? 1 : -1);
                setCurrent(idx);
              }}
              style={{
                width: current === idx ? '30px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: current === idx ? 'white' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
        <button onClick={nextSlide} style={controlBtnStyle}>
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

const controlBtnStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};
