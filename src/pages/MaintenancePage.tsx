import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Package, ShieldCheck, CheckCircle2 } from 'lucide-react';
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

export const MaintenancePage: React.FC = () => {
  const { t } = useLanguage();
  const { ref: commitmentRef, visible: commitmentVisible } = useReveal();
  const { ref: portfolioRef, visible: portfolioVisible } = useReveal();
  const { ref: installRef, visible: installVisible } = useReveal();
  const { ref: infraRef, visible: infraVisible } = useReveal();

  const AMC_SYSTEMS = [
    {
      title: t('maintenance.amcCathLabTitle'),
      description: t('maintenance.amcCathLabDesc'),
    },
    {
      title: t('maintenance.amcCArmTitle'),
      description: t('maintenance.amcCArmDesc'),
    },
    {
      title: t('maintenance.amcDrTitle'),
      description: t('maintenance.amcDrDesc'),
    },
    {
      title: t('maintenance.amcCtTitle'),
      description: t('maintenance.amcCtDesc'),
    },
    {
      title: t('maintenance.amcMriTitle'),
      description: t('maintenance.amcMriDesc'),
    },
  ];

  const INSTALLATION_MODALITIES = [
    {
      label: t('maintenance.installCathLab'),
      description: t('maintenance.installCathLabDesc'),
    },
    {
      label: t('maintenance.installDr'),
      description: t('maintenance.installDrDesc'),
    },
    {
      label: t('maintenance.installCt'),
      description: t('maintenance.installCtDesc'),
    },
  ];

  return (
    <>
      {/* Page Header */}
      <section className="bg-navy text-white pt-36 pb-20 relative overflow-hidden border-b border-white/10 z-[1]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute -right-[10%] top-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(27,79,216,0.18)_0%,transparent_70%)] pointer-events-none" />

        <div className="container relative z-10">
          <div className="section-label">
            {t('maintenance.heroBadge')}
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.75rem] font-bold text-white tracking-tight leading-[0.94] max-w-[920px] mb-8">
            {t('maintenance.heroTitle')}
          </h1>
          <p className="font-body text-xl md:text-2xl leading-[1.7] text-white/80 max-w-[650px]">
            {t('maintenance.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Core Maintenance Commitments */}
      <section
        ref={commitmentRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-warm-white transition-opacity duration-700 ease-out ${
          commitmentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Commitment 1: Multi-Vendor Service */}
            <div className="bg-white border border-warm-neutral rounded-[20px] p-9 md:p-[30px] flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-blue-medical hover:shadow-[0_12px_30px_rgba(0,51,102,0.06)] transition-all duration-300">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-accent/[0.08] text-teal-accent font-mono text-xs font-bold tracking-wide mb-4.5 w-fit">
                <Wrench size={14} />
                {t('maintenance.commit1Badge')}
              </div>
              <h3 className="font-heading text-[1.625rem] font-bold text-navy mb-3 leading-snug">
                {t('maintenance.commit1Title')}
              </h3>
              <p className="font-body text-[1.0625rem] leading-[1.65] text-text-muted mb-4">
                {t('maintenance.commit1Desc')}
              </p>
              <div className="flex items-center gap-2 mt-auto text-navy font-semibold text-[0.8125rem] font-mono">
                <CheckCircle2 size={16} className="text-teal-accent" />
                {t('maintenance.commit1Foot')}
              </div>
            </div>

            {/* Commitment 2: Spare Parts for All Supported Modalities */}
            <div className="bg-white border border-warm-neutral rounded-[20px] p-9 md:p-[30px] flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-blue-medical hover:shadow-[0_12px_30px_rgba(0,51,102,0.06)] transition-all duration-300">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-medical/[0.08] text-blue-medical font-mono text-xs font-bold tracking-wide mb-4.5 w-fit">
                <Package size={14} />
                {t('maintenance.commit2Badge')}
              </div>
              <h3 className="font-heading text-[1.625rem] font-bold text-navy mb-3 leading-snug">
                {t('maintenance.commit2Title')}
              </h3>
              <p className="font-body text-[1.0625rem] leading-[1.65] text-text-muted mb-4">
                {t('maintenance.commit2Desc')}
              </p>
              <div className="flex items-center gap-2 mt-auto text-navy font-semibold text-[0.8125rem] font-mono">
                <ShieldCheck size={16} className="text-blue-medical" />
                {t('maintenance.commit2Foot')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMC Portfolio */}
      <section
        ref={portfolioRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-white transition-opacity duration-700 ease-out ${
          portfolioVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="mb-12">
            <div className="section-label">{t('maintenance.amcLabel')}</div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy tracking-tight mb-4">
              {t('maintenance.amcTitle')}
            </h2>
            <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted max-w-[580px]">
              {t('maintenance.amcDesc')}
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
            {AMC_SYSTEMS.map((sys, i) => (
              <div
                key={sys.title}
                className={`p-8 px-7 bg-warm-white rounded-2xl border border-warm-neutral flex flex-col transition-all duration-500 hover:border-blue-medical hover:shadow-[0_10px_25px_rgba(27,79,216,0.07)] ${
                  portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div className="font-mono text-[0.625rem] tracking-widest uppercase text-teal-accent font-bold mb-3">
                  {t('maintenance.amcModalityLabel')}
                </div>
                <h3 className="font-heading text-xl font-bold text-navy mb-2.5">
                  {sys.title}
                </h3>
                <p className="font-body text-base leading-relaxed text-text-muted">
                  {sys.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Track Record */}
      <section
        ref={installRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-warm-white transition-opacity duration-700 ease-out ${
          installVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10 lg:gap-24 items-start">
            <div>
              <div className="section-label">{t('maintenance.trackRecordLabel')}</div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy tracking-tight leading-tight mb-5">
                {t('maintenance.trackRecordTitle')}
              </h2>
              <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted">
                {t('maintenance.trackRecordDesc')}
              </p>
            </div>

            <div className="flex flex-col">
              {INSTALLATION_MODALITIES.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col py-6 border-b border-gray-light transition-all duration-500 ${
                    installVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}
                  style={{
                    transitionDelay: `${i * 0.1}s`,
                  }}
                >
                  <span className="font-heading text-xl text-navy font-bold mb-1">
                    {stat.label}
                  </span>
                  <span className="font-body text-base text-text-muted">
                    {stat.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Parts Infrastructure */}
      <section
        ref={infraRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-warm-neutral transition-opacity duration-700 ease-out ${
          infraVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10 lg:gap-24 items-center">
            <div>
              <div className="section-label mb-6">
                {t('maintenance.partsLabel')}
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy leading-tight tracking-tight mb-4">
                {t('maintenance.partsTitle')}
              </h2>
              <div className="font-mono text-[0.625rem] tracking-widest uppercase text-teal-accent mb-8">
                {t('maintenance.partsSubtitle')}
              </div>
            </div>

            <div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-navy tracking-tight leading-snug mb-5">
                {t('maintenance.partsHeading')}
              </h3>
              <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted mb-8">
                {t('maintenance.partsDesc')}
              </p>
              <Link to="/contact" className="btn btn-primary gap-2">
                {t('maintenance.partsBtn')}
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
