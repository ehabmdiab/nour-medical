import { renderToString } from 'react-dom/server';
import { describe, expect, it, beforeAll } from 'vitest';
import App from './App';

describe('App Component', () => {
  beforeAll(() => {
    class ResizeObserverMock {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    }

    if (typeof globalThis.ResizeObserver === 'undefined') {
      globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
    }

    if (typeof globalThis.window === 'undefined') {
      const win = {
        location: {
          origin: 'http://localhost',
          href: 'http://localhost/',
          search: '',
          pathname: '/',
          hash: '',
        },
        addEventListener: () => {},
        removeEventListener: () => {},
        scrollTo: () => {},
        ResizeObserver: ResizeObserverMock,
        history: {
          pushState: () => {},
          replaceState: () => {},
          go: () => {},
          back: () => {},
          forward: () => {},
          length: 1,
          state: null,
          scrollRestoration: 'auto',
        },
      } as unknown as Window & typeof globalThis;
      globalThis.window = win;
    } else {
      (globalThis.window as unknown as Record<string, unknown>).ResizeObserver = ResizeObserverMock;
      if (!globalThis.window.location || !globalThis.window.location.origin) {
        Object.assign(globalThis.window.location, {
          origin: 'http://localhost',
          href: 'http://localhost/',
          pathname: '/',
          search: '',
          hash: '',
        });
      }
      if (!globalThis.window.history) {
        globalThis.window.history = {
          pushState: () => {},
          replaceState: () => {},
          go: () => {},
          back: () => {},
          forward: () => {},
          length: 1,
          state: null,
          scrollRestoration: 'auto',
        } as unknown as History;
      }
    }

    if (typeof globalThis.document === 'undefined') {
      const docElement = { lang: 'en', dir: 'ltr' };
      globalThis.document = {
        defaultView: globalThis.window,
        documentElement: docElement,
        createElement: () => ({ setAttribute: () => {}, appendChild: () => {} }),
        getElementsByTagName: () => [],
        head: {},
        body: { style: {} },
      } as unknown as Document;
    } else if (!globalThis.document.defaultView) {
      globalThis.document = Object.assign(globalThis.document, {
        defaultView: globalThis.window,
      });
    }

    if (typeof globalThis.sessionStorage === 'undefined') {
      const store = new Map<string, string>();
      globalThis.sessionStorage = {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => {
          store.set(k, v);
        },
        removeItem: (k: string) => {
          store.delete(k);
        },
        clear: () => {
          store.clear();
        },
        key: (_index: number) => null,
        length: store.size,
      };
    }
  });

  it('renders application with LanguageProvider integration without errors', () => {
    const html = renderToString(<App />);
    expect(html).toBeDefined();
    expect(html.length).toBeGreaterThan(0);
  });
});
