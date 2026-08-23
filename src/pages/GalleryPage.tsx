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
      <div style={{
        background: 'var(--white)',
        color: 'var(--text-body)',
        paddingTop: '120px',
        paddingBottom: '140px',
        minHeight: '100vh',
      }}>
        <div className="container">
          {/* Header */}
          <div style={{ marginBottom: '60px' }}>
            <SectionHeading
              eyebrow="MEDIA & FIELD EXHIBITION HUB"
              title="Engineering Log & Photo Gallery"
              subtitle="Explore high-resolution records of heavy CT/MRI gantry rigging, Cath-Lab deployments, RSNA delegation, Japan technical facilities, and system walkthrough videos."
            />
          </div>

          {/* Category Filter Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '64px',
          }}>
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '30px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    border: isActive
                      ? '1.5px solid var(--navy)'
                      : '1px solid var(--gray-light)',
                    background: isActive
                      ? 'var(--navy)'
                      : 'var(--white)',
                    color: isActive
                      ? 'var(--white)'
                      : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: isActive ? '0 4px 14px rgba(10, 22, 40, 0.15)' : 'none',
                  }}
                >
                  {cat.id === 'videos' ? <Video size={14} /> : <ImageIcon size={14} />}
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Media Grid with Generous Spacing */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '32px',
          }}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--warm-neutral)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'var(--blue-medical)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(10, 22, 40, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--warm-neutral)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Media Image Container */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '240px',
                  overflow: 'hidden',
                  background: 'var(--warm-white)',
                }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                    }}
                  />
                  {/* Category Badge */}
                  <span style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    padding: '5px 12px',
                    borderRadius: '12px',
                    background: 'var(--navy)',
                    color: 'var(--teal-accent)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
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
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'var(--navy)',
                      border: '2px solid var(--teal-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 24px rgba(10, 22, 40, 0.35)',
                    }}>
                      <Play size={24} color="var(--teal-accent)" style={{ marginLeft: '3px' }} />
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--navy)',
                    marginBottom: '12px',
                    lineHeight: 1.3,
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    lineHeight: 1.65,
                    color: 'var(--text-muted)',
                    marginBottom: '24px',
                    flex: 1,
                  }}>
                    {item.description}
                  </p>

                  {/* Meta Bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--warm-neutral)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} style={{ color: 'var(--teal-accent)' }} />
                      {item.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} />
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Lightbox for Image / Video (High-contrast Popup) */}
        {selectedItem && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(10, 22, 40, 0.75)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
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
                maxWidth: '860px',
                background: 'var(--white)',
                border: '1px solid var(--gray-light)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(10, 22, 40, 0.3)',
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
                  background: 'var(--navy)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
              >
                <X size={20} />
              </button>

              {/* Media Container */}
              {selectedItem.videoUrl ? (
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', background: '#000' }}>
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
                <div style={{ width: '100%', maxHeight: '460px', overflow: 'hidden', background: 'var(--warm-white)' }}>
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
                    background: 'var(--navy)',
                    color: 'var(--teal-accent)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}>
                    {selectedItem.categoryLabel}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {selectedItem.location} · {selectedItem.date}
                  </span>
                </div>

                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.625rem',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  marginBottom: '12px',
                }}>
                  {selectedItem.title}
                </h2>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--text-muted)',
                  marginBottom: '20px',
                }}>
                  {selectedItem.description}
                </p>

                <div style={{
                  padding: '16px 20px',
                  background: 'var(--warm-white)',
                  borderRadius: '12px',
                  border: '1px solid var(--warm-neutral)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--navy)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <ExternalLink size={15} style={{ color: 'var(--teal-accent)' }} />
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
