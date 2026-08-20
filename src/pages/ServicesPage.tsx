import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/companyData';

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

export const ServicesPage: React.FC = () => {
  const { ref: servicesRef, visible: servicesVisible } = useReveal();
  const { ref: philosophyRef, visible: philosophyVisible } = useReveal();

  return (
    <>
      {/* Page Header */}
      <section style={{ background: 'var(--navy)', padding: '100px 0 80px' }}>
        <div className="container">
          <div className="section-label" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
            Healthcare Technology Services
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 800,
            color: 'var(--white)',
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            maxWidth: '700px',
            marginBottom: '32px',
          }}>
            Healthcare Technology Services
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '520px',
          }}>
            From equipment installation to long-term maintenance contracts — Nour Medical supports healthcare organizations throughout the complete operational lifecycle.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section
        ref={servicesRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--white)',
          opacity: servicesVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: '60px' }}>
            <div className="section-label">What We Provide</div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--navy)',
              letterSpacing: '-0.02em',
            }}>
              Our Service Portfolio
            </h2>
          </div>

          <div className="grid-3" style={{ gap: '24px' }}>
            {SERVICES.map((service, i) => (
              <div
                key={service.number}
                className="card"
                style={{
                  padding: '44px 32px',
                  opacity: servicesVisible ? 1 : 0,
                  transform: servicesVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s var(--ease-smooth) ${i * 0.1}s, transform 0.6s var(--ease-smooth) ${i * 0.1}s`,
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '2rem',
                  fontWeight: 300,
                  color: 'var(--blue-medical)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  marginBottom: '24px',
                }}>
                  {service.number}
                </div>
                <div style={{ width: '32px', height: '1px', background: 'var(--gray-light)', marginBottom: '24px' }} />
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  letterSpacing: '-0.015em',
                  marginBottom: '12px',
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Philosophy */}
      <section
        ref={philosophyRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--warm-white)',
          opacity: philosophyVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(40px, 6vw, 100px)',
            alignItems: 'center',
          }}>
            <div>
              <div className="section-label">Service Philosophy</div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--navy)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}>
                Beyond Installation
              </h2>
            </div>
            <div>
              <blockquote style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                fontStyle: 'italic',
                color: 'var(--navy)',
                lineHeight: 1.4,
                borderLeft: '3px solid var(--blue-medical)',
                paddingLeft: '28px',
                marginBottom: '24px',
              }}>
                "Reliable equipment is only part of the equation. Long-term technical support is essential to maintaining continuity in healthcare operations."
              </blockquote>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
              }}>
                Our approach to after-sales service ensures that healthcare facilities receive continued technical support, access to spare parts, and structured maintenance programmes throughout the lifespan of their equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance CTA Banner */}
      <section style={{ padding: '80px 0', background: 'var(--navy)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
          <div>
            <div className="section-label" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
              Major Capability
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--white)',
              letterSpacing: '-0.02em',
              maxWidth: '520px',
            }}>
              Learn More About Our Maintenance & Technical Support
            </h2>
          </div>
          <Link to="/maintenance" className="btn btn-outline-white" style={{ gap: '8px', flexShrink: 0 }}>
            View Maintenance Portfolio
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
};
