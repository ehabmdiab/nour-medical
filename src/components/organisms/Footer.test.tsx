import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '../../i18n';
import { Footer } from './Footer';

describe('Footer Component', () => {
  it('renders footer in english with branding and localized columns', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <MemoryRouter initialEntries={['/']}>
          <Footer />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(html).toContain('Nour Medical');
    expect(html).toContain('Healthcare Technology');
    expect(html).toContain('Company');
    expect(html).toContain('Solutions');
    expect(html).toContain('Support');
    expect(html).toContain('About Us');
    expect(html).toContain('All rights reserved');
    expect(html).toContain('Replay Intro');
  });

  it('renders footer in arabic mode with localized Arabic content', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="ar">
        <MemoryRouter initialEntries={['/']}>
          <Footer />
        </MemoryRouter>
      </LanguageProvider>
    );

    // Nour Medical brand remains English
    expect(html).toContain('Nour Medical');
    // Localized content in Arabic
    expect(html).toContain('الشركة');
    expect(html).toContain('الحلول والتجهيزات');
    expect(html).toContain('الدعم والخدمات');
    expect(html).toContain('من نحن');
    expect(html).toContain('جميع الحقوق محفوظة');
    expect(html).toContain('إعادة العرض التقديمي');
  });
});
