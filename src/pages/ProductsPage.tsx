import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Check, Zap } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/productsData';

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

const MODALITY_FILTERS = [
  { id: 'all', label: 'All Ecosystem' },
  { id: 'cath-lab', label: 'Cath-Lab / Angio' },
  { id: 'ct', label: 'CT Scanner' },
  { id: 'mri', label: 'MRI Systems' },
  { id: 'c-arm', label: 'Mobile C-Arm' },
  { id: 'xray', label: 'Digital X-Ray' },
  { id: 'sterilization', label: 'Sterilization' },
  { id: 'furniture', label: 'Hospital Beds & Furniture' },
  { id: 'consumables', label: 'Parts & Consumables' },
];

export const ProductsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { ref: gridRef, visible: gridVisible } = useReveal();

  const filteredProducts = PRODUCTS_DATA.filter(product => {
    const matchesFilter = activeFilter === 'all' ||
      (activeFilter === 'cath-lab' && (product.id.includes('cath') || product.name.toLowerCase().includes('cath'))) ||
      (activeFilter === 'ct' && (product.id.includes('ct') || product.name.toLowerCase().includes('ct'))) ||
      (activeFilter === 'mri' && (product.id.includes('mri') || product.name.toLowerCase().includes('mri'))) ||
      (activeFilter === 'c-arm' && (product.id.includes('c-arm') || product.name.toLowerCase().includes('c-arm'))) ||
      (activeFilter === 'xray' && (product.id.includes('dr') || product.name.toLowerCase().includes('x-ray') || product.name.toLowerCase().includes('radiology'))) ||
      (activeFilter === 'sterilization' && product.category === 'sterilization') ||
      (activeFilter === 'furniture' && product.category === 'furniture') ||
      (activeFilter === 'consumables' && product.category === 'consumables');

    const matchesSearch = searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      {/* Page Header */}
      <section style={{ background: 'var(--bg-hero-light)', padding: '120px 0 70px', borderBottom: '1px solid var(--gray-light)' }}>
        <div className="container">
          <div className="section-label" style={{ marginBottom: '20px' }}>
            Product Portfolio & Overview
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 800,
            color: 'var(--navy)',
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            maxWidth: '750px',
            marginBottom: '24px',
          }}>
            Medical Technology Solutions
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            maxWidth: '560px',
            marginBottom: '40px',
          }}>
            Explore our advanced radiology modalities, diagnostic equipment, central sterilization suites, and hospital furniture — supported by 24/7 technical hotline and spare parts inventory.
          </p>

          {/* Search Bar & Filter Pills Container */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Search Input */}
            <div style={{
              position: 'relative',
              maxWidth: '480px',
            }}>
              <Search size={18} style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }} />
              <input
                type="text"
                placeholder="Search equipment, supplier (Lonwin, RadMedix, InnoCare)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
                  borderRadius: '30px',
                  background: 'var(--white)',
                  border: '1px solid var(--gray-light)',
                  color: 'var(--navy)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Filter Pills */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
            }}>
              {MODALITY_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    border: activeFilter === filter.id
                      ? '1px solid var(--blue-medical)'
                      : '1px solid var(--gray-light)',
                    background: activeFilter === filter.id
                      ? 'var(--blue-medical)'
                      : 'var(--white)',
                    color: activeFilter === filter.id
                      ? 'var(--white)'
                      : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Grid */}
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '28px',
          }}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--warm-neutral)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--blue-medical)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 51, 102, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--warm-neutral)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#f1f5f9' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: 'var(--navy)',
                    color: 'var(--teal-accent)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}>
                    {product.supplier} · {product.country}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--blue-medical)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}>
                    {product.categoryLabel}
                  </span>

                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--navy)',
                    marginBottom: '8px',
                    lineHeight: 1.3,
                  }}>
                    {product.name}
                  </h3>

                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    lineHeight: 1.6,
                    color: 'var(--text-muted)',
                    marginBottom: '20px',
                    flex: 1,
                  }}>
                    {product.description}
                  </p>

                  {/* Highlights */}
                  <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {product.features.slice(0, 2).map((feat, i) => (
                      <span key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-body)',
                        color: 'var(--navy)',
                      }}>
                        <Check size={14} style={{ color: 'var(--teal-accent)', flexShrink: 0 }} />
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Main Task Display */}
                  <div style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: 'var(--warm-white)',
                    border: '1px solid var(--warm-neutral)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    marginTop: 'auto',
                  }}>
                    <Zap size={16} style={{ color: 'var(--teal-accent)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '2px',
                      }}>
                        Main Function
                      </span>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: 'var(--navy)',
                        lineHeight: 1.4,
                        margin: 0,
                      }}>
                        {product.mainTask}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: 'var(--warm-white)', borderTop: '1px solid var(--gray-light)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--navy)',
            letterSpacing: '-0.02em',
            marginBottom: '20px',
          }}>
            Looking for Custom Configurations?
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            marginBottom: '36px',
          }}>
            Our field engineers provide tailored equipment quotations, room layout planning, lead shielding calculation, and turnkey installation across Egypt.
          </p>
          <Link to="/contact" className="btn btn-primary" style={{ gap: '8px' }}>
            Request Quotation
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
};
