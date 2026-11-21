import { afterEach, describe, expect, it, vi } from 'vitest';
import { getInitialRevealState, observeReveal } from './useReveal';

interface ObserverRecord {
  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit | undefined;
  observed: Element[];
  disconnected: boolean;
}

function installMockIntersectionObserver(onConstruct?: () => void): ObserverRecord[] {
  const records: ObserverRecord[] = [];

  class MockObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string;
    readonly scrollMargin = '0px';
    readonly thresholds: ReadonlyArray<number>;
    private readonly record: ObserverRecord;

    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      onConstruct?.();
      this.rootMargin = options?.rootMargin ?? '0px';
      const rawThreshold = options?.threshold ?? 0;
      this.thresholds = Array.isArray(rawThreshold) ? rawThreshold : [rawThreshold];
      this.record = {
        callback,
        options,
        observed: [],
        disconnected: false,
      };
      records.push(this.record);
    }

    observe(target: Element): void {
      this.record.observed.push(target);
    }

    unobserve(): void {}

    disconnect(): void {
      this.record.disconnected = true;
    }

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  vi.stubGlobal('IntersectionObserver', MockObserver);
  return records;
}

describe('useReveal helpers', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('returns true for initial reveal state during SSR when window is undefined', () => {
    vi.stubGlobal('window', undefined);
    expect(getInitialRevealState()).toBe(true);
  });

  it('returns true when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('window', {
      matchMedia: () => ({ matches: false }),
    });
    vi.stubGlobal('IntersectionObserver', undefined);

    expect(getInitialRevealState()).toBe(true);
  });

  it('returns true when prefers-reduced-motion: reduce is active', () => {
    installMockIntersectionObserver();
    vi.stubGlobal('window', {
      matchMedia: (query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
      }),
    });

    expect(getInitialRevealState()).toBe(true);
  });

  it('returns false in a standard browser environment with IntersectionObserver and no reduced-motion', () => {
    installMockIntersectionObserver();
    vi.stubGlobal('window', {
      matchMedia: () => ({ matches: false }),
    });

    expect(getInitialRevealState()).toBe(false);
  });

  it('configures IntersectionObserver with threshold 0 and reveals an 8400px mobile section on 0.01 intersectionRatio', () => {
    const records = installMockIntersectionObserver();
    vi.stubGlobal('window', { innerHeight: 700 });

    const tallMobileSection = {
      getBoundingClientRect: () => ({
        top: 900,
        bottom: 9300,
        height: 8400,
        left: 0,
        right: 375,
        width: 375,
        x: 0,
        y: 900,
        toJSON: () => ({}),
      }),
    } as unknown as HTMLElement;

    const onReveal = vi.fn();
    const cleanup = observeReveal(tallMobileSection, onReveal);

    expect(records).toHaveLength(1);
    expect(records[0]?.options).toEqual({ threshold: 0, rootMargin: '0px' });
    expect(records[0]?.observed).toEqual([tallMobileSection]);
    expect(onReveal).not.toHaveBeenCalled();

    const entry = {
      isIntersecting: true,
      intersectionRatio: 0.01,
      target: tallMobileSection,
    } as unknown as IntersectionObserverEntry;

    records[0]?.callback([entry], {} as IntersectionObserver);

    expect(onReveal).toHaveBeenCalledTimes(1);
    expect(records[0]?.disconnected).toBe(true);

    cleanup();
  });

  it('reveals immediately without waiting for observer callbacks when the element already overlaps the viewport', () => {
    const constructorSpy = vi.fn();
    installMockIntersectionObserver(constructorSpy);
    vi.stubGlobal('window', { innerHeight: 700 });

    const aboveFoldGridSection = {
      getBoundingClientRect: () => ({
        top: 558,
        bottom: 8958,
        height: 8400,
        left: 0,
        right: 375,
        width: 375,
        x: 0,
        y: 558,
        toJSON: () => ({}),
      }),
    } as unknown as HTMLElement;

    const onReveal = vi.fn();
    const cleanup = observeReveal(aboveFoldGridSection, onReveal);

    expect(onReveal).toHaveBeenCalledTimes(1);
    expect(constructorSpy).not.toHaveBeenCalled();
    cleanup();
  });
});
