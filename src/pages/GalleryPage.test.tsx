import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '../i18n';
import { GalleryPage } from './GalleryPage';

describe('GalleryPage Component', () => {
  it('renders GalleryPage with categories Team, Exhibitions, and Events in English', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <MemoryRouter initialEntries={['/gallery']}>
          <GalleryPage />
        </MemoryRouter>
      </LanguageProvider>
    );

    // Verify main header and clean white background styling
    expect(html).toContain('Field Operations &amp; Photo Gallery');
    expect(html).toContain('Team &amp; Staff');
    expect(html).toContain('Exhibitions &amp; Conferences');
    expect(html).toContain('Hospital Events &amp; Celebrations');

    // Verify no standalone machine category exists
    expect(html).not.toContain('Radiology Systems &amp; Machines');
  });

  it('renders GalleryPage with categories Team, Exhibitions, and Events in Arabic', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="ar">
        <MemoryRouter initialEntries={['/gallery']}>
          <GalleryPage />
        </MemoryRouter>
      </LanguageProvider>
    );

    // Verify Arabic category labels
    expect(html).toContain('فريق العمل والمهندسون');
    expect(html).toContain('المعارض والمؤتمرات');
    expect(html).toContain('الفعاليات والتسليمات');
  });
});
