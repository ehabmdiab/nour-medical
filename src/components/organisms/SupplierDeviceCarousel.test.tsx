import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SUPPLIER_PARTNERS } from '../../data/companyData';
import { LanguageProvider } from '../../i18n';
import { SupplierDeviceCard, SupplierDeviceCarousel } from './SupplierDeviceCarousel';

describe('SupplierDeviceCarousel Component', () => {
  const angelPartner = SUPPLIER_PARTNERS.find((p) => p.id === 'angel');
  const angelDevices = angelPartner?.devices ?? [];
  const sinoVisionPartner = SUPPLIER_PARTNERS.find((p) => p.id === 'sinovision');
  const sinoVisionDevices = sinoVisionPartner?.devices ?? [];

  it('renders an accessible carousel region with all 8 Angel devices and dot markers without arrow buttons', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <SupplierDeviceCarousel
          supplierName="Angel (Anjian Technology)"
          devices={angelDevices}
          isAr={false}
          onSelectDevice={() => {}}
        />
      </LanguageProvider>
    );

    expect(angelDevices).toHaveLength(8);
    expect(html).toContain('role="region"');
    expect(html).toContain('aria-roledescription="carousel"');
    expect(html).not.toContain('Previous slide');
    expect(html).not.toContain('Next slide');
    expect(html).toContain('supplier-carousel-track');
    expect(html).toContain('aria-roledescription="slide"');
    expect(html).toContain('aria-label="1 of 8"');
    expect(html).toContain('aria-label="8 of 8"');
    expect(html).toContain('aria-current="true"');
    expect(html).toContain('role="status" aria-live="polite"');
    expect(html).toContain('Choose a slide');
  });

  it('renders localized Arabic slide labels and dot navigation controls', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="ar">
        <SupplierDeviceCarousel
          supplierName="أنجيل (Anjian Technology)"
          devices={angelDevices}
          isAr
          onSelectDevice={() => {}}
        />
      </LanguageProvider>
    );

    expect(html).not.toContain('الشريحة السابقة');
    expect(html).not.toContain('الشريحة التالية');
    expect(html).toContain('شريحة 1 من 8');
    expect(html).toContain('شريحة 8 من 8');
    expect(html).toContain('اختر شريحة');
  });

  it('renders all 5 SinoVision Alpha CT devices with eager loading and crisp hover classes', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <SupplierDeviceCarousel
          supplierName="Sino Vision (SinoVision Medical Technology)"
          devices={sinoVisionDevices}
          isAr={false}
          onSelectDevice={() => {}}
        />
      </LanguageProvider>
    );

    expect(sinoVisionDevices).toHaveLength(5);
    expect(html).toContain('loading="eager"');
    expect(html).toContain('transition-[border-color,box-shadow]');
    expect(html).toContain('motion-safe:group-hover:scale-[1.03]');
    expect(html).toContain('aria-label="1 of 5"');
    expect(html).toContain('aria-label="5 of 5"');
    expect(html).toContain('Go to SinoVision Alpha CT 64-Slice Scanner (1 of 5)');
    expect(html).toContain('Go to Alpha CT 75 cm Bore &amp; Radiotherapy CT Simulation Table (5 of 5)');
  });

  it('uses crisp border/shadow hover transitions without shrink or pale opacity on carousel and grid device cards', () => {
    const firstDevice = sinoVisionDevices[0];
    expect(firstDevice).toBeDefined();
    if (!firstDevice) return;

    const carouselCardHtml = renderToString(
      <LanguageProvider defaultLocale="en">
        <SupplierDeviceCard
          device={firstDevice}
          supplierName="Sino Vision (SinoVision Medical Technology)"
          isAr={false}
          variant="carousel"
          onSelect={() => {}}
        />
      </LanguageProvider>
    );

    const gridCardHtml = renderToString(
      <LanguageProvider defaultLocale="en">
        <SupplierDeviceCard
          device={firstDevice}
          supplierName="Sino Vision (SinoVision Medical Technology)"
          isAr={false}
          variant="grid"
          onSelect={() => {}}
        />
      </LanguageProvider>
    );

    for (const cardHtml of [carouselCardHtml, gridCardHtml]) {
      expect(cardHtml).toContain('transition-[border-color,box-shadow]');
      expect(cardHtml).toContain('motion-safe:group-hover:scale-[1.03]');
      expect(cardHtml).not.toContain('transition-all');
      expect(cardHtml).not.toMatch(/hover:opacity-/);
      expect(cardHtml).not.toMatch(/hover:scale-\[0\./);
      expect(cardHtml).not.toMatch(/hover:scale-9/);
    }

    expect(gridCardHtml).toContain('flex-col items-start sm:flex-row');
  });
});

