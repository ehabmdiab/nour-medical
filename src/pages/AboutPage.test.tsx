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

  it('renders AboutPage with Eng. Sayed Awad and Dr. Gehan without Dr. Gehan photo', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <MemoryRouter initialEntries={['/about']}>
          <AboutPage />
        </MemoryRouter>
      </LanguageProvider>
    );

    // Verify established 2015 is present without "established in 2015"
    expect(html).toContain('established 2015');
    expect(html).not.toContain('established in 2015');

    // Verify Eng. Sayed Awad portrait is present
    expect(html).toContain('Eng. Sayed Awad');
    expect(html).toContain('eng-sayed-awad.jpg');

    // Verify Dr. Gehan is present with title but without dr-gehan.jpg image
    expect(html).toContain('Dr. Gehan');
    expect(html).toContain('Medical Director &amp; Clinical Governance');
    expect(html).not.toContain('dr-gehan.jpg');
  });
});
