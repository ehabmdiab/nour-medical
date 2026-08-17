import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowOnHover?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glowOnHover = true,
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverEffect ? { y: -5, scale: 1.01 } : undefined}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-panel rounded-2xl p-6 relative overflow-hidden transition-all duration-400 ${
        glowOnHover ? 'glass-panel-hover' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="scanline-overlay" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
