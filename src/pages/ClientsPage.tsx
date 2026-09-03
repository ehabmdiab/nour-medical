import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Search,
  Wrench,
  ShieldCheck,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { ClientMarquee } from '../components/organisms/ClientMarquee';
import { DETAILED_CLIENTS } from '../data/clientsData';
import type { ClientFacility, InstalledDevice } from '../data/clientsData';

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
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

// ── IMAGE CAROUSEL SUB-COMPONENT ──────────────────────────────────
interface ModalCarouselProps {
  images: string[];
  clientName: string;
}

const ModalCarousel: React.FC<ModalCarouselProps> = ({ images, clientName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '340px',
        background: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Current Slide Image */}
      <img
        src={images[currentIndex]}
        alt={`${clientName} photo ${currentIndex + 1}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 0.4s ease-in-out',
        }}
      />

      {/* Vignette Overlay Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(15,23,42,0.3) 0%, transparent 40%, transparent 60%, rgba(15,23,42,0.85) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Slide Counter Badge */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          color: 'var(--white)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          letterSpacing: '0.12em',
          padding: '4px 10px',
          borderRadius: '4px',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        {currentIndex + 1} / {images.length}
      </div>

      {/* Navigation Arrows (if more than 1 image) */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'var(--white)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'var(--white)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              display: 'flex',
              gap: '6px',
              zIndex: 2,
            }}
          >
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: idx === currentIndex ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: idx === currentIndex ? 'var(--blue-medical)' : 'rgba(255,255,255,0.4)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ── MAIN CLIENTS PAGE COMPONENT ──────────────────────────────────
export const ClientsPage: React.FC = () => {
  const { ref: gridRef, visible: gridVisible } = useReveal();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeClient, setActiveClient] = useState<ClientFacility | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveClient(null);
    };
    if (activeClient) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeClient]);

  const categories = ['All', 'Cath-Lab', 'CT Scanner', 'MRI', 'C-Arm', 'DR X-Ray'];

  const filteredClients = useMemo(() => {
    return DETAILED_CLIENTS.filter((client) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        client.primaryCategories.some((cat) => cat.toLowerCase().includes(selectedCategory.toLowerCase()));
      const matchesSearch =
        searchQuery === '' ||
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.facilityType.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      {/* ── 1. HERO HEADER ────────────────── */}
      <section
        style={{
          background: 'var(--bg-hero-light)',
          padding: '140px 0 80px',
          color: 'var(--navy)',
          position: 'relative',
          borderBottom: '1px solid var(--gray-light)',
          zIndex: 1,
        }}
      >
        <div className="container">
          <div
            className="section-label"
            style={{ color: 'var(--blue-medical)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Sparkles size={14} /> Client Reference Portfolio
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
              fontWeight: 800,
              color: 'var(--navy)',
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              maxWidth: '820px',
              marginBottom: '24px',
            }}
          >
            Healthcare Facilities Powered & Maintained by{' '}
            <span style={{ color: 'var(--blue-medical)' }}>Nour Medical</span>
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.4vw, 1.125rem)',
              lineHeight: 1.65,
              color: 'var(--text-muted)',
              maxWidth: '640px',
            }}
          >
            Click on any healthcare partner below to launch the project gallery carousel and inspect the medical equipment installed and serviced at each location.
          </p>
        </div>
      </section>

      {/* ── 2. MARQUEE TICKER ───────────────────────────────── */}
      <ClientMarquee />

      {/* ── 3. FILTER TOOLBAR & MAIN CLIENT GRID ─────────────── */}
      <section
        ref={gridRef as React.RefObject<HTMLElement>}
        style={{
          padding: 'var(--section-gap) 0',
          background: 'var(--warm-white)',
          opacity: gridVisible ? 1 : 0,
          transition: 'opacity 0.6s var(--ease-smooth)',
        }}
      >
        <div className="container">
          {/* Minimal Filter & Search Bar */}
          <div
            style={{
              marginBottom: '40px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '30px',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.8125rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--white)' : 'var(--navy)',
                      background: isActive ? 'var(--navy)' : 'var(--white)',
                      border: '1px solid',
                      borderColor: isActive ? 'var(--navy)' : 'var(--gray-light)',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: isActive ? '0 4px 14px rgba(15, 23, 42, 0.15)' : 'none',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', minWidth: '280px', flex: '0 1 340px' }}>
              <Search
                size={16}
                color="var(--text-muted)"
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Search hospital or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 16px 10px 42px',
                  borderRadius: '30px',
                  border: '1px solid var(--gray-light)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--navy)',
                  background: 'var(--white)',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Cards Grid */}
          {filteredClients.length === 0 ? (
            <div
              style={{
                padding: '60px 20px',
                textAlign: 'center',
                background: 'var(--white)',
                borderRadius: '12px',
                border: '1px solid var(--gray-light)',
              }}
            >
              <Filter size={32} color="var(--stone)" style={{ marginBottom: '16px' }} />
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', color: 'var(--navy)' }}>
                No clients found matching your filter
              </h4>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px',
              }}
            >
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  onClick={() => setActiveClient(client)}
                  style={{
                    background: 'var(--white)',
                    borderRadius: '10px',
                    border: '1px solid var(--gray-light)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="client-card-award"
                >
                  {/* Thumbnail Image */}
                  <div style={{ position: 'relative', height: '190px', overflow: 'hidden', background: '#0f172a' }}>
                    <img
                      src={client.images[0]}
                      alt={client.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                      className="card-thumb-img"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 40%, rgba(15, 23, 42, 0.8) 100%)',
                      }}
                    />

                    {/* Image Carousel Count Indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(15, 23, 42, 0.75)',
                        backdropFilter: 'blur(6px)',
                        color: 'var(--white)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.625rem',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      📷 {client.images.length} Photos
                    </div>

                    <div style={{ position: 'absolute', bottom: '12px', left: '16px', display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.9)' }}>
                      <MapPin size={14} color="var(--teal-accent)" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{client.location}</span>
                    </div>
                  </div>

                  {/* Card Info Content */}
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.5625rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--teal-accent)',
                          fontWeight: 600,
                          marginBottom: '6px',
                        }}
                      >
                        {client.facilityType}
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          color: 'var(--navy)',
                          letterSpacing: '-0.015em',
                          marginBottom: '12px',
                          lineHeight: 1.3,
                        }}
                      >
                        {client.name}
                      </h3>

                      {/* Equipment Badges */}
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {client.primaryCategories.map((cat) => (
                          <span
                            key={cat}
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.5625rem',
                              color: 'var(--blue-medical)',
                              background: 'rgba(2, 132, 199, 0.08)',
                              border: '1px solid rgba(2, 132, 199, 0.2)',
                              padding: '2px 8px',
                              borderRadius: '3px',
                            }}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      style={{
                        paddingTop: '12px',
                        borderTop: '1px solid var(--gray-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: 'var(--blue-medical)',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                      }}
                      className="card-action-link"
                    >
                      <span>View Gallery & Equipment</span>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 4. SPLIT MODAL WITH IMAGE CAROUSEL & TEXT ──────────── */}
      {activeClient && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: 'rgba(15, 23, 42, 0.82)',
            backdropFilter: 'blur(12px)',
            animation: 'fadeIn 0.25s ease-out forwards',
          }}
          onClick={() => setActiveClient(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--white)',
              width: '100%',
              maxWidth: '1020px',
              maxHeight: '90vh',
              borderRadius: '16px',
              boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.45)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              position: 'relative',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveClient(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                background: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'var(--white)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            {/* LEFT COLUMN: IMAGE CAROUSEL */}
            <div style={{ height: '100%', minHeight: '380px', position: 'relative' }}>
              <ModalCarousel images={activeClient.images} clientName={activeClient.name} />
            </div>

            {/* RIGHT COLUMN: TEXT DETAILS BESIDE THE IMAGE */}
            <div
              style={{
                padding: '36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflowY: 'auto',
                maxHeight: '90vh',
                background: 'var(--white)',
              }}
            >
              <div>
                {/* Header Tag & Location */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.625rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--teal-accent)',
                      background: 'rgba(13, 148, 136, 0.08)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontWeight: 600,
                    }}
                  >
                    <Building2 size={12} /> {activeClient.facilityType}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    <MapPin size={14} color="var(--blue-medical)" /> {activeClient.location}
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)',
                    fontWeight: 800,
                    color: 'var(--navy)',
                    letterSpacing: '-0.02em',
                    marginBottom: '20px',
                    lineHeight: 1.25,
                  }}
                >
                  {activeClient.name}
                </h2>

                <div
                  style={{
                    borderBottom: '1px solid var(--gray-light)',
                    paddingBottom: '16px',
                    marginBottom: '24px',
                  }}
                >
                  <div className="section-label" style={{ color: 'var(--blue-medical)', marginBottom: '6px' }}>
                    Equipment & Maintenance Scope
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Radiology devices supplied, installed, or maintained by Nour Medical engineers:
                  </p>
                </div>

                {/* Device List Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  {activeClient.devices.map((dev: InstalledDevice, i: number) => (
                    <div
                      key={i}
                      style={{
                        background: 'var(--warm-white)',
                        border: '1px solid var(--gray-light)',
                        borderRadius: '8px',
                        padding: '16px 20px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.975rem', fontWeight: 700, color: 'var(--navy)' }}>
                          {dev.name}
                        </h4>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.5625rem',
                            color: 'var(--teal-accent)',
                            border: '1px solid var(--teal-accent)',
                            padding: '2px 8px',
                            borderRadius: '3px',
                            whiteSpace: 'nowrap',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontWeight: 600,
                          }}
                        >
                          <ShieldCheck size={10} /> {dev.status}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.8125rem', lineHeight: 1.5, color: 'var(--text-muted)', marginBottom: '10px' }}>
                        {dev.description}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--navy)', fontFamily: 'var(--font-mono)' }}>
                        <Wrench size={12} color="var(--blue-medical)" />
                        <span>Scope: {dev.serviceType}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div
                style={{
                  paddingTop: '20px',
                  borderTop: '1px solid var(--gray-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <button
                  onClick={() => setActiveClient(null)}
                  className="btn btn-outline"
                  style={{ padding: '8px 16px', fontSize: '0.8125rem' }}
                >
                  Close
                </button>
                <Link
                  to="/contact"
                  className="btn btn-blue"
                  style={{
                    padding: '8px 20px',
                    fontSize: '0.8125rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    borderRadius: '6px',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <span>Inquire Now</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for Animations and Card Hover Effects */}
      <style>{`
        .client-card-award:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px -8px rgba(15, 23, 42, 0.12);
          border-color: var(--blue-medical) !important;
        }
        .client-card-award:hover .card-thumb-img {
          transform: scale(1.06);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
};
