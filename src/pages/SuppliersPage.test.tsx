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

    // Verify country order: USA -> China -> Taiwan, and China grouped under 02 without 04/05
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
  });

  it('exports PartnersPage identically', () => {
    expect(PartnersPage).toBe(SuppliersPage);
  });
});
