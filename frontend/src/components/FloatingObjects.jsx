import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Map as MapIcon, 
  Compass, 
  Briefcase, 
  Camera, 
  Globe, 
  Palmtree, 
  Mountain,
  Sun,
  Tent,
  Ship,
  MapPin,
  BaggageClaim,
  Navigation
} from 'lucide-react';

const icons = [
  Plane, MapIcon, Compass, Briefcase, Camera, Globe, Palmtree, Mountain, Sun, Tent, Ship, MapPin, BaggageClaim, Navigation
];

const FloatingObject = ({ Icon, delay, initialX, initialY, duration, size, driftX, driftY }) => {
  return (
    <motion.div
      initial={{ 
        left: initialX, 
        top: initialY, 
        opacity: 0,
        rotate: Math.random() * 360,
        scale: 0
      }}
      animate={{ 
        x: [0, driftX, 0],
        y: [0, driftY, 0],
        rotate: [0, 20, -20, 0],
        opacity: [0.15, 0.35, 0.15], // Slightly tempered but still highly visible
        scale: [0.8, 1.2, 0.8]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
      style={{
        position: 'absolute',
        zIndex: -1, // Truly in the background
        pointerEvents: 'none',
        color: 'hsl(var(--primary))',
        filter: 'none'
      }}
    >
      <Icon size={size} strokeWidth={1.5} />
    </motion.div>
  );
};

export default function FloatingObjects() {
  const [objects, setObjects] = React.useState([]);

  React.useEffect(() => {
    // Generate 40 random objects - More coverage for background
    const newObjects = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      Icon: icons[Math.floor(Math.random() * icons.length)],
      delay: Math.random() * 10,
      initialX: `${Math.random() * 100}%`,
      initialY: `${Math.random() * 100}%`,
      duration: Math.random() * 20 + 15,
      size: Math.random() * 40 + 20, // Slightly more size variety for background depth
      driftX: (Math.random() - 0.5) * 200, 
      driftY: (Math.random() - 0.5) * 200  
    }));
    setObjects(newObjects);
  }, []);

  return (
    <div className="floating-objects-container" style={{ 
      position: 'fixed', 
      inset: 0, 
      overflow: 'hidden', 
      pointerEvents: 'none', 
      zIndex: -1 // Move container to the back
    }}>
      {objects.map((obj) => (
        <FloatingObject key={obj.id} {...obj} />
      ))}
    </div>
  );
}
