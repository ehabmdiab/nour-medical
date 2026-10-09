import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { IntlProvider, createIntl, createIntlCache } from 'react-intl';
import enMessages from '../locales/en.json';
import arMessages from '../locales/ar.json';
import { LanguageContext, LOCALE_STORAGE_KEY } from './context';
import type {
  Locale,
  Direction,
  TranslationKey,
  LanguageContextValue,
  LanguageProviderProps,
} from './types';

const messagesMap: Record<Locale, Record<string, string>> = {
  en: enMessages,
  ar: arMessages,
};

const cache = createIntlCache();

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  defaultLocale,
}) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
        if (saved === 'en' || saved === 'ar') {
          return saved;
        }
      }
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'en' || urlLang === 'ar') {
        return urlLang;
      }
    }
    return defaultLocale ?? 'en';
  });

  const dir: Direction = locale === 'ar' ? 'rtl' : 'ltr';
  const isRtl = locale === 'ar';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = dir;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }
  }, [locale, dir]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLocaleState((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const currentMessages = useMemo(() => messagesMap[locale] ?? messagesMap.en, [locale]);

  const intl = useMemo(
    () =>
      createIntl(
        {
          locale,
          messages: currentMessages,
          defaultLocale: 'en',
        },
        cache
      ),
    [locale, currentMessages]
  );

  const t = useCallback(
    (id: TranslationKey, values?: Record<string, string | number | boolean>): string => {
      return intl.formatMessage({ id, defaultMessage: enMessages[id] ?? id }, values);
    },
    [intl]
  );

  const contextValue = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dir,
      isRtl,
      setLocale,
      toggleLanguage,
      messages: currentMessages,
      t,
    }),
    [locale, dir, isRtl, setLocale, toggleLanguage, currentMessages, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      <IntlProvider locale={locale} messages={currentMessages} defaultLocale="en">
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};
