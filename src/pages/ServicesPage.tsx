import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Package, CheckCircle2 } from 'lucide-react';
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
      <section style={{ background: 'var(--bg-hero-light)', padding: '120px 0 80px', borderBottom: '1px solid var(--gray-light)' }}>
        <div className="container">
          <div className="section-label" style={{ marginBottom: '24px' }}>
            CORE CAPABILITIES & SOLUTIONS
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 800,
            color: 'var(--navy)',
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            maxWidth: '750px',
            marginBottom: '32px',
          }}>
            Healthcare Technology Services
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            maxWidth: '580px',
          }}>
            Nour Medical supports healthcare facilities across Egypt through two specialized operational pillars: rapid technical maintenance and turnkey equipment & spare parts supply.
          </p>
        </div>
      </section>

      {/* Services List — 2 Core Boxes */}
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
          <div style={{ marginBottom: '50px' }}>
            <div className="section-label">Core Operations</div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--navy)',
              letterSpacing: '-0.02em',
            }}>
              Our Service Pillars
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px',
          }}>
            {SERVICES.map((service, i) => (
              <div
                key={service.id}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--warm-neutral)',
                  borderRadius: '24px',
                  padding: '40px 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: servicesVisible ? 1 : 0,
                  transform: servicesVisible ? 'translateY(0)' : 'translateY(24px)',
                  transitionDelay: `${i * 0.15}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--blue-medical)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 51, 102, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--warm-neutral)';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Header Row: Badge & Number */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    background: i === 0 ? 'rgba(0, 168, 181, 0.1)' : 'rgba(0, 51, 102, 0.08)',
                    color: i === 0 ? 'var(--teal-accent)' : 'var(--blue-medical)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}>
                    {i === 0 ? <Wrench size={14} /> : <Package size={14} />}
                    {service.tag}
                  </span>

                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '2.25rem',
                    fontWeight: 300,
                    color: 'rgba(0, 51, 102, 0.2)',
                    lineHeight: 1,
                  }}>
                    {service.number}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.625rem',
                  fontWeight: 800,
                  color: 'var(--navy)',
                  letterSpacing: '-0.02em',
                  marginBottom: '6px',
                  lineHeight: 1.25,
                }}>
                  {service.title}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--blue-medical)',
                  fontWeight: 600,
                  marginBottom: '16px',
                }}>
                  {service.headline}
                </p>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  lineHeight: 1.65,
                  color: 'var(--text-muted)',
                  marginBottom: '28px',
                }}>
                  {service.description}
                </p>

                <div style={{ height: '1px', background: 'var(--warm-neutral)', marginBottom: '28px' }} />

                {/* Highlights Checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', flex: 1 }}>
                  {service.highlights.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <CheckCircle2 size={18} style={{ color: 'var(--teal-accent)', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <h4 style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: 'var(--navy)',
                          marginBottom: '2px',
                        }}>
                          {item.title}
                        </h4>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8125rem',
                          lineHeight: 1.5,
                          color: 'var(--text-muted)',
                          margin: 0,
                        }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Link / CTA */}
                <Link
                  to={service.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    background: 'var(--warm-white)',
                    border: '1px solid var(--warm-neutral)',
                    color: 'var(--navy)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    marginTop: 'auto',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--navy)';
                    e.currentTarget.style.color = 'var(--white)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--warm-white)';
                    e.currentTarget.style.color = 'var(--navy)';
                  }}
                >
                  <span>{service.linkText}</span>
                  <ArrowRight size={16} />
                </Link>
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
                Beyond Supply & Installation
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
                "Reliable equipment is only part of the equation. Continuous technical support and genuine local spare parts are essential to maintaining uninterrupted healthcare operations."
              </blockquote>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
              }}>
                Our integrated approach ensures that healthcare facilities receive swift engineering assistance, instant access to our 1,000 m² Maadi spare parts facility, and structured annual maintenance programs throughout the lifespan of their medical technology.
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
              Maintenance Capabilities
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--white)',
              letterSpacing: '-0.02em',
              maxWidth: '520px',
            }}>
              Need Immediate Technical Field Assistance or Maintenance?
            </h2>
          </div>
          <Link to="/maintenance" className="btn btn-outline-white" style={{ gap: '8px', flexShrink: 0 }}>
            View Maintenance & Support Details
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
};

