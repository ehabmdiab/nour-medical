import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '../i18n';
import { ClientsPage } from './ClientsPage';
import { DETAILED_CLIENTS } from '../data/clientsData';

const diskClientImages = Object.keys(import.meta.glob('/public/images/clients/*/*'));

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

  it('includes all 20 curated Ok client folders and verifies every image exists on disk', () => {
    const expectedIds = [
      'capital-care',
      'elite-heart',
      'egypt-heart-center',
      'al-marwa',
      'al-tayseer',
      'golden-heart',
      'al-rayan',
      'aseel-hospital',
      'al-zahra-el-nokhba',
      'el-gouna',
      'el-salama',
      'al-safwa-6-october',
      'intl-rad-mri',
      'south-sinai',
      'el-assema',
      'thuraya-hospital',
      'jana-hospital',
      'police-hospital',
      'al-delta-hospital',
      'al-fouad-center',
    ];

    expect(DETAILED_CLIENTS).toHaveLength(20);
    expect(DETAILED_CLIENTS.map((c) => c.id)).toEqual(expectedIds);
    expect(diskClientImages).toHaveLength(95);

    let totalImages = 0;

    for (const client of DETAILED_CLIENTS) {
      expect(client.images.length).toBeGreaterThan(0);
      expect(client.nameAr).toBeTruthy();
      expect(client.locationAr).toBeTruthy();
      for (const imgUrl of client.images) {
        expect(imgUrl).toContain(`images/clients/${client.id}/`);
        const relPath = imgUrl.replace(/^\/nour-medical\/|^\//, '');
        expect(diskClientImages).toContain(`/public/${relPath}`);
        totalImages += 1;
      }
    }

    expect(totalImages).toBe(95);
  });

  it('renders all 20 client facility cards in both English and Arabic with accessible search input', () => {
    const htmlEn = renderToString(
      <LanguageProvider defaultLocale="en">
        <MemoryRouter initialEntries={['/clients']}>
          <ClientsPage />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(htmlEn).toContain('opacity-100');
    expect(htmlEn).not.toContain('opacity-0');
    expect(htmlEn).toContain('id="clients-search"');
    expect(htmlEn).toContain('group min-w-0 bg-white');
    expect(htmlEn).toContain('p-5 sm:p-6 flex-1');
    for (const client of DETAILED_CLIENTS) {
      expect(htmlEn).toContain(client.name.replace(/&/g, '&amp;'));
    }

    const htmlAr = renderToString(
      <LanguageProvider defaultLocale="ar">
        <MemoryRouter initialEntries={['/clients']}>
          <ClientsPage />
        </MemoryRouter>
      </LanguageProvider>
    );

    for (const client of DETAILED_CLIENTS) {
      if (client.nameAr) {
        expect(htmlAr).toContain(client.nameAr);
      }
    }
  });
});
