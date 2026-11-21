import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '../i18n';
import { ClientsPage } from './ClientsPage';
import { DETAILED_CLIENTS } from '../data/clientsData';

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

  it('includes El Gouna and Al-Tayseer hospital photos under Clients', () => {
    const elGouna = DETAILED_CLIENTS.find((c) => c.id === 'el-gouna');
    const alTayseer = DETAILED_CLIENTS.find((c) => c.id === 'al-tayseer');

    expect(elGouna).toBeDefined();
    expect(elGouna?.images.some((img) => img.includes('images/clients/el-gouna-team-work.jpg'))).toBe(true);

    expect(alTayseer).toBeDefined();
    expect(alTayseer?.images.some((img) => img.includes('images/clients/al-tayseer-team-work.jpg'))).toBe(true);
    expect(alTayseer?.images.some((img) => img.includes('images/clients/al-tayseer-ramadan-event.jpg'))).toBe(true);
  });

  it('renders all 18 client facility cards with visible grid classes and accessible search input', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <MemoryRouter initialEntries={['/clients']}>
          <ClientsPage />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(DETAILED_CLIENTS).toHaveLength(18);
    expect(html).toContain('opacity-100');
    expect(html).not.toContain('opacity-0');
    expect(html).toContain('id="clients-search"');
    for (const client of DETAILED_CLIENTS) {
      expect(html).toContain(client.name.replace(/&/g, '&amp;'));
    }
  });
});
