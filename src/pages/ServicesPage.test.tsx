import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '../i18n';
import { ServicesPage } from './ServicesPage';

describe('ServicesPage Component', () => {
  it('renders ServicesPage with core sections and headers', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <MemoryRouter initialEntries={['/services']}>
          <ServicesPage />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(html).toContain('Healthcare Technology &amp; Services');
    expect(html).toContain('Core Capabilities &amp; Solutions');
    expect(html).toContain('Our Service Pillars');
    expect(html).toContain('Universal Multi-Vendor Maintenance');
    expect(html).toContain('Annual Maintenance Contracts (AMC)');
  });
});
