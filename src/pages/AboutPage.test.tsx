import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, beforeAll } from 'vitest';
import { LanguageProvider } from '../i18n';
import { AboutPage } from './AboutPage';

describe('AboutPage Component', () => {
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

  it('renders AboutPage with Eng. El Sayed Awad, Dr. Gehan Awad, and Eng. Ahmed Hafez without Dr. Gehan photo', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <MemoryRouter initialEntries={['/about']}>
          <AboutPage />
        </MemoryRouter>
      </LanguageProvider>
    );

    // Verify company profile Our Story text and header metadata
    expect(html).toContain('Nour Medical Company was established in 2015, and the Healthcare Sector is our core business.');
    expect(html).toContain('cradle-to-cradle life cycle');
    expect(html).toContain('USA, China, Taiwan among others.');
    expect(html).toContain('Est. 2015 · Maadi, Cairo, Egypt');

    // Verify Eng. El Sayed Awad portrait and title are present
    expect(html).toContain('Eng. El Sayed Awad');
    expect(html).toContain('Chairman &amp; CEO');
    expect(html).toContain('eng-sayed-awad.jpg');
    expect(html).toContain('text-sm sm:text-base');

    // Verify Dr. Gehan Awad is present with title but without dr-gehan.jpg image
    expect(html).toContain('Dr. Gehan Awad');
    expect(html).toContain('Director of Fin. &amp; Admin');
    expect(html).not.toContain('dr-gehan.jpg');
    expect(html).toContain('font-mono text-base text-navy');

    // Verify Eng. Ahmed Hafez is present with General Manager title and portrait
    expect(html).toContain('Eng. Ahmed Hafez');
    expect(html).toContain('General Manager');
    expect(html).toContain('eng-ahmed-hafez.jpg');

    // Verify team strip excludes mixed clients/friends photo (team-dsc00636.jpg) and keeps compact h-[180px] strip height with top-adjusted object-position
    expect(html).not.toContain('team-dsc00636.jpg');
    expect(html).toContain('h-[180px]');
    expect(html).toContain('object-[center_32%]');
    expect(html).toContain('object-[center_35%]');
    expect(html).toContain('team-dsc00614.jpg');
    expect(html).toContain('team-gathering-1.jpeg');
  });

  it('renders AboutPage executive titles in Arabic', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="ar">
        <MemoryRouter initialEntries={['/about']}>
          <AboutPage />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(html).toContain('م. السيد عوض');
    expect(html).toContain('رئيس مجلس الإدارة والرئيس التنفيذي');
    expect(html).toContain('د. جيهان عوض');
    expect(html).toContain('مدير الشؤون المالية والإدارية');
    expect(html).toContain('م. أحمد حافظ');
    expect(html).toContain('المدير العام');
    expect(html).toContain('تأسست ٢٠١٥ · المعادي، القاهرة، مصر');
  });
});
