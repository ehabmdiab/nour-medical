import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'blue' | 'purple' | 'emerald';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  icon,
  className = '',
}) => {
  const getColors = () => {
    switch (variant) {
      case 'cyan':
        return 'bg-cyan-50 text-cyan-800 border-cyan-200 cyan-glow-sm';
      case 'blue':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'purple':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'emerald':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-cyan-50 text-cyan-800 border-cyan-200';
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-widest uppercase font-semibold backdrop-blur-md shadow-sm ${getColors()} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 animate-pulse" />
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </div>
  );
};
