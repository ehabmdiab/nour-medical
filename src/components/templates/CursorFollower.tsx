import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CursorFollower: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.getAttribute('role') === 'button' ||
          target.closest('button') ||
          target.closest('a'))
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Hide cursor on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Outer Laser Circle */}
      <motion.div
        animate={{
          x: pos.x - 16,
          y: pos.y - 16,
          scale: isPointer ? 1.5 : 1,
          borderColor: isPointer ? '#00f0ff' : 'rgba(0, 240, 255, 0.4)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.1 }}
        className="fixed pointer-events-none z-[999] w-8 h-8 rounded-full border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
      />
      {/* Inner Dot */}
      <motion.div
        animate={{
          x: pos.x - 2,
          y: pos.y - 2,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50 }}
        className="fixed pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full bg-cyan-400"
      />
    </>
  );
};
