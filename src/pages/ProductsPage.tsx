import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/companyData';

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

export const ProductsPage: React.FC = () => {
  const { ref: gridRef, visible: gridVisible } = useReveal();
  const { ref: radRef, visible: radVisible } = useReveal();

  const RADIOLOGY_SUBCATEGORIES = [
    { name: 'MRI', description: 'Magnetic Resonance Imaging systems for advanced soft tissue diagnostics.' },
    { name: 'CT Scanner', description: 'Computed Tomography systems delivering high-resolution cross-sectional imaging.' },
    { name: 'Digital X-Ray', description: 'Flat-panel DR systems for efficient, high-quality digital radiography.' },
    { name: 'C-Arm', description: 'Mobile fluoroscopic imaging for surgical and interventional procedures.' },
    { name: 'Cath-Lab / Interventional Imaging', description: 'Dedicated cardiac catheterization laboratory and interventional radiology systems.' },
  ];

  return (
    <>
      {/* Page Header */}
      <section style={{ background: 'var(--navy)', padding: '100px 0 80px' }}>
        <div className="container">
          <div className="section-label" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
            Product Portfolio
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
            Medical Technology Solutions
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '520px',
          }}>
            A comprehensive portfolio of medical technology, radiology equipment, hospital furniture, and consumables — sourced from international suppliers and delivered with technical expertise.
          </p>
        </div>
      </section>

      {/* Product Categories */}
      <section
        ref={gridRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--white)',
          opacity: gridVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: '60px' }}>
            <div className="section-label">All Categories</div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--navy)',
              letterSpacing: '-0.02em',
            }}>
              Product Categories
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {PRODUCT_CATEGORIES.map((cat, i) => (
              <div
                key={cat.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  gap: '32px',
                  alignItems: 'center',
                  padding: '40px 0',
                  borderBottom: '1px solid var(--warm-neutral)',
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible ? 'translateX(0)' : 'translateX(-16px)',
                  transition: `opacity 0.5s var(--ease-smooth) ${i * 0.07}s, transform 0.5s var(--ease-smooth) ${i * 0.07}s`,
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  const arrow = e.currentTarget.querySelector('.cat-arrow') as HTMLElement;
                  if (arrow) arrow.style.transform = 'translateX(6px)';
                }}
                onMouseLeave={e => {
                  const arrow = e.currentTarget.querySelector('.cat-arrow') as HTMLElement;
                  if (arrow) arrow.style.transform = 'translateX(0)';
                }}
              >
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.25rem',
                    fontWeight: 300,
                    color: 'var(--blue-medical)',
                    letterSpacing: '-0.01em',
                  }}>
                    {cat.number}
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.25rem, 2vw, 1.625rem)',
                      fontWeight: 700,
                      color: 'var(--navy)',
                      letterSpacing: '-0.015em',
                    }}>
                      {cat.title}
                    </h3>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      background: 'var(--warm-neutral)',
                      padding: '3px 8px',
                      borderRadius: '2px',
                    }}>
                      {cat.tag}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    lineHeight: 1.65,
                    color: 'var(--text-muted)',
                    maxWidth: '600px',
                  }}>
                    {cat.description}
                  </p>
                  {cat.subcategories.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
                      {cat.subcategories.map(sub => (
                        <span
                          key={sub}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            border: '1px solid var(--gray-light)',
                            borderRadius: '2px',
                            padding: '4px 10px',
                          }}
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div
                  className="cat-arrow"
                  style={{ transition: 'transform var(--dur-mid) var(--ease-smooth)', color: 'var(--navy)' }}
                >
                  <ArrowRight size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Radiology Subcategory Detail */}
      <section
        ref={radRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--warm-white)',
          opacity: radVisible ? 1 : 0,
          transition: 'opacity 0.7s var(--ease-smooth)',
        }}
      >
        <div className="container">
          <div style={{ marginBottom: '56px' }}>
            <div className="section-label">Deep Dive</div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--navy)',
              letterSpacing: '-0.02em',
            }}>
              Radiology Technology
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              lineHeight: 1.7,
              color: 'var(--text-muted)',
              maxWidth: '560px',
              marginTop: '16px',
            }}>
              Nour Medical provides the full spectrum of clinical imaging technologies, with installation and maintenance capabilities across all major modalities.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '24px' }}>
            {RADIOLOGY_SUBCATEGORIES.map((sub, i) => (
              <div
                key={sub.name}
                className="card"
                style={{
                  padding: '36px 28px',
                  opacity: radVisible ? 1 : 0,
                  transform: radVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.6s var(--ease-smooth) ${i * 0.1}s, transform 0.6s var(--ease-smooth) ${i * 0.1}s`,
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
                  {String(i + 1).padStart(2, '0')} — Radiology
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  letterSpacing: '-0.015em',
                  marginBottom: '10px',
                }}>
                  {sub.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  lineHeight: 1.65,
                  color: 'var(--text-muted)',
                }}>
                  {sub.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: 'var(--white)', borderTop: '1px solid var(--gray-light)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--navy)',
            letterSpacing: '-0.02em',
            marginBottom: '20px',
          }}>
            Looking for Specific Equipment?
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            marginBottom: '36px',
          }}>
            Contact our team to discuss your specific requirements. We work with international suppliers to source the right solution for your facility.
          </p>
          <Link to="/contact" className="btn btn-primary" style={{ gap: '8px' }}>
            Send an Inquiry
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
};
