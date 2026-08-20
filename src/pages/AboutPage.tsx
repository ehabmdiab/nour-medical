import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
      <section style={{ background: 'var(--navy)', padding: '100px 0 80px' }}>
        <div className="container">
          <div className="section-label section-label-light" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
            About Nour Medical
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
            About Nour Medical
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.6)',
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

      {/* Leadership */}
      <section
        ref={leaderRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--white)',
          opacity: leaderVisible ? 1 : 0,
          transform: leaderVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s var(--ease-smooth), transform 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(40px, 6vw, 100px)',
            alignItems: 'start',
          }}>
            <div>
              <div className="section-label">Leadership</div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--navy)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}>
                Leadership
              </h2>
            </div>
            <div>
              <div style={{
                padding: '40px 36px',
                border: '1px solid var(--gray-light)',
                borderRadius: '4px',
                display: 'inline-block',
                minWidth: '280px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '16px',
                }}>
                  {COMPANY_INFO.chairmanTitle}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  letterSpacing: '-0.02em',
                }}>
                  {COMPANY_INFO.chairman}
                </h3>
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
          background: 'var(--navy)',
          opacity: infraVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div className="grid-2">
            {/* HR */}
            <div>
              <div className="section-label section-label-light" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '32px' }}>
                Human Resources
              </div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(4rem, 8vw, 7rem)',
                fontWeight: 800,
                color: 'var(--white)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                marginBottom: '8px',
              }}>
                50
              </div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '24px',
              }}>
                Field Service Engineers, Technicians & Administrative Personnel
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.55)',
              }}>
                Our team of field service engineers, technicians, and administrative personnel is supported by a broader group of motivated professionals committed to delivering high-quality healthcare technology service.
              </p>
            </div>

            {/* Infrastructure */}
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: 'clamp(32px, 5vw, 60px)' }}>
              <div className="section-label section-label-light" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '32px' }}>
                Parts Infrastructure
              </div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(4rem, 8vw, 7rem)',
                fontWeight: 800,
                color: 'var(--white)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                marginBottom: '8px',
              }}>
                1,000
              </div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--teal-accent)',
                marginBottom: '24px',
              }}>
                m² Spare Parts Storage Facility — Maadi, Cairo
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.55)',
              }}>
                Maintaining an extensive parts inventory allows the technical team to respond efficiently to service requirements, supporting reduced system downtime for healthcare facilities across Egypt.
              </p>
            </div>
          </div>

          <div className="rule-dark" style={{ margin: '80px 0 60px' }} />

          {/* CTA */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
              fontWeight: 600,
              color: 'var(--white)',
              letterSpacing: '-0.015em',
              maxWidth: '480px',
            }}>
              Ready to discuss your healthcare technology requirements?
            </p>
            <Link to="/contact" className="btn btn-outline-white" style={{ gap: '8px' }}>
              Contact Nour Medical
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
