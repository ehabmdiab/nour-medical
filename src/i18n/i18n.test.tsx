import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FormattedMessage, createIntl, createIntlCache } from 'react-intl';
import { LanguageProvider } from './LanguageProvider';
import { useLanguage } from './context';
import type { TranslationKey } from './types';
import enMessages from '../locales/en.json';
import arMessages from '../locales/ar.json';

const ConsumerComponent: React.FC = () => {
  const { locale, dir, isRtl, t } = useLanguage();

  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="dir">{dir}</span>
      <span data-testid="isRtl">{String(isRtl)}</span>
      <span data-testid="company">{t('common.companyName')}</span>
      <span data-testid="formatted">
        <FormattedMessage id="common.contactUs" />
      </span>
    </div>
  );
};

describe('Locale Dictionaries Integrity', () => {
  it('en.json and ar.json have identical keys', () => {
    const enKeys = Object.keys(enMessages).sort();
    const arKeys = Object.keys(arMessages).sort();

    expect(enKeys).toEqual(arKeys);
    expect(enKeys.length).toBeGreaterThan(150);
  });

  it('no translation values are empty', () => {
    for (const [key, val] of Object.entries(enMessages)) {
      expect(val.trim(), `Empty en key: ${key}`).not.toBe('');
    }
    for (const [key, val] of Object.entries(arMessages)) {
      expect(val.trim(), `Empty ar key: ${key}`).not.toBe('');
    }
  });

  it('formats all message keys via react-intl createIntl without errors', () => {
    const cache = createIntlCache();
    const intlEn = createIntl({ locale: 'en', messages: enMessages }, cache);
    const intlAr = createIntl({ locale: 'ar', messages: arMessages }, cache);

    const testValues = { count: 5, year: 2026 };

    for (const key of Object.keys(enMessages) as TranslationKey[]) {
      const formattedEn = intlEn.formatMessage({ id: key }, testValues);
      const formattedAr = intlAr.formatMessage({ id: key }, testValues);

      expect(typeof formattedEn).toBe('string');
      expect(typeof formattedAr).toBe('string');
      expect(formattedEn.length).toBeGreaterThan(0);
      expect(formattedAr.length).toBeGreaterThan(0);
    }
  });
});

describe('LanguageProvider & react-intl integration', () => {
  it('renders default english messages via react-intl', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <ConsumerComponent />
      </LanguageProvider>
    );

    expect(html).toContain('en');
    expect(html).toContain('ltr');
    expect(html).toContain('false');
    expect(html).toContain('Nour Medical');
    expect(html).toContain('Contact Us');
  });

  it('renders arabic messages with rtl direction via react-intl', () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="ar">
        <ConsumerComponent />
      </LanguageProvider>
    );

    expect(html).toContain('ar');
    expect(html).toContain('rtl');
    expect(html).toContain('true');
    expect(html).toContain('نور الطبية');
    expect(html).toContain('اتصل بنا');
  });

  it('throws helpful error if useLanguage is used outside LanguageProvider', () => {
    const BadComponent: React.FC = () => {
      useLanguage();
      return null;
    };

    expect(() => renderToString(<BadComponent />)).toThrow(
      'useLanguage must be used within a LanguageProvider'
    );
  });
});
