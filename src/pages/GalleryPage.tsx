import React, { useState, useEffect, useCallback } from 'react';
import { PageTransition } from '../components/templates/PageTransition';
import { SectionHeading } from '../components/atoms/SectionHeading';
import { GALLERY_CATEGORIES, GALLERY_DATA } from '../data/galleryData';
import type { GalleryItem } from '../data/galleryData';
import { GalleryCard } from '../components/molecules/GalleryCard';
import {
  X,
  ExternalLink,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_DATA
      : GALLERY_DATA.filter((item) => item.category === activeCategory);

  const handleSelectCard = (item: GalleryItem, initialIndex: number): void => {
    setSelectedItem(item);
    setModalImageIndex(initialIndex);
  };

  const modalImages = selectedItem
    ? selectedItem.images && selectedItem.images.length > 0
      ? selectedItem.images
      : [selectedItem.image]
    : [];

  const handleModalPrev = useCallback((): void => {
    if (modalImages.length <= 1) return;
    setModalImageIndex((prev) => (prev === 0 ? modalImages.length - 1 : prev - 1));
  }, [modalImages.length]);

  const handleModalNext = useCallback((): void => {
    if (modalImages.length <= 1) return;
    setModalImageIndex((prev) => (prev === modalImages.length - 1 ? 0 : prev + 1));
  }, [modalImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      } else if (e.key === 'ArrowLeft') {
        handleModalPrev();
      } else if (e.key === 'ArrowRight') {
        handleModalNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, handleModalPrev, handleModalNext]);

  const currentModalImage = modalImages[modalImageIndex] ?? selectedItem?.image;
  const currentModalDetail = selectedItem?.imageDetails?.[modalImageIndex];

  return (
    <PageTransition>
      {/* Page Header */}
      <section
        style={{
          background: 'var(--navy)',
          padding: '130px 0 70px',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Ambient Grid & Glow matching Hero Section */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '-5%',
            top: '0%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(27,79,216,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <SectionHeading
            eyebrow="MEDIA & FIELD EXHIBITION HUB"
            title="Engineering Log & Photo Gallery"
            subtitle="Explore high-resolution visual archives of dynamic digital radiography systems, hospital Cath-Lab installations, VIP clinical seminars, and factory-certified engineering operations."
            theme="dark"
          />
        </div>
      </section>

      <div
        style={{
          background: 'var(--white)',
          color: 'var(--text-body)',
          paddingTop: '60px',
          paddingBottom: '140px',
          minHeight: '80vh',
        }}
      >
        <div className="container">
          {/* Category Filter Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '64px',
            }}
          >
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? GALLERY_DATA.length
                  : GALLERY_DATA.filter((i) => i.category === cat.id).length;
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
                    background: isActive ? 'var(--navy)' : 'var(--white)',
                    color: isActive ? 'var(--white)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: isActive ? '0 4px 14px rgba(10, 22, 40, 0.15)' : 'none',
                  }}
                >
                  <ImageIcon size={14} />
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Media Grid of Topic Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '32px',
            }}
          >
            {filteredItems.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onSelect={(selected, initialIndex) => handleSelectCard(selected, initialIndex)}
              />
            ))}
          </div>
        </div>

        {/* Modal Lightbox for Image / Video (Enhanced Multi-Photo Viewer) */}
        {selectedItem && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(10, 22, 40, 0.82)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
            onClick={() => setSelectedItem(null)}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '960px',
                maxHeight: '90vh',
                background: 'var(--white)',
                border: '1px solid var(--gray-light)',
                borderRadius: '24px',
                overflowY: 'auto',
                boxShadow: '0 25px 60px rgba(10, 22, 40, 0.4)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                aria-label="Close modal"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  zIndex: 20,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(10, 22, 40, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                  transition: 'transform 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.background = 'var(--blue-medical)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = 'rgba(10, 22, 40, 0.85)';
                }}
              >
                <X size={20} />
              </button>

              {/* Media Container with Next / Prev Overlay */}
              {selectedItem.videoUrl ? (
                <div
                  style={{
                    position: 'relative',
                    paddingBottom: '56.25%',
                    height: 0,
                    overflow: 'hidden',
                    background: '#000',
                  }}
                >
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
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '480px',
                    overflow: 'hidden',
                    background: '#0a1628',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    key={currentModalImage}
                    src={currentModalImage}
                    alt={currentModalDetail?.caption || selectedItem.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      transition: 'opacity 0.25s ease',
                    }}
                  />

                  {/* Left Arrow Button in Modal */}
                  {modalImages.length > 1 && (
                    <button
                      type="button"
                      aria-label="Previous photo"
                      onClick={handleModalPrev}
                      style={{
                        position: 'absolute',
                        left: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        background: 'rgba(10, 22, 40, 0.8)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.4)',
                        transition: 'all 0.2s ease',
                        zIndex: 10,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--blue-medical)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(10, 22, 40, 0.8)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                      }}
                    >
                      <ChevronLeft size={24} />
                    </button>
                  )}

                  {/* Right Arrow Button in Modal */}
                  {modalImages.length > 1 && (
                    <button
                      type="button"
                      aria-label="Next photo"
                      onClick={handleModalNext}
                      style={{
                        position: 'absolute',
                        right: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        background: 'rgba(10, 22, 40, 0.8)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.4)',
                        transition: 'all 0.2s ease',
                        zIndex: 10,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--blue-medical)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(10, 22, 40, 0.8)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                      }}
                    >
                      <ChevronRight size={24} />
                    </button>
                  )}

                  {/* Photo Counter Pill inside Modal */}
                  {modalImages.length > 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '16px',
                        right: '20px',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        background: 'rgba(10, 22, 40, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#fff',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        zIndex: 10,
                      }}
                    >
                      <ImageIcon size={14} color="var(--teal-accent)" />
                      <span>
                        Photo {modalImageIndex + 1} of {modalImages.length}
                      </span>
                    </div>
                  )}

                  {/* Caption Overlay if available */}
                  {currentModalDetail?.caption && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '20px',
                        padding: '6px 14px',
                        borderRadius: '12px',
                        background: 'rgba(10, 22, 40, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: 'var(--teal-accent)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        maxWidth: '60%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        zIndex: 10,
                      }}
                    >
                      {currentModalDetail.caption}
                    </div>
                  )}
                </div>
              )}

              {/* Thumbnail Strip inside Modal */}
              {modalImages.length > 1 && (
                <div
                  style={{
                    padding: '12px 20px',
                    background: 'var(--navy)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    gap: '10px',
                    overflowX: 'auto',
                    scrollbarWidth: 'thin',
                  }}
                >
                  {modalImages.map((thumbSrc, idx) => {
                    const isCurrent = idx === modalImageIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        aria-label={`Select photo ${idx + 1}`}
                        onClick={() => setModalImageIndex(idx)}
                        style={{
                          flexShrink: 0,
                          width: '64px',
                          height: '48px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: isCurrent
                            ? '2px solid var(--teal-accent)'
                            : '2px solid rgba(255, 255, 255, 0.2)',
                          padding: 0,
                          background: 'transparent',
                          cursor: 'pointer',
                          opacity: isCurrent ? 1 : 0.6,
                          transform: isCurrent ? 'scale(1.05)' : 'scale(1)',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <img
                          src={thumbSrc}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Info Container */}
              <div style={{ padding: '32px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '14px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      background: 'var(--navy)',
                      color: 'var(--teal-accent)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    {selectedItem.categoryLabel}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <MapPin size={13} style={{ color: 'var(--teal-accent)' }} />
                    {selectedItem.location} · <Calendar size={13} /> {selectedItem.date}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: 'var(--navy)',
                    marginBottom: '12px',
                  }}
                >
                  {selectedItem.title}
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
                  {selectedItem.description}
                </p>

                <div
                  style={{
                    padding: '16px 20px',
                    background: 'var(--warm-white)',
                    borderRadius: '14px',
                    border: '1px solid var(--warm-neutral)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--navy)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
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
