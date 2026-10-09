import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface HolographicCard3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

export const HolographicCard3D: React.FC<HolographicCard3DProps> = ({
  children,
  className = '',
  glowColor = 'rgba(0, 240, 255, 0.4)',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glarePos, setGlarePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = (): void => setIsHovered(true);
  const handleMouseLeave = (): void => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="w-full [perspective:1000px]">
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`glass-panel rounded-2xl relative overflow-hidden transition-all duration-300 [transform-style:preserve-3d] ${
          onClick ? 'cursor-pointer' : ''
        } ${className}`}
      >
        {/* Holographic Glare & Scanline Effect (dynamic mouse coords) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${glowColor} 0%, transparent 60%)`,
          }}
        />

        {/* Laser Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 p-6 md:p-8 transform-gpu">{children}</div>
      </motion.div>
    </div>
  );
};
