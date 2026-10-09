import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '../i18n';
import { ClientsPage } from './ClientsPage';

describe('ClientsPage Component', () => {
  it('renders ClientsPage with header, filter pills, and client facilities', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <MemoryRouter initialEntries={['/clients']}>
          <ClientsPage />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(html).toContain('Client Reference Portfolio');
    expect(html).toContain('Healthcare Facilities Powered &amp; Maintained by');
    expect(html).toContain('Nour Medical');
    expect(html).toContain('Search hospital or city...');
    expect(html).toContain('Cath-Lab');
  });
});
