import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, ShieldCheck, Quote } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { useLanguage } from '../i18n';

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const BASE = import.meta.env.BASE_URL || '/';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  const { ref: pillarsRef, visible: pillarsVisible } = useReveal();
  const { ref: leaderRef, visible: leaderVisible } = useReveal();
  const { ref: infraRef, visible: infraVisible } = useReveal();

  const pillars = [
    { id: 'technology', title: t('about.pillarTech'), description: t('about.pillarTechDesc') },
    { id: 'expertise', title: t('about.pillarExp'), description: t('about.pillarExpDesc') },
    { id: 'reliability', title: t('about.pillarRel'), description: t('about.pillarRelDesc') },
  ];

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-white to-warm-white pt-36 pb-20 relative overflow-hidden border-b border-gray-light">
        {/* Ambient Subtle Medical Grid & Glow */}
        <div className="absolute inset-0 bg-[size:60px_60px] bg-[linear-gradient(to_right,rgba(10,22,40,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,22,40,0.03)_1px,transparent_1px)] pointer-events-none" />
        <div className="absolute -right-[5%] top-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="container relative z-[1]">
          <div className="section-label">
            {t('about.sectionLabel')}
          </div>
          <h1 className="font-heading text-[clamp(3rem,6.5vw,5.75rem)] font-bold text-navy tracking-[-0.035em] leading-[0.94] max-w-[850px] mb-8">
            {t('about.title')}
          </h1>
          <p className="font-body text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.7] text-text-muted max-w-[680px]">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-[var(--section-gap)] bg-white">
        <div className="container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(40px,6vw,100px)] items-start">
            <div>
              <div className="section-label">{t('about.storyLabel')}</div>
              <h2 className="font-heading text-[clamp(2.25rem,4vw,3.5rem)] font-bold text-navy tracking-[-0.03em] leading-[1.05] mb-6">
                {t('about.storyTitle')}
              </h2>
            </div>
            <div>
              <p className="font-body text-[1.0625rem] leading-[1.75] text-text-muted mb-5">
                {t('about.storyP1')}
              </p>
              <p className="font-body text-[1.0625rem] leading-[1.75] text-text-muted mb-5">
                {t('about.storyP2')}
              </p>
              <p className="font-body text-[1.0625rem] leading-[1.75] text-text-muted">
                {t('about.storyP3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section
        ref={pillarsRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-warm-white transition-opacity duration-700 ease-[var(--ease-smooth)] ${
          pillarsVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="mb-15">
            <div className="section-label">{t('about.foundationLabel')}</div>
            <h2 className="font-heading text-[clamp(2.25rem,4vw,3.25rem)] font-bold text-navy tracking-[-0.02em]">
              {t('about.pillarsTitle')}
            </h2>
          </div>
          <div className="grid-3">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.id}
                className={`p-12 px-9 border-l-2 border-blue-medical transition-all duration-600 ease-[var(--ease-smooth)] ${
                  pillarsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-blue-medical mb-5">
                  {String(i + 1).padStart(2, '0')} — {pillar.id.toUpperCase()}
                </div>
                <h3 className="font-heading text-[1.625rem] font-bold text-navy tracking-[-0.015em] mb-3.5">
                  {pillar.title}
                </h3>
                <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Profile — Eng. Sayed Awad */}
      <section
        ref={leaderRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-navy text-white transition-opacity duration-700 ease-[var(--ease-smooth)] ${
          leaderVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="p-12 md:p-14 bg-white/[0.04] rounded-3xl border border-white/10 relative overflow-hidden backdrop-blur-sm">
            {/* Ambient Background Accent Glow */}
            <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.12)_0%,transparent_70%)] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-center">
              {/* Left Column: Chairman Visual Card & Bio Info */}
              <div className="flex flex-col sm:flex-row gap-7 items-start sm:items-center">
                {/* Chairman Portrait */}
                <div className="relative shrink-0">
                  <div className="w-[140px] h-[170px] sm:w-[170px] sm:h-[210px] rounded-2xl overflow-hidden border-2 border-orange-accent/40 shadow-[0_12px_32px_rgba(0,0,0,0.4)] bg-navy-dark">
                    <img
                      src={COMPANY_INFO.chairmanImage}
                      alt={COMPANY_INFO.chairman}
                      className="w-full h-full object-cover object-[35%_25%] transition-all duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-2.5 -right-2.5 w-8 h-8 rounded-full bg-orange-accent flex items-center justify-center text-white shadow-md">
                    <Award size={16} />
                  </div>
                </div>

                <div className="flex-1 min-w-[240px]">
                  <div className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-[20px] bg-orange-subtle border border-orange-accent/30 mb-4">
                    <Award size={14} className="text-teal-accent" />
                    <span className="font-mono text-[0.6875rem] tracking-[0.15em] uppercase text-orange-accent font-semibold">
                      {t('about.chairmanTitle')}
                    </span>
                  </div>

                  <h2 className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-white tracking-[-0.03em] leading-[1.1] mb-3">
                    {t('about.chairman')}
                  </h2>

                  <div className="w-[50px] h-[3px] bg-orange-accent rounded-sm mb-4.5" />

                  <div className="flex flex-wrap gap-2">
                    {[t('about.leaderTag1'), t('about.leaderTag2'), t('about.leaderTag3')].map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-white/80 bg-white/[0.06] py-1 px-2.5 rounded border border-white/[0.08]"
                      >
                        <ShieldCheck size={12} className="text-teal-accent" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Executive Quote / Vision Statement */}
              <div className="relative ltr:pl-[clamp(0px,3vw,24px)] rtl:pr-[clamp(0px,3vw,24px)] ltr:border-l rtl:border-r border-white/10">
                <Quote size={32} className="text-orange-accent opacity-50 mb-4" />
                <p className="font-body text-[clamp(1rem,1.5vw,1.1875rem)] leading-[1.65] text-white/90 font-normal italic mb-5">
                  "{t('about.quoteText')}"
                </p>
                <div className="font-mono text-xs tracking-[0.1em] uppercase text-orange-accent font-semibold">
                  {t('about.quoteAuthor')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Human Resources & Infrastructure */}
      <section
        ref={infraRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-warm-neutral transition-opacity duration-700 ease-[var(--ease-smooth)] ${
          infraVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="grid-2">
            {/* HR */}
            <div>
              <div className="section-label section-label-light mb-6">
                {t('about.hrLabel')}
              </div>
              <h3 className="font-heading text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold text-navy tracking-[-0.02em] leading-[1.2] mb-4">
                {t('about.hrTitle')}
              </h3>
              <p className="font-mono text-[0.5625rem] tracking-[0.15em] uppercase text-orange-accent mb-5">
                {t('about.hrSubtitle')}
              </p>
              <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted mb-6">
                {t('about.hrDesc')}
              </p>

              {/* Executive Management Cards */}
              <div className="flex flex-col gap-3.5">
                {/* Dr. Gehan Awad — Director of Fin. & Admin */}
                <div className="flex gap-[18px] items-center p-4 sm:p-5 px-5 sm:px-6 bg-white rounded-[14px] border border-gray-light border-l-4 border-l-orange-accent shadow-[0_4px_16px_rgba(10,22,40,0.04)]">
                  <div className="w-[44px] h-[44px] rounded-[10px] bg-orange-subtle flex items-center justify-center text-orange-accent shrink-0 font-heading font-bold text-sm tracking-wider">
                    GA
                  </div>
                  <div>
                    <h4 className="font-heading text-lg sm:text-xl font-bold text-navy mb-0.5">
                      {t('about.directorName')}
                    </h4>
                    <p className="font-mono text-xs text-orange-accent uppercase tracking-[0.08em] font-semibold">
                      {t('about.directorTitle')}
                    </p>
                    <p className="text-[0.8125rem] text-text-muted mt-1 leading-[1.45]">
                      {t('about.directorDesc')}
                    </p>
                  </div>
                </div>

                {/* Eng. Ahmed Hafez — General Manager */}
                <div className="flex gap-[18px] items-center p-4 sm:p-5 px-5 sm:px-6 bg-white rounded-[14px] border border-gray-light border-l-4 border-l-blue-medical shadow-[0_4px_16px_rgba(10,22,40,0.04)]">
                  <div className="w-[44px] h-[44px] rounded-[10px] bg-blue-subtle flex items-center justify-center text-blue-medical shrink-0 font-heading font-bold text-sm tracking-wider">
                    AH
                  </div>
                  <div>
                    <h4 className="font-heading text-lg sm:text-xl font-bold text-navy mb-0.5">
                      {t('about.gmName')}
                    </h4>
                    <p className="font-mono text-xs text-blue-medical uppercase tracking-[0.08em] font-semibold">
                      {t('about.gmTitle')}
                    </p>
                    <p className="text-[0.8125rem] text-text-muted mt-1 leading-[1.45]">
                      {t('about.gmDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Infrastructure */}
            <div className="border-l border-gray-light ltr:pl-[clamp(32px,5vw,60px)] rtl:pr-[clamp(32px,5vw,60px)]">
              <div className="section-label section-label-light mb-6">
                {t('about.infraLabel')}
              </div>
              <h3 className="font-heading text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold text-navy tracking-[-0.02em] leading-[1.2] mb-4">
                {t('about.infraTitle')}
              </h3>
              <p className="font-mono text-[0.5625rem] tracking-[0.15em] uppercase text-orange-accent mb-5">
                {t('about.infraSubtitle')}
              </p>
              <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted">
                {t('about.infraDesc')}
              </p>
            </div>
          </div>

          {/* Engineering Team Photographic Strip */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-4.5">
              <span className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-orange-accent font-semibold">
                {t('about.teamStripLabel')}
              </span>
              <Link to="/gallery" className="font-mono text-xs text-navy no-underline font-semibold hover:text-blue-medical transition-colors">
                {t('about.viewGallery')}
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
              <div className="h-[180px] rounded-xl overflow-hidden border border-gray-light shadow-[0_4px_12px_rgba(10,22,40,0.06)]">
                <img src={`${BASE}images/team/team-dsc00636.jpg`} alt="Nour Medical Technical Team" className="w-full h-full object-cover" />
              </div>
              <div className="h-[180px] rounded-xl overflow-hidden border border-gray-light shadow-[0_4px_12px_rgba(10,22,40,0.06)]">
                <img src={`${BASE}images/team/team-dsc00614.jpg`} alt="Nour Medical Field Engineering" className="w-full h-full object-cover" />
              </div>
              <div className="h-[180px] rounded-xl overflow-hidden border border-gray-light shadow-[0_4px_12px_rgba(10,22,40,0.06)]">
                <img src={`${BASE}images/team/team-gathering-1.jpeg`} alt="Nour Medical Annual Gathering" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="rule my-[60px] mb-[50px]" />

          {/* CTA */}
          <div className="flex justify-between items-center flex-wrap gap-6">
            <p className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-navy tracking-[-0.015em] max-w-[480px]">
              {t('about.ctaTitle')}
            </p>
            <Link to="/contact" className="btn btn-primary gap-2">
              {t('about.ctaBtn')}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
