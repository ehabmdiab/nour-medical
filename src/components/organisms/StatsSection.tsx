import React from 'react';
import { useReveal } from '../../hooks/useReveal';

interface MetricItem {
  number: string;
  suffix: string;
  label: string;
}

const FEATURED_CAPABILITIES: MetricItem[] = [
  { number: 'Full', suffix: ' Coverage', label: 'Field Service Engineers & Technical Staff' },
  { number: 'Central', suffix: ' Facility', label: 'Spare Parts Storage Facility' },
  { number: 'Turnkey', suffix: ' Installs', label: 'Cath-Lab Systems Installed' },
  { number: 'AMC', suffix: ' Support', label: 'X-Ray Systems Under Maintenance' },
];

export const StatsSection: React.FC = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="bg-warm-white py-[var(--section-gap)]">
      <div className="container">
        <div
          ref={ref}
          className={`flex justify-between items-end flex-wrap gap-6 motion-safe:transition-all motion-safe:duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div>
            <div className="section-label">Technical Infrastructure</div>
            <h2 className="font-heading text-[clamp(1.875rem,2.7vw,2.75rem)] font-bold text-navy tracking-tight leading-tight">
              Core Operational Strength
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {FEATURED_CAPABILITIES.map((m, i) => (
            <div
              key={m.label}
              className={`py-8 border-t border-gray-light motion-safe:transition-all motion-safe:duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div className="font-heading text-2xl md:text-3xl font-bold text-navy leading-none tracking-tight mb-2">
                {m.number}
                <span className="text-navy/75 text-[0.75em]">{m.suffix}</span>
              </div>
              <p className="font-body text-sm tracking-wide uppercase text-navy font-semibold">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
