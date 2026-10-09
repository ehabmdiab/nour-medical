import React, { useEffect, useRef, useState } from 'react';

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
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-warm-white py-[var(--section-gap)]">
      <div className="container">
        <div
          ref={ref}
          className={`flex justify-between items-end flex-wrap gap-6 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div>
            <div className="section-label">Technical Infrastructure</div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-navy tracking-tight leading-tight">
              Core Operational Strength
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {FEATURED_CAPABILITIES.map((m, i) => (
            <div
              key={m.label}
              className={`py-8 border-t border-gray-light transition-all duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div className="font-heading text-3xl md:text-4xl font-bold text-navy leading-none tracking-tight mb-2">
                {m.number}
                <span className="text-blue-medical text-[0.6em]">{m.suffix}</span>
              </div>
              <p className="font-mono text-[0.625rem] tracking-widest uppercase text-text-muted">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
