import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '../../i18n';
import { Navbar } from './Navbar';

describe('Navbar Component', () => {
  it('renders navbar in english with navigation links and LanguageSwitch', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <MemoryRouter initialEntries={['/']}>
          <Navbar />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(html).toContain('Nour Medical');
    expect(html).toContain('About');
    expect(html).toContain('Products');
    expect(html).toContain('Services');
    expect(html).toContain('Get in Touch');
    // Language switch presence
    expect(html).toContain('aria-label="Language selection"');
    expect(html).toContain('EN');
    expect(html).toContain('العربية');
  });

  it('keeps "Nour Medical" in English even in Arabic mode and localizes navigation links', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="ar">
        <MemoryRouter initialEntries={['/']}>
          <Navbar />
        </MemoryRouter>
      </LanguageProvider>
    );

    // Nour Medical brand MUST stay in English
    expect(html).toContain('Nour Medical');
    // Navigation links localized to Arabic
    expect(html).toContain('من نحن');
    expect(html).toContain('المنتجات');
    expect(html).toContain('الخدمات');
    expect(html).toContain('تواصل معنا');
    expect(html).toContain('aria-label="Language selection"');
  });
});
