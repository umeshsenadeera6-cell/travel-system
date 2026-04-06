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
        opacity: [0.2, 0.4, 0.2], // Increased visibility from (0.05-0.15) to (0.2-0.4)
        scale: [0.8, 1.2, 0.8]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
      style={{
        position: 'fixed',
        zIndex: 1, // Increased z-index to be above the background but below content
        pointerEvents: 'none',
        color: 'hsl(var(--primary))',
        filter: 'none' // Removed blur for extra clarity
      }}
    >
      <Icon size={size} strokeWidth={1.5} /> {/* Slightly thicker stroke */}
    </motion.div>
  );
};

export default function FloatingObjects() {
  const [objects, setObjects] = React.useState([]);

  React.useEffect(() => {
    // Generate 35 random objects (increased from 25)
    const newObjects = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      Icon: icons[Math.floor(Math.random() * icons.length)],
      delay: Math.random() * 10,
      initialX: `${Math.random() * 100}%`,
      initialY: `${Math.random() * 100}%`,
      duration: Math.random() * 15 + 15, // Slightly faster for more noticeability
      size: Math.random() * 30 + 20, // Slightly larger
      driftX: (Math.random() - 0.5) * 150, // More movement
      driftY: (Math.random() - 0.5) * 150  
    }));
    setObjects(newObjects);
  }, []);

  return (
    <div className="floating-objects-container" style={{ 
      position: 'fixed', 
      inset: 0, 
      overflow: 'hidden', 
      pointerEvents: 'none', 
      zIndex: 1
    }}>
      {objects.map((obj) => (
        <FloatingObject key={obj.id} {...obj} />
      ))}
    </div>
  );
}
