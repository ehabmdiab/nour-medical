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

  it('renders ProductsPage with all 5 core modalities and images while excluding Siemens/Philips labels in English', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <MemoryRouter initialEntries={['/products']}>
          <ProductsPage />
        </MemoryRouter>
      </LanguageProvider>
    );

    // 5 core modalities including Cath-Lab
    expect(html).toContain('MRI Systems');
    expect(html).toContain('CT Scanners');
    expect(html).toContain('X-Ray &amp; DR');
    expect(html).toContain('Cath-Lab');
    expect(html).toContain('C-Arm');

    // System overview section
    expect(html).toContain('System Overview:');
    expect(html).toContain('View Full Specifications &amp; Overview');

    // Authorized agency badges only
    expect(html).toContain('China — Lonwin');
    expect(html).toContain('China — Angel');
    expect(html).toContain('China — SinoVision');
    expect(html).toContain('USA — Radmedix');
    expect(html).toContain('Taiwan — InnoCare');

    // Siemens Germany & Philips Netherlands badges/labels must NOT appear
    expect(html).not.toContain('Germany — Siemens');
    expect(html).not.toContain('Netherlands — Philips');
    expect(html).not.toContain('USA — GE HealthCare');
    expect(html).not.toContain('China — Senno Vision');
    expect(html).not.toContain('Germany');
    expect(html).not.toContain('Netherlands');
    expect(html).not.toContain('🇩🇪');
    expect(html).not.toContain('🇳🇱');

    // All original hardware imagery preserved across all 5 products
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
    expect(html).not.toContain('siemens-artis-q-cathlab.jpg');
    expect(html).not.toContain('siemens-artis-zee-cathlab.jpg');
    expect(html).not.toContain('cath-lab-angiography.jpeg');
    expect(html).not.toContain('elite-heart-cathlab.jpg');
    expect(html).not.toContain('al-marwah-cathlab.jpeg');
    expect(html).not.toContain('al-zahraa-cathlab.jpeg');
    expect(html).toContain('angel-wr-3d-system.jpg');
    expect(html).toContain('angel-surgical-c-arm.jpg');
    expect(html).toContain('surgical-c-arm.jpeg');
    expect(html).toContain('dr-radmedix-usa.png');
    expect(html).not.toContain('radmedix-floor-dr-system.png');
    expect(html).not.toContain('radmedix-acuity-dr.png');
    expect(html).not.toContain('angel-ceiling-dr.jpg');
    expect(html).not.toContain('angel-floor-dr.jpg');
    expect(html).toContain('dr-innocare-taiwan-1.png');
    expect(html).toContain('dr-innocare-taiwan-2.png');
    expect(html).toContain('dr-innocare-taiwan-3.png');
    expect(html).toContain('dr-innocare-taiwan-4.png');

    // Ensure no capitalized brand text "Siemens" or "Philips" appears in visible text / alt attributes
    expect(html).not.toContain('Siemens');
    expect(html).not.toContain('Philips');

    // Mobile-safe specs layout: single column on narrow mobile & wrapped spec values
    expect(html).toContain('grid-cols-1 sm:grid-cols-2');
    expect(html).toContain('leading-snug break-words');
    expect(html).not.toContain('font-bold truncate');
  });

  it('renders ProductsPage with all 5 core modalities in Arabic without Siemens/Philips labels', () => {
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

    // Authorized Arabic supplier source badges
    expect(html).toContain('منظومة الأشعة السينية الرقمية المتكاملة (DR)');
    expect(html).toContain('أمريكا — Radmedix');
    expect(html).toContain('الصين — Lonwin');
    expect(html).toContain('الصين — Angel');
    expect(html).toContain('الصين — SinoVision');
    expect(html).toContain('تايوان — InnoCare');

    // Removed Siemens Germany & Philips Netherlands badges/names
    expect(html).not.toContain('ألمانيا — Siemens');
    expect(html).not.toContain('هولندا — Philips');
    expect(html).not.toContain('Siemens');
    expect(html).not.toContain('Philips');
    expect(html).not.toContain('سيمنز');
    expect(html).not.toContain('فيلبس');
    expect(html).not.toContain('فيليبس');
    expect(html).not.toContain('ألمانيا');
    expect(html).not.toContain('المانيا');
    expect(html).not.toContain('هولندا');
    expect(html).not.toContain('أمريكا — GE HealthCare');
    expect(html).not.toContain('الصين — Senno Vision');
  });
});
