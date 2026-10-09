import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, type Locale } from '../../i18n';

export interface LanguageSwitchProps {
  className?: string;
  size?: 'sm' | 'md';
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  className = '',
  size = 'sm',
}) => {
  const { locale, setLocale } = useLanguage();

  const isSmall = size === 'sm';
  const iconSize = isSmall ? 13 : 15;

  const handleSelect = (target: Locale) => {
    if (target !== locale) {
      setLocale(target);
    }
  };

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center bg-navy/[0.04] border border-gray-light rounded-full p-[3px] gap-[2px] relative select-none backdrop-blur-md ${className}`}
    >
      {/* Globe Icon Accent */}
      <span
        className={`flex items-center justify-center text-blue-medical/85 ${isSmall ? 'pl-1.5 pr-1' : 'pl-2 pr-1.5'}`}
        aria-hidden="true"
      >
        <Globe size={iconSize} />
      </span>

      {/* English Pill Button */}
      <button
        type="button"
        role="radio"
        aria-checked={locale === 'en'}
        aria-label="Switch to English"
        onClick={() => handleSelect('en')}
        className={`border-0 outline-none cursor-pointer rounded-full font-heading tracking-[0.02em] transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] inline-flex items-center justify-center ${
          isSmall ? 'py-[5px] px-2.5 text-xs min-w-[36px]' : 'py-[7px] px-3.5 text-sm min-w-[44px]'
        } ${
          locale === 'en'
            ? 'bg-white text-blue-medical font-bold shadow-[0_2px_8px_rgba(10,22,40,0.08),0_1px_2px_rgba(10,22,40,0.04)]'
            : 'bg-transparent text-text-muted font-medium hover:bg-white/50'
        }`}
      >
        EN
      </button>

      {/* Arabic Pill Button */}
      <button
        type="button"
        role="radio"
        aria-checked={locale === 'ar'}
        aria-label="التبديل إلى العربية"
        onClick={() => handleSelect('ar')}
        className={`border-0 outline-none cursor-pointer rounded-full font-heading tracking-[0.01em] transition-all duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] inline-flex items-center justify-center ${
          isSmall ? 'py-[5px] px-2.5 text-xs min-w-[46px]' : 'py-[7px] px-3.5 text-sm min-w-[54px]'
        } ${
          locale === 'ar'
            ? 'bg-white text-blue-medical font-bold shadow-[0_2px_8px_rgba(10,22,40,0.08),0_1px_2px_rgba(10,22,40,0.04)]'
            : 'bg-transparent text-text-muted font-medium hover:bg-white/50'
        }`}
      >
        العربية
      </button>
    </div>
  );
};
