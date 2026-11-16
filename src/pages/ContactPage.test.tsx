import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '../i18n';
import { ContactPage } from './ContactPage';

describe('ContactPage Component', () => {
  it('renders ContactPage with contact information and inquiry form', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <MemoryRouter initialEntries={['/contact']}>
          <ContactPage />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(html).toContain('Connect With Our Team');
    expect(html).toContain('Contact &amp; Headquarters');
    expect(html).toContain('Headquarters Address');
    expect(html).toContain('No. 30 Misr Helwan Agricultural St., Maadi, Cairo, Egypt');
    expect(html).toContain('mailto:marketing@nourmedical.com');
    expect(html).toContain('marketing@nourmedical.com');
    expect(html).toContain('Send an Inquiry');
    expect(html).toContain('Full Name');
    expect(html).not.toContain('Hospital Furniture');
  });

  it('renders ContactPage in Arabic with updated address and contact email', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="ar">
        <MemoryRouter initialEntries={['/contact']}>
          <ContactPage />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(html).toContain('رقم 30 شارع مصر حلوان الزراعي - المعادي - القاهرة');
    expect(html).toContain('mailto:marketing@nourmedical.com');
    expect(html).toContain('marketing@nourmedical.com');
    expect(html).not.toContain('الأثاث الطبي');
    expect(html).not.toContain('أثاث المستشفيات');
  });
});
