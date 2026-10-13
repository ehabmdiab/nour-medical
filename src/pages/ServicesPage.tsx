import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Wrench,
  Package,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
} from 'lucide-react';
import { COMPANY_CONTACT } from '../data/companyData';
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

export const ServicesPage: React.FC = () => {
  const { t } = useLanguage();
  const { ref: overviewRef, visible: overviewVisible } = useReveal();
  const { ref: maintenanceRef, visible: maintenanceVisible } = useReveal();
  const { ref: amcRef, visible: amcVisible } = useReveal();
  const { ref: installRef, visible: installVisible } = useReveal();
  const { ref: infraRef, visible: infraVisible } = useReveal();
  const { ref: philosophyRef, visible: philosophyVisible } = useReveal();

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const scrollToSection = (id: string): void => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const servicesData = [
    {
      number: '01',
      id: 'maintenance-support',
      title: t('services.service1Title'),
      tag: t('services.service1Tag'),
      headline: t('services.service1Headline'),
      description: t('services.service1Desc'),
      highlights: [
        { title: t('services.service1H1Title'), desc: t('services.service1H1Desc') },
        { title: t('services.service1H2Title'), desc: t('services.service1H2Desc') },
        { title: t('services.service1H3Title'), desc: t('services.service1H3Desc') },
      ],
      badge: t('services.service1Badge'),
      link: '/services#maintenance',
      linkText: t('services.service1LinkText'),
    },
    {
      number: '02',
      id: 'device-parts-supplier',
      title: t('services.service2Title'),
      tag: t('services.service2Tag'),
      headline: t('services.service2Headline'),
      description: t('services.service2Desc'),
      highlights: [
        { title: t('services.service2H1Title'), desc: t('services.service2H1Desc') },
        { title: t('services.service2H2Title'), desc: t('services.service2H2Desc') },
        { title: t('services.service2H3Title'), desc: t('services.service2H3Desc') },
      ],
      badge: t('services.service2Badge'),
      link: '/products',
      linkText: t('services.service2LinkText'),
    },
  ];

  const AMC_SYSTEMS = [
    {
      title: t('maintenance.amcCathLabTitle'),
      badge: t('maintenance.amcModalityLabel'),
      description: t('maintenance.amcCathLabDesc'),
    },
    {
      title: t('maintenance.amcCArmTitle'),
      badge: t('maintenance.amcModalityLabel'),
      description: t('maintenance.amcCArmDesc'),
    },
    {
      title: t('maintenance.amcDrTitle'),
      badge: t('maintenance.amcModalityLabel'),
      description: t('maintenance.amcDrDesc'),
    },
    {
      title: t('maintenance.amcCtTitle'),
      badge: t('maintenance.amcModalityLabel'),
      description: t('maintenance.amcCtDesc'),
    },
    {
      title: t('maintenance.amcMriTitle'),
      badge: t('maintenance.amcModalityLabel'),
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
            {t('services.heroBadge')}
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.75rem] font-bold text-white tracking-tight leading-[0.94] max-w-[880px] mb-8">
            {t('services.heroTitle')}
          </h1>
          <p className="font-body text-xl md:text-2xl leading-[1.7] text-white/80 max-w-[680px]">
            {t('services.subtitle')}
          </p>

          {/* Jump Anchors */}
          <div className="flex gap-3 mt-12 flex-wrap">
            {[
              { label: t('services.navOverview'), id: 'overview' },
              { label: t('services.navMaintenance'), id: 'maintenance' },
              { label: t('services.navAmc'), id: 'amc' },
              { label: t('services.navInstallation'), id: 'installation-records' },
              { label: t('services.navInfrastructure'), id: 'parts-infrastructure' },
            ].map((anchor) => (
              <button
                key={anchor.id}
                onClick={() => scrollToSection(anchor.id)}
                className="font-mono text-[0.8125rem] tracking-wide text-white/90 bg-white/10 px-4 py-2 rounded-full border border-white/15 cursor-pointer backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:bg-white/20 hover:border-orange-accent hover:text-white transition-all"
              >
                &darr; {anchor.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Overview — Core Capabilities */}
      <section
        id="overview"
        ref={overviewRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-white transition-opacity duration-700 ease-out ${
          overviewVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="mb-14">
            <div className="section-label">{t('services.pillarsLabel')}</div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy tracking-tight leading-tight">
              {t('services.pillarsTitle')}
            </h2>
          </div>

          <div className="flex flex-col gap-16">
            {servicesData.map((svc, i) => (
              <div
                key={svc.id}
                id={svc.id}
                className={`grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-start pb-16 ${
                  i < servicesData.length - 1 ? 'border-b border-gray-light' : ''
                } transition-all duration-500 ${
                  overviewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{
                  transitionDelay: `${i * 0.15}s`,
                }}
              >
                <div>
                  <div className="font-mono text-5xl font-light text-gray-light leading-none mb-4">
                    {svc.number}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-navy tracking-tight mb-2">
                    {svc.title}
                  </h3>
                  <div className="font-mono text-[0.5625rem] tracking-widest uppercase text-teal-accent font-bold mb-4">
                    {svc.tag}
                  </div>
                  <span className="inline-block px-3 py-1 bg-warm-neutral text-navy font-mono text-[0.625rem] rounded font-semibold">
                    {svc.badge}
                  </span>
                </div>

                <div>
                  <h4 className="font-heading text-xl md:text-2xl font-semibold text-navy tracking-tight mb-4">
                    {svc.headline}
                  </h4>
                  <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted mb-8 max-w-[640px]">
                    {svc.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {svc.highlights.map((h) => (
                      <div
                        key={h.title}
                        className="p-5 bg-warm-white rounded-xl border border-warm-neutral"
                      >
                        <h5 className="font-heading text-base font-bold text-navy mb-2">
                          {h.title}
                        </h5>
                        <p className="font-body text-[0.875rem] leading-relaxed text-text-muted m-0">
                          {h.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={svc.link}
                    className="btn btn-outline gap-2 text-sm"
                  >
                    {svc.linkText}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Universal Multi-Vendor Maintenance Section */}
      <section
        id="maintenance"
        ref={maintenanceRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-warm-white border-t border-gray-light transition-opacity duration-700 ease-out ${
          maintenanceVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="mb-12">
            <div className="section-label">{t('services.navMaintenance')}</div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy tracking-tight mb-4">
              {t('services.commitHeading')}
            </h2>
          </div>

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
        id="amc"
        ref={amcRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-white transition-opacity duration-700 ease-out ${
          amcVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="mb-12">
            <div className="section-label">{t('services.amcSectionLabel')}</div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy tracking-tight mb-4">
              {t('services.amcSectionTitle')}
            </h2>
            <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted max-w-[580px]">
              {t('services.amcSectionDesc')}
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
            {AMC_SYSTEMS.map((sys, i) => (
              <div
                key={sys.title}
                className={`p-8 px-7 bg-warm-white rounded-2xl border border-warm-neutral flex flex-col transition-all duration-500 hover:border-blue-medical hover:shadow-[0_10px_25px_rgba(27,79,216,0.07)] ${
                  amcVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div className="font-mono text-[0.625rem] tracking-widest uppercase text-teal-accent font-bold mb-3">
                  {sys.badge}
                </div>
                <h3 className="font-heading text-[1.625rem] font-bold text-navy mb-2.5 leading-snug">
                  {sys.title}
                </h3>
                <p className="font-body text-base leading-relaxed text-text-muted m-0">
                  {sys.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Installation Track Record */}
      <section
        id="installation-records"
        ref={installRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-warm-white border-t border-gray-light transition-opacity duration-700 ease-out ${installVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10 lg:gap-24 items-start">
            <div>
              <div className="section-label">{t('services.installTrackLabel')}</div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy tracking-tight leading-tight mb-5">
                {t('services.installTrackTitle')}
              </h2>
              <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted mb-6">
                {t('services.installTrackP1')}
              </p>
              <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted">
                {t('services.installTrackP2')}
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

      {/* Parts Infrastructure — 1,000 m² Maadi Facility */}
      <section
        id="parts-infrastructure"
        ref={infraRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-warm-neutral transition-opacity duration-700 ease-out ${infraVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10 lg:gap-24 items-center">
            <div>
              <div className="section-label mb-6">
                {t('services.infraSectionLabel')}
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy leading-tight tracking-tight mb-4">
                {t('services.infraSectionTitle')}
              </h2>
              <div className="font-mono text-xs tracking-widest uppercase text-blue-medical font-bold mb-8">
                {t('services.infraSectionSubtitle')}
              </div>
            </div>

            <div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-navy tracking-tight leading-snug mb-5">
                {t('services.infraHeading')}
              </h3>
              <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted mb-8">
                {t('services.infraDesc')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn btn-primary gap-2">
                  {t('services.infraRequestBtn')}
                  <ArrowRight size={15} />
                </Link>
                <a
                  href={`tel:${COMPANY_CONTACT.mobile[0]}`}
                  className="btn btn-outline gap-2 bg-white"
                >
                  <PhoneCall size={15} />
                  {t('services.infraHotline')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Philosophy */}
      <section
        id="philosophy"
        ref={philosophyRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-warm-white transition-opacity duration-700 ease-out ${philosophyVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10 lg:gap-24 items-center">
            <div>
              <div className="section-label">{t('services.philosophyLabel')}</div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy tracking-tight leading-tight">
                {t('services.philosophyTitle')}
              </h2>
            </div>
            <div>
              <blockquote className="font-heading text-xl md:text-2xl italic text-navy leading-snug border-l-[3px] border-blue-medical pl-7 rtl:border-l-0 rtl:border-r-[3px] rtl:pl-0 rtl:pr-7 mb-6">
                {t('services.philosophyQuote')}
              </blockquote>
              <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted">
                {t('services.philosophyDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Hotline / Consultation CTA Banner */}
      <section className="py-20 bg-navy">
        <div className="container flex justify-between items-center flex-wrap gap-8">
          <div>
            <div className="section-label text-white/40 mb-4">
              {t('services.bannerLabel')}
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight max-w-[560px]">
              {t('services.bannerTitle')}
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="btn btn-primary gap-2 shrink-0"
            >
              {t('services.bannerBtn')}
              <ArrowRight size={15} />
            </Link>
            <a
              href={`tel:${COMPANY_CONTACT.phone[0].replace(/\s/g, '')}`}
              className="btn btn-outline-white gap-2 shrink-0"
            >
              <PhoneCall size={15} />
              {t('services.bannerPhone')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
