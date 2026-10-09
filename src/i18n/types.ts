import type enMessages from '../locales/en.json';

export type Locale = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';
export type TranslationKey = keyof typeof enMessages;

export interface LanguageContextValue {
  locale: Locale;
  dir: Direction;
  isRtl: boolean;
  setLocale: (locale: Locale) => void;
  toggleLanguage: () => void;
  messages: Record<string, string>;
  t: (id: TranslationKey, values?: Record<string, string | number | boolean>) => string;
}

export interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLocale?: Locale;
}
