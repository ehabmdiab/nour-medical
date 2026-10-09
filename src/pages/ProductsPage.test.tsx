import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, beforeAll } from 'vitest';
import { LanguageProvider } from '../i18n';
import { ProductsPage } from './ProductsPage';

describe('ProductsPage Component', () => {
  beforeAll(() => {
    class IntersectionObserverMock {
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    }

    if (typeof globalThis.IntersectionObserver === 'undefined') {
      globalThis.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;
    }
  });

  it('renders ProductsPage with all 5 core modalities in English', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <MemoryRouter initialEntries={['/products']}>
          <ProductsPage />
        </MemoryRouter>
      </LanguageProvider>
    );

    // 5 core modalities
    expect(html).toContain('MRI Systems');
    expect(html).toContain('CT Scanners');
    expect(html).toContain('X-Ray &amp; DR');
    expect(html).toContain('Cath-Lab');
    expect(html).toContain('C-Arm');

    // System overview section
    expect(html).toContain('System Overview:');
    expect(html).toContain('View Full Specifications &amp; Overview');
  });

  it('renders ProductsPage with all 5 core modalities in Arabic', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="ar">
        <MemoryRouter initialEntries={['/products']}>
          <ProductsPage />
        </MemoryRouter>
      </LanguageProvider>
    );

    // Arabic modalities
    expect(html).toContain('الرنين المغناطيسي');
    expect(html).toContain('الأشعة المقطعية');
    expect(html).toContain('الأشعة السينية والرقمية');
    expect(html).toContain('قسطرة القلب والأوعية');
    expect(html).toContain('أجهزة السي آرم والعمليات');

    // Arabic overview label
    expect(html).toContain('نبذة عن الجهاز:');
    expect(html).toContain('عرض النبذة والمواصفات الكاملة');
  });
});
