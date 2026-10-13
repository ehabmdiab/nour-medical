import React, { useEffect, useRef, useState } from 'react';
import { SUPPLIER_PARTNERS } from '../data/companyData';
import { useLanguage } from '../i18n';

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export const SuppliersPage: React.FC = () => {
  const { locale, t } = useLanguage();
  const isAr = locale === 'ar';
  const { ref: suppliersRef, visible: suppliersVisible } = useReveal();

  return (
    <>
      {/* Page Header */}
      <section className="bg-navy text-white pt-36 pb-20 relative overflow-hidden border-b border-white/10 z-[1]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute -right-[10%] top-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(27,79,216,0.18)_0%,transparent_70%)] pointer-events-none" />

        <div className="container relative z-10">
          <div className="section-label">
            {t('suppliers.heroLabel')}
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.75rem] font-bold text-white tracking-tight leading-[0.94] max-w-[880px] mb-8">
            {t('suppliers.heroTitle1')}{' '}
            <span className="text-orange-accent">{t('suppliers.heroTitle2')}</span>
          </h1>
          <p className="font-body text-xl md:text-2xl leading-[1.7] text-white/80 max-w-[680px]">
            {t('suppliers.heroSubtitle')}
          </p>

          {/* Country Tags */}
          <div className="flex gap-4 mt-12 flex-wrap">
            {[t('suppliers.countryUSA'), t('suppliers.countryTaiwan'), t('suppliers.countryChina')].map((country) => (
              <span
                key={country}
                className="font-mono text-[0.8125rem] tracking-wide text-white/90 bg-white/10 px-4.5 py-2 rounded-full border border-white/15 backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Suppliers Grid */}
      <section
        ref={suppliersRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-white transition-opacity duration-700 ease-out ${
          suppliersVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="mb-14">
            <div className="section-label">{t('suppliers.sectionLabel')}</div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy tracking-tight leading-tight">
              {t('suppliers.sectionTitle')}
            </h2>
          </div>

          <div className="flex flex-col">
            {SUPPLIER_PARTNERS.map((partner, i) => {
              const country = isAr && partner.countryAr ? partner.countryAr : partner.country;
              const name = isAr && partner.nameAr ? partner.nameAr : partner.name;
              const tagline = isAr && partner.taglineAr ? partner.taglineAr : partner.tagline;
              const description = isAr && partner.descriptionAr ? partner.descriptionAr : partner.description;
              const specialties = isAr && partner.specialtiesAr ? partner.specialtiesAr : partner.specialties;

              return (
                <div
                  key={partner.id}
                  className={`grid grid-cols-1 md:grid-cols-[200px_1fr_1fr] gap-8 md:gap-12 items-start py-16 ${
                    i < SUPPLIER_PARTNERS.length - 1 ? 'border-b border-gray-light' : ''
                  } transition-all duration-500 ${
                    suppliersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                  style={{
                    transitionDelay: `${i * 0.15}s`,
                  }}
                >
                  {/* Left: Country + Number */}
                  <div>
                    <div className="font-mono text-5xl font-light text-gray-light leading-none mb-5">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <span className="inline-block font-mono text-[0.5rem] tracking-widest uppercase text-text-muted border border-gray-light px-3 py-1.5 rounded-xs">
                      {country}
                    </span>
                  </div>

                  {/* Center: Name + Tagline + Description */}
                  <div>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-navy tracking-tight mb-2">
                      {name}
                    </h3>
                    <p className="font-mono text-[0.5625rem] tracking-widest uppercase text-teal-accent mb-5">
                      {tagline}
                    </p>
                    <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted">
                      {description}
                    </p>
                  </div>

                  {/* Right: Specialties */}
                  <div>
                    <p className="font-mono text-[0.5rem] tracking-widest uppercase text-text-muted mb-4">
                      {t('suppliers.specialtiesLabel')}
                    </p>
                    <ul className="flex flex-col gap-2.5">
                      {specialties.map((s) => (
                        <li key={s} className="flex items-start gap-2.5">
                          <span className="w-1 h-1 rounded-full bg-blue-medical shrink-0 mt-2" />
                          <span className="font-body text-base text-text-body leading-normal">
                            {s}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Network Statement */}
      <section className="py-20 bg-warm-white border-t border-gray-light">
        <div className="container max-w-[720px] text-center">
          <div className="section-label justify-center mb-6">
            {t('suppliers.quoteLabel')}
          </div>
          <p className="font-heading text-2xl md:text-3xl lg:text-[2.25rem] font-semibold italic text-navy leading-snug tracking-tight">
            {t('suppliers.quoteText')}
          </p>
        </div>
      </section>
    </>
  );
};

export const PartnersPage = SuppliersPage;
