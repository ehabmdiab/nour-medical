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

    // Supplier sources & imagery across all 5 products matching actual hardware
    expect(html).toContain('China — Lonwin');
    expect(html).not.toContain('USA — GE HealthCare');
    expect(html).toContain('Germany — Siemens');
    expect(html).toContain('China — Angel');
    expect(html).toContain('China — SinoVision');
    expect(html).toContain('Netherlands — Philips');
    expect(html).toContain('USA — Radmedix');
    expect(html).toContain('Taiwan — InnoCare');
    expect(html).not.toContain('China — Senno Vision');
    expect(html).toContain('lonwin-supervan-15t-1.png');
    expect(html).toContain('lonwin-supervan-15t-2.png');
    expect(html).not.toContain('lonwin-copernicus-128-ct.jpg');
    expect(html).toContain('sinovision-alphact-378-64-ct.jpg');
    expect(html).toContain('sinovision-alphact-518-128-ct.jpg');
    expect(html).toContain('sinovision-alphact-868-256-ct.jpg');
    expect(html).toContain('siemens-somatom-go-top-128-ct.jpg');
    expect(html).toContain('philips-incisive-ct.jpg');
    expect(html).not.toContain('al-rayan-vct.jpeg');
    expect(html).not.toContain('diagnostic-ct-scanner.jpg');
    expect(html).toContain('philips-azurion-5-cathlab.jpg');
    expect(html).toContain('philips-azurion-7-biplane-cathlab.jpg');
    expect(html).toContain('philips-azurion-flexarm-cathlab.jpg');
    expect(html).toContain('siemens-artis-icono-ceiling-cathlab.jpg');
    expect(html).toContain('siemens-artis-q-cathlab.jpg');
    expect(html).toContain('siemens-artis-zee-cathlab.jpg');
    expect(html).not.toContain('cath-lab-angiography.jpeg');
    expect(html).not.toContain('elite-heart-cathlab.jpg');
    expect(html).not.toContain('al-marwah-cathlab.jpeg');
    expect(html).not.toContain('al-zahraa-cathlab.jpeg');
    expect(html).toContain('angel-wr-3d-system.jpg');
    expect(html).toContain('angel-surgical-c-arm.jpg');
    expect(html).toContain('dr-radmedix-usa.png');
    expect(html).not.toContain('radmedix-floor-dr-system.png');
    expect(html).not.toContain('radmedix-acuity-dr.png');
    expect(html).not.toContain('angel-ceiling-dr.jpg');
    expect(html).not.toContain('angel-floor-dr.jpg');
    expect(html).toContain('dr-innocare-taiwan-1.png');
    expect(html).toContain('dr-innocare-taiwan-2.png');
    expect(html).toContain('dr-innocare-taiwan-3.png');
    expect(html).toContain('dr-innocare-taiwan-4.png');
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

    // Arabic supplier source badges & galleries
    expect(html).toContain('منظومة الأشعة السينية الرقمية المتكاملة (DR)');
    expect(html).toContain('أمريكا — Radmedix');
    expect(html).not.toContain('أمريكا — GE HealthCare');
    expect(html).toContain('ألمانيا — Siemens');
    expect(html).toContain('هولندا — Philips');
    expect(html).toContain('الصين — Lonwin');
    expect(html).toContain('الصين — Angel');
    expect(html).toContain('الصين — SinoVision');
    expect(html).toContain('تايوان — InnoCare');
    expect(html).not.toContain('الصين — Senno Vision');
  });
});
