import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatCounterProps {
  value?: string;
  number: number;
  suffix: string;
  label: string;
  description: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  number,
  suffix,
  label,
  description,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = number;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / (end || 1)));

    const timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, Math.max(stepTime, 25));

    return () => clearInterval(timer);
  }, [isInView, number]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-panel glass-panel-hover rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />

      <div>
        <div className="flex items-baseline text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">
          <span>{number > 100 ? count.toLocaleString() : count}</span>
          <span className="text-cyan-600 font-mono text-2xl md:text-3xl ml-1">{suffix}</span>
        </div>
        <h3 className="text-lg font-heading font-bold text-slate-900 tracking-wide mb-2">{label}</h3>
      </div>

      <p className="text-xs md:text-sm text-slate-600 leading-relaxed mt-4 pt-4 border-t border-slate-200 font-normal">
        {description}
      </p>
    </motion.div>
  );
};
