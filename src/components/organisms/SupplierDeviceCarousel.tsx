import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { SupplierDevice } from '../../data/companyData';
import { useLanguage } from '../../i18n';

export interface SupplierDeviceCardProps {
  device: SupplierDevice;
  supplierName: string;
  isAr: boolean;
  variant?: 'grid' | 'carousel';
  onSelect: (device: SupplierDevice, supplierName: string) => void;
}

export const SupplierDeviceCard: React.FC<SupplierDeviceCardProps> = ({
  device,
  supplierName,
  isAr,
  variant = 'grid',
  onSelect,
}) => {
  const { t } = useLanguage();
  const deviceName = isAr ? device.nameAr : device.name;
  const deviceCategory = isAr ? device.categoryAr : device.category;
  const deviceSummary = isAr ? device.shortDescriptionAr : device.shortDescription;

  if (variant === 'carousel') {
    return (
      <button
        type="button"
        onClick={() => onSelect(device, supplierName)}
        className="w-full flex flex-col sm:flex-row items-stretch group text-start bg-warm-white border border-gray-light rounded-md overflow-hidden transition-[border-color,box-shadow] duration-200 ease-out hover:border-navy/45 hover:shadow-[0_8px_20px_rgba(10,22,40,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy cursor-pointer"
      >
        <div className="h-60 sm:h-64 sm:w-[54%] shrink-0 bg-white flex items-center justify-center p-5 overflow-hidden border-b sm:border-b-0 sm:border-e border-gray-light/70">
          <img
            src={device.image}
            alt={deviceName}
            loading="eager"
            decoding="async"
            className="max-h-full max-w-full object-contain transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03]"
          />
        </div>
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-navy/70 mb-1.5">
              {deviceCategory}
            </p>
            <h4 className="font-heading text-lg md:text-xl font-bold text-navy leading-snug mb-2.5">
              {deviceName}
            </h4>
            <p className="font-body text-sm leading-[1.65] text-navy/85 line-clamp-3">
              {deviceSummary}
            </p>
          </div>
          <div>
            <span className="inline-block font-body text-xs font-semibold text-navy/80 border border-gray-light bg-white px-3.5 py-2 rounded-sm group-hover:border-navy/40 group-hover:text-navy transition-colors">
              {t('suppliers.clickToInspect')}
            </span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(device, supplierName)}
      className="w-full h-full flex flex-col justify-between group text-start bg-warm-white border border-gray-light rounded-md overflow-hidden transition-[border-color,box-shadow] duration-200 ease-out hover:border-navy/45 hover:shadow-[0_8px_20px_rgba(10,22,40,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy cursor-pointer"
    >
      <div className="h-52 w-full bg-white flex items-center justify-center p-4 overflow-hidden border-b border-gray-light/70">
        <img
          src={device.image}
          alt={deviceName}
          loading="lazy"
          className="max-h-full max-w-full object-contain transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-4 w-full flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-navy/70 mb-1 truncate">
            {deviceCategory}
          </p>
          <p className="font-heading text-base md:text-lg font-bold text-navy leading-snug line-clamp-2">
            {deviceName}
          </p>
        </div>
        <span className="shrink-0 font-body text-xs font-semibold text-navy/75 border border-gray-light bg-white px-3 py-1.5 rounded-sm group-hover:border-navy/40 group-hover:text-navy transition-colors">
          {t('suppliers.clickToInspect')}
        </span>
      </div>
    </button>
  );
};

export interface SupplierDeviceCarouselProps {
  supplierName: string;
  devices: SupplierDevice[];
  isAr: boolean;
  isPausedExternally?: boolean;
  onSelectDevice: (device: SupplierDevice, supplierName: string) => void;
}

const AUTO_ADVANCE_MS = 2200;
const SCROLL_SETTLE_DEBOUNCE_MS = 140;

function formatSlidePosition(index: number, total: number, isAr: boolean): string {
  return isAr ? `شريحة ${index + 1} من ${total}` : `${index + 1} of ${total}`;
}

export const SupplierDeviceCarousel: React.FC<SupplierDeviceCarouselProps> = ({
  supplierName,
  devices,
  isAr,
  isPausedExternally = false,
  onSelectDevice,
}) => {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocusWithin, setHasFocusWithin] = useState(false);

  const settledIndexRef = useRef(0);
  const pendingTargetRef = useRef<number | null>(null);
  const pendingStartScrollLeftRef = useRef<number | null>(null);
  const queuedStepRef = useRef<number | null>(null);
  const userInitiatedRef = useRef(false);
  const needsOverflowSkipRef = useRef(false);
  const scrollRafRef = useRef<number | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const unlockRafsRef = useRef<[number | null, number | null]>([null, null]);

  const slideCount = devices.length;
  const canLoop = slideCount >= 3;

  const getSlides = useCallback((): HTMLElement[] => {
    const track = trackRef.current;
    if (!track) return [];
    return Array.from(track.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement
    );
  }, []);

  const getVisualOrderedSlides = useCallback((): { el: HTMLElement; domIndex: number; rect: DOMRect }[] => {
    const slides = getSlides();
    const mapped = slides.map((el, domIndex) => ({
      el,
      domIndex,
      rect: el.getBoundingClientRect(),
    }));
    mapped.sort((a, b) => (isAr ? b.rect.left - a.rect.left : a.rect.left - b.rect.left));
    return mapped;
  }, [getSlides, isAr]);

  const findNearestSlideIndex = useCallback((): number => {
    const track = trackRef.current;
    const slides = getSlides();
    if (!track || slides.length === 0) return 0;

    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;
    let bestIndex = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    slides.forEach((slide, idx) => {
      const rect = slide.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const dist = Math.abs(center - trackCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = idx;
      }
    });

    return bestIndex;
  }, [getSlides]);

  const updateCurrentWithCompensation = useCallback(
    (nextValue: string | null, anchorIndex: number, skipOverflowLock: boolean) => {
      const track = trackRef.current;
      const slides = getSlides();
      const anchor = slides[anchorIndex];
      if (!track || !anchor) return;

      const beforeLeft = anchor.getBoundingClientRect().left;
      const prevSnap = track.style.scrollSnapType;
      const prevBehavior = track.style.scrollBehavior;

      track.style.scrollSnapType = 'none';
      track.style.scrollBehavior = 'auto';

      if (!skipOverflowLock) {
        track.style.overflowX = 'hidden';
      }

      if (nextValue === null) {
        track.style.removeProperty('--current');
      } else {
        track.style.setProperty('--current', nextValue);
      }

      const afterLeft = anchor.getBoundingClientRect().left;
      const delta = afterLeft - beforeLeft;
      if (Math.abs(delta) > 0.5) {
        track.scrollLeft += delta;
      }

      track.style.scrollSnapType = prevSnap;
      track.style.scrollBehavior = prevBehavior;

      if (!skipOverflowLock) {
        if (unlockRafsRef.current[0] !== null) cancelAnimationFrame(unlockRafsRef.current[0]);
        if (unlockRafsRef.current[1] !== null) cancelAnimationFrame(unlockRafsRef.current[1]);
        unlockRafsRef.current[0] = requestAnimationFrame(() => {
          unlockRafsRef.current[1] = requestAnimationFrame(() => {
            if (trackRef.current) {
              trackRef.current.style.overflowX = '';
            }
          });
        });
      }
    },
    [getSlides]
  );

  const scrollToSlideElement = useCallback((target: HTMLElement) => {
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const delta = targetRect.left + targetRect.width / 2 - (trackRect.left + trackRect.width / 2);

    const prefersReduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (typeof track.scrollBy === 'function') {
      track.scrollBy({
        left: delta,
        behavior: prefersReduced ? 'auto' : 'smooth',
      });
    } else {
      track.scrollLeft += delta;
    }
  }, []);

  const stepSlide = useCallback(
    (deltaSteps: number, fromUser: boolean) => {
      const track = trackRef.current;
      if (!track || slideCount === 0) return;

      const visual = getVisualOrderedSlides();
      if (visual.length === 0) return;

      // If markers temporarily released `--current` to DOM order, queue step for settle
      if (canLoop && !track.style.getPropertyValue('--current')) {
        if (fromUser) {
          queuedStepRef.current = deltaSteps;
          userInitiatedRef.current = true;
        }
        return;
      }

      const baseIndex =
        pendingTargetRef.current !== null ? pendingTargetRef.current : findNearestSlideIndex();
      const baseVisualPos = visual.findIndex((item) => item.domIndex === baseIndex);
      if (baseVisualPos === -1) return;

      let nextVisualPos = baseVisualPos + deltaSteps;
      if (!canLoop) {
        nextVisualPos = Math.max(0, Math.min(visual.length - 1, nextVisualPos));
      } else {
        nextVisualPos = (nextVisualPos + visual.length) % visual.length;
      }

      const targetItem = visual[nextVisualPos];
      if (!targetItem) return;

      if (fromUser) {
        userInitiatedRef.current = true;
      }
      pendingTargetRef.current = targetItem.domIndex;
      pendingStartScrollLeftRef.current = track.scrollLeft;
      setActiveIndex(targetItem.domIndex);
      scrollToSlideElement(targetItem.el);
    },
    [canLoop, findNearestSlideIndex, getVisualOrderedSlides, scrollToSlideElement, slideCount]
  );

  const goToMarkerSlide = useCallback(
    (targetDomIndex: number) => {
      const track = trackRef.current;
      const slides = getSlides();
      const target = slides[targetDomIndex];
      if (!track || !target) return;

      userInitiatedRef.current = true;
      const currentDomIndex = findNearestSlideIndex();
      if (canLoop && targetDomIndex !== currentDomIndex) {
        needsOverflowSkipRef.current = true;
        updateCurrentWithCompensation(null, currentDomIndex, true);
      }

      pendingTargetRef.current = targetDomIndex;
      pendingStartScrollLeftRef.current = track.scrollLeft;
      setActiveIndex(targetDomIndex);
      scrollToSlideElement(target);
    },
    [canLoop, findNearestSlideIndex, getSlides, scrollToSlideElement, updateCurrentWithCompensation]
  );

  // Initialize --children-count fallback and initial parking silently
  useEffect(() => {
    const track = trackRef.current;
    if (!track || slideCount === 0) return;

    if (typeof CSS === 'undefined' || !CSS.supports('order: sibling-count()')) {
      track.style.setProperty('--children-count', String(slideCount));
    }

    const unlockRafs = unlockRafsRef.current;

    if (canLoop) {
      updateCurrentWithCompensation('0', 0, false);
    }

    const slides = getSlides();
    const firstSlide = slides[0];
    if (firstSlide) {
      const prevBehavior = track.style.scrollBehavior;
      track.style.scrollBehavior = 'auto';
      const trackRect = track.getBoundingClientRect();
      const firstRect = firstSlide.getBoundingClientRect();
      const centerDelta =
        firstRect.left + firstRect.width / 2 - (trackRect.left + trackRect.width / 2);
      if (Math.abs(centerDelta) > 0.5) {
        track.scrollLeft += centerDelta;
      }
      track.style.scrollBehavior = prevBehavior;
    }

    return () => {
      if (unlockRafs[0] !== null) cancelAnimationFrame(unlockRafs[0]);
      if (unlockRafs[1] !== null) cancelAnimationFrame(unlockRafs[1]);
    };
  }, [canLoop, getSlides, slideCount, updateCurrentWithCompensation]);

  // Settle handler + rAF-throttled scroll tracking
  useEffect(() => {
    const track = trackRef.current;
    if (!track || slideCount === 0) return;

    const handleSettle = () => {
      const startPos = pendingStartScrollLeftRef.current;
      if (
        pendingTargetRef.current !== null &&
        startPos !== null &&
        Math.abs(track.scrollLeft - startPos) < 1
      ) {
        // Ignore earlier compensating settle when a newly requested scroll hasn't moved yet
        return;
      }

      const settledIndex = findNearestSlideIndex();
      pendingTargetRef.current = null;
      pendingStartScrollLeftRef.current = null;
      setActiveIndex(settledIndex);

      if (canLoop) {
        const currentProp = track.style.getPropertyValue('--current');
        if (currentProp !== String(settledIndex)) {
          const skipLock = needsOverflowSkipRef.current;
          needsOverflowSkipRef.current = false;
          updateCurrentWithCompensation(String(settledIndex), settledIndex, skipLock);
        }
      }

      if (settledIndex !== settledIndexRef.current) {
        settledIndexRef.current = settledIndex;
        if (userInitiatedRef.current) {
          setAnnouncement(
            isAr
              ? `الشريحة ${settledIndex + 1} من ${slideCount}`
              : `Slide ${settledIndex + 1} of ${slideCount}`
          );
        }
      }
      userInitiatedRef.current = false;

      if (queuedStepRef.current !== null) {
        const queued = queuedStepRef.current;
        queuedStepRef.current = null;
        stepSlide(queued, true);
      }
    };

    const supportsScrollEnd = typeof window !== 'undefined' && 'onscrollend' in window;

    const onScroll = () => {
      if (pendingTargetRef.current === null) {
        if (scrollRafRef.current === null) {
          scrollRafRef.current = requestAnimationFrame(() => {
            scrollRafRef.current = null;
            const nearest = findNearestSlideIndex();
            setActiveIndex((prev) => (prev === nearest ? prev : nearest));
          });
        }
      }

      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
      }
      fallbackTimerRef.current = window.setTimeout(() => {
        fallbackTimerRef.current = null;
        if (pendingTargetRef.current === null) {
          userInitiatedRef.current = true;
        }
        handleSettle();
      }, SCROLL_SETTLE_DEBOUNCE_MS);
    };

    const onScrollEnd = () => {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
      if (pendingTargetRef.current === null) {
        userInitiatedRef.current = true;
      }
      handleSettle();
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    if (supportsScrollEnd) {
      track.addEventListener('scrollend', onScrollEnd, { passive: true });
    }

    return () => {
      track.removeEventListener('scroll', onScroll);
      if (supportsScrollEnd) {
        track.removeEventListener('scrollend', onScrollEnd);
      }
      if (scrollRafRef.current !== null) cancelAnimationFrame(scrollRafRef.current);
      if (fallbackTimerRef.current !== null) window.clearTimeout(fallbackTimerRef.current);
    };
  }, [canLoop, findNearestSlideIndex, isAr, slideCount, stepSlide, updateCurrentWithCompensation]);

  // Continuous auto-advance ("moving carousel"), pausing on interaction & reduced motion
  useEffect(() => {
    if (slideCount < 2 || isHovered || hasFocusWithin || isPausedExternally) return;
    if (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      stepSlide(1, false);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [hasFocusWithin, isHovered, isPausedExternally, slideCount, stepSlide]);

  const handleTrackPointerDown = () => {
    userInitiatedRef.current = true;
    pendingTargetRef.current = null;
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${supplierName} — ${t('suppliers.devicesLabel')}`}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setHasFocusWithin(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setHasFocusWithin(false);
        }
      }}
    >
      {/* Scroll-snap horizontal track */}
      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label={t('suppliers.slidesLabel')}
        onPointerDown={handleTrackPointerDown}
        className="supplier-carousel-track py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        {devices.map((device, idx) => (
          <div
            key={device.id}
            role="group"
            aria-roledescription="slide"
            aria-label={formatSlidePosition(idx, slideCount, isAr)}
          >
            <SupplierDeviceCard
              device={device}
              supplierName={supplierName}
              isAr={isAr}
              variant="carousel"
              onSelect={onSelectDevice}
            />
          </div>
        ))}
      </div>

      {/* Visually hidden live status region */}
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      {/* Slide markers */}
      <nav
        aria-label={t('suppliers.chooseSlide')}
        className="mt-4 flex items-center justify-center gap-0.5 flex-wrap"
      >
        {devices.map((device, idx) => {
          const isCurrent = activeIndex === idx;
          const deviceName = isAr ? device.nameAr : device.name;

          return (
            <button
              key={device.id}
              type="button"
              onClick={(e) => {
                goToMarkerSlide(idx);
                if (e.detail > 0) {
                  e.currentTarget.blur();
                }
              }}
              aria-current={isCurrent ? 'true' : undefined}
              aria-label={
                isAr
                  ? `الانتقال إلى ${deviceName} (${idx + 1} من ${slideCount})`
                  : `Go to ${deviceName} (${idx + 1} of ${slideCount})`
              }
              className="p-2 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-navy rounded-full"
            >
              <span
                className={`block h-2.5 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'w-7 bg-navy ring-1 ring-navy/30'
                    : 'w-2.5 bg-navy/30 hover:bg-navy/55'
                }`}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
};
