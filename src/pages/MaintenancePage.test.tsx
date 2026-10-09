import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '../i18n';
import { MaintenancePage } from './MaintenancePage';

describe('MaintenancePage Component', () => {
  it('renders MaintenancePage with commitments and sections', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <MemoryRouter initialEntries={['/maintenance']}>
          <MaintenancePage />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(html).toContain('Medical Equipment Maintenance &amp; Technical Services');
    expect(html).toContain('Engineering &amp; Maintenance Division');
    expect(html).toContain('UNIVERSAL MAINTENANCE SUPPORT');
    expect(html).toContain('Annual Maintenance Contracts');
  });
});
