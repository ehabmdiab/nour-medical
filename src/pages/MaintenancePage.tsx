import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Package, ShieldCheck, CheckCircle2 } from 'lucide-react';

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export const MaintenancePage: React.FC = () => {
  const { ref: commitmentRef, visible: commitmentVisible } = useReveal();
  const { ref: portfolioRef, visible: portfolioVisible } = useReveal();
  const { ref: installRef, visible: installVisible } = useReveal();
  const { ref: infraRef, visible: infraVisible } = useReveal();

  const AMC_SYSTEMS = [
    { title: 'Cath-Lab / Interventional', description: 'Priority response, comprehensive component coverage, and tube replacement programmes for all major systems.' },
    { title: 'C-Arm Surgical Systems', description: 'Preventive calibration, image intensifier service, and mechanical safety checks across multiple OEM brands.' },
    { title: 'Digital X-Ray Systems', description: 'Flat panel detector calibration, generator maintenance, and software updates for legacy & digital DR units.' },
    { title: 'CT Scanners', description: 'Regular preventive maintenance, tube monitoring, and cooling system inspection regardless of initial supplier.' },
    { title: 'MRI Systems', description: 'Cryogenic monitoring, coil inspection, gradient calibration, and preventative service for diagnostic MRI suites.' },
  ];

  const INSTALLATION_MODALITIES = [
    { label: 'Cath-Lab Systems', description: 'Turnkey site preparation, installation, and commissioning.' },
    { label: 'Digital X-Ray Suites', description: 'Fixed room and mobile DR detector integration.' },
    { label: 'CT Scanners', description: 'Full installation and room shielding compliance support.' },
    { label: 'MRI Modalities', description: 'Shielded enclosure setup, cold line connection, and system startup.' },
  ];

  return (
    <>
      {/* Page Header */}
      <section style={{ background: 'var(--bg-hero-light)', padding: '120px 0 80px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--gray-light)' }}>
        {/* Grid BG */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(2,132,199,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(2,132,199,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="section-label" style={{ marginBottom: '24px' }}>
            Technical Services &amp; Support
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
            Keeping Critical Medical Systems Running
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            maxWidth: '600px',
          }}>
            Nour Medical provides comprehensive field service maintenance and genuine spare parts for all medical devices we support — including third-party equipment originally supplied by other vendors.
          </p>
        </div>
      </section>

      {/* Universal Service & Parts Commitments Banner */}
      <section
        ref={commitmentRef as React.RefObject<HTMLElement>}
        style={{
          padding: '60px 0',
          background: 'var(--warm-white)',
          borderBottom: '1px solid var(--warm-neutral)',
          opacity: commitmentVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {/* Commitment 1: Multi-Vendor Maintenance */}
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--warm-neutral)',
              borderRadius: '20px',
              padding: '36px 30px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--blue-medical)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 51, 102, 0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--warm-neutral)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
            }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(0, 168, 181, 0.1)',
                color: 'var(--teal-accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: '18px',
                width: 'fit-content',
              }}>
                <Wrench size={14} />
                UNIVERSAL MAINTENANCE SUPPORT
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.375rem',
                fontWeight: 800,
                color: 'var(--navy)',
                marginBottom: '12px',
                lineHeight: 1.3,
              }}>
                Service for All Equipment — Direct or Third-Party
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.65,
                color: 'var(--text-muted)',
                marginBottom: '16px',
              }}>
                We maintain and repair medical radiology devices regardless of whether they were originally supplied by Nour Medical or purchased through third-party vendors.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto', color: 'var(--navy)', fontWeight: 600, fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--teal-accent)' }} />
                Multi-vendor technical coverage across Egypt
              </div>
            </div>

            {/* Commitment 2: Spare Parts for All Supported Modalities */}
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--warm-neutral)',
              borderRadius: '20px',
              padding: '36px 30px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--blue-medical)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 51, 102, 0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--warm-neutral)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
            }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(0, 51, 102, 0.08)',
                color: 'var(--blue-medical)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: '18px',
                width: 'fit-content',
              }}>
                <Package size={14} />
                FULL SPARE PARTS COVERAGE
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.375rem',
                fontWeight: 800,
                color: 'var(--navy)',
                marginBottom: '12px',
                lineHeight: 1.3,
              }}>
                Spare Parts for Every Supported Device Category
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.65,
                color: 'var(--text-muted)',
                marginBottom: '16px',
              }}>
                We stock and supply genuine OEM spare parts, X-ray tubes, high-voltage generators, and flat panel detectors for all modalities we work with.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto', color: 'var(--navy)', fontWeight: 600, fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
                <ShieldCheck size={16} style={{ color: 'var(--blue-medical)' }} />
                1,000 m² central parts facility in Maadi, Cairo
              </div>
            </div>
          </div>
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
              maxWidth: '580px',
            }}>
              Structured annual maintenance contracts providing scheduled service, priority response, and genuine spare parts across all equipment modalities and third-party systems.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
          }}>
            {AMC_SYSTEMS.map((sys, i) => (
              <div
                key={sys.title}
                style={{
                  padding: '32px 28px',
                  background: 'var(--warm-white)',
                  borderRadius: '16px',
                  border: '1px solid var(--warm-neutral)',
                  opacity: portfolioVisible ? 1 : 0,
                  transform: portfolioVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s var(--ease-smooth) ${i * 0.1}s, transform 0.6s var(--ease-smooth) ${i * 0.1}s`,
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--teal-accent)',
                  fontWeight: 700,
                  marginBottom: '12px',
                }}>
                  AMC Modality
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  marginBottom: '10px',
                }}>
                  {sys.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: 'var(--text-muted)',
                }}>
                  {sys.description}
                </p>
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
                System Installation Expertise
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
              }}>
                Since 2015, Nour Medical has installed advanced radiology and diagnostic imaging systems across hospitals, scan centers, and medical facilities throughout Egypt.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {INSTALLATION_MODALITIES.map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '24px 0',
                    borderBottom: '1px solid var(--gray-light)',
                    opacity: installVisible ? 1 : 0,
                    transform: installVisible ? 'translateX(0)' : 'translateX(16px)',
                    transition: `opacity 0.5s var(--ease-smooth) ${i * 0.1}s, transform 0.5s var(--ease-smooth) ${i * 0.1}s`,
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.125rem',
                    color: 'var(--navy)',
                    fontWeight: 700,
                    marginBottom: '4px',
                  }}>
                    {stat.label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                  }}>
                    {stat.description}
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
          background: 'var(--warm-neutral)',
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
              <div className="section-label" style={{ marginBottom: '24px' }}>
                Parts Infrastructure
              </div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 800,
                color: 'var(--navy)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '16px',
              }}>
                Dedicated Parts Warehouse
              </h2>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--teal-accent)',
                marginBottom: '32px',
              }}>
                Spare Parts Storage Facility — Maadi, Cairo
              </div>
            </div>

            <div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                fontWeight: 700,
                color: 'var(--navy)',
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
                marginBottom: '20px',
              }}>
                Full Spare Parts Inventory Supporting All Modalities & Third-Party Equipment
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                marginBottom: '32px',
              }}>
                Maintaining a 1,000 m² dedicated spare parts facility in Maadi, Cairo allows Nour Medical to supply genuine replacement parts for all imaging modalities we work with, eliminating operational delays for both our clients and third-party systems.
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ gap: '8px' }}>
                Request Technical Support or Parts
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

