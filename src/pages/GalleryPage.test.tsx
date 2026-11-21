import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '../i18n';
import { GalleryPage } from './GalleryPage';

describe('GalleryPage Component', () => {
  it('renders GalleryPage with categories Team and Exhibitions in English', () => {
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
    expect(html).not.toContain('Hospital Events &amp; Celebrations');

    // Verify no standalone machine category exists
    expect(html).not.toContain('Radiology Systems &amp; Machines');

    // Verify responsive gallery card grid avoids fixed 360px track overflow on mobile
    expect(html).toContain('minmax(min(340px,100%),1fr)');
    expect(html).not.toContain('minmax(360px,1fr)');
  });

  it('renders GalleryPage with categories Team and Exhibitions in Arabic', () => {
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
    expect(html).not.toContain('الفعاليات والتسليمات');
  });
});
