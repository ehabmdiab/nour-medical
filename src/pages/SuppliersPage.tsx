import React, { useEffect, useRef, useState } from 'react';
import { SUPPLIER_PARTNERS } from '../data/companyData';

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export const SuppliersPage: React.FC = () => {
  const { ref: suppliersRef, visible: suppliersVisible } = useReveal();

  return (
    <>
      {/* Page Header */}
      <section style={{ background: 'var(--bg-hero-light)', padding: '120px 0 80px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--gray-light)' }}>
        <div className="container" style={{ position: 'relative' }}>
          <div className="section-label" style={{ marginBottom: '24px' }}>
            Global Supplier Network
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 800,
            color: 'var(--navy)',
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            maxWidth: '700px',
            marginBottom: '32px',
          }}>
            Global Technology. Local Expertise.
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            maxWidth: '520px',
          }}>
            Nour Medical works through a carefully selected global supplier network, bringing advanced medical technology from the USA, Taiwan, and China to the Egyptian healthcare market.
          </p>

          {/* Country Tags */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '48px', flexWrap: 'wrap' }}>
            {['🇺🇸 USA', '🇹🇼 Taiwan', '🇨🇳 China'].map(country => (
              <span
                key={country}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--gray-light)',
                  padding: '8px 16px',
                  borderRadius: '2px',
                  background: 'var(--white)',
                }}
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Suppliers Grid */}
      <section
        ref={suppliersRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--white)',
          opacity: suppliersVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: '60px' }}>
            <div className="section-label">Our Suppliers</div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--navy)',
              letterSpacing: '-0.02em',
            }}>
              Technology Suppliers
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {SUPPLIER_PARTNERS.map((partner, i) => (
              <div
                key={partner.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr 1fr',
                  gap: '48px',
                  alignItems: 'start',
                  padding: '64px 0',
                  borderBottom: i < SUPPLIER_PARTNERS.length - 1 ? '1px solid var(--gray-light)' : 'none',
                  opacity: suppliersVisible ? 1 : 0,
                  transform: suppliersVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s var(--ease-smooth) ${i * 0.15}s, transform 0.6s var(--ease-smooth) ${i * 0.15}s`,
                }}
              >
                {/* Left: Country + Number */}
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '3rem',
                    fontWeight: 300,
                    color: 'var(--gray-light)',
                    lineHeight: 1,
                    marginBottom: '20px',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <span style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--gray-light)',
                    padding: '6px 12px',
                    borderRadius: '2px',
                  }}>
                    {partner.country}
                  </span>
                </div>

                {/* Center: Name + Tagline + Description */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                    fontWeight: 700,
                    color: 'var(--navy)',
                    letterSpacing: '-0.015em',
                    marginBottom: '8px',
                  }}>
                    {partner.name}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5625rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--teal-accent)',
                    marginBottom: '20px',
                  }}>
                    {partner.tagline}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                    color: 'var(--text-muted)',
                  }}>
                    {partner.description}
                  </p>
                </div>

                {/* Right: Specialties */}
                <div>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '16px',
                  }}>
                    Specialties
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {partner.specialties.map(s => (
                      <li key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--blue-medical)', flexShrink: 0, marginTop: '8px' }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                          {s}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Statement */}
      <section style={{ padding: '80px 0', background: 'var(--warm-white)', borderTop: '1px solid var(--gray-light)' }}>
        <div className="container" style={{ maxWidth: '720px', textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '24px' }}>
            Global to Local
          </div>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
            fontWeight: 600,
            fontStyle: 'italic',
            color: 'var(--navy)',
            lineHeight: 1.4,
            letterSpacing: '-0.015em',
          }}>
            "Nour Medical connects global medical technology with local healthcare expertise in Egypt — supplying radiology and medical equipment while providing the technical support, maintenance, spare parts, and after-sales service required to keep healthcare facilities operating reliably."
          </p>
        </div>
      </section>
    </>
  );
};

export const PartnersPage = SuppliersPage;
