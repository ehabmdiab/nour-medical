import React, { useState } from 'react';
import type { GalleryItem } from '../../data/galleryData';
import { GALLERY_CATEGORIES } from '../../data/galleryData';
import { useLanguage } from '../../i18n';
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
  const { locale } = useLanguage();
  const isAr = locale === 'ar';
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const catObj = GALLERY_CATEGORIES.find((c) => c.id === item.category);
  const displayCategoryLabel = isAr && catObj?.labelAr ? catObj.labelAr : item.categoryLabel;
  const displayTitle = isAr && item.titleAr ? item.titleAr : item.title;
  const displayDesc = isAr && item.descriptionAr ? item.descriptionAr : item.description;
  const displayLocation = isAr && item.locationAr ? item.locationAr : item.location;

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
      className="group bg-white border border-warm-neutral rounded-[20px] overflow-hidden cursor-pointer transition-all duration-300 relative flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(10,22,40,0.12)] hover:border-blue-medical"
    >
      {/* Media Image Container with Carousel Controls */}
      <div className="relative w-full h-[250px] overflow-hidden bg-warm-white">
        <img
          key={currentImage}
          src={currentImage}
          alt={currentDetail?.caption || item.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle Dark Vignette / Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/50 pointer-events-none" />

        {/* Category Badge */}
        <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-xl bg-navy/85 backdrop-blur-sm border border-white/10 text-teal-accent font-mono text-[0.625rem] font-semibold tracking-wider uppercase shadow-md z-[2]">
          {displayCategoryLabel}
        </span>

        {/* Photo Count Pill Badge (when topic has multiple photos) */}
        {hasMultipleImages && (
          <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-xl bg-navy/80 backdrop-blur-sm border border-white/15 text-white font-mono text-[0.6875rem] font-semibold flex items-center gap-1.5 shadow-md z-[2]">
            <ImageIcon size={12} className="text-teal-accent" />
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
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-navy/75 backdrop-blur-md border border-white/25 text-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-medical hover:scale-110 transition-all duration-200 z-[4]"
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
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-navy/75 backdrop-blur-md border border-white/25 text-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-medical hover:scale-110 transition-all duration-200 z-[4]"
          >
            <ChevronRight size={19} />
          </button>
        )}

        {/* Video Play Badge if videoUrl */}
        {item.videoUrl && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-navy border-2 border-teal-accent flex items-center justify-center shadow-xl z-[2]">
            <Play size={24} className="text-teal-accent ml-0.5" />
          </div>
        )}

        {/* Dots or Progress Indicator for Multi-Image Cards */}
        {hasMultipleImages && images.length <= 8 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-0.5 rounded-xl bg-navy/65 backdrop-blur-sm z-[3]">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to photo ${idx + 1}`}
                onClick={(e) => handleDotClick(e, idx)}
                className={`h-[5px] rounded-[3px] p-0 border-0 cursor-pointer transition-all duration-200 ${idx === currentImageIndex ? 'w-4 bg-teal-accent' : 'w-1.5 bg-white/45'}`}
              />
            ))}
          </div>
        )}

        {/* Progress Bar for Cards with > 8 images */}
        {hasMultipleImages && images.length > 8 && (
          <div className="absolute bottom-0 left-0 right-0 h-[3.5px] bg-white/25 z-[3]">
            <div
              className="h-full bg-teal-accent transition-[width] duration-300 ease-out"
              style={{ width: `${((currentImageIndex + 1) / images.length) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Card Content Details */}
      <div className="p-6 pb-5 flex-1 flex flex-col">
        <h3 className="font-heading text-[1.4rem] font-bold text-navy mb-2 leading-tight">
          {displayTitle}
        </h3>

        {/* Current Image Caption Sub-label if specific */}
        {hasSpecificCaption && (
          <div className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-lg bg-blue-medical/[0.08] text-blue-medical font-mono text-xs font-semibold">
            <ImageIcon size={12} />
            <span className="truncate">{currentDetail.caption}</span>
          </div>
        )}

        <p className="font-body text-base leading-relaxed text-text-muted mb-5 flex-1 line-clamp-3">
          {displayDesc}
        </p>

        {/* Meta Bar */}
        <div className="flex items-center justify-between pt-3.5 border-t border-warm-neutral font-mono text-xs text-text-muted">
          <span className="flex items-center gap-1.5 truncate max-w-[65%]">
            <MapPin size={14} className="text-teal-accent shrink-0" />
            <span className="truncate">{displayLocation}</span>
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            <Calendar size={14} />
            {item.date}
          </span>
        </div>
      </div>
    </div>
  );
};
