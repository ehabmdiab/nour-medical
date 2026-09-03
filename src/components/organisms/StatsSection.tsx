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
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: 'var(--warm-white)', padding: 'var(--section-gap) 0' }}>
      <div className="container">
        <div
          ref={ref}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth)',
          }}
        >
          <div>
            <div className="section-label">Technical Infrastructure</div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--navy)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}>
              Core Operational Strength
            </h2>
          </div>
        </div>

        <div className="grid-4" style={{ marginTop: '32px' }}>
          {FEATURED_CAPABILITIES.map((m, i) => (
            <div
              key={m.label}
              style={{
                paddingTop: '32px',
                paddingBottom: '32px',
                borderTop: '1px solid var(--gray-light)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s var(--ease-smooth) ${i * 0.1}s, transform 0.6s var(--ease-smooth) ${i * 0.1}s`,
              }}
            >
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--navy)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                marginBottom: '8px',
              }}>
                {m.number}<span style={{ color: 'var(--blue-medical)', fontSize: '0.6em' }}>{m.suffix}</span>
              </div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}>
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
