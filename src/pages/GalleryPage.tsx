import React, { useState, useEffect, useCallback } from 'react';
import { PageTransition } from '../components/templates/PageTransition';
import { SectionHeading } from '../components/atoms/SectionHeading';
import { GalleryCard } from '../components/molecules/GalleryCard';
import {
  GALLERY_CATEGORIES,
  GALLERY_DATA,
  type GalleryItem,
  type GalleryCategoryType,
} from '../data/galleryData';
import {
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../i18n';

export const GalleryPage: React.FC = () => {
  const { locale } = useLanguage();
  const isAr = locale === 'ar';
  const [activeCategory, setActiveCategory] = useState<GalleryCategoryType | 'all'>('all');
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
      <section className="bg-gradient-to-b from-white to-warm-white pt-36 pb-20 relative overflow-hidden border-b border-gray-light">
        {/* Ambient Subtle Medical Grid & Warm Accent Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,22,40,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,22,40,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute -right-[5%] top-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="container relative z-10">
          <SectionHeading
            eyebrow={isAr ? "توثيق الفعاليات والمعارض والعمل الميداني" : "MEDIA & EVENTS DOCUMENTATION"}
            title={isAr ? "سجل العمليات الميدانية ومعرض الصور" : "Field Operations & Photo Gallery"}
            subtitle={isAr ? "توثيق مصور لأعمال مهندسي الصيانة الطبية، المؤتمرات والمعارض العلمية، واحتفالات تسليم وتشغيل الأجهزة في المستشفيات المصرية." : "Explore authentic visual documentation of our biomedical engineering team, scientific conferences & exhibitions, and hospital installation celebrations across Egypt."}
            theme="light"
          />
        </div>
      </section>

      <div className="bg-white text-text-body pt-16 pb-32 min-h-[80vh]">
        <div className="container">
          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 mb-16">
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
                  className={`px-[22px] py-2.5 rounded-[30px] font-mono text-xs font-semibold tracking-wide uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'border-[1.5px] border-orange-accent bg-orange-accent text-white shadow-[0_4px_14px_rgba(10,22,40,0.15)]'
                      : 'border border-gray-light bg-white text-navy hover:border-orange-accent/40'
                  }`}
                >
                  <ImageIcon size={14} />
                  {isAr ? cat.labelAr : cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Media Grid of Topic Cards */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-8">
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
            className="fixed inset-0 z-[1000] bg-navy/80 backdrop-blur-md flex items-center justify-center p-5"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative w-full max-w-[960px] max-h-[90vh] bg-white border border-gray-light rounded-3xl overflow-y-auto shadow-[0_25px_60px_rgba(10,22,40,0.4)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-navy/85 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 hover:bg-blue-medical transition-all duration-200"
              >
                <X size={20} />
              </button>

              {/* Media Container with Next / Prev Overlay */}
              {selectedItem.videoUrl ? (
                <div className="relative pb-[56.25%] h-0 overflow-hidden bg-black">
                  <iframe
                    src={`${selectedItem.videoUrl}?autoplay=1`}
                    title={selectedItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full border-none"
                  />
                </div>
              ) : (
                <div className="relative w-full h-[480px] overflow-hidden bg-navy flex items-center justify-center">
                  <img
                    key={currentModalImage}
                    src={currentModalImage}
                    alt={currentModalDetail?.caption || selectedItem.title}
                    className="max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-300"
                  />

                  {/* Left Arrow Button in Modal */}
                  {modalImages.length > 1 && (
                    <button
                      type="button"
                      aria-label="Previous photo"
                      onClick={handleModalPrev}
                      className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-navy/80 backdrop-blur-md border border-white/25 text-white flex items-center justify-center cursor-pointer shadow-xl hover:bg-blue-medical hover:scale-110 transition-all duration-200 z-10"
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
                      className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-navy/80 backdrop-blur-md border border-white/25 text-white flex items-center justify-center cursor-pointer shadow-xl hover:bg-blue-medical hover:scale-110 transition-all duration-200 z-10"
                    >
                      <ChevronRight size={24} />
                    </button>
                  )}

                  {/* Photo Counter Pill inside Modal */}
                  {modalImages.length > 1 && (
                    <div className="absolute bottom-4 right-5 px-3.5 py-1.5 rounded-full bg-navy/85 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-semibold flex items-center gap-1.5 z-10">
                      <ImageIcon size={14} className="text-teal-accent" />
                      <span>
                        Photo {modalImageIndex + 1} of {modalImages.length}
                      </span>
                    </div>
                  )}

                  {/* Caption Overlay if available */}
                  {currentModalDetail?.caption && (
                    <div className="absolute bottom-4 left-5 px-3.5 py-1.5 rounded-xl bg-navy/85 backdrop-blur-md border border-white/15 text-teal-accent font-mono text-xs font-semibold max-w-[60%] truncate z-10">
                      {currentModalDetail.caption}
                    </div>
                  )}
                </div>
              )}

              {/* Thumbnail Strip inside Modal */}
              {modalImages.length > 1 && (
                <div className="px-5 py-3 bg-navy border-b border-white/10 flex gap-2.5 overflow-x-auto scrollbar-thin">
                  {modalImages.map((thumbSrc, idx) => {
                    const isCurrent = idx === modalImageIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        aria-label={`Select photo ${idx + 1}`}
                        onClick={() => setModalImageIndex(idx)}
                        className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden p-0 bg-transparent cursor-pointer transition-all duration-200 ${
                          isCurrent
                            ? 'border-2 border-teal-accent scale-105 opacity-100'
                            : 'border-2 border-white/20 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={thumbSrc}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Info Container */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-3.5 flex-wrap">
                  <span className="px-3 py-1 rounded-xl bg-navy text-teal-accent font-mono text-[0.6875rem] font-semibold uppercase">
                    {selectedItem.categoryLabel}
                  </span>
                  <span className="font-mono text-xs text-text-muted flex items-center gap-1.5">
                    <MapPin size={13} className="text-teal-accent" />
                    {selectedItem.location} · <Calendar size={13} /> {selectedItem.date}
                  </span>
                </div>

                <h2 className="font-heading text-[1.75rem] font-bold text-navy mb-3">
                  {selectedItem.title}
                </h2>

                <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted mb-6">
                  {selectedItem.description}
                </p>

                <div className="px-5 py-4 bg-warm-white rounded-[14px] border border-warm-neutral font-mono text-xs text-navy font-semibold flex items-center gap-2.5">
                  <ExternalLink size={15} className="text-teal-accent" />
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
