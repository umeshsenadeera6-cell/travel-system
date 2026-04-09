import React from 'react';
import { motion } from 'framer-motion';

export function RevenueChart({ data }) {
  // Simple SVG Line Chart
  const height = 200;
  const width = 500;
  const padding = 40;
  
  const maxValue = Math.max(...data.map(d => d.value), 1000);
  const points = data.map((d, i) => ({
    x: (i * (width - padding * 2)) / (data.length - 1) + padding,
    y: height - (d.value / maxValue) * (height - padding * 2) - padding
  }));

  const pathD = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '250px' }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
          <line 
            key={i}
            x1={padding} 
            y1={height - padding - p * (height - padding * 2)} 
            x2={width - padding} 
            y2={height - padding - p * (height - padding * 2)} 
            stroke="#f1f5f9" 
            strokeWidth="1" 
          />
        ))}
        
        {/* Main Path */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d={pathD}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data Points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            cx={p.x}
            cy={p.y}
            r="6"
            fill="white"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
          />
        ))}

        {/* Labels */}
        {data.map((d, i) => (
          <text 
            key={i}
            x={points[i].x} 
            y={height - 10} 
            fontSize="10" 
            textAnchor="middle" 
            fill="#94a3b8"
            fontWeight="600"
          >
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

export function CategoryDistribution({ data }) {
  // Simple SVG Doughnut Chart
  const size = 200;
  const strokeWidth = 25;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  
  const total = data.reduce((acc, d) => acc + d.value, 0);
  let accumulatedOffset = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <svg width={size} height={size}>
        {data.map((d, i) => {
          const percentage = (d.value / total) * 100;
          const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
          const strokeDashoffset = accumulatedOffset;
          accumulatedOffset -= (percentage / 100) * circumference;

          return (
            <motion.circle
              key={i}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, delay: i * 0.2 }}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={d.color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              transform={`rotate(-90 ${center} ${center})`}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: d.color }}></div>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>{d.label}</span>
            <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#0f172a', marginLeft: 'auto' }}>{Math.round((d.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
