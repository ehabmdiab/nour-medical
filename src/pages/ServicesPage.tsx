import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Wrench,
  Package,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PhoneCall,
} from 'lucide-react';
import { SERVICES, COMPANY_CONTACT, COMPANY_INFO } from '../data/companyData';

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export const ServicesPage: React.FC = () => {
  const { ref: overviewRef, visible: overviewVisible } = useReveal();
  const { ref: maintenanceRef, visible: maintenanceVisible } = useReveal();
  const { ref: amcRef, visible: amcVisible } = useReveal();
  const { ref: installRef, visible: installVisible } = useReveal();
  const { ref: infraRef, visible: infraVisible } = useReveal();
  const { ref: philosophyRef, visible: philosophyVisible } = useReveal();

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const AMC_SYSTEMS = [
    {
      title: 'Cath-Lab / Interventional',
      badge: 'High-Demand Systems',
      description:
        'Priority emergency response, comprehensive component coverage, high-heat tube replacement programmes, and high-voltage calibration for cardiac angiography suites.',
    },
    {
      title: 'C-Arm Surgical Systems',
      badge: 'Operating Theatres',
      description:
        'Preventive optics and laser alignment, image intensifier service, mechanical balance checks, and radiation dose calibration across major OEM brands.',
    },
    {
      title: 'Digital X-Ray Systems',
      badge: 'Radiology Suites',
      description:
        'Flat panel detector pixel defect calibration, high-frequency generator maintenance, and software updates for legacy and digital DR rooms.',
    },
    {
      title: 'CT Scanners',
      badge: 'Diagnostic Imaging',
      description:
        'Scheduled preventive maintenance, gantry slip-ring inspection, cooling subsystem audits, and tube performance monitoring regardless of original vendor.',
    },
    {
      title: 'MRI Modalities',
      badge: 'Advanced Imaging',
      description:
        'Cryogenic pressure and level monitoring, RF coil verification, gradient amplifier calibration, and preventive maintenance for diagnostic MRI suites.',
    },
  ];

  const INSTALLATION_MODALITIES = [
    {
      label: 'Cath-Lab Systems',
      description:
        'Turnkey site preparation, floor weight distribution calculation, and comprehensive AEA radiation safety commissioning.',
    },
    {
      label: 'Digital X-Ray Suites',
      description:
        'Fixed room and mobile DR flat panel detector integration, generator synchronization, and PACS workstation setup.',
    },
    {
      label: 'CT Scanners',
      description:
        'Heavy gantry rigging, precision laser leveling, lead radiation shielding verification, and cooling loop commissioning.',
    },
    {
      label: 'MRI Modalities',
      description:
        'Shielded RF enclosure setup, quench pipe routing, cold-line connection, and magnetic field shimming startup.',
    },
  ];

  return (
    <>
      {/* Page Header / Hero */}
      <section
        style={{
          background: 'var(--navy)',
          padding: '130px 0 80px',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />
        <div style={{
          position: 'absolute',
          right: '-5%',
          top: '0%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(27,79,216,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--teal-accent)',
            marginBottom: '20px',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--teal-accent)',
              boxShadow: '0 0 8px var(--teal-accent)',
            }} />
            CORE CAPABILITIES & SOLUTIONS
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3rem, 6.5vw, 5.75rem)',
              fontWeight: 700,
              color: 'var(--white)',
              letterSpacing: '-0.035em',
              lineHeight: 0.94,
              maxWidth: '920px',
              marginBottom: '32px',
            }}
          >
            Healthcare Technology & Services
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '720px',
              marginBottom: '36px',
            }}
          >
            Nour Medical supports hospitals and diagnostic centers across Egypt through integrated service bands — covering rapid technical maintenance, genuine OEM spare parts, annual maintenance contracts (AMC), and turnkey equipment supply.
          </p>

          {/* Quick Jump Anchor Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <button
              onClick={() => scrollToSection('overview')}
              style={{
                padding: '8px 16px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'rgba(255, 255, 255, 0.85)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--teal-accent)';
                e.currentTarget.style.color = 'var(--white)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
              }}
            >
              Overview &amp; Pillars
            </button>
            <button
              onClick={() => scrollToSection('maintenance')}
              style={{
                padding: '8px 16px',
                borderRadius: '24px',
                background: 'rgba(0, 168, 181, 0.15)',
                border: '1px solid var(--teal-accent)',
                color: 'var(--teal-accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 168, 181, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 168, 181, 0.15)';
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--teal-accent)' }} />
              Technical Maintenance
            </button>
            <button
              onClick={() => scrollToSection('parts-infrastructure')}
              style={{
                padding: '8px 16px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'rgba(255, 255, 255, 0.85)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--teal-accent)';
                e.currentTarget.style.color = 'var(--white)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
              }}
            >
              Maadi Parts Facility (1,000 m²)
            </button>
            <button
              onClick={() => scrollToSection('amc-portfolio')}
              style={{
                padding: '8px 16px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'rgba(255, 255, 255, 0.85)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--teal-accent)';
                e.currentTarget.style.color = 'var(--white)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
              }}
            >
              Annual AMC Contracts
            </button>
          </div>
        </div>
      </section>

      {/* Services Overview — The 2 Core Pillars */}
      <section
        id="overview"
        ref={overviewRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--white)',
          opacity: overviewVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: '50px' }}>
            <div className="section-label">Core Operations</div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
                fontWeight: 700,
                color: 'var(--navy)',
                letterSpacing: '-0.02em',
              }}
            >
              Our Service Pillars
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
            }}
          >
            {SERVICES.map((service, i) => {
              const isMaintenancePillar = service.id === 'maintenance-support';

              return (
                <div
                  key={service.number}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--gray-light)',
                    borderRadius: '24px',
                    padding: 'clamp(32px, 4vw, 48px)',
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: overviewVisible ? 1 : 0,
                    transform: overviewVisible ? 'translateY(0)' : 'translateY(24px)',
                    transition: `opacity 0.6s var(--ease-smooth) ${i * 0.15}s, transform 0.6s var(--ease-smooth) ${i * 0.15}s, border-color 0.2s ease, box-shadow 0.2s ease`,
                    boxShadow: '0 4px 24px rgba(15, 23, 42, 0.04)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--blue-medical)';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(27, 79, 216, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gray-light)';
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(15, 23, 42, 0.04)';
                  }}
                >
                  {/* Top Tag & Number */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '28px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        background:
                          i === 0
                            ? 'rgba(13, 148, 136, 0.1)'
                            : 'rgba(27, 79, 216, 0.08)',
                        color:
                          i === 0 ? 'var(--teal-accent)' : 'var(--blue-medical)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {i === 0 ? <Wrench size={14} /> : <Package size={14} />}
                      {service.tag}
                    </span>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '2.25rem',
                        fontWeight: 300,
                        color: 'rgba(15, 23, 42, 0.2)',
                        lineHeight: 1,
                      }}
                    >
                      {service.number}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.625rem',
                      fontWeight: 700,
                      color: 'var(--navy)',
                      letterSpacing: '-0.02em',
                      marginBottom: '6px',
                      lineHeight: 1.25,
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8125rem',
                      color: 'var(--blue-medical)',
                      fontWeight: 600,
                      marginBottom: '16px',
                    }}
                  >
                    {service.headline}
                  </p>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.0625rem',
                      lineHeight: 1.65,
                      color: 'var(--text-muted)',
                      marginBottom: '28px',
                    }}
                  >
                    {service.description}
                  </p>

                  <div
                    style={{
                      height: '1px',
                      background: 'var(--gray-light)',
                      marginBottom: '28px',
                    }}
                  />

                  {/* Highlights Checklist */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      marginBottom: '32px',
                      flex: 1,
                    }}
                  >
                    {service.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                        }}
                      >
                        <CheckCircle2
                          size={18}
                          style={{
                            color: 'var(--teal-accent)',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        />
                        <div>
                          <h4
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: '1.125rem',
                              fontWeight: 700,
                              color: 'var(--navy)',
                              marginBottom: '2px',
                            }}
                          >
                            {item.title}
                          </h4>
                          <p
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.8125rem',
                              lineHeight: 1.5,
                              color: 'var(--text-muted)',
                              margin: 0,
                            }}
                          >
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer Link / CTA */}
                  {isMaintenancePillar ? (
                    <button
                      onClick={() => scrollToSection('maintenance')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 20px',
                        borderRadius: '12px',
                        background: 'var(--warm-neutral)',
                        border: '1px solid var(--gray-light)',
                        color: 'var(--navy)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        marginTop: 'auto',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--navy)';
                        e.currentTarget.style.color = 'var(--white)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--warm-neutral)';
                        e.currentTarget.style.color = 'var(--navy)';
                      }}
                    >
                      <span>Explore Maintenance Band</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <Link
                      to={service.link}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 20px',
                        borderRadius: '12px',
                        background: 'var(--warm-neutral)',
                        border: '1px solid var(--gray-light)',
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
                        e.currentTarget.style.background = 'var(--warm-neutral)';
                        e.currentTarget.style.color = 'var(--navy)';
                      }}
                    >
                      <span>{service.linkText}</span>
                      <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          BAND 01: TECHNICAL MAINTENANCE & FIELD ENGINEERING
          ============================================================ */}
      <section
        id="maintenance"
        ref={maintenanceRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--warm-white)',
          borderTop: '1px solid var(--gray-light)',
          borderBottom: '1px solid var(--gray-light)',
          opacity: maintenanceVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          {/* Band Header */}
          <div style={{ maxWidth: '780px', marginBottom: '48px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(27, 79, 216, 0.1)',
                color: 'var(--blue-medical)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: '16px',
              }}
            >
              <Wrench size={14} />
              SERVICE BAND 01 · TECHNICAL MAINTENANCE &amp; FIELD SUPPORT
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
                fontWeight: 700,
                color: 'var(--navy)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                marginBottom: '16px',
              }}
            >
              Universal Multi-Vendor Maintenance &amp; AMC Support
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
              }}
            >
              Nour Medical provides comprehensive biomedical field service maintenance, scheduled preventive health checks, and genuine spare parts for all radiology devices we support — including third-party equipment originally supplied by other vendors across Egypt.
            </p>
          </div>

          {/* Key Commitments: Multi-Vendor + Spare Parts + 24/7 Hotline */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '64px',
            }}
          >
            {/* Commitment 1: Multi-Vendor Support */}
            <div
              style={{
                background: 'var(--white)',
                border: '1px solid var(--gray-light)',
                borderRadius: '20px',
                padding: '36px 30px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--blue-medical)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(27, 79, 216, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--gray-light)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.03)';
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  background: 'rgba(13, 148, 136, 0.1)',
                  color: 'var(--teal-accent)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  marginBottom: '18px',
                  width: 'fit-content',
                }}
              >
                <Wrench size={14} />
                UNIVERSAL MAINTENANCE SUPPORT
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.625rem',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  marginBottom: '12px',
                  lineHeight: 1.3,
                }}
              >
                Service for All Equipment — Direct or Third-Party
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.65,
                  color: 'var(--text-muted)',
                  marginBottom: '20px',
                }}
              >
                We maintain, calibrate, and repair medical radiology devices regardless of whether they were originally supplied by Nour Medical or purchased through third-party vendors.
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: 'auto',
                  color: 'var(--navy)',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <CheckCircle2 size={16} style={{ color: 'var(--teal-accent)' }} />
                Multi-vendor technical coverage across all governorates
              </div>
            </div>

            {/* Commitment 2: Full Spare Parts Coverage */}
            <div
              style={{
                background: 'var(--white)',
                border: '1px solid var(--gray-light)',
                borderRadius: '20px',
                padding: '36px 30px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--blue-medical)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(27, 79, 216, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--gray-light)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.03)';
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  background: 'rgba(27, 79, 216, 0.08)',
                  color: 'var(--blue-medical)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  marginBottom: '18px',
                  width: 'fit-content',
                }}
              >
                <Package size={14} />
                FULL SPARE PARTS COVERAGE
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.625rem',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  marginBottom: '12px',
                  lineHeight: 1.3,
                }}
              >
                Spare Parts for Every Supported Modality
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.65,
                  color: 'var(--text-muted)',
                  marginBottom: '20px',
                }}
              >
                We stock and supply genuine OEM spare parts, X-ray tubes, high-voltage generators, and flat panel detectors for all modalities we work with, eliminating operational downtime.
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: 'auto',
                  color: 'var(--navy)',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <ShieldCheck size={16} style={{ color: 'var(--blue-medical)' }} />
                1,000 m² central parts facility in Maadi, Cairo
              </div>
            </div>

            {/* Commitment 3: 24/7 Hotline & Emergency Dispatch */}
            <div
              style={{
                background: 'var(--white)',
                border: '1px solid var(--gray-light)',
                borderRadius: '20px',
                padding: '36px 30px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--blue-medical)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(27, 79, 216, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--gray-light)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.03)';
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  background: 'rgba(217, 119, 6, 0.1)',
                  color: 'var(--amber-accent)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  marginBottom: '18px',
                  width: 'fit-content',
                }}
              >
                <Clock size={14} />
                24/7 RAPID DISPATCH
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.625rem',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  marginBottom: '12px',
                  lineHeight: 1.3,
                }}
              >
                Under 2-Hour Response in Greater Cairo
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.65,
                  color: 'var(--text-muted)',
                  marginBottom: '20px',
                }}
              >
                Immediate telephone diagnostic triage within 15 minutes and rapid field engineer mobilization with replacement parts to restore clinical operations without delay.
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: 'auto',
                  color: 'var(--navy)',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <PhoneCall size={16} style={{ color: 'var(--amber-accent)' }} />
                Direct senior biomedical engineer hotline
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMC Portfolio */}
      <section
        id="amc-portfolio"
        ref={amcRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--white)',
          opacity: amcVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: '50px' }}>
            <div className="section-label">Annual Maintenance Contracts (AMC)</div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
                fontWeight: 700,
                color: 'var(--navy)',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}
            >
              Maintenance Portfolio by Modality
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                maxWidth: '620px',
              }}
            >
              Structured annual maintenance contracts providing scheduled preventive maintenance, priority emergency response, genuine replacement parts, and image quality calibration across all equipment modalities.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {AMC_SYSTEMS.map((sys, i) => (
              <div
                key={sys.title}
                style={{
                  padding: '32px 28px',
                  background: 'var(--warm-white)',
                  borderRadius: '16px',
                  border: '1px solid var(--gray-light)',
                  opacity: amcVisible ? 1 : 0,
                  transform: amcVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s var(--ease-smooth) ${i * 0.08}s, transform 0.6s var(--ease-smooth) ${i * 0.08}s, border-color 0.2s ease, box-shadow 0.2s ease`,
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--blue-medical)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(27, 79, 216, 0.07)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gray-light)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--teal-accent)',
                    fontWeight: 700,
                    marginBottom: '12px',
                  }}
                >
                  {sys.badge}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.625rem',
                    fontWeight: 700,
                    color: 'var(--navy)',
                    marginBottom: '10px',
                    lineHeight: 1.3,
                  }}
                >
                  {sys.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.125rem',
                    lineHeight: 1.6,
                    color: 'var(--text-muted)',
                    margin: 0,
                  }}
                >
                  {sys.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Installation Track Record */}
      <section
        id="installation"
        ref={installRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--warm-white)',
          borderTop: '1px solid var(--gray-light)',
          opacity: installVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(40px, 6vw, 100px)',
              alignItems: 'start',
            }}
          >
            <div>
              <div className="section-label">Track Record Since {COMPANY_INFO.established}</div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginBottom: '20px',
                }}
              >
                System Installation &amp; Rigging Expertise
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                  marginBottom: '24px',
                }}
              >
                Since {COMPANY_INFO.established}, Nour Medical has installed advanced radiology and diagnostic imaging systems across hospitals, scan centers, and university facilities throughout Egypt.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                }}
              >
                Our engineering team manages full architectural site planning, radiation shielding lead construction, floor load structural validation, and Atomic Energy Authority (AEA) safety sign-off.
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
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      color: 'var(--navy)',
                      fontWeight: 700,
                      marginBottom: '6px',
                    }}
                  >
                    {stat.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.125rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                    }}
                  >
                    {stat.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Parts Infrastructure — 1,000 m² Maadi Facility */}
      <section
        id="parts-infrastructure"
        ref={infraRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--warm-neutral)',
          opacity: infraVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(40px, 6vw, 100px)',
              alignItems: 'center',
            }}
          >
            <div>
              <div className="section-label" style={{ marginBottom: '24px' }}>
                Central Parts Infrastructure
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  marginBottom: '16px',
                }}
              >
                Dedicated Parts Warehouse
              </h2>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--blue-medical)',
                  fontWeight: 700,
                  marginBottom: '32px',
                }}
              >
                {COMPANY_INFO.partsFacilityM2} m² Storage Facility — {COMPANY_INFO.location}
              </div>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.3,
                  marginBottom: '20px',
                }}
              >
                Comprehensive Inventory Supporting Direct &amp; Third-Party Systems
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                  marginBottom: '32px',
                }}
              >
                Maintaining Egypt's largest specialized inventory of OEM X-ray tubes, high-voltage generators, flat panel detectors, power supplies, and ICU components in Maadi allows Nour Medical to supply genuine replacement parts rapidly, eliminating costly hospital operational downtime.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Link to="/contact" className="btn btn-primary" style={{ gap: '8px' }}>
                  Request Technical Support or Parts
                  <ArrowRight size={15} />
                </Link>
                <a
                  href={`tel:${COMPANY_CONTACT.mobile[0]}`}
                  className="btn btn-outline"
                  style={{ gap: '8px', background: 'var(--white)' }}
                >
                  <PhoneCall size={15} />
                  Emergency Hotline: {COMPANY_CONTACT.mobile[0]}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Philosophy */}
      <section
        id="philosophy"
        ref={philosophyRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--warm-white)',
          opacity: philosophyVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(40px, 6vw, 100px)',
              alignItems: 'center',
            }}
          >
            <div>
              <div className="section-label">Service Philosophy</div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                Beyond Supply &amp; Installation
              </h2>
            </div>
            <div>
              <blockquote
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.625rem)',
                  fontStyle: 'italic',
                  color: 'var(--navy)',
                  lineHeight: 1.4,
                  borderLeft: '3px solid var(--blue-medical)',
                  paddingLeft: '28px',
                  marginBottom: '24px',
                }}
              >
                "Reliable equipment is only part of the equation. Continuous technical support and genuine local spare parts are essential to maintaining uninterrupted healthcare operations."
              </blockquote>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                }}
              >
                Our integrated approach ensures that healthcare facilities receive swift engineering assistance, instant access to our {COMPANY_INFO.partsFacilityM2} m² Maadi spare parts facility, and structured annual maintenance programs throughout the operational lifespan of their medical technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Hotline / Consultation CTA Banner */}
      <section style={{ padding: '80px 0', background: 'var(--navy)' }}>
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '32px',
          }}
        >
          <div>
            <div
              className="section-label"
              style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}
            >
              24/7 Technical Response
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 700,
                color: 'var(--white)',
                letterSpacing: '-0.02em',
                maxWidth: '560px',
              }}
            >
              Need Immediate Technical Field Assistance or AMC Consultation?
            </h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <Link
              to="/contact"
              className="btn btn-primary"
              style={{ gap: '8px', flexShrink: 0 }}
            >
              Contact Engineering Team
              <ArrowRight size={15} />
            </Link>
            <a
              href={`tel:${COMPANY_CONTACT.phone[0].replace(/\s/g, '')}`}
              className="btn btn-outline-white"
              style={{ gap: '8px', flexShrink: 0 }}
            >
              <PhoneCall size={15} />
              Cairo Office: {COMPANY_CONTACT.phone[0]}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
