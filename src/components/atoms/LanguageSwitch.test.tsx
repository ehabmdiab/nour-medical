import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '../../i18n';
import { LanguageSwitch } from './LanguageSwitch';

describe('LanguageSwitch Component', () => {
  it('renders language switch in english mode with accessible buttons', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <LanguageSwitch />
      </LanguageProvider>
    );

    expect(html).toContain('EN');
    expect(html).toContain('العربية');
    expect(html).toContain('aria-checked="true"');
    expect(html).toContain('Switch to English');
    expect(html).toContain('role="group"');
  });

  it('renders language switch in arabic mode', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="ar">
        <LanguageSwitch size="md" />
      </LanguageProvider>
    );

    expect(html).toContain('EN');
    expect(html).toContain('العربية');
    expect(html).toContain('التبديل إلى العربية');
  });
});
