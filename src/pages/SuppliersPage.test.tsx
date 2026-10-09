import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '../i18n';
import { SuppliersPage, PartnersPage } from './SuppliersPage';

describe('SuppliersPage Component', () => {
  it('renders SuppliersPage with header, supplier partners, and country badges', () => {
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
  });

  it('exports PartnersPage identically', () => {
    expect(PartnersPage).toBe(SuppliersPage);
  });
});
