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
    expect(html).toContain('Send an Inquiry');
    expect(html).toContain('Full Name');
  });
});
