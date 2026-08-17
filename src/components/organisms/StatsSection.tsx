import React from 'react';
import { StatCounter } from '../molecules/StatCounter';
import { COMPANY_STATS } from '../../data/companyData';
import { SectionHeading } from '../atoms/SectionHeading';

export const StatsSection: React.FC = () => {
  return (
    <section className="py-24 relative bg-slate-100/70 border-t border-b border-slate-200/80 overflow-hidden">
      <div className="bg-grid-pattern absolute inset-0 opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          eyebrow="ENGINEERING SCALE & METRICS"
          title="Empowering Egyptian Healthcare Infrastructure"
          subtitle="A decade of engineering excellence, supply chain reliability, and emergency technical support across public and private hospitals."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANY_STATS.slice(0, 4).map((stat, idx: number) => (
            <StatCounter
              key={idx}
              number={stat.number}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
