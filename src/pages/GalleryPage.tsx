import React, { useState } from 'react';
import { PageTransition } from '../components/templates/PageTransition';
import { SectionHeading } from '../components/atoms/SectionHeading';
import { GALLERY_CATEGORIES, GALLERY_DATA } from '../data/galleryData';
import type { GalleryItem } from '../data/galleryData';
import { Play, X, MapPin, Calendar, ExternalLink, Image as ImageIcon, Video } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === activeCategory);

  return (
    <PageTransition>
      <div className="pt-32 pb-24 min-h-screen" style={{ background: 'var(--navy-dark)', color: 'var(--white)' }}>
        <div className="container">
          {/* Header */}
          <SectionHeading
            eyebrow="MEDIA & FIELD EXHIBITION HUB"
            title="Engineering Log & Photo Gallery"
            subtitle="Explore high-resolution records of heavy CT/MRI gantry rigging, Cath-Lab deployments, RSNA delegation, Japan technical facilities, and system walkthrough videos."
            theme="dark"
          />

          {/* Category Filter Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '48px',
          }}>
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  border: activeCategory === cat.id
                    ? '1px solid var(--teal-accent)'
                    : '1px solid rgba(255, 255, 255, 0.12)',
                  background: activeCategory === cat.id
                    ? 'rgba(0, 168, 181, 0.2)'
                    : 'rgba(255, 255, 255, 0.03)',
                  color: activeCategory === cat.id
                    ? 'var(--teal-accent)'
                    : 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {cat.id === 'videos' ? <Video size={14} /> : <ImageIcon size={14} />}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Media Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'rgba(0, 168, 181, 0.4)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Media Image Container */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '230px',
                  overflow: 'hidden',
                }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  {/* Overlay Gradient */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10, 22, 40, 0.9) 0%, transparent 60%)',
                  }} />

                  {/* Category Tag */}
                  <span style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    background: 'rgba(10, 22, 40, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--teal-accent)',
                  }}>
                    {item.categoryLabel}
                  </span>

                  {/* Video Play Icon Badge if item has video */}
                  {item.videoUrl && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: 'rgba(0, 168, 181, 0.85)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 24px rgba(0, 229, 255, 0.6)',
                    }}>
                      <Play size={22} color="#fff" style={{ marginLeft: '3px' }} />
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: 'var(--white)',
                    marginBottom: '10px',
                    lineHeight: 1.3,
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.65)',
                    marginBottom: '16px',
                    flex: 1,
                  }}>
                    {item.description}
                  </p>

                  {/* Meta Bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'rgba(255, 255, 255, 0.45)',
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={12} style={{ color: 'var(--teal-accent)' }} />
                      {item.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={12} />
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Lightbox for Image / Video */}
        {selectedItem && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(5, 12, 22, 0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
            onClick={() => setSelectedItem(null)}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '900px',
                background: 'rgba(10, 22, 40, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  zIndex: 10,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>

              {/* Media Container */}
              {selectedItem.videoUrl ? (
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                  <iframe
                    src={`${selectedItem.videoUrl}?autoplay=1`}
                    title={selectedItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                  />
                </div>
              ) : (
                <div style={{ width: '100%', maxHeight: '500px', overflow: 'hidden' }}>
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/* Info Container */}
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    background: 'rgba(0, 168, 181, 0.2)',
                    border: '1px solid var(--teal-accent)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--teal-accent)',
                    textTransform: 'uppercase',
                  }}>
                    {selectedItem.categoryLabel}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                    {selectedItem.location} · {selectedItem.date}
                  </span>
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--white)',
                  marginBottom: '12px',
                }}>
                  {selectedItem.title}
                </h2>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.75)',
                  marginBottom: '20px',
                }}>
                  {selectedItem.description}
                </p>

                <div style={{
                  padding: '16px 20px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--teal-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <ExternalLink size={14} />
                  <span>Technical Specs: {selectedItem.specs}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
