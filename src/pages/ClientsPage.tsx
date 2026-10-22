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
  ArrowUpRight,
} from 'lucide-react';
import { ClientMarquee } from '../components/organisms/ClientMarquee';
import { DETAILED_CLIENTS } from '../data/clientsData';
import type { ClientFacility, InstalledDevice } from '../data/clientsData';
import { useLanguage } from '../i18n';

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
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = (): void => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (): void => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full min-h-[340px] bg-slate-900 flex items-center justify-center overflow-hidden">
      {/* Current Slide Image */}
      <img
        src={images[currentIndex]}
        alt={`${clientName} photo ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-opacity duration-300"
      />

      {/* Vignette Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/85 pointer-events-none" />

      {/* Slide Counter Badge */}
      <div className="absolute top-4 left-4 bg-slate-900/75 backdrop-blur-md text-white font-mono text-[0.6875rem] tracking-widest px-2.5 py-1 rounded border border-white/15">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Navigation Arrows (if more than 1 image) */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/65 backdrop-blur-md border border-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-900 hover:scale-110 transition-all duration-200"
            aria-label={t('clients.prevImage')}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/65 backdrop-blur-md border border-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-900 hover:scale-110 transition-all duration-200"
            aria-label={t('clients.nextImage')}
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 flex gap-1.5 z-[2]">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-[3px] border-0 cursor-pointer transition-all duration-300 ${
                  idx === currentIndex ? 'w-5 bg-blue-medical' : 'w-1.5 bg-white/40'
                }`}
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
  const { locale, t } = useLanguage();
  const isAr = locale === 'ar';
  const { ref: gridRef, visible: gridVisible } = useReveal();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeClient, setActiveClient] = useState<ClientFacility | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
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

  const categories = [
    { id: 'All', label: t('clients.catAll') },
    { id: 'Cath-Lab', label: t('clients.catCathLab') },
    { id: 'CT Scanner', label: t('clients.catCT') },
    { id: 'MRI', label: t('clients.catMRI') },
    { id: 'C-Arm', label: t('clients.catCArm') },
    { id: 'DR X-Ray', label: t('clients.catDR') },
  ];

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'Active Support': return t('clients.statusActive');
      case 'Full Service Contract': return t('clients.statusAMC');
      case 'Turnkey Installed': return t('clients.statusInstalled');
      default: return status;
    }
  };

  const getServiceTypeLabel = (serviceType: string): string => {
    switch (serviceType) {
      case 'Turnkey Supply & Installation': return t('clients.scopeTurnkey');
      case 'Preventive Maintenance (AMC)': return t('clients.scopePreventive');
      case 'Emergency Maintenance & Spare Parts': return t('clients.scopeEmergency');
      case 'Multi-Vendor Support': return t('clients.scopeMultiVendor');
      case 'Digital DR Retrofit': return t('clients.scopeRetrofit');
      default: return serviceType;
    }
  };

  const filteredClients = useMemo(() => {
    return DETAILED_CLIENTS.filter((client) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        client.primaryCategories.some((cat) => cat.toLowerCase().includes(selectedCategory.toLowerCase()));
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        client.name.toLowerCase().includes(q) ||
        Boolean(client.nameAr && client.nameAr.toLowerCase().includes(q)) ||
        client.location.toLowerCase().includes(q) ||
        Boolean(client.locationAr && client.locationAr.toLowerCase().includes(q)) ||
        client.facilityType.toLowerCase().includes(q) ||
        Boolean(client.facilityTypeAr && client.facilityTypeAr.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      {/* ── 1. HERO HEADER ────────────────── */}
      <section className="bg-gradient-to-b from-white to-warm-white pt-36 pb-20 text-navy relative overflow-hidden border-b border-gray-light z-[1]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,22,40,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,22,40,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute -right-[5%] top-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="container relative z-10">
          <div className="section-label">
            {t('clients.sectionLabel')}
          </div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-navy tracking-tight leading-[0.98] max-w-[920px] mb-6">
            {t('clients.heroTitle')}{' '}
            <span className="text-orange-accent">{t('clients.heroTitleHighlight')}</span>
          </h1>

          <p className="font-body text-xl md:text-2xl leading-[1.65] text-text-muted max-w-[720px]">
            {t('clients.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* ── 2. MARQUEE TICKER ───────────────────────────────── */}
      <ClientMarquee />

      {/* ── 3. FILTER TOOLBAR & MAIN CLIENT GRID ─────────────── */}
      <section
        ref={gridRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-warm-white transition-opacity duration-700 ease-out ${
          gridVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          {/* Minimal Filter & Search Bar */}
          <div className="mb-10 flex justify-between items-center flex-wrap gap-5">
            {/* Category Pills */}
            <div className="flex gap-2 flex-wrap items-center">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4.5 py-2 rounded-full font-heading text-[0.8125rem] cursor-pointer transition-all duration-200 ${
                      isActive
                        ? 'font-semibold text-white bg-navy border border-navy shadow-[0_4px_14px_rgba(15,23,42,0.15)]'
                        : 'font-medium text-navy bg-white border border-gray-light hover:border-navy/40'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[280px] flex-[0_1_340px]">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted rtl:left-auto rtl:right-4"
              />
              <input
                type="text"
                placeholder={t('clients.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 pl-11 pr-4 rtl:pl-4 rtl:pr-11 rounded-full border border-gray-light font-body text-base text-navy bg-white outline-none focus:border-blue-medical transition-colors duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 rtl:right-auto rtl:left-3.5 bg-transparent border-0 cursor-pointer text-text-muted hover:text-navy"
                  aria-label={t('clients.clearSearch')}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Client Grid */}
          {filteredClients.length === 0 ? (
            <div className="py-20 text-center text-text-muted font-body text-lg">
              {t('clients.noResults')}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.map((client) => {
                const displayName = isAr && client.nameAr ? client.nameAr : client.name;
                const displayLocation = isAr && client.locationAr ? client.locationAr : client.location;
                const displayFacilityType = isAr && client.facilityTypeAr ? client.facilityTypeAr : client.facilityType;

                return (
                  <div
                    key={client.id}
                    onClick={() => setActiveClient(client)}
                    className="group bg-white rounded-xl border border-gray-light overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:border-blue-medical hover:shadow-[0_12px_30px_rgba(0,51,102,0.08)] hover:-translate-y-1"
                  >
                    {/* Card Thumbnail Box with Count Indicator */}
                    <div className="relative h-[210px] w-full overflow-hidden bg-slate-900">
                      <img
                        src={client.images[0]}
                        alt={displayName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                      {/* Image Carousel Count Indicator */}
                      <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-slate-900/75 backdrop-blur-sm text-white font-mono text-[0.625rem] px-2 py-0.5 rounded border border-white/15">
                        📷 {t('clients.photoCount', { count: client.images.length })}
                      </div>

                      <div className="absolute bottom-3 left-4 rtl:left-auto rtl:right-4 flex items-center gap-1.5 text-white/90">
                        <MapPin size={14} className="text-teal-accent" />
                        <span className="font-mono text-xs">{displayLocation}</span>
                      </div>
                    </div>

                    {/* Card Info Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="font-mono text-[0.5625rem] tracking-wider uppercase text-teal-accent font-semibold mb-1.5">
                          {displayFacilityType}
                        </div>

                        <h3 className="font-heading text-xl font-bold text-navy tracking-tight mb-3 leading-snug">
                          {displayName}
                        </h3>

                        {/* Primary Installed Devices Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {client.devices.slice(0, 2).map((dev, i) => (
                            <span
                              key={i}
                              className="font-mono text-[0.6875rem] px-2.5 py-0.5 rounded bg-blue-medical/[0.08] text-blue-medical font-medium"
                            >
                              {(isAr && dev.nameAr ? dev.nameAr : dev.name).split('–')[0].trim()}
                            </span>
                          ))}
                          {client.devices.length > 2 && (
                            <span className="font-mono text-[0.6875rem] px-2 py-0.5 rounded bg-warm-neutral text-text-muted font-medium">
                              {t('clients.moreCount', { count: client.devices.length - 2 })}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Footer Row */}
                      <div className="pt-3 border-t border-gray-light flex items-center justify-between font-mono text-xs text-navy font-semibold">
                        <span className="flex items-center gap-1 text-blue-medical group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-200">
                          {t('clients.viewProfile')} <ChevronRight size={14} className="rtl:rotate-180" />
                        </span>
                        <ArrowUpRight size={16} className="text-text-muted group-hover:text-blue-medical transition-colors duration-200 rtl:rotate-[-90deg]" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── 4. DETAILED CLIENT MODAL (WITH CAROUSEL + DETAILS) ──────── */}
      {activeClient && (
        <div
          className="fixed inset-0 z-[1000] bg-navy/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
          onClick={() => setActiveClient(null)}
        >
          <div
            className="relative w-full max-w-[1080px] bg-white rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(15,23,42,0.5)] border border-gray-light grid grid-cols-1 md:grid-cols-[1.1fr_1fr] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveClient(null)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 bg-slate-900/70 backdrop-blur-md border border-white/20 text-white w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-900 hover:scale-110 transition-all duration-200"
              aria-label={t('common.close')}
            >
              <X size={18} />
            </button>

            {/* LEFT COLUMN: IMAGE CAROUSEL */}
            <div className="h-full min-h-[380px] relative">
              <ModalCarousel
                images={activeClient.images}
                clientName={isAr && activeClient.nameAr ? activeClient.nameAr : activeClient.name}
              />
            </div>

            {/* RIGHT COLUMN: TEXT DETAILS BESIDE THE IMAGE */}
            <div className="p-9 flex flex-col justify-between overflow-y-auto max-h-[90vh] bg-white">
              <div>
                {/* Header Tag & Location */}
                <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                  <span className="font-mono text-[0.625rem] tracking-widest uppercase text-teal-accent bg-teal-accent/[0.08] px-2.5 py-1 rounded inline-flex items-center gap-1.5 font-semibold">
                    <Building2 size={12} /> {isAr && activeClient.facilityTypeAr ? activeClient.facilityTypeAr : activeClient.facilityType}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[0.8125rem] text-text-muted">
                    <MapPin size={14} className="text-blue-medical" /> {isAr && activeClient.locationAr ? activeClient.locationAr : activeClient.location}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy tracking-tight mb-5 leading-snug">
                  {isAr && activeClient.nameAr ? activeClient.nameAr : activeClient.name}
                </h2>

                <div className="border-b border-gray-light pb-4 mb-6">
                  <div className="section-label text-blue-medical mb-1.5">
                    {t('clients.modalScopeTitle')}
                  </div>
                  <p className="text-base text-text-muted">
                    {t('clients.modalScopeDesc')}
                  </p>
                </div>

                {/* Device List Stack */}
                <div className="flex flex-col gap-4 mb-6">
                  {activeClient.devices.map((dev: InstalledDevice, i: number) => {
                    const devName = isAr && dev.nameAr ? dev.nameAr : dev.name;
                    const devDesc = isAr && dev.descriptionAr ? dev.descriptionAr : dev.description;
                    const devStatus = getStatusLabel(dev.status);
                    const devScope = getServiceTypeLabel(dev.serviceType);

                    return (
                      <div
                        key={i}
                        className="bg-warm-white border border-gray-light rounded-lg p-4 px-5"
                      >
                        <div className="flex justify-between items-start gap-2.5 mb-2">
                          <h4 className="font-heading text-[0.975rem] font-bold text-navy">
                            {devName}
                          </h4>
                          <span className="font-mono text-[0.5625rem] text-teal-accent border border-teal-accent px-2 py-0.5 rounded whitespace-nowrap inline-flex items-center gap-1 font-semibold">
                            <ShieldCheck size={10} /> {devStatus}
                          </span>
                        </div>

                        <p className="text-[0.8125rem] leading-normal text-text-muted mb-2.5">
                          {devDesc}
                        </p>

                        <div className="flex items-center gap-1.5 text-xs text-navy font-mono">
                          <Wrench size={12} className="text-blue-medical" />
                          <span>{t('clients.scopeLabel')} {devScope}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-5 border-t border-gray-light flex justify-between items-center gap-4">
                <button
                  onClick={() => setActiveClient(null)}
                  className="btn btn-outline py-2 px-4 text-[0.8125rem]"
                >
                  {t('common.close')}
                </button>
                <Link
                  to="/contact"
                  className="btn btn-primary py-2 px-5 text-[0.8125rem] inline-flex items-center gap-1.5 rounded-md font-semibold no-underline"
                >
                  <span>{t('clients.inquireNow')}</span>
                  <ChevronRight size={14} className="rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
