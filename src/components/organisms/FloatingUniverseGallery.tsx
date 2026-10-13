import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useLanguage } from '../../i18n';
import {
  Pause,
  Play,
  Grid,
  Sparkles,
  X,
  ChevronRight,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  RotateCcw,
} from 'lucide-react';
import {
  FLOATING_GALLERY_DATA,
  GALLERY_CATEGORIES_FILTER,
} from '../../data/floatingGalleryData';
import type {
  FloatingGalleryItem,
  GalleryCategory,
} from '../../data/floatingGalleryData';
import './FloatingUniverseGallery.css';

interface PhysicsParticle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  rotSpeed: number;
  phase: number;
  scale: number;
  depth: number;
  isHovered: boolean;
  element: HTMLDivElement | null;
}

export const FloatingUniverseGallery: React.FC = () => {
  const { locale, t } = useLanguage();
  const isAr = locale === 'ar';

  const getCategoryLabel = (id: GalleryCategory): string => {
    switch (id) {
      case "all": return t("home.archiveFilterAll");
      case "radiology": return t("home.archiveFilterRadiology");
      case "installations": return t("home.archiveFilterInstallations");
      case "doctors": return t("home.archiveFilterDoctors");
      case "team": return t("home.archiveFilterTeam");
      case "nour": return t("home.archiveFilterNour");
      default: return id;
    }
  };
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [viewMode, setViewMode] = useState<'universe' | 'grid'>('universe');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<FloatingGalleryItem | null>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Map<string, PhysicsParticle>>(new Map());
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);

  // Check user OS reduced motion setting
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent): void => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Filter dataset items
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return FLOATING_GALLERY_DATA;
    return FLOATING_GALLERY_DATA.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Seed initial 2D spatial positions deterministically with organized wave spacing
  const initParticles = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width > 200 ? rect.width : 1200;
    const height = rect.height > 200 ? rect.height : 780;

    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;

    const newMap = new Map<PhysicsParticle['id'], PhysicsParticle>();

    // Structured multi-lane grid composition for an organized spatial aesthetic
    const count = filteredItems.length;
    const cols = isMobile ? 3 : isTablet ? 4 : Math.max(5, Math.ceil(Math.sqrt(count * 1.5)));
    const rows = Math.ceil(count / cols);
    
    const marginX = isMobile ? 12 : isTablet ? 35 : 70;
    const marginY = isMobile ? 20 : isTablet ? 40 : 60;
    const cellWidth = (width - marginX * 2) / cols;
    const cellHeight = (height - marginY - 20) / rows;

    filteredItems.forEach((item, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);

      // Deterministic slight offset per item to avoid strict rigid alignment while keeping order
      const seedX = (Math.sin(index * 123.45) + 1) / 2;
      const seedY = (Math.cos(index * 678.90) + 1) / 2;

      // Stagger odd rows horizontally for organic balance
      const rowStagger = (row % 2 === 1) ? cellWidth * 0.2 : 0;
      const baseX = marginX + col * cellWidth + rowStagger + (seedX - 0.5) * (cellWidth * 0.15);
      const baseY = marginY + row * cellHeight + (seedY - 0.5) * (cellHeight * 0.15);

      // Ultra-slow, serene zero-gravity drift velocity
      const speedMult = item.depthLayer === 1 ? 0.03 : item.depthLayer === 2 ? 0.05 : 0.07;
      const dirX = Math.cos(index * 1.5) > 0 ? 1 : -1;
      const dirY = Math.sin(index * 1.9) > 0 ? 1 : -1;

      const existing = particlesRef.current.get(item.id);
      const domEl = existing?.element || containerRef.current?.querySelector<HTMLDivElement>(`[data-particle-id="${item.id}"]`) || null;

      const minXBound = isMobile ? 10 : 30;
      const maxXOffset = isMobile ? 110 : 200;
      const minYBound = isMobile ? 15 : 40;
      const maxYOffset = isMobile ? 100 : 170;

      const particle: PhysicsParticle = {
        id: item.id,
        x: Math.max(minXBound, Math.min(width - maxXOffset, baseX)),
        y: Math.max(minYBound, Math.min(height - maxYOffset, baseY)),
        vx: dirX * (0.03 + seedX * 0.04) * speedMult,
        vy: dirY * (0.02 + seedY * 0.03) * speedMult,
        rot: (seedX - 0.5) * 6, // Subtle tilt (-3deg to +3deg)
        rotSpeed: (seedY - 0.5) * 0.008,
        phase: seedX * Math.PI * 2,
        scale: isMobile
          ? (item.depthLayer === 1 ? 0.7 : item.depthLayer === 2 ? 0.85 : 0.95)
          : (item.depthLayer === 1 ? 0.8 : item.depthLayer === 2 ? 0.95 : 1.05),
        depth: item.depthLayer,
        isHovered: false,
        element: domEl,
      };

      newMap.set(item.id, particle);
    });

    particlesRef.current = newMap;
  }, [filteredItems]);

  // Main 60FPS RAF Physics Loop
  useEffect(() => {
    if (viewMode !== 'universe') {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      particlesRef.current.forEach((p) => {
        p.element = null;
      });
      return;
    }
    initParticles();

    const rafId = requestAnimationFrame(() => {
      initParticles();
    });

    let lastTime = performance.now();

    const animate = (time: number): void => {
      const delta = Math.min(32, time - lastTime);
      lastTime = time;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width || 1200;
        const height = rect.height || 780;

        particlesRef.current.forEach((particle) => {
          if (!particle.element && containerRef.current) {
            particle.element = containerRef.current.querySelector<HTMLDivElement>(`[data-particle-id="${particle.id}"]`);
          }
          if (!particle.element) return;

          if (particle.isHovered) {
            // Mouse magnetic tilt effect
            const mouseX = mousePosRef.current.x - (rect.left + particle.x + 120);
            const mouseY = mousePosRef.current.y - (rect.top + particle.y + 90);
            const tiltX = (mouseY / 200) * -8;
            const tiltY = (mouseX / 200) * 8;
            const scaleHover = particle.scale * 1.65;

            particle.element.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 80px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${particle.rot * 0.2}deg) scale(${scaleHover})`;
          } else if (isPlaying && !reducedMotion) {
            // Update zero-gravity floating trajectory
            particle.phase += 0.015 * (delta / 16);
            particle.x += (particle.vx + Math.sin(particle.phase) * 0.1) * (delta / 16);
            particle.y += (particle.vy + Math.cos(particle.phase * 0.8) * 0.08) * (delta / 16);
            particle.rot += particle.rotSpeed * (delta / 16);

            // Boundary wrapping
            const cardWidth = particle.scale * 240;
            const cardHeight = particle.scale * 180;

            if (particle.x < -cardWidth * 0.5) particle.x = width - cardWidth * 0.5;
            if (particle.x > width - cardWidth * 0.5) particle.x = -cardWidth * 0.5;
            if (particle.y < -cardHeight * 0.5) particle.y = height - cardHeight * 0.5;
            if (particle.y > height - cardHeight * 0.5) particle.y = -cardHeight * 0.5;

            particle.element.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0px) rotate(${particle.rot}deg) scale(${particle.scale})`;
          } else {
            // Static positioning when paused or reduced motion
            particle.element.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0px) rotate(${particle.rot}deg) scale(${particle.scale})`;
          }
        });
      }

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [viewMode, isPlaying, reducedMotion, initParticles]);

  // Track global mouse position for magnetic tilt
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    mousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  // Hover handlers for individual item
  const handleItemMouseEnter = (id: string): void => {
    setHoveredId(id);
    const p = particlesRef.current.get(id);
    if (p) p.isHovered = true;
  };

  const handleItemMouseLeave = (id: string): void => {
    setHoveredId(null);
    const p = particlesRef.current.get(id);
    if (p) p.isHovered = false;
  };

  const handleItemClick = (item: FloatingGalleryItem): void => {
    setSelectedItem(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, item: FloatingGalleryItem): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedItem(item);
    }
  };

  return (
    <section
      className="floating-universe-section relative w-full min-h-[920px] bg-warm-white text-navy overflow-hidden select-none font-body py-20 md:py-28 lg:py-32 border-t border-gray-light/60"
      id="floating-gallery"
      aria-label="Interactive Medical Imaging Universe"
    >
      {/* Ambient Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,22,40,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,22,40,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute top-[8%] left-[12%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(27,79,216,0.07)_0%,transparent_70%)] pointer-events-none blur-[60px]" />
      <div className="absolute bottom-[5%] right-[8%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.05)_0%,transparent_70%)] pointer-events-none blur-[60px]" />

      {/* Header & Luxury Control Bar */}
      <div className="relative z-50 max-w-[1440px] mx-auto px-6 lg:px-8 mb-8 md:mb-10">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="max-w-3xl">
            <div className="section-label mb-3">
              {t('home.archiveLabel')}
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-navy tracking-tight mb-4">
              {t('home.archiveTitle')}
            </h2>
            <p className="font-body text-text-muted text-base md:text-lg leading-relaxed">
              {t('home.archiveSubtitle')}
            </p>
          </div>

          {/* Controls Bar */}
          <div className="inline-flex items-center justify-between gap-2 sm:gap-3 bg-white/95 backdrop-blur-md border border-gray-light/80 shadow-[0_4px_20px_rgba(10,22,40,0.06)] rounded-full p-1.5 max-w-full sm:max-w-fit">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto py-0.5 px-1 scrollbar-none flex-1 sm:flex-initial">
              {GALLERY_CATEGORIES_FILTER.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-blue-medical text-white shadow-[0_2px_10px_rgba(27,79,216,0.35)]'
                        : 'text-text-muted hover:text-navy hover:bg-slate-100'
                    }`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {getCategoryLabel(cat.id)}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5 shrink-0 pl-1 border-l border-gray-light/60 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-1">
              {/* Reset Layout */}
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-navy hover:bg-slate-100 transition-all cursor-pointer"
                title={t('home.archiveReset')}
                onClick={initParticles}
                aria-label={t('home.archiveReset')}
              >
                <RotateCcw size={15} />
              </button>

              {/* Pause / Play Drift */}
              <button
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  !isPlaying
                    ? 'bg-blue-medical text-white shadow-sm'
                    : 'text-text-muted hover:text-navy hover:bg-slate-100'
                }`}
                title={isPlaying ? t('home.archivePause') : t('home.archiveResume')}
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? t('home.archivePause') : t('home.archiveResume')}
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} />}
              </button>

              {/* View Mode Toggle */}
              <button
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-blue-medical text-white shadow-sm'
                    : 'text-text-muted hover:text-navy hover:bg-slate-100'
                }`}
                title={viewMode === 'universe' ? t('home.archiveGrid') : t('home.archiveUniverse')}
                onClick={() => setViewMode(viewMode === 'universe' ? 'grid' : 'universe')}
                aria-label={viewMode === 'universe' ? t('home.archiveGrid') : t('home.archiveUniverse')}
              >
                {viewMode === 'universe' ? <Grid size={15} /> : <Sparkles size={15} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2D UNIVERSE SPATIAL CANVAS */}
      {viewMode === 'universe' ? (
        <div
          ref={containerRef}
          className={`floating-universe-canvas ${hoveredId ? 'has-hovered' : ''}`}
          onMouseMove={handleCanvasMouseMove}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              data-particle-id={item.id}
              ref={(el) => {
                const p = particlesRef.current.get(item.id);
                if (p) p.element = el;
              }}
              tabIndex={0}
              role="button"
              aria-label={`${item.title} - ${item.categoryLabel}`}
              className={`floating-item-wrapper ${hoveredId === item.id ? 'is-hovered' : ''}`}
              data-depth={item.depthLayer}
              onMouseEnter={() => handleItemMouseEnter(item.id)}
              onMouseLeave={() => handleItemMouseLeave(item.id)}
              onClick={() => handleItemClick(item)}
              onKeyDown={(e) => handleKeyDown(e, item)}
            >
              <div
                className={`floating-photo-card size-${item.size} aspect-${item.aspectRatio.replace('/', '-')}`}
              >
                <div className="floating-photo-img-container">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="floating-photo-img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* CLEAN GRID ARCHIVE VIEW */
        <div className="floating-universe-grid-container">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="grid-mode-card"
              onClick={() => handleItemClick(item)}
            >
              <div className="grid-mode-img-wrapper">
                <img src={item.imageUrl} alt={item.title} className="grid-mode-img" loading="lazy" />
              </div>
              <div className="grid-mode-info">
                <span className="grid-mode-tag">
                  {getCategoryLabel(item.category)}
                </span>
                <h4 className="grid-mode-title">{isAr && item.titleAr ? item.titleAr : item.title}</h4>
                <p className="grid-mode-specs">{(isAr && item.specsAr ? item.specsAr : item.specs) || (isAr && item.locationAr ? item.locationAr : item.location)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIGHTBOX MODAL DETAIL OVERLAY */}
      {selectedItem && (
        <div className="floating-universe-lightbox" onClick={() => setSelectedItem(null)}>
          <div className="floating-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="floating-lightbox-close"
              onClick={() => setSelectedItem(null)}
              aria-label={t('common.close')}
            >
              <X size={20} />
            </button>

            {/* Left Image View */}
            <div className="relative w-full min-h-[380px] bg-slate-50">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Information Details */}
            <div className="p-9 flex flex-col justify-center">
              <div className="floating-universe-label mb-3">
                <span className="floating-universe-label-dot" />
                {getCategoryLabel(selectedItem.category)}
              </div>

              <h3 className="font-heading text-2xl md:text-[1.625rem] font-bold text-navy leading-tight mb-4">
                {isAr && selectedItem.titleAr ? selectedItem.titleAr : selectedItem.title}
              </h3>

              <div className="flex flex-col gap-3 my-4 mb-6">
                <div className="flex items-center gap-2.5 text-slate-600 text-sm">
                  <Building2 size={16} className="text-teal-accent" />
                  <span><strong>{t('home.archiveModalLocation')}</strong> {selectedItem.location || t('home.archiveFleet')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600 text-sm">
                  <Calendar size={16} className="text-teal-accent" />
                  <span><strong>{t('home.archiveModalYear')}</strong> {selectedItem.year}</span>
                </div>
                {selectedItem.supplier && (
                  <div className="flex items-center gap-2.5 text-slate-600 text-sm">
                    <ShieldCheck size={16} className="text-teal-accent" />
                    <span><strong>{t('home.archiveModalSupplier')}</strong> {selectedItem.supplier}</span>
                  </div>
                )}
                {selectedItem.specs && (
                  <div className="flex items-center gap-2.5 text-slate-600 text-sm">
                    <Layers size={16} className="text-teal-accent" />
                    <span><strong>{t('home.archiveModalSpecs')}</strong> {selectedItem.specs}</span>
                  </div>
                )}
              </div>

              <button
                className="btn btn-blue inline-flex items-center gap-2 self-start"
                onClick={() => {
                  setSelectedItem(null);
                  const contactEl = document.getElementById('contact');
                  if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('home.archiveModalInquire')}
                <ChevronRight size={16} className="rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
