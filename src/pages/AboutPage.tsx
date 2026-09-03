import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, ShieldCheck, Quote } from 'lucide-react';
import { COMPANY_INFO, COMPANY_PILLARS } from '../data/companyData';

function useReveal(threshold = 0.15) {
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

export const AboutPage: React.FC = () => {
  const { ref: pillarsRef, visible: pillarsVisible } = useReveal();
  const { ref: leaderRef, visible: leaderVisible } = useReveal();
  const { ref: infraRef, visible: infraVisible } = useReveal();

  return (
    <>
      {/* Page Header */}
      <section style={{ background: 'var(--bg-hero-light)', padding: '120px 0 80px', borderBottom: '1px solid var(--gray-light)' }}>
        <div className="container">
          <div className="section-label section-label-light" style={{ marginBottom: '24px' }}>
            About Nour Medical
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
            About Nour Medical
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            maxWidth: '560px',
          }}>
            Nour Medical Company was established in {COMPANY_INFO.established} with the healthcare sector at the heart of its business.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section style={{ padding: 'var(--section-gap) 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(40px, 6vw, 100px)',
            alignItems: 'start',
          }}>
            <div>
              <div className="section-label">Our Story</div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--navy)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: '24px',
              }}>
                A Healthcare Technology Company Built for the Egyptian Market
              </h2>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '20px' }}>
                Founded in {COMPANY_INFO.established}, Nour Medical has evolved from a healthcare equipment and radiology maintenance specialist into a broader provider of healthcare technologies and solutions. Our business covers radiology devices, medical equipment, hospital furniture, consumables, spare parts, and maintenance.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: '20px' }}>
                The company is recognized as one of the pioneering companies in Egypt in the maintenance of imported radiology devices. We have established a trusted network of healthcare entities across the country, from hospitals in Cairo to medical centers in Upper Egypt.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--text-muted)' }}>
                Through a global supplier network spanning the USA, Taiwan, and China, we provide products that emphasize durability, sustainable technologies, and high-quality service — contributing to improved healthcare standards across Egypt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section
        ref={pillarsRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--warm-white)',
          opacity: pillarsVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: '60px' }}>
            <div className="section-label">Our Foundation</div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--navy)',
              letterSpacing: '-0.02em',
            }}>
              Three Pillars of Our Business
            </h2>
          </div>
          <div className="grid-3">
            {COMPANY_PILLARS.map((pillar, i) => (
              <div
                key={pillar.id}
                style={{
                  padding: '48px 36px',
                  borderLeft: '2px solid var(--blue-medical)',
                  opacity: pillarsVisible ? 1 : 0,
                  transform: pillarsVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s var(--ease-smooth) ${i * 0.12}s, transform 0.6s var(--ease-smooth) ${i * 0.12}s`,
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--blue-medical)',
                  marginBottom: '20px',
                }}>
                  {String(i + 1).padStart(2, '0')} — {pillar.id.toUpperCase()}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  letterSpacing: '-0.015em',
                  marginBottom: '14px',
                }}>
                  {pillar.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                }}>
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Leadership & Vision */}
      <section
        ref={leaderRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'linear-gradient(180deg, var(--warm-white) 0%, var(--white) 100%)',
          opacity: leaderVisible ? 1 : 0,
          transform: leaderVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s var(--ease-smooth), transform 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{
            position: 'relative',
            background: 'var(--navy)',
            borderRadius: '12px',
            padding: 'clamp(32px, 5vw, 64px)',
            color: 'var(--white)',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(10, 25, 47, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}>
            {/* Background Accent Lines */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-10%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(0, 168, 150, 0.15) 0%, rgba(0, 168, 150, 0) 70%)',
              pointerEvents: 'none',
              borderRadius: '50%',
            }} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(32px, 4vw, 56px)',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
            }}>
              {/* Left Column: Executive Credentials */}
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  background: 'rgba(0, 168, 150, 0.12)',
                  border: '1px solid rgba(0, 168, 150, 0.3)',
                  marginBottom: '20px',
                }}>
                  <Award size={14} style={{ color: 'var(--teal-accent)' }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--teal-accent)',
                    fontWeight: 600,
                  }}>
                    {COMPANY_INFO.chairmanTitle}
                  </span>
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  fontWeight: 800,
                  color: 'var(--white)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  marginBottom: '16px',
                }}>
                  {COMPANY_INFO.chairman}
                </h2>

                <div style={{
                  width: '60px',
                  height: '3px',
                  background: 'var(--teal-accent)',
                  borderRadius: '2px',
                  marginBottom: '24px',
                }} />

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {['Executive Leadership', 'Strategic Vision', 'Engineering Excellence'].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <ShieldCheck size={12} style={{ color: 'var(--teal-accent)' }} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Executive Quote / Vision Statement */}
              <div style={{
                position: 'relative',
                paddingLeft: 'clamp(0px, 3vw, 24px)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <Quote size={32} style={{ color: 'var(--teal-accent)', opacity: 0.5, marginBottom: '16px' }} />
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 1.5vw, 1.1875rem)',
                  lineHeight: 1.65,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  marginBottom: '20px',
                }}>
                  "Guiding Nour Medical's mission to empower healthcare providers across Egypt through world-class medical diagnostic imaging systems, precision technical engineering, and uncompromised service support."
                </p>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--teal-accent)',
                  fontWeight: 600,
                }}>
                  Nour Medical Governance & Direction
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Human Resources & Infrastructure */}
      <section
        ref={infraRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--warm-neutral)',
          opacity: infraVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div className="grid-2">
            {/* HR */}
            <div>
              <div className="section-label section-label-light" style={{ marginBottom: '24px' }}>
                Human Resources
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                fontWeight: 700,
                color: 'var(--navy)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                marginBottom: '16px',
              }}>
                Experienced Technical & Service Staff
              </h3>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--teal-accent)',
                marginBottom: '20px',
              }}>
                Field Service Engineers, Technicians & Administrative Personnel
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
              }}>
                Our team of field service engineers, technicians, and administrative personnel is supported by a broader group of motivated professionals committed to delivering high-quality healthcare technology service.
              </p>
            </div>

            {/* Infrastructure */}
            <div style={{ borderLeft: '1px solid var(--gray-light)', paddingLeft: 'clamp(32px, 5vw, 60px)' }}>
              <div className="section-label section-label-light" style={{ marginBottom: '24px' }}>
                Parts Infrastructure
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                fontWeight: 700,
                color: 'var(--navy)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                marginBottom: '16px',
              }}>
                Dedicated Parts Storage Facility
              </h3>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--teal-accent)',
                marginBottom: '20px',
              }}>
                Spare Parts Facility — Maadi, Cairo
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
              }}>
                Maintaining an extensive parts inventory allows the technical team to respond efficiently to service requirements, supporting reduced system downtime for healthcare facilities across Egypt.
              </p>
            </div>
          </div>

          <div className="rule" style={{ margin: '80px 0 60px' }} />

          {/* CTA */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
              fontWeight: 600,
              color: 'var(--navy)',
              letterSpacing: '-0.015em',
              maxWidth: '480px',
            }}>
              Ready to discuss your healthcare technology requirements?
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ gap: '8px' }}>
              Contact Nour Medical
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
