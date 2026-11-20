import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '../i18n';
import { SuppliersPage, PartnersPage } from './SuppliersPage';

describe('SuppliersPage Component', () => {
  it('renders SuppliersPage with header, supplier partners, and company profile descriptions in English', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <MemoryRouter initialEntries={['/suppliers']}>
          <SuppliersPage />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(html).toContain('Global Supplier Network');
    expect(html).toContain('Global Technology.');
    expect(html).toContain('Local Expertise.');
    expect(html).toContain('Technology Suppliers');
    expect(html).toContain('leading provider of innovative products and reliable solutions in flat panel DR');
    expect(html).toContain('design and development of X-ray flat panel sensors');
    expect(html).toContain('manufacturer and service provider of integrated imaging products for medical diagnosis and treatment');

    // Verify country order MUST stay USA (01) -> China (02) -> Taiwan (03)
    const usaIndex = html.indexOf('Radmedix');
    const chinaIndex = html.indexOf('Suzhou Lonwin Medical Systems Co.');
    const taiwanIndex = html.indexOf('InnoCare Optoelectronics Corporation');
    expect(usaIndex).toBeLessThan(chinaIndex);
    expect(chinaIndex).toBeLessThan(taiwanIndex);
    expect(html).toContain('>01<');
    expect(html).toContain('>02<');
    expect(html).toContain('>03<');
    expect(html).not.toContain('>04<');
    expect(html).not.toContain('>05<');

    // Verify Lonwin SuperVan 1.5T device images and modal dialog structure
    expect(html).toContain('Featured Devices');
    expect(html).toContain('lonwin-supervan-15t-1.png');
    expect(html).toContain('lonwin-supervan-15t-2.png');
    expect(html).toContain('SuperVan 1.5T Superconducting MRI');
    expect(html).toContain('SuperVan 1.5T — MUSIC Coils &amp; Compressed Sensing');
    expect(html).toContain('Click image for details');
    expect(html).toContain('<dialog');

    // Verify overflowing image sets (Angel 8 devices, Radmedix 4 devices) render as carousels
    expect(html).toContain('aria-roledescription="carousel"');
    expect(html).toContain('aria-label="1 of 8"');
    expect(html).toContain('aria-label="8 of 8"');
    expect(html).toContain('aria-label="1 of 4"');
    expect(html).toContain('aria-label="4 of 4"');
    expect(html).toContain('angel-u-arm-dr.jpg');
    expect(html).toContain('angel-mammography.jpg');
    expect(html).toContain('angel-surgical-c-arm.jpg');
    expect(html).toContain('angel-mobile-dr.jpg');
    expect(html).toContain('angel-floor-dr.jpg');
    expect(html).toContain('angel-ceiling-dr.jpg');
    expect(html).toContain('angel-talent-ii-dr.jpg');
    expect(html).toContain('angel-wr-3d-system.jpg');
    expect(html).toContain('radmedix-acuity-dr.png');
    expect(html).toContain('radmedix-portable-xray.png');
    expect(html).toContain('radmedix-floor-dr-system.png');
    expect(html).toContain('radmedix-tablet-pacs.png');

    // Verify SinoVision Alpha CT 5-slide carousel
    expect(html).toContain('Sino Vision (SinoVision Medical Technology)');
    expect(html).not.toContain('Senno Vision');
    expect(html).toContain('aria-label="1 of 5"');
    expect(html).toContain('aria-label="5 of 5"');
    expect(html).toContain('sinovision-alpha-ct-system.jpg');
    expect(html).toContain('sinovision-alpha-ct-suite.png');
    expect(html).toContain('sinovision-alpha-ct-3d-vision.png');
    expect(html).toContain('sinovision-alpha-ct-large-bore.jpg');
    expect(html).toContain('sinovision-alpha-ct-simulation.jpg');
    expect(html).toContain('SinoVision Alpha CT 64-Slice Scanner');

    // Verify InnoCare 4-slide carousel
    expect(html).toContain('dr-innocare-taiwan-1.png');
    expect(html).toContain('dr-innocare-taiwan-2.png');
    expect(html).toContain('dr-innocare-taiwan-3.png');
    expect(html).toContain('dr-innocare-taiwan-4.png');
    expect(html).toContain('InnoCare Ultra-Slim Side-Profile Flat Panel Sensor');
    expect(html).toContain('InnoCare Multi-Application Wireless Flat Panel Sensor');

    expect(html).not.toContain('Previous slide');
    expect(html).not.toContain('Next slide');
    expect(html).toContain('Choose a slide');
  });

  it('renders SuppliersPage with localized Arabic company profile descriptions', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="ar">
        <MemoryRouter initialEntries={['/suppliers']}>
          <SuppliersPage />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(html).toContain('راد ميديكس (Radmedix)');
    expect(html).toContain('إينوكير للإلكترونيات الضوئية (InnoCare)');
    expect(html).toContain('سوتشو لون وين للأنظمة الطبية (Lonwin Medical)');
    expect(html).toContain('تصميم وتطوير مستشعرات الألواح المسطحة للأشعة السينية');
    expect(html).toContain('أجهزة ومعدات المورد');
    expect(html).toContain('جهاز الرنين المغناطيسي فائق التوصيل SuperVan 1.5T');
    expect(html).toContain('اضغط على الصورة للتفاصيل');
    expect(html).toContain('شريحة 1 من 8');
    expect(html).toContain('شريحة 1 من 4');
    expect(html).toContain('شريحة 1 من 5');
    expect(html).toContain('شريحة 5 من 5');
    expect(html).toContain('سينو فيجن (Sino Vision)');
    expect(html).not.toContain('Senno Vision');
    expect(html).toContain('جهاز الأشعة المقطعية SinoVision Alpha CT (٦٤ مقطعاً)');
    expect(html).toContain('التصميم الجانبي فائق النحافة لكاشف إينوكير المسطح');
    expect(html).toContain('مستشعر اللوح الرقمي اللاسلكي متعدد الاستخدامات من إينوكير');
    expect(html).not.toContain('الشريحة السابقة');
    expect(html).not.toContain('الشريحة التالية');
    expect(html).toContain('اختر شريحة');
  });

  it('exports PartnersPage identically', () => {
    expect(PartnersPage).toBe(SuppliersPage);
  });
});
