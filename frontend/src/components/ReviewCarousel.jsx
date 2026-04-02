import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "James Anderson",
    location: "London, UK",
    text: "Serendib Travel & Tours made our honeymoon in Sri Lanka absolutely magical. The attention to detail and personal touch were unmatched.",
    rating: 5,
    avatar: "JA"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    location: "Sydney, Australia",
    text: "The wildlife safari and tea plantation tours were breathtaking. Everything was perfectly organized, allowing us to just relax and enjoy.",
    rating: 5,
    avatar: "SJ"
  },
  {
    id: 3,
    name: "Michael Chen",
    location: "Singapore",
    text: "Professional, reliable, and deeply knowledgeable. They showed us hidden gems of the cultural triangle that most tourists never see.",
    rating: 5,
    avatar: "MC"
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    location: "Madrid, Spain",
    text: "From the moment we landed until our departure, we felt like VIPs. The luxury accommodations they handpicked were stunning.",
    rating: 5,
    avatar: "ER"
  },
  {
    id: 5,
    name: "David Wilson",
    location: "New York, USA",
    text: "I've traveled with many agencies, but Serendib's personalized service is on another level. They truly treat your trip as their own.",
    rating: 5,
    avatar: "DW"
  },
  {
    id: 6,
    name: "Sophie Müller",
    location: "Berlin, Germany",
    text: "The perfect blend of adventure and relaxation. Their guides are exceptional and their passion for Sri Lanka is contagious.",
    rating: 5,
    avatar: "SM"
  }
];

// Duplicate reviews for seamless infinite loop
const infiniteReviews = [...reviews, ...reviews];

export default function ReviewCarousel() {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '2rem 0' }}>
      {/* Fading Edges */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '200px',
        background: 'linear-gradient(to right, hsl(var(--background)), transparent)',
        zIndex: 10,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '200px',
        background: 'linear-gradient(to left, hsl(var(--background)), transparent)',
        zIndex: 10,
        pointerEvents: 'none'
      }} />

      {/* Animated Track */}
      <motion.div 
        animate={{ 
          x: [0, -2592] // (400px width + 32px gap) * 6 reviews
        }}
        transition={{ 
          duration: 40, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        style={{ 
          display: 'flex', 
          gap: '2.5rem',
          width: 'max-content',
          padding: '40px 0'
        }}
      >
        {infiniteReviews.map((review, index) => (
          <motion.div 
            key={`${review.id}-${index}`}
            whileHover={{ y: -10, scale: 1.02 }}
            className="glass"
            style={{
              width: '420px',
              padding: '3rem 2.5rem',
              borderRadius: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              flexShrink: 0,
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ 
              position: 'absolute', 
              top: '2rem', 
              right: '2.5rem',
              color: 'hsla(var(--primary) / 0.1)'
            }}>
              <Quote size={48} fill="currentColor" />
            </div>

            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={18} fill="hsl(var(--primary))" color="hsl(var(--primary))" />
              ))}
            </div>

            <p style={{ 
              fontSize: '1.1rem', 
              color: 'hsl(var(--foreground))',
              lineHeight: '1.8',
              opacity: 0.8,
              fontStyle: 'italic',
              flex: 1
            }}>
              "{review.text}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '1rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '1rem',
                backgroundColor: 'hsl(var(--primary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '800',
                fontSize: '1rem',
                boxShadow: '0 10px 20px hsla(var(--primary) / 0.2)'
              }}>
                {review.avatar}
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'hsl(var(--secondary))' }}>{review.name}</h4>
                <p style={{ fontSize: '0.9rem', color: 'hsl(var(--foreground))', opacity: 0.5, margin: 0 }}>{review.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
