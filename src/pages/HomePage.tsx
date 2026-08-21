import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Mri3DViewer } from '../components/organisms/Mri3DViewer';
import { StatsSection } from '../components/organisms/StatsSection';
import { ClientMarquee } from '../components/organisms/ClientMarquee';
import {
  KEY_CAPABILITIES,
  WHY_NOUR_MEDICAL,
  SUPPLIER_PARTNERS,
  COMPANY_INFO,
} from '../data/companyData';

// ── Reveal Hook ──────────────────────────────────────────────────
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

export const HomePage: React.FC = () => {
  const { ref: introRef, visible: introVisible } = useReveal();
  const { ref: capRef, visible: capVisible } = useReveal();
  const { ref: whyRef, visible: whyVisible } = useReveal();
  const { ref: missionRef, visible: missionVisible } = useReveal();
  const { ref: partnersRef, visible: partnersVisible } = useReveal();
  const { ref: ctaRef, visible: ctaVisible } = useReveal();

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          minHeight: '100vh',
          background: 'var(--navy)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background grid */}
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

        {/* Gradient orb */}
        <div style={{
          position: 'absolute',
          right: '-10%',
          top: '10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(27,79,216,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: '60px',
          paddingBottom: '80px',
        }}>
          {/* Label */}
          <div style={{
            opacity: 0,
            animation: 'fadeInUp 0.7s var(--ease-smooth) 0.1s both',
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
              marginBottom: '40px',
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--teal-accent)',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }} />
              Est. 2015 · Maadi, Cairo, Egypt
            </span>
          </div>

          {/* Hero Content Grid: Text Left, Video Right */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }}>
            {/* Left: Text & CTA */}
            <div style={{ maxWidth: '640px' }}>
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.5rem, 5.5vw, 5.25rem)',
                  fontWeight: 800,
                  color: 'var(--white)',
                  lineHeight: 0.98,
                  letterSpacing: '-0.03em',
                  marginBottom: '28px',
                  opacity: 0,
                  animation: 'fadeInUp 0.9s var(--ease-smooth) 0.25s both',
                }}
              >
                Advanced Healthcare Technology.{' '}
                <span style={{ color: 'var(--teal-accent)' }}>Reliable Medical Solutions.</span>
              </h1>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.65)',
                marginBottom: '40px',
                opacity: 0,
                animation: 'fadeInUp 0.9s var(--ease-smooth) 0.4s both',
              }}>
                Nour Medical provides radiology devices, medical equipment, hospital furniture, consumables, spare parts, and professional maintenance services to healthcare organizations across Egypt.
              </p>

              <div style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                opacity: 0,
                animation: 'fadeInUp 0.9s var(--ease-smooth) 0.55s both',
              }}>
                <Link to="/products" className="btn btn-blue" style={{ gap: '8px' }}>
                  Explore Our Solutions
                  <ArrowRight size={15} />
                </Link>
                <Link to="/contact" className="btn btn-outline-white">
                  Contact Our Team
                </Link>
              </div>
            </div>

            {/* Right: Seamless Blended 3D MRI Scanner Viewer */}
            <div style={{
              opacity: 0,
              animation: 'fadeInUp 0.9s var(--ease-smooth) 0.45s both',
              position: 'relative',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Mri3DViewer height="500px" />
            </div>
          </div>
        </div>

        {/* Scroll prompt */}
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: 'rgba(255,255,255,0.3)',
          animation: 'fadeIn 1s var(--ease-smooth) 1.2s both',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Scroll
          </span>
          <ChevronDown size={14} style={{ animation: 'fadeInUp 2s ease-in-out infinite' }} />
        </div>

        {/* Bottom stat bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.03)',
          opacity: 0,
          animation: 'fadeIn 0.8s var(--ease-smooth) 0.8s both',
        }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '0',
              padding: '24px 0',
            }}>
              {[
                { value: '50+', label: 'Technical Personnel' },
                { value: '25+', label: 'Cath-Lab Installs' },
                { value: '40+', label: 'X-Ray AMCs' },
                { value: '1,000 m²', label: 'Parts Facility' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    padding: '12px 24px',
                    borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--white)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.35)',
                    marginTop: '4px',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. COMPANY INTRODUCTION ──────────────────────────── */}
      <section
        ref={introRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--white)',
          opacity: introVisible ? 1 : 0,
          transform: introVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s var(--ease-smooth), transform 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(40px, 6vw, 100px)',
            alignItems: 'center',
          }}>
            <div>
              <div className="section-label">About Nour Medical</div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 700,
                color: 'var(--navy)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: '28px',
              }}>
                Healthcare Technology Built Around Reliability
              </h2>
              <Link to="/about" className="btn btn-outline" style={{ marginTop: '8px' }}>
                Discover Nour Medical
              </Link>
            </div>
            <div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                lineHeight: 1.75,
                color: 'var(--text-muted)',
                marginBottom: '24px',
              }}>
                Established in {COMPANY_INFO.established}, Nour Medical Company has built its business around the healthcare sector, specializing in radiology devices, medical equipment, hospital furniture, consumables, spare parts, and technical maintenance.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                lineHeight: 1.75,
                color: 'var(--text-muted)',
              }}>
                Our experience in maintaining imported radiology systems, combined with access to a global supplier network spanning the USA, Taiwan, and China, enables us to deliver dependable products and responsive after-sales support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. KEY CAPABILITIES ──────────────────────────────── */}
      <section
        ref={capRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--warm-white)',
          opacity: capVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: '60px' }}>
            <div className="section-label">What We Offer</div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--navy)',
              letterSpacing: '-0.02em',
            }}>
              Core Capabilities
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '0',
            border: '1px solid var(--gray-light)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            {KEY_CAPABILITIES.map((cap, i) => (
              <div
                key={cap.id}
                style={{
                  padding: '40px 32px',
                  borderRight: i < KEY_CAPABILITIES.length - 1 ? '1px solid var(--gray-light)' : 'none',
                  background: 'var(--white)',
                  transition: 'background var(--dur-mid)',
                  opacity: capVisible ? 1 : 0,
                  transform: capVisible ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: `${i * 0.08}s`,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--warm-white)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--white)')}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--teal-accent)',
                  marginBottom: '16px',
                }}>
                  0{i + 1}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  letterSpacing: '-0.01em',
                  marginBottom: '10px',
                }}>
                  {cap.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  lineHeight: 1.65,
                  color: 'var(--text-muted)',
                }}>
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. STATS SECTION ─────────────────────────────────── */}
      <StatsSection />

      {/* ── 5. CLIENT MARQUEE ────────────────────────────────── */}
      <ClientMarquee />

      {/* ── 6. WHY NOUR MEDICAL ──────────────────────────────── */}
      <section
        ref={whyRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--white)',
          opacity: whyVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(40px, 6vw, 100px)',
            alignItems: 'start',
          }}>
            <div style={{ position: 'sticky', top: '100px' }}>
              <div className="section-label">Why Nour Medical</div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 700,
                color: 'var(--navy)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: '20px',
              }}>
                From Equipment Supply to Long-Term Support
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                marginBottom: '32px',
              }}>
                Nour Medical's value extends beyond supplying equipment — we support healthcare organizations throughout the operational life of their systems.
              </p>
              <Link to="/services" className="btn btn-primary">
                View Our Services
              </Link>
            </div>

            <div>
              {WHY_NOUR_MEDICAL.map((item, i) => (
                <div
                  key={item.title}
                  style={{
                    padding: '28px 0',
                    borderBottom: '1px solid var(--warm-neutral)',
                    opacity: whyVisible ? 1 : 0,
                    transform: whyVisible ? 'translateY(0)' : 'translateY(16px)',
                    transition: `opacity 0.6s var(--ease-smooth) ${i * 0.08}s, transform 0.6s var(--ease-smooth) ${i * 0.08}s`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                    <div>
                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.0625rem',
                        fontWeight: 600,
                        color: 'var(--navy)',
                        letterSpacing: '-0.01em',
                        marginBottom: '8px',
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        lineHeight: 1.65,
                        color: 'var(--text-muted)',
                      }}>
                        {item.description}
                      </p>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5rem',
                      letterSpacing: '0.15em',
                      color: 'var(--stone)',
                      flexShrink: 0,
                      marginTop: '4px',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. VISION & MISSION ──────────────────────────────── */}
      <section
        ref={missionRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--navy)',
          opacity: missionVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          {/* Vision */}
          <div style={{ marginBottom: '80px', maxWidth: '760px' }}>
            <div className="section-label section-label-light" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Our Vision
            </div>
            <blockquote style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 600,
              fontStyle: 'italic',
              color: 'var(--white)',
              lineHeight: 1.3,
              letterSpacing: '-0.02em',
            }}>
              "{COMPANY_INFO.vision}"
            </blockquote>
          </div>

          <div className="rule-dark" style={{ marginBottom: '80px' }} />

          {/* Mission Pillars */}
          <div className="section-label" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '48px' }}>
            Our Mission
          </div>
          <div className="grid-3">
            {COMPANY_INFO.mission.map((pillar, i) => (
              <div
                key={pillar.title}
                style={{
                  opacity: missionVisible ? 1 : 0,
                  transform: missionVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s var(--ease-smooth) ${i * 0.12}s, transform 0.6s var(--ease-smooth) ${i * 0.12}s`,
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--teal-accent)',
                  marginBottom: '16px',
                }}>
                  0{i + 1}
                </div>
                <div style={{
                  width: '32px',
                  height: '1px',
                  background: 'rgba(255,255,255,0.2)',
                  marginBottom: '24px',
                }} />
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--white)',
                  letterSpacing: '-0.01em',
                  marginBottom: '12px',
                }}>
                  {pillar.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.55)',
                }}>
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. GLOBAL PARTNERS ───────────────────────────────── */}
      <section
        ref={partnersRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--warm-white)',
          opacity: partnersVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div className="section-label">Global Technology Partners</div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
                fontWeight: 700,
                color: 'var(--navy)',
                letterSpacing: '-0.02em',
              }}>
                Global Technology. Local Expertise.
              </h2>
            </div>
            <Link to="/partners" className="btn btn-outline">
              View All Partners
            </Link>
          </div>

          <div className="grid-3">
            {SUPPLIER_PARTNERS.map((partner, i) => (
              <div
                key={partner.id}
                className="card"
                style={{
                  padding: '40px 32px',
                  opacity: partnersVisible ? 1 : 0,
                  transform: partnersVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.6s var(--ease-smooth) ${i * 0.1}s, transform 0.6s var(--ease-smooth) ${i * 0.1}s`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    background: 'var(--warm-neutral)',
                    padding: '4px 10px',
                    borderRadius: '2px',
                  }}>
                    {partner.country}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.0625rem',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  letterSpacing: '-0.01em',
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
                  marginBottom: '16px',
                }}>
                  {partner.tagline}
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {partner.specialties.slice(0, 3).map(s => (
                    <li key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--blue-medical)', flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ─────────────────────────────────────── */}
      <section
        ref={ctaRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--white)',
          borderTop: '1px solid var(--gray-light)',
          textAlign: 'center',
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s var(--ease-smooth), transform 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container" style={{ maxWidth: '720px' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Start a Conversation
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4.5vw, 4rem)',
            fontWeight: 700,
            color: 'var(--navy)',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            marginBottom: '24px',
          }}>
            Let's Build Better Healthcare Infrastructure
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            marginBottom: '40px',
          }}>
            Whether you are equipping a new facility, upgrading imaging capabilities, or looking for dependable technical support, Nour Medical is ready to support your healthcare operation.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary" style={{ gap: '8px' }}>
              Talk to Our Team
              <ArrowRight size={15} />
            </Link>
            <Link to="/products" className="btn btn-outline">
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
