import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SUPPLIER_PARTNERS, type SupplierPartner } from '../data/companyData';
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

  const countryGroups = useMemo(() => {
    const groups: { country: string; countryAr?: string; partners: SupplierPartner[] }[] = [];
    for (const partner of SUPPLIER_PARTNERS) {
      const existing = groups.find((g) => g.country === partner.country);
      if (existing) {
        existing.partners.push(partner);
      } else {
        groups.push({
          country: partner.country,
          countryAr: partner.countryAr,
          partners: [partner],
        });
      }
    }
    return groups;
  }, []);

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-white to-warm-white bg-[image:var(--bg-hero-light)] hero-section-pad pb-14 md:pb-16 text-navy relative overflow-hidden border-b border-gray-light z-[1]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,22,40,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,22,40,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute -right-[6%] -top-[18%] w-[680px] h-[680px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.035)_0%,rgba(251,146,60,0.015)_42%,transparent_72%)] pointer-events-none" />

        <div className="container relative z-10">
          <div className="section-label">
            {t('suppliers.heroLabel')}
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-orange-accent tracking-tight leading-[1.12] max-w-[880px] mb-8">
            {t('suppliers.heroTitle1')}{' '}
            <span className="text-orange-accent">{t('suppliers.heroTitle2')}</span>
          </h1>
          <p className="font-body text-xl md:text-2xl leading-[1.7] text-navy max-w-[680px]">
            {t('suppliers.heroSubtitle')}
          </p>

          {/* Country Tags */}
          <div className="flex gap-4 mt-12 flex-wrap">
            {[t('suppliers.countryUSA'), t('suppliers.countryChina'), t('suppliers.countryTaiwan')].map((country) => (
              <span
                key={country}
                className="font-body text-sm tracking-wide text-navy font-semibold bg-white px-5 py-2.5 rounded-full border border-gray-light shadow-[0_2px_8px_rgba(10,22,40,0.04)]"
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
            <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-orange-accent tracking-tight leading-tight">
              {t('suppliers.sectionTitle')}
            </h2>
          </div>

          <div className="flex flex-col">
            {countryGroups.map((group, groupIdx) => {
              const countryLabel = isAr && group.countryAr ? group.countryAr : group.country;

              return (
                <div
                  key={group.country}
                  className={`grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12 items-start py-16 ${
                    groupIdx < countryGroups.length - 1 ? 'border-b border-gray-light' : ''
                  } transition-all duration-500 ${
                    suppliersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                  style={{
                    transitionDelay: `${groupIdx * 0.15}s`,
                  }}
                >
                  {/* Left: Country + Number */}
                  <div>
                    <div className="font-heading text-5xl font-bold text-orange-accent leading-none mb-5">
                      {String(groupIdx + 1).padStart(2, '0')}
                    </div>
                    <span className="inline-block font-body text-sm tracking-wide text-navy font-bold border border-gray-light bg-warm-white px-3.5 py-1.5 rounded-xs">
                      {countryLabel}
                    </span>
                  </div>

                  {/* Right: Grouped Suppliers of the Same Country */}
                  <div className="flex flex-col gap-12">
                    {group.partners.map((partner) => {
                      const name = isAr && partner.nameAr ? partner.nameAr : partner.name;
                      const tagline = isAr && partner.taglineAr ? partner.taglineAr : partner.tagline;
                      const description = isAr && partner.descriptionAr ? partner.descriptionAr : partner.description;
                      const specialties = isAr && partner.specialtiesAr ? partner.specialtiesAr : partner.specialties;

                      return (
                        <div
                          key={partner.id}
                          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
                        >
                          {/* Center: Name + Tagline + Description */}
                          <div>
                            <h3 className="font-heading text-2xl md:text-3xl font-bold text-orange-accent tracking-tight mb-2">
                              {name}
                            </h3>
                            <p className="font-body text-xs tracking-widest uppercase text-navy font-bold mb-5">
                              {tagline}
                            </p>
                            <p className="font-body text-lg leading-[1.7] text-navy">
                              {description}
                            </p>
                          </div>

                          {/* Right: Specialties */}
                          <div>
                            <p className="font-heading text-xs tracking-widest uppercase text-orange-accent font-bold mb-4">
                              {t('suppliers.specialtiesLabel')}
                            </p>
                            <ul className="flex flex-col gap-3">
                              {specialties.map((s) => (
                                <li key={s} className="flex items-start gap-2.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-orange-accent shrink-0 mt-2.5" />
                                  <span className="font-body text-lg text-navy leading-normal">
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Network Statement */}
      <section className="py-20 bg-warm-white border-t border-gray-light">
        <div className="container max-w-[760px] text-center">
          <div className="section-label justify-center mb-6">
            {t('suppliers.quoteLabel')}
          </div>
          <p className="font-heading text-2xl md:text-3xl lg:text-[2.25rem] font-semibold text-orange-accent leading-snug tracking-tight">
            {t('suppliers.quoteText')}
          </p>
        </div>
      </section>
    </>
  );
};

export const PartnersPage = SuppliersPage;
