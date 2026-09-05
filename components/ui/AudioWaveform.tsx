'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AudioWaveform: React.FC<{ className?: string }> = ({ className = '' }) => {
  // Height pattern for audio waveform bars
  const barHeights = [
    8, 14, 22, 34, 18, 28, 42, 54, 30, 20, 36, 48, 24, 40, 56, 32, 16, 28, 44,
    58, 38, 22, 12, 26, 46, 60, 42, 24, 16, 34, 50, 28, 18, 38, 52, 30, 14, 22,
    36, 46, 20, 10,
  ];

  return (
    <div className={`flex items-center gap-[3px] sm:gap-[4px] h-16 ${className}`}>
      {barHeights.map((height, i) => (
        <motion.div
          key={i}
          initial={{ height: height }}
          animate={{
            height: [height, Math.max(6, (height * 1.3) % 60), Math.max(4, height * 0.7), height],
          }}
          transition={{
            duration: 1.2 + (i % 5) * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: (i % 8) * 0.1,
          }}
          style={{ height: `${height}px` }}
          className="w-[3px] sm:w-[3.5px] rounded-full bg-brand-red shrink-0"
        />
      ))}
    </div>
  );
};
