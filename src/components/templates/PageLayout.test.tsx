import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '../../i18n';
import { PageLayout } from './PageLayout';

describe('PageLayout Component', () => {
  it('renders layout wrapping children with Navbar and Footer', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <MemoryRouter initialEntries={['/']}>
          <PageLayout>
            <div data-testid="page-child">Test Content</div>
          </PageLayout>
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(html).toContain('Test Content');
    expect(html).toContain('Nour Medical');
  });
});
