import React from 'react';
import { motion } from 'framer-motion';
import type { ServiceItem } from '../../data/servicesData';
import { Wrench, ShieldCheck, Zap, Box, Cpu, HeartPulse, CheckCircle2 } from 'lucide-react';

interface ServiceTimelineItemProps {
  service: ServiceItem;
  index: number;
}

export const ServiceTimelineItem: React.FC<ServiceTimelineItemProps> = ({ service, index }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'installation':
        return <Wrench className="w-6 h-6 text-cyan-600" />;
      case 'preventive-maintenance':
        return <ShieldCheck className="w-6 h-6 text-cyan-600" />;
      case 'corrective-maintenance':
        return <Zap className="w-6 h-6 text-amber-600" />;
      case 'spare-parts':
        return <Box className="w-6 h-6 text-purple-600" />;
      default:
        return <Cpu className="w-6 h-6 text-cyan-600" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="glass-panel glass-panel-hover rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center shrink-0">
            {getIcon(service.id)}
          </div>
          <div>
            <span className="text-[10px] font-mono text-cyan-700 tracking-widest uppercase font-bold">
              PHASE 0{index + 1} • {service.tag}
            </span>
            <h3 className="text-2xl font-heading font-extrabold text-slate-900 mt-0.5">
              {service.title}
            </h3>
          </div>
        </div>

        <div className="px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 font-bold self-start md:self-center">
          {service.badge}
        </div>
      </div>

      <div className="py-6 space-y-4">
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          {service.description}
        </p>

        {/* Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {service.details.slice(0, 4).map((step: string, idx: number) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
              <span className="text-xs font-heading font-medium text-slate-800">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Specs */}
      <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-cyan-600" />
          <span>Covered Under Official Nour Medical Service Warranty</span>
        </div>
        <span className="text-cyan-700 font-bold uppercase">{service.subtitle}</span>
      </div>
    </motion.div>
  );
};
