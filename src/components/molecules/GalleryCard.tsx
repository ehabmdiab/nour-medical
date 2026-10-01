import React, { useState } from 'react';
import type { GalleryItem } from '../../data/galleryData';
import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Play,
} from 'lucide-react';

interface GalleryCardProps {
  item: GalleryItem;
  onSelect: (item: GalleryItem, initialIndex: number) => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ item, onSelect }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const images = item.images && item.images.length > 0 ? item.images : [item.image];
  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentImageIndex] ?? item.image;
  const currentDetail = item.imageDetails?.[currentImageIndex];
  const hasSpecificCaption =
    currentDetail?.caption &&
    currentDetail.caption !== item.title &&
    !currentDetail.caption.includes(item.title);

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent<HTMLButtonElement>, index: number): void => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <div
      onClick={() => onSelect(item, currentImageIndex)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'var(--white)',
        border: '1px solid var(--warm-neutral)',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isHovered
          ? '0 20px 40px rgba(10, 22, 40, 0.12)'
          : '0 4px 20px rgba(0, 0, 0, 0.04)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        borderColor: isHovered ? 'var(--blue-medical)' : 'var(--warm-neutral)',
      }}
    >
      {/* Media Image Container with Carousel Controls */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '250px',
          overflow: 'hidden',
          background: 'var(--warm-white)',
        }}
      >
        <img
          key={currentImage}
          src={currentImage}
          alt={currentDetail?.caption || item.title}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s ease, opacity 0.35s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        {/* Subtle Dark Vignette / Gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(10, 22, 40, 0.4) 0%, transparent 40%, transparent 60%, rgba(10, 22, 40, 0.5) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Category Badge */}
        <span
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            padding: '5px 12px',
            borderRadius: '12px',
            background: 'rgba(10, 22, 40, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: 'var(--teal-accent)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            zIndex: 2,
          }}
        >
          {item.categoryLabel}
        </span>

        {/* Photo Count Pill Badge (when topic has multiple photos) */}
        {hasMultipleImages && (
          <div
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              padding: '5px 10px',
              borderRadius: '12px',
              background: 'rgba(10, 22, 40, 0.82)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
              zIndex: 2,
            }}
          >
            <ImageIcon size={12} color="var(--teal-accent)" />
            <span>
              {currentImageIndex + 1} / {images.length}
            </span>
          </div>
        )}

        {/* Left Arrow Button */}
        {hasMultipleImages && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(10, 22, 40, 0.75)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 4,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--blue-medical)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(10, 22, 40, 0.75)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronLeft size={19} />
          </button>
        )}

        {/* Right Arrow Button */}
        {hasMultipleImages && (
          <button
            type="button"
            aria-label="Next image"
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(10, 22, 40, 0.75)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 4,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--blue-medical)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(10, 22, 40, 0.75)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronRight size={19} />
          </button>
        )}

        {/* Video Play Badge if videoUrl */}
        {item.videoUrl && (
          <div
            style={{
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
              zIndex: 2,
            }}
          >
            <Play size={24} color="var(--teal-accent)" style={{ marginLeft: '3px' }} />
          </div>
        )}

        {/* Dots or Progress Indicator for Multi-Image Cards */}
        {hasMultipleImages && images.length <= 8 && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 8px',
              borderRadius: '12px',
              background: 'rgba(10, 22, 40, 0.65)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              zIndex: 3,
            }}
          >
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to photo ${idx + 1}`}
                onClick={(e) => handleDotClick(e, idx)}
                style={{
                  width: idx === currentImageIndex ? '16px' : '6px',
                  height: '5px',
                  borderRadius: '3px',
                  background:
                    idx === currentImageIndex ? 'var(--teal-accent)' : 'rgba(255, 255, 255, 0.45)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              />
            ))}
          </div>
        )}

        {/* Progress Bar for Cards with > 8 images */}
        {hasMultipleImages && images.length > 8 && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3.5px',
              background: 'rgba(255, 255, 255, 0.25)',
              zIndex: 3,
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${((currentImageIndex + 1) / images.length) * 100}%`,
                background: 'var(--teal-accent)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        )}
      </div>

      {/* Card Content Details */}
      <div style={{ padding: '24px 26px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--navy)',
            marginBottom: '8px',
            lineHeight: 1.3,
          }}
        >
          {item.title}
        </h3>

        {/* Current Image Caption Sub-label if specific */}
        {hasSpecificCaption && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '12px',
              padding: '4px 10px',
              borderRadius: '8px',
              background: 'rgba(27, 79, 216, 0.08)',
              color: 'var(--blue-medical)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            <ImageIcon size={12} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentDetail.caption}
            </span>
          </div>
        )}

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            marginBottom: '20px',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.description}
        </p>

        {/* Meta Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '14px',
            borderTop: '1px solid var(--warm-neutral)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '65%',
            }}
          >
            <MapPin size={14} style={{ color: 'var(--teal-accent)', flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.location}</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <Calendar size={14} />
            {item.date}
          </span>
        </div>
      </div>
    </div>
  );
};
