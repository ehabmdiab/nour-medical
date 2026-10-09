import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ClientMarquee } from './ClientMarquee';
import { LanguageProvider } from '../../i18n';

describe('ClientMarquee Component', () => {
  it('renders marquee with client names in English', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <ClientMarquee />
      </LanguageProvider>
    );
    expect(html).toContain('marquee-container');
    expect(html).toContain('marquee-track');
    expect(html).toContain('Capital Care Hospital');
  });

  it('renders marquee with localized client names in Arabic', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="ar">
        <ClientMarquee />
      </LanguageProvider>
    );
    expect(html).toContain('marquee-container');
    expect(html).toContain('مستشفى كابيتال كير');
    expect(html).toContain('مستشفى جنوب سيناء');
  });
});
