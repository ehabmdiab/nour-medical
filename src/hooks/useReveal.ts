import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export interface UseRevealOptions {
  /** IntersectionObserver rootMargin around the viewport. Defaults to `'0px'`. */
  rootMargin?: string;
}

/**
 * Determine initial visibility before mounting observers so SSR renders and
 * reduced-motion preferences never trap sections at `opacity: 0`.
 */
export function getInitialRevealState(): boolean {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return true;
  }

  if (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return true;
  }

  return false;
}

/**
 * Observe an element using `threshold: 0` so tall sections (such as single-column
 * mobile card grids) reveal as soon as any pixel enters the viewport.
 */
export function observeReveal(
  element: HTMLElement,
  onReveal: () => void,
  options: UseRevealOptions = {},
): () => void {
  const { rootMargin = '0px' } = options;

  if (typeof IntersectionObserver === 'undefined') {
    onReveal();
    return () => {};
  }

  if (
    rootMargin === '0px' &&
    typeof window !== 'undefined' &&
    typeof element.getBoundingClientRect === 'function'
  ) {
    const rect = element.getBoundingClientRect();
    if (rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0) {
      onReveal();
      return () => {};
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        onReveal();
        observer.disconnect();
      }
    },
    { threshold: 0, rootMargin },
  );

  observer.observe(element);
  return () => observer.disconnect();
}

/**
 * Scroll-reveal hook using `threshold: 0` and immediate viewport detection
 * so tall mobile sections never stay hidden below a percentage threshold.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options: UseRevealOptions = {},
): { ref: RefObject<T | null>; visible: boolean } {
  const { rootMargin = '0px' } = options;
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState<boolean>(getInitialRevealState);

  useEffect(() => {
    if (visible || !ref.current) return;
    return observeReveal(ref.current, () => setVisible(true), { rootMargin });
  }, [rootMargin, visible]);

  return { ref, visible };
}

