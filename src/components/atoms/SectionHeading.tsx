import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
  className = '',
}) => {
  const getAlignment = () => {
    switch (align) {
      case 'left':
        return 'text-left items-start';
      case 'right':
        return 'text-right items-end';
      case 'center':
      default:
        return 'text-center items-center';
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col mb-16 ${getAlignment()} ${className}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-mono font-bold tracking-widest uppercase mb-4 shadow-sm ${
            isDark
              ? 'bg-orange-accent/15 border border-orange-accent/35 text-orange-accent'
              : 'bg-orange-subtle border border-orange-accent/30 text-navy'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-orange-accent animate-ping" />
          {eyebrow}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-tight leading-[1.08] max-w-5xl text-orange-accent`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`mt-6 text-lg sm:text-xl md:text-2xl max-w-3xl font-normal leading-relaxed ${
            isDark ? 'text-white/90' : 'text-navy'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
