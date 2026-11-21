import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { Mri3DViewer } from '../components/organisms/Mri3DViewer';
import { ClientMarquee } from '../components/organisms/ClientMarquee';
import { FloatingUniverseGallery } from '../components/organisms/FloatingUniverseGallery';
import {
  KEY_CAPABILITIES,
  WHY_NOUR_MEDICAL,
  SUPPLIER_PARTNERS,
  COMPANY_INFO,
} from '../data/companyData';
import { useReveal } from '../hooks/useReveal';
import { useLanguage } from '../i18n';

export const HomePage: React.FC = () => {
  const { locale, t } = useLanguage();

  const { ref: introRef, visible: introVisible } = useReveal();
  const { ref: capRef, visible: capVisible } = useReveal();
  const { ref: whyRef, visible: whyVisible } = useReveal();
  const { ref: missionRef, visible: missionVisible } = useReveal();
  const { ref: partnersRef, visible: partnersVisible } = useReveal();
  const { ref: ctaRef, visible: ctaVisible } = useReveal();

  const whyItems = useMemo(
    () =>
      locale === 'ar'
        ? [
            { title: t('home.whyTeamTitle'), description: t('home.whyTeamDesc') },
            { title: t('home.whyServiceTitle'), description: t('home.whyServiceDesc') },
            { title: t('home.whyPartsTitle'), description: t('home.whyPartsDesc') },
            { title: t('home.whyNetworkTitle'), description: t('home.whyNetworkDesc') },
            { title: t('home.whyRadiologyTitle'), description: t('home.whyRadiologyDesc') },
            { title: t('home.whyClientsTitle'), description: t('home.whyClientsDesc') },
          ]
        : WHY_NOUR_MEDICAL,
    [locale, t]
  );

  const missionPillars = useMemo(
    () =>
      locale === 'ar'
        ? [
            { title: t('home.missionP1Title'), description: t('home.missionP1Desc') },
            { title: t('home.missionP2Title'), description: t('home.missionP2Desc') },
            { title: t('home.missionP3Title'), description: t('home.missionP3Desc') },
          ]
        : COMPANY_INFO.mission,
    [locale, t]
  );

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section
        id="hero"
        className="bg-gradient-to-b from-white via-warm-white to-[#EEF4FB] bg-[image:var(--bg-hero-light)] text-navy flex flex-col relative overflow-hidden hero-section-pad box-border border-b border-gray-light"
      >
        {/* Ambient Medical Light Grid */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,22,40,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,22,40,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"
        />

        {/* Upper-Right Whisper-Subtle Warm Orange Glow */}
        <div
          className="absolute -right-[8%] -top-[12%] w-[720px] h-[720px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.035)_0%,rgba(251,146,60,0.015)_42%,transparent_72%)] pointer-events-none"
        />
        <div
          className="absolute right-[12%] top-[18%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(27,79,216,0.035)_0%,transparent_70%)] pointer-events-none"
        />

        <div className="container relative z-10 flex-1 flex flex-col justify-center pt-2 sm:pt-3 lg:pt-4 pb-6 sm:pb-8 lg:pb-10">
          {/* Hero Content Grid: Text & Circular 3D Scanner Viewport */}
          <div className="hero-content-grid items-start">
            {/* Primary Text & CTA Column */}
            <div className="w-full lg:w-fit lg:max-w-[940px] pt-1 sm:pt-2 lg:pt-28">
              <div className="section-label mb-5 animate-hero-est">
                {t('hero.badge')}
              </div>

              <h1
                className="font-heading text-[clamp(2.375rem,3.6vw,3.625rem)] font-extrabold text-navy leading-[1.16] tracking-[-0.025em] [text-wrap:normal] mb-8 animate-hero-title"
              >
                <span className="block">{t('hero.title')}</span>
                <span className="block font-semibold text-navy/90 mt-2">
                  {t('hero.titleHighlight')}
                </span>
              </h1>

              <div
                className="flex gap-4 flex-wrap items-center animate-hero-cta"
              >
                <Link to="/products" className="btn btn-blue gap-2.5 shadow-[0_6px_20px_rgba(27,79,216,0.22)]">
                  {t('hero.exploreProducts')}
                  <ArrowRight size={17} className={locale === 'ar' ? 'rotate-180' : ''} />
                </Link>
                <Link to="/contact" className="btn btn-outline bg-white/80 backdrop-blur-xs">
                  {t('hero.contactTeam')}
                </Link>
              </div>
            </div>

            {/* Circular 3D MRI Scanner Viewport */}
            <div
              className="relative w-[min(320px,80vw)] sm:w-[min(420px,65vw)] lg:w-[min(640px,62vh,40vw)] aspect-square flex justify-center items-center mx-auto lg:mx-0 animate-hero-3d shrink-0"
            >
              <div
                className="absolute inset-4 rounded-full bg-[radial-gradient(circle,rgba(27,79,216,0.09)_0%,rgba(0,168,181,0.05)_50%,transparent_72%)] pointer-events-none"
              />
              <Mri3DViewer height="100%" />
            </div>
          </div>
        </div>

        {/* Bottom stat bar */}
        <div
          className="relative z-10 border-t border-gray-light bg-white/85 backdrop-blur-sm animate-hero-stats"
        >
          <div className="container py-4 sm:py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-0">
              {[
                { value: t('stats.personnelValue'), label: t('stats.personnel') },
                { value: t('stats.cathLabInstallsValue'), label: t('stats.cathLabInstalls') },
                { value: t('stats.xrayAmcsValue'), label: t('stats.xrayAmcs') },
                { value: t('stats.partsFacilityValue'), label: t('stats.partsFacility') },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl bg-white/95 p-3.5 sm:p-4 border border-gray-light/90 shadow-[0_2px_10px_rgba(10,22,40,0.04)] flex flex-col justify-center transition-all md:rounded-none md:bg-transparent md:border-0 md:shadow-none md:py-3 md:px-6 ${
                    locale === "ar"
                      ? i < 3 ? "md:border-l md:border-gray-light" : ""
                      : i < 3 ? "md:border-r md:border-gray-light" : ""
                  }`}
                >
                  <div className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-navy tracking-[-0.02em] leading-none mb-1.5 md:mb-2">
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs sm:text-sm tracking-[0.04em] sm:tracking-[0.08em] uppercase text-navy font-semibold leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. COMPANY INTRODUCTION ──────────────────────────── */}
      <section
        ref={introRef}
        className={`py-[var(--section-gap)] bg-white motion-safe:transition-all motion-safe:duration-700 ease-[var(--ease-smooth)] ${
          introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[clamp(40px,6vw,100px)] items-center">
            <div className="min-w-0">
              <div className="section-label">{t('home.aboutLabel')}</div>
              <h2 className="font-heading text-[clamp(1.875rem,2.7vw,2.75rem)] font-bold text-navy tracking-[-0.02em] leading-[1.15] mb-6">
                {t('home.aboutTitle')}
              </h2>
              <Link to="/about" className="btn btn-outline mt-2">
                {t('home.aboutBtn')}
              </Link>
            </div>
            <div className="min-w-0">
              <p className="font-body text-base leading-[1.75] text-navy mb-5">
                {t('home.aboutP1')}
              </p>
              <p className="font-body text-base leading-[1.75] text-navy">
                {t('home.aboutP2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. KEY CAPABILITIES ──────────────────────────────── */}
      <section
        ref={capRef}
        className={`py-[var(--section-gap)] bg-warm-white motion-safe:transition-opacity motion-safe:duration-700 ease-[var(--ease-smooth)] ${
          capVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="mb-12">
            <div className="section-label">{t('home.capLabel')}</div>
            <h2 className="font-heading text-[clamp(1.875rem,2.7vw,2.75rem)] font-bold text-navy tracking-[-0.02em]">
              {t('home.capTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-5">
            {KEY_CAPABILITIES.map((cap, i) => (
              <div
                key={cap.id}
                className={`p-6 sm:p-8 sm:px-6 bg-white border border-gray-light rounded-xl min-w-0 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 ease-[var(--ease-smooth)] hover:border-orange-accent hover:shadow-[0_12px_28px_rgba(249,115,22,0.1)] hover:-translate-y-1 ${
                  capVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="font-heading text-sm tracking-[0.16em] uppercase text-orange-accent font-bold mb-3.5">
                  0{i + 1}
                </div>
                <h3 className="font-heading text-xl font-bold text-navy tracking-[-0.01em] mb-2 break-words">
                  {t(cap.titleKey) || cap.title}
                </h3>
                <p className="font-body text-base leading-[1.65] text-navy break-words">
                  {t(cap.descKey) || cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CLIENT MARQUEE ────────────────────────────────── */}
      <ClientMarquee />

      {/* ── 5. INTERACTIVE FLOATING IMAGE UNIVERSE ───────────── */}
      <FloatingUniverseGallery />

      {/* ── 6. WHY NOUR MEDICAL ──────────────────────────────── */}
      <section
        ref={whyRef}
        className={`py-[var(--section-gap)] bg-white motion-safe:transition-opacity motion-safe:duration-700 ease-[var(--ease-smooth)] ${
          whyVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[clamp(40px,6vw,100px)] items-start">
            <div className="sticky top-[100px] min-w-0">
              <div className="section-label">{t('home.whyLabel')}</div>
              <h2 className="font-heading text-[clamp(1.875rem,2.7vw,2.75rem)] font-bold text-navy tracking-[-0.02em] leading-[1.15] mb-5">
                {t('home.whyTitle')}
              </h2>
              <p className="font-body text-base leading-[1.7] text-navy mb-8">
                {t('home.whyDesc')}
              </p>
              <Link to="/services" className="btn btn-primary">
                {t('nav.services')}
              </Link>
            </div>

            <div className="min-w-0">
              {whyItems.map((item, i) => (
                <div
                  key={item.title}
                  className={`py-6 border-b border-warm-neutral transition-all duration-600 ease-[var(--ease-smooth)] ${
                    whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                      <h3 className="font-heading text-xl font-bold text-navy tracking-[-0.01em] mb-1.5 break-words">
                        {item.title}
                      </h3>
                      <p className="font-body text-base leading-[1.65] text-navy break-words">
                        {item.description}
                      </p>
                    </div>
                    <span className="font-heading text-sm tracking-[0.15em] text-orange-accent font-bold shrink-0 mt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. VISION & MISSION ──────────────────────────────── */}
      <section
        ref={missionRef}
        className={`py-[var(--section-gap)] bg-navy motion-safe:transition-opacity motion-safe:duration-700 ease-[var(--ease-smooth)] ${
          missionVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          {/* Vision */}
          <div className="mb-16 max-w-[960px]">
            <div className="section-label section-label-light text-white mb-5">
              {t('home.visionTitle')}
            </div>
            <blockquote className="font-heading text-[clamp(1.75rem,2.5vw,2.625rem)] font-semibold text-white leading-[1.4] tracking-[-0.015em]">
              "{locale === 'ar' ? t('home.visionDesc') : COMPANY_INFO.vision}"
            </blockquote>
          </div>

          <div className="rule-dark mb-16" />

          {/* Mission Pillars */}
          <div className="section-label section-label-light text-white mb-10">
            {t('home.missionTitlePillar')}
          </div>
          <div className="grid-3">
            {missionPillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className={`p-6 sm:p-8 bg-white/[0.04] border border-white/[0.1] rounded min-w-0 motion-safe:transition-all motion-safe:duration-300 hover:border-orange-accent/50 hover:-translate-y-0.5 ${
                  missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="font-heading text-sm tracking-[0.15em] text-orange-accent font-bold mb-3.5">
                  0{i + 1}
                </div>
                <h3 className="font-heading text-xl font-bold text-white tracking-[-0.01em] mb-2 break-words">
                  {pillar.title}
                </h3>
                <p className="font-body text-base leading-[1.65] text-white/90 break-words">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. SUPPLIER NETWORK OVERVIEW ─────────────────────── */}
      <section
        ref={partnersRef}
        className={`py-[var(--section-gap)] bg-warm-white motion-safe:transition-opacity motion-safe:duration-700 ease-[var(--ease-smooth)] ${
          partnersVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="flex justify-between items-end flex-wrap gap-6 mb-12">
            <div>
              <div className="section-label">{t('nav.suppliers')}</div>
              <h2 className="font-heading text-[clamp(1.875rem,2.7vw,2.75rem)] font-bold text-navy tracking-[-0.02em]">
                {t('suppliers.title')}
              </h2>
            </div>
            <Link to="/suppliers" className="btn btn-outline">
              {t('suppliers.viewProducts')}
            </Link>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6">
            {SUPPLIER_PARTNERS.slice(0, 3).map((partner) => {
              const name = locale === 'ar' && partner.nameAr ? partner.nameAr : partner.name;
              const tagline = locale === 'ar' && partner.taglineAr ? partner.taglineAr : partner.tagline;
              const specialties = locale === 'ar' && partner.specialtiesAr ? partner.specialtiesAr : partner.specialties;

              return (
                <div
                  key={partner.id}
                  className="p-6 sm:p-8 bg-white border border-gray-light rounded-xl min-w-0"
                >
                  <div className="text-3xl mb-4">{partner.countryFlag}</div>
                  <h3 className="font-heading text-xl font-bold text-navy tracking-[-0.01em] mb-2 break-words">
                    {name}
                  </h3>
                  <p className="font-body text-sm tracking-[0.06em] uppercase text-navy/80 font-bold mb-4 break-words">
                    {tagline}
                  </p>
                  <ul className="flex flex-col gap-2 list-none m-0 p-0">
                    {specialties.slice(0, 3).map((s) => (
                      <li key={s} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-accent shrink-0 mt-2.5" />
                        <span className="font-body text-base text-navy break-words">
                          {s}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ─────────────────────────────────────── */}
      <section
        ref={ctaRef}
        className={`py-[var(--section-gap)] bg-white border-t border-gray-light text-center motion-safe:transition-all motion-safe:duration-700 ease-[var(--ease-smooth)] ${
          ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="container max-w-[900px]">
          <div className="section-label justify-center">
            {t('common.contactUs')}
          </div>
          <h2 className="font-heading text-[clamp(1.875rem,2.7vw,2.75rem)] font-bold text-navy tracking-[-0.02em] leading-[1.16] mb-5">
            {t('home.ctaTitle')}
          </h2>
          <p className="font-body text-base md:text-lg leading-[1.7] text-navy mb-8">
            {t('home.ctaDesc')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact" className="btn btn-primary gap-2">
              {t('home.ctaBtn')}
              <ArrowRight size={15} />
            </Link>
            <Link to="/products" className="btn btn-outline">
              {t('hero.exploreProducts')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
