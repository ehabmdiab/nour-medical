import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

import { Mri3DViewer } from '../components/organisms/Mri3DViewer';
import { LoaderContext } from '../context/LoaderContext';
import { ClientMarquee } from '../components/organisms/ClientMarquee';
import { FloatingUniverseGallery } from '../components/organisms/FloatingUniverseGallery';
import {
  KEY_CAPABILITIES,
  WHY_NOUR_MEDICAL,
  SUPPLIER_PARTNERS,
  COMPANY_INFO,
} from '../data/companyData';
import { useLanguage } from '../i18n';

// ── Reveal Hook ──────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
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

export const HomePage: React.FC = () => {
  const isLoaderActive = React.useContext(LoaderContext);
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
        className="min-h-screen bg-navy flex flex-col relative overflow-hidden pt-36 box-border"
      >
        {/* Ambient Medical Dark Grid */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"
        />

        {/* Ambient Royal Blue Glow Orb */}
        <div
          className="absolute -right-[10%] top-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(27,79,216,0.18)_0%,transparent_70%)] pointer-events-none"
        />

        <div className="container flex-1 flex flex-col justify-center pt-8 pb-20 max-w-[1440px]">
          {/* Label Badge */}
          <div className="mb-6 animate-hero-est">
            <span className="inline-flex items-center gap-2.5 font-mono text-[0.5625rem] tracking-[0.2em] uppercase text-white/45">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-accent animate-pulse" />
              {t('hero.est')}
            </span>
          </div>

          {/* Hero Content Grid: Text Left, Circular 3D Scanner Viewport Right */}
          <div className="hero-content-grid items-center">
            {/* Left: Text & CTA */}
            <div className="max-w-[560px] w-full">
              <h1
                className="font-heading text-[clamp(2.25rem,4.5vw,4.5rem)] font-extrabold text-white leading-[1.02] tracking-[-0.03em] mb-7 animate-hero-title"
              >
                {t('hero.title')}{" "}
                <span className="text-teal-accent inline">
                  {t('hero.titleHighlight')}
                </span>
              </h1>

              <p
                className="font-body text-[clamp(0.95rem,1.15vw,1.0625rem)] leading-[1.65] text-white/70 max-w-[520px] mb-8 animate-hero-sub"
              >
                {t('hero.subtitle')}
              </p>

              <div
                className="flex gap-4 flex-wrap items-center animate-hero-cta"
              >
                <Link to="/products" className="btn btn-blue gap-2">
                  {t('hero.exploreProducts')}
                  <ArrowRight size={15} />
                </Link>
                <Link to="/contact" className="btn btn-outline-white">
                  {t('hero.contactTeam')}
                </Link>
              </div>
            </div>

            {/* Right: Circular 3D MRI Scanner Viewport */}
            <div
              className="relative w-full max-w-[680px] max-h-[min(520px,55vh)] aspect-square flex justify-center items-center mx-auto animate-hero-3d"
            >
              {!isLoaderActive && <Mri3DViewer height="100%" />}
            </div>
          </div>
        </div>

        {/* Scroll prompt */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/30 animate-hero-scroll pointer-events-none"
        >
          <span className="font-mono text-[0.5rem] tracking-[0.2em] uppercase">
            {t('hero.scroll')}
          </span>
          <ChevronDown size={14} className="animate-bounce" />
        </div>

        {/* Bottom stat bar */}
        <div
          className="border-t border-white/[0.08] bg-white/[0.03] animate-hero-stats"
        >
          <div className="container">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-0 py-6">
              {[
                { value: t('stats.personnelValue'), label: t('stats.personnel') },
                { value: t('stats.cathLabInstallsValue'), label: t('stats.cathLabInstalls') },
                { value: t('stats.xrayAmcsValue'), label: t('stats.xrayAmcs') },
                { value: t('stats.partsFacilityValue'), label: t('stats.partsFacility') },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`py-3 px-6 ${
                    locale === "ar"
                      ? i < 3 ? "border-l border-white/[0.07]" : ""
                      : i < 3 ? "border-r border-white/[0.07]" : ""
                  }`}
                >
                  <div className="font-heading text-2xl font-bold text-white tracking-tight leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[0.5625rem] tracking-widest uppercase text-white/40">
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
        ref={introRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-white transition-all duration-700 ease-[var(--ease-smooth)] ${
          introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(40px,6vw,100px)] items-center">
            <div>
              <div className="section-label">{t('home.aboutLabel')}</div>
              <h2 className="font-heading text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold text-navy tracking-[-0.02em] leading-[1.1] mb-7">
                {t('home.aboutTitle')}
              </h2>
              <Link to="/about" className="btn btn-outline mt-2">
                {t('home.aboutBtn')}
              </Link>
            </div>
            <div>
              <p className="font-body text-[clamp(0.9375rem,1.2vw,1.0625rem)] leading-[1.75] text-text-muted mb-6">
                {t('home.aboutP1')}
              </p>
              <p className="font-body text-[clamp(0.9375rem,1.2vw,1.0625rem)] leading-[1.75] text-text-muted">
                {t('home.aboutP2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. KEY CAPABILITIES ──────────────────────────────── */}
      <section
        ref={capRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-warm-white transition-opacity duration-700 ease-[var(--ease-smooth)] ${
          capVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="mb-15">
            <div className="section-label">{t('home.capLabel')}</div>
            <h2 className="font-heading text-[clamp(2.25rem,4vw,3.25rem)] font-bold text-navy tracking-[-0.02em]">
              {t('home.capTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
            {KEY_CAPABILITIES.map((cap, i) => (
              <div
                key={cap.id}
                className={`p-9 px-7 bg-white border border-gray-light rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 ease-[var(--ease-smooth)] hover:border-blue-medical hover:shadow-[0_12px_28px_rgba(27,79,216,0.08)] hover:-translate-y-1 ${
                  capVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-teal-accent mb-4">
                  0{i + 1}
                </div>
                <h3 className="font-heading text-xl font-bold text-navy tracking-[-0.01em] mb-2.5">
                  {t(cap.titleKey) || cap.title}
                </h3>
                <p className="font-body text-base leading-[1.65] text-text-muted">
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
        ref={whyRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-white transition-opacity duration-700 ease-[var(--ease-smooth)] ${
          whyVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(40px,6vw,100px)] items-start">
            <div className="sticky top-[100px]">
              <div className="section-label">{t('home.whyLabel')}</div>
              <h2 className="font-heading text-[clamp(2.25rem,4vw,3.25rem)] font-bold text-navy tracking-[-0.02em] leading-[1.1] mb-5">
                {t('home.whyTitle')}
              </h2>
              <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted mb-8">
                {t('home.whyDesc')}
              </p>
              <Link to="/services" className="btn btn-primary">
                {t('nav.services')}
              </Link>
            </div>

            <div>
              {whyItems.map((item, i) => (
                <div
                  key={item.title}
                  className={`py-7 border-b border-warm-neutral transition-all duration-600 ease-[var(--ease-smooth)] ${
                    whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-heading text-[1.0625rem] font-semibold text-navy tracking-[-0.01em] mb-2">
                        {item.title}
                      </h3>
                      <p className="font-body text-lg leading-[1.65] text-text-muted">
                        {item.description}
                      </p>
                    </div>
                    <span className="font-mono text-[0.5rem] tracking-[0.15em] text-stone shrink-0 mt-1">
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
        ref={missionRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-navy transition-opacity duration-700 ease-[var(--ease-smooth)] ${
          missionVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          {/* Vision */}
          <div className="mb-20 max-w-[760px]">
            <div className="section-label section-label-light text-white/40 mb-6">
              {t('home.visionTitle')}
            </div>
            <blockquote className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold italic text-white leading-[1.3] tracking-[-0.02em]">
              "{locale === 'ar' ? t('home.visionDesc') : COMPANY_INFO.vision}"
            </blockquote>
          </div>

          <div className="rule-dark mb-20" />

          {/* Mission Pillars */}
          <div className="section-label section-label-light text-white/40 mb-12">
            {t('home.missionTitlePillar')}
          </div>
          <div className="grid-3">
            {missionPillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className={`p-9 bg-white/[0.03] border border-white/[0.07] rounded transition-all duration-300 hover:border-white/20 hover:-translate-y-0.5 ${
                  missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="font-mono text-[0.625rem] tracking-[0.15em] text-teal-accent mb-4">
                  0{i + 1}
                </div>
                <h3 className="font-heading text-xl font-bold text-white tracking-[-0.01em] mb-2.5">
                  {pillar.title}
                </h3>
                <p className="font-body text-lg leading-[1.65] text-white/60">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. SUPPLIER NETWORK OVERVIEW ─────────────────────── */}
      <section
        ref={partnersRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-warm-white transition-opacity duration-700 ease-[var(--ease-smooth)] ${
          partnersVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="flex justify-between items-end flex-wrap gap-6 mb-15">
            <div>
              <div className="section-label">{t('nav.suppliers')}</div>
              <h2 className="font-heading text-[clamp(2.25rem,4vw,3.25rem)] font-bold text-navy tracking-[-0.02em]">
                {t('suppliers.title')}
              </h2>
            </div>
            <Link to="/suppliers" className="btn btn-outline">
              {t('suppliers.viewProducts')}
            </Link>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {SUPPLIER_PARTNERS.slice(0, 3).map((partner) => (
              <div
                key={partner.id}
                className="p-9 bg-white border border-gray-light rounded-xl"
              >
                <div className="text-[1.75rem] mb-4">{partner.countryFlag}</div>
                <h3 className="font-heading text-xl font-bold text-navy tracking-[-0.01em] mb-2">
                  {partner.name}
                </h3>
                <p className="font-mono text-[0.5625rem] tracking-[0.12em] uppercase text-teal-accent mb-4">
                  {partner.tagline}
                </p>
                <ul className="flex flex-col gap-1.5 list-none m-0 p-0">
                  {partner.specialties.slice(0, 3).map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-medical shrink-0" />
                      <span className="font-body text-[0.8125rem] text-text-muted">
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ─────────────────────────────────────── */}
      <section
        ref={ctaRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-white border-t border-gray-light text-center transition-all duration-700 ease-[var(--ease-smooth)] ${
          ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="container max-w-[720px]">
          <div className="section-label justify-center">
            {t('common.contactUs')}
          </div>
          <h2 className="font-heading text-[clamp(2rem,4.5vw,4rem)] font-bold text-navy tracking-[-0.025em] leading-[1.05] mb-6">
            {t('home.ctaTitle')}
          </h2>
          <p className="font-body text-lg leading-[1.7] text-text-muted mb-10">
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
