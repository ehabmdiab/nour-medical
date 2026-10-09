import { createContext, useContext } from 'react';
import type { LanguageContextValue } from './types';

export const LOCALE_STORAGE_KEY = 'nour_locale';

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
