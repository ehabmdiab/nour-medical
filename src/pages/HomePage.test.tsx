import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, beforeAll } from 'vitest';
import { LanguageProvider } from '../i18n';
import { HomePage } from './HomePage';

describe('HomePage Component', () => {
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
    }
  });

  it('renders home page in english with hero and key sections', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <MemoryRouter initialEntries={['/']}>
          <HomePage />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(html).toContain('Advanced Healthcare Technology');
    expect(html).toContain('Explore Our Solutions');
    expect(html).toContain('About Nour Medical');
    expect(html).toContain('Radiology Devices');
    expect(html).toContain('Medical Equipment');
    expect(html).toContain('Hospital Furniture');
    expect(html).toContain('Maintenance');
    expect(html).toContain('Capital Care Hospital');
  });

  it('renders home page in arabic with localized content', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="ar">
        <MemoryRouter initialEntries={['/']}>
          <HomePage />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(html).toContain('تكنولوجيا الرعاية الصحية المتقدمة');
    expect(html).toContain('استكشف حلولنا وأجهزتنا');
    expect(html).toContain('عن نور الطبية');
    expect(html).toContain('أجهزة الأشعة والتصوير الطبي');
    expect(html).toContain('المعدات والأجهزة الطبية');
    expect(html).toContain('الأثاث الطبي للمستشفيات');
    expect(html).toContain('المستلزمات وقطع الغيار');
    expect(html).toContain('الصيانة والدعم الفني');
    expect(html).toContain('مستشفى كابيتال كير');
  });
});
