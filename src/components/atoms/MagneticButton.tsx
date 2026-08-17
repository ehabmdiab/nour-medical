import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  icon,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.35;
    const y = (e.clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-[0_4px_20px_rgba(0,168,232,0.35)] border border-cyan-500/40';
      case 'secondary':
        return 'bg-slate-100 text-slate-800 hover:text-cyan-700 border border-slate-300 hover:border-cyan-500 hover:shadow-[0_4px_15px_rgba(0,168,232,0.15)]';
      case 'outline':
        return 'bg-white/80 text-slate-800 border border-slate-300 hover:border-cyan-600 hover:text-cyan-700';
      case 'glass':
        return 'glass-panel text-slate-800 hover:text-cyan-700 hover:border-cyan-500/60 hover:shadow-[0_4px_20px_rgba(0,168,232,0.2)]';
      default:
        return '';
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm tracking-wide transition-all duration-300 cursor-pointer overflow-hidden group ${getVariantStyles()} ${className}`}
    >
      <span className="relative z-10 font-heading font-medium tracking-wider uppercase">{children}</span>
      {icon && <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-400/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
    </motion.button>
  );
};
