import React, { useEffect, useRef, useState } from 'react';
import { CAPACITY_METRICS, MAINTENANCE_STATS } from '../../data/companyData';

interface CounterProps {
  target: string;
  suffix: string;
  label: string;
  delay?: number;
}

const StatBlock: React.FC<CounterProps> = ({ target, suffix, label, delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        paddingTop: '40px',
        paddingBottom: '40px',
        borderTop: '1px solid var(--gray-light)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s var(--ease-smooth) ${delay}s, transform 0.6s var(--ease-smooth) ${delay}s`,
      }}
    >
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
        fontWeight: 800,
        color: 'var(--navy)',
        lineHeight: 1,
        letterSpacing: '-0.03em',
        marginBottom: '8px',
      }}>
        {target}<span style={{ color: 'var(--blue-medical)', fontSize: '0.6em' }}>{suffix}</span>
      </div>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.625rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}>
        {label}
      </p>
    </div>
  );
};

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
        {/* Section Header */}
        <div
          ref={ref}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '0',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth)',
          }}
        >
          <div>
            <div className="section-label">Business Capacity</div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--navy)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}>
              Experience in Numbers
            </h2>
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'var(--text-muted)',
            maxWidth: '380px',
            lineHeight: 1.65,
          }}>
            A decade of healthcare technology deployment across Egypt — tracked in installations, maintenance contracts, and technical infrastructure.
          </p>
        </div>

        {/* Capacity Metrics Grid */}
        <div className="grid-4" style={{ marginTop: '16px' }}>
          {CAPACITY_METRICS.map((m, i) => (
            <StatBlock
              key={m.label}
              target={m.number}
              suffix={m.suffix}
              label={m.label}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* AMC Maintenance Contracts */}
        <div style={{ marginTop: '80px' }}>
          <div className="section-label" style={{ marginBottom: '32px' }}>Annual Maintenance Contracts (AMC)</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '0',
            border: '1px solid var(--gray-light)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            {MAINTENANCE_STATS.map((stat, i) => (
              <div
                key={stat.system}
                style={{
                  padding: '32px 24px',
                  borderRight: i < MAINTENANCE_STATS.length - 1 ? '1px solid var(--gray-light)' : 'none',
                  background: 'var(--white)',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 800,
                  color: 'var(--navy)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}>
                  {stat.contracts}
                </div>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}>
                  {stat.system}
                </p>
              </div>
            ))}
          </div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            letterSpacing: '0.1em',
            color: 'var(--stone)',
            marginTop: '12px',
            textAlign: 'right',
          }}>
            Systems currently under annual maintenance contracts
          </p>
        </div>
      </div>
    </section>
  );
};
