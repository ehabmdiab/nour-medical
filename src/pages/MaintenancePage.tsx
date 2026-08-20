import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MAINTENANCE_STATS, INSTALLATION_STATS } from '../data/companyData';

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

export const MaintenancePage: React.FC = () => {
  const { ref: portfolioRef, visible: portfolioVisible } = useReveal();
  const { ref: installRef, visible: installVisible } = useReveal();
  const { ref: infraRef, visible: infraVisible } = useReveal();

  return (
    <>
      {/* Page Header */}
      <section style={{ background: 'var(--navy)', padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Grid BG */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="section-label" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
            Technical Services
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
            Keeping Critical Medical Systems Running
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '560px',
          }}>
            Nour Medical has established experience in maintaining radiology devices imported into Egypt, supporting healthcare organizations with technical service, spare parts, and annual maintenance contracts.
          </p>
        </div>
      </section>

      {/* AMC Portfolio */}
      <section
        ref={portfolioRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--white)',
          opacity: portfolioVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: '60px' }}>
            <div className="section-label">Annual Maintenance Contracts</div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--navy)',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}>
              Maintenance Portfolio
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              lineHeight: 1.7,
              color: 'var(--text-muted)',
              maxWidth: '560px',
            }}>
              Systems currently under annual maintenance contracts across healthcare facilities in Egypt.
            </p>
          </div>

          {/* Large stat cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1px',
            background: 'var(--gray-light)',
            border: '1px solid var(--gray-light)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            {MAINTENANCE_STATS.map((stat, i) => (
              <div
                key={stat.system}
                style={{
                  padding: '56px 36px',
                  background: 'var(--white)',
                  textAlign: 'center',
                  opacity: portfolioVisible ? 1 : 0,
                  transform: portfolioVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s var(--ease-smooth) ${i * 0.1}s, transform 0.6s var(--ease-smooth) ${i * 0.1}s`,
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                  fontWeight: 800,
                  color: 'var(--navy)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '10px',
                }}>
                  {stat.contracts}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5625rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '6px',
                }}>
                  {stat.system}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--teal-accent)',
                }}>
                  Systems
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Track Record */}
      <section
        ref={installRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--warm-white)',
          opacity: installVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
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
              <div className="section-label">Track Record</div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--navy)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: '20px',
              }}>
                System Installation Record
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
              }}>
                Since 2015, Nour Medical has installed imaging systems across hospitals, scan centers, and medical facilities throughout Egypt.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {INSTALLATION_STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '28px 0',
                    borderBottom: '1px solid var(--gray-light)',
                    opacity: installVisible ? 1 : 0,
                    transform: installVisible ? 'translateX(0)' : 'translateX(16px)',
                    transition: `opacity 0.5s var(--ease-smooth) ${i * 0.1}s, transform 0.5s var(--ease-smooth) ${i * 0.1}s`,
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: 'var(--text-body)',
                    fontWeight: 500,
                  }}>
                    {stat.label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: 'var(--blue-medical)',
                    letterSpacing: '-0.02em',
                  }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Parts Infrastructure */}
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(40px, 6vw, 100px)',
            alignItems: 'center',
          }}>
            <div>
              <div className="section-label" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '32px' }}>
                Parts Infrastructure
              </div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(5rem, 10vw, 9rem)',
                fontWeight: 800,
                color: 'var(--white)',
                lineHeight: 0.9,
                letterSpacing: '-0.05em',
                marginBottom: '12px',
              }}>
                1,000
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--teal-accent)',
                marginBottom: '32px',
              }}>
                m² Spare Parts Storage Facility
              </div>
            </div>

            <div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                fontWeight: 700,
                color: 'var(--white)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                marginBottom: '20px',
              }}>
                An Extensive Parts Inventory to Support Rapid Technical Response
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.55)',
                marginBottom: '32px',
              }}>
                Maintaining a 1,000 m² spare parts facility in Maadi, Cairo, allows the Nour Medical technical team to respond efficiently to service requirements and helps reduce unnecessary delays in getting critical systems back online.
              </p>
              <Link to="/contact" className="btn btn-outline-white" style={{ gap: '8px' }}>
                Request Technical Support
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
