import React from 'react';
import { ALL_CLIENTS } from '../../data/companyData';
import { useLanguage } from '../../i18n';

const SEPARATOR = ' · ';

export const ClientMarquee: React.FC = () => {
  const { locale } = useLanguage();

  // Pick Arabic or English client name based on active locale
  const allNames = ALL_CLIENTS.map((c) => (locale === 'ar' && c.nameAr ? c.nameAr : c.name));
  // Duplicate for seamless infinite loop
  const track = [...allNames, ...allNames];

  return (
    <section className="bg-navy py-7 overflow-hidden border-y border-white/[0.08]" aria-label="Healthcare Client References">
      <div className="marquee-container" dir="ltr">
        <div className="marquee-track">
          {track.map((name, i) => (
            <span
              key={i}
              className="text-xs md:text-sm tracking-wide text-white/65 whitespace-nowrap pr-0 inline-flex items-center"
            >
              <span className={locale === 'ar' ? 'font-body font-medium' : 'font-mono uppercase text-[0.6875rem] tracking-widest'}>
                {name}
              </span>
              <span className="text-teal-accent mx-6 select-none font-bold">
                {SEPARATOR}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
