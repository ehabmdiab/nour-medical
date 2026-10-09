import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Wrench,
  Package,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PhoneCall,
} from 'lucide-react';
import { SERVICES, COMPANY_CONTACT, COMPANY_INFO } from '../data/companyData';

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

  const AMC_SYSTEMS = [
    {
      title: 'Cath-Lab / Interventional',
      badge: 'High-Demand Systems',
      description:
        'Priority emergency response, comprehensive component coverage, high-heat tube replacement programmes, and high-voltage calibration for cardiac angiography suites.',
    },
    {
      title: 'C-Arm Surgical Systems',
      badge: 'Operating Theatres',
      description:
        'Preventive optics and laser alignment, image intensifier service, mechanical balance checks, and radiation dose calibration across major OEM brands.',
    },
    {
      title: 'Digital X-Ray Systems',
      badge: 'Radiology Suites',
      description:
        'Flat panel detector pixel defect calibration, high-frequency generator maintenance, and software updates for legacy and digital DR rooms.',
    },
    {
      title: 'CT Scanners',
      badge: 'Diagnostic Imaging',
      description:
        'Scheduled preventive maintenance, gantry slip-ring inspection, cooling subsystem audits, and tube performance monitoring regardless of original vendor.',
    },
    {
      title: 'MRI Modalities',
      badge: 'Advanced Imaging',
      description:
        'Cryogenic pressure and level monitoring, RF coil verification, gradient amplifier calibration, and preventive maintenance for diagnostic MRI suites.',
    },
  ];

  const INSTALLATION_MODALITIES = [
    {
      label: 'Cath-Lab Systems',
      description:
        'Turnkey site preparation, floor weight distribution calculation, and comprehensive AEA radiation safety commissioning.',
    },
    {
      label: 'Digital X-Ray Suites',
      description:
        'Fixed room and mobile DR flat panel detector integration, generator synchronization, and PACS workstation setup.',
    },
    {
      label: 'CT Scanners',
      description:
        'Heavy gantry rigging, precision laser leveling, lead radiation shielding verification, and cooling loop commissioning.',
    },
    {
      label: 'MRI Modalities',
      description:
        'Shielded RF enclosure setup, quench pipe routing, cold-line connection, and magnetic field shimming startup.',
    },
  ];

  return (
    <>
      {/* Page Header / Hero */}
      <section className="bg-gradient-to-b from-white to-warm-white pt-36 pb-20 relative overflow-hidden border-b border-gray-light">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,22,40,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,22,40,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute -right-[5%] top-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="container relative z-10">
          <div className="section-label">
            Core Capabilities & Solutions
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.75rem] font-bold text-navy tracking-tight leading-[0.94] max-w-[920px] mb-8">
            Healthcare Technology & Services
          </h1>
          <p className="font-body text-xl md:text-2xl leading-[1.7] text-text-muted max-w-[720px] mb-9">
            Nour Medical supports hospitals and diagnostic centers across Egypt through integrated service bands — covering rapid technical maintenance, genuine OEM spare parts, annual maintenance contracts (AMC), and turnkey equipment supply.
          </p>

          {/* Quick Jump Anchor Pills */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => scrollToSection('overview')}
              className="px-4 py-2 rounded-3xl bg-white border border-gray-light text-navy font-mono text-xs font-semibold cursor-pointer hover:border-blue-medical hover:text-blue-medical transition-all duration-200"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection('maintenance')}
              className="px-4 py-2 rounded-3xl bg-white border border-gray-light text-navy font-mono text-xs font-semibold cursor-pointer hover:border-blue-medical hover:text-blue-medical transition-all duration-200"
            >
              Technical Maintenance
            </button>
            <button
              onClick={() => scrollToSection('amc-portfolio')}
              className="px-4 py-2 rounded-3xl bg-white border border-gray-light text-navy font-mono text-xs font-semibold cursor-pointer hover:border-blue-medical hover:text-blue-medical transition-all duration-200"
            >
              AMC Portfolio
            </button>
            <button
              onClick={() => scrollToSection('installation-records')}
              className="px-4 py-2 rounded-3xl bg-white border border-gray-light text-navy font-mono text-xs font-semibold cursor-pointer hover:border-blue-medical hover:text-blue-medical transition-all duration-200"
            >
              Installations
            </button>
            <button
              onClick={() => scrollToSection('parts-infrastructure')}
              className="px-4 py-2 rounded-3xl bg-white border border-gray-light text-navy font-mono text-xs font-semibold cursor-pointer hover:border-blue-medical hover:text-blue-medical transition-all duration-200"
            >
              Parts Facility
            </button>
          </div>
        </div>
      </section>

      {/* Services Overview — The 2 Core Pillars */}
      <section
        id="overview"
        ref={overviewRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-white transition-opacity duration-700 ease-out ${overviewVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container">
          <div className="mb-12">
            <div className="section-label">Core Operations</div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy tracking-tight">
              Our Service Pillars
            </h2>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8">
            {SERVICES.map((service, i) => {
              const isMaintenancePillar = service.id === 'maintenance-support';

              return (
                <div
                  key={service.number}
                  className={`bg-white border border-gray-light rounded-3xl p-8 md:p-12 flex flex-col shadow-[0_4px_24px_rgba(15,23,42,0.04)] hover:border-blue-medical hover:shadow-[0_16px_40px_rgba(27,79,216,0.08)] transition-all duration-300 ${
                    overviewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{
                    transitionDelay: `${i * 0.15}s`,
                  }}
                >
                  {/* Top Tag & Number */}
                  <div className="flex items-center justify-between mb-7">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold tracking-wide uppercase ${
                        i === 0
                          ? 'bg-teal-accent/10 text-teal-accent'
                          : 'bg-blue-medical/[0.08] text-blue-medical'
                      }`}
                    >
                      {i === 0 ? <Wrench size={14} /> : <Package size={14} />}
                      {service.tag}
                    </span>

                    <span className="font-mono text-4xl font-light text-navy/20 leading-none">
                      {service.number}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-heading text-2xl md:text-[1.625rem] font-bold text-navy tracking-tight mb-1.5 leading-snug">
                    {service.title}
                  </h3>

                  <p className="font-mono text-[0.8125rem] text-blue-medical font-semibold mb-4">
                    {service.headline}
                  </p>

                  <p className="font-body text-[1.0625rem] leading-[1.65] text-text-muted mb-7">
                    {service.description}
                  </p>

                  <div className="h-px bg-gray-light mb-7" />

                  {/* Highlights Checklist */}
                  <div className="flex flex-col gap-4 mb-8 flex-1">
                    {service.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2
                          size={18}
                          className="text-teal-accent shrink-0 mt-0.5"
                        />
                        <div>
                          <h4 className="font-heading text-[1.125rem] font-bold text-navy mb-0.5">
                            {item.title}
                          </h4>
                          <p className="font-body text-[0.8125rem] leading-normal text-text-muted m-0">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer Link / CTA */}
                  {isMaintenancePillar ? (
                    <button
                      onClick={() => scrollToSection('maintenance')}
                      className="inline-flex items-center justify-between px-5 py-3.5 rounded-xl bg-warm-neutral border border-gray-light text-navy font-mono text-[0.8125rem] font-bold cursor-pointer transition-all duration-200 mt-auto hover:bg-navy hover:text-white"
                    >
                      <span>Explore Maintenance Band</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <Link
                      to={service.link}
                      className="inline-flex items-center justify-between px-5 py-3.5 rounded-xl bg-warm-neutral border border-gray-light text-navy font-mono text-[0.8125rem] font-bold no-underline transition-all duration-200 mt-auto hover:bg-navy hover:text-white"
                    >
                      <span>{service.linkText}</span>
                      <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          BAND 01: TECHNICAL MAINTENANCE & FIELD ENGINEERING
          ============================================================ */}
      <section
        id="maintenance"
        ref={maintenanceRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-warm-white border-y border-gray-light transition-opacity duration-700 ease-out ${maintenanceVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container">
          {/* Band Header */}
          <div className="max-w-[780px] mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-medical/10 text-blue-medical font-mono text-xs font-bold tracking-wide mb-4">
              <Wrench size={14} />
              SERVICE BAND 01 · TECHNICAL MAINTENANCE &amp; FIELD SUPPORT
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy tracking-tight leading-tight mb-4">
              Universal Multi-Vendor Maintenance &amp; AMC Support
            </h2>
            <p className="font-body text-base md:text-[1.0625rem] leading-[1.7] text-text-muted">
              Nour Medical provides comprehensive biomedical field service maintenance, scheduled preventive health checks, and genuine spare parts for all radiology devices we support — including third-party equipment originally supplied by other vendors across Egypt.
            </p>
          </div>

          {/* Key Commitments: Multi-Vendor + Spare Parts + 24/7 Hotline */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 mb-16">
            {/* Commitment 1: Multi-Vendor Support */}
            <div className="bg-white border border-gray-light rounded-[20px] p-9 md:p-[30px] flex flex-col shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:border-blue-medical hover:shadow-[0_12px_30px_rgba(27,79,216,0.08)] transition-all duration-300">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-accent/10 text-teal-accent font-mono text-xs font-bold tracking-wide mb-4.5 w-fit">
                <Wrench size={14} />
                UNIVERSAL MAINTENANCE SUPPORT
              </div>
              <h3 className="font-heading text-[1.625rem] font-bold text-navy mb-3 leading-snug">
                Service for All Equipment — Direct or Third-Party
              </h3>
              <p className="font-body text-[1.0625rem] leading-[1.65] text-text-muted mb-5">
                We maintain, calibrate, and repair medical radiology devices regardless of whether they were originally supplied by Nour Medical or purchased through third-party vendors.
              </p>
              <div className="flex items-center gap-2 mt-auto text-navy font-semibold text-[0.8125rem] font-mono">
                <CheckCircle2 size={16} className="text-teal-accent" />
                Multi-vendor technical coverage across all governorates
              </div>
            </div>

            {/* Commitment 2: Full Spare Parts Coverage */}
            <div className="bg-white border border-gray-light rounded-[20px] p-9 md:p-[30px] flex flex-col shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:border-blue-medical hover:shadow-[0_12px_30px_rgba(27,79,216,0.08)] transition-all duration-300">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-medical/[0.08] text-blue-medical font-mono text-xs font-bold tracking-wide mb-4.5 w-fit">
                <Package size={14} />
                FULL SPARE PARTS COVERAGE
              </div>
              <h3 className="font-heading text-[1.625rem] font-bold text-navy mb-3 leading-snug">
                Spare Parts for Every Supported Modality
              </h3>
              <p className="font-body text-[1.0625rem] leading-[1.65] text-text-muted mb-5">
                We stock and supply genuine OEM spare parts, X-ray tubes, high-voltage generators, and flat panel detectors for all modalities we work with, eliminating operational downtime.
              </p>
              <div className="flex items-center gap-2 mt-auto text-navy font-semibold text-[0.8125rem] font-mono">
                <ShieldCheck size={16} className="text-blue-medical" />
                1,000 m² central parts facility in Maadi, Cairo
              </div>
            </div>

            {/* Commitment 3: 24/7 Hotline & Emergency Dispatch */}
            <div className="bg-white border border-gray-light rounded-[20px] p-9 md:p-[30px] flex flex-col shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:border-blue-medical hover:shadow-[0_12px_30px_rgba(27,79,216,0.08)] transition-all duration-300">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 font-mono text-xs font-bold tracking-wide mb-4.5 w-fit">
                <Clock size={14} />
                24/7 RAPID DISPATCH
              </div>
              <h3 className="font-heading text-[1.625rem] font-bold text-navy mb-3 leading-snug">
                Under 2-Hour Response in Greater Cairo
              </h3>
              <p className="font-body text-[1.0625rem] leading-[1.65] text-text-muted mb-5">
                Immediate telephone diagnostic triage within 15 minutes and rapid field engineer mobilization with replacement parts to restore clinical operations without delay.
              </p>
              <div className="flex items-center gap-2 mt-auto text-navy font-semibold text-[0.8125rem] font-mono">
                <PhoneCall size={16} className="text-amber-600" />
                Direct senior biomedical engineer hotline
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMC Portfolio */}
      <section
        id="amc-portfolio"
        ref={amcRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-white transition-opacity duration-700 ease-out ${amcVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container">
          <div className="mb-12">
            <div className="section-label">Annual Maintenance Contracts (AMC)</div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy tracking-tight mb-4">
              Maintenance Portfolio by Modality
            </h2>
            <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted max-w-[620px]">
              Structured annual maintenance contracts providing scheduled preventive maintenance, priority emergency response, genuine replacement parts, and image quality calibration across all equipment modalities.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
            {AMC_SYSTEMS.map((sys, i) => (
              <div
                key={sys.title}
                className={`p-8 px-7 bg-warm-white rounded-2xl border border-gray-light flex flex-col hover:border-blue-medical hover:shadow-[0_10px_25px_rgba(27,79,216,0.07)] transition-all duration-300 ${
                  amcVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{
                  transitionDelay: `${i * 0.08}s`,
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
              <div className="section-label">Track Record Since {COMPANY_INFO.established}</div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy tracking-tight leading-tight mb-5">
                System Installation &amp; Rigging Expertise
              </h2>
              <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted mb-6">
                Since {COMPANY_INFO.established}, Nour Medical has installed advanced radiology and diagnostic imaging systems across hospitals, scan centers, and university facilities throughout Egypt.
              </p>
              <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted">
                Our engineering team manages full architectural site planning, radiation shielding lead construction, floor load structural validation, and Atomic Energy Authority (AEA) safety sign-off.
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
                Central Parts Infrastructure
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy leading-tight tracking-tight mb-4">
                Dedicated Parts Warehouse
              </h2>
              <div className="font-mono text-xs tracking-widest uppercase text-blue-medical font-bold mb-8">
                {COMPANY_INFO.partsFacilityM2} m² Storage Facility — {COMPANY_INFO.location}
              </div>
            </div>

            <div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-navy tracking-tight leading-snug mb-5">
                Comprehensive Inventory Supporting Direct &amp; Third-Party Systems
              </h3>
              <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted mb-8">
                Maintaining Egypt's largest specialized inventory of OEM X-ray tubes, high-voltage generators, flat panel detectors, power supplies, and ICU components in Maadi allows Nour Medical to supply genuine replacement parts rapidly, eliminating costly hospital operational downtime.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn btn-primary gap-2">
                  Request Technical Support or Parts
                  <ArrowRight size={15} />
                </Link>
                <a
                  href={`tel:${COMPANY_CONTACT.mobile[0]}`}
                  className="btn btn-outline gap-2 bg-white"
                >
                  <PhoneCall size={15} />
                  Emergency Hotline: {COMPANY_CONTACT.mobile[0]}
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
              <div className="section-label">Service Philosophy</div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy tracking-tight leading-tight">
                Beyond Supply &amp; Installation
              </h2>
            </div>
            <div>
              <blockquote className="font-heading text-xl md:text-2xl italic text-navy leading-snug border-l-[3px] border-blue-medical pl-7 mb-6">
                "Reliable equipment is only part of the equation. Continuous technical support and genuine local spare parts are essential to maintaining uninterrupted healthcare operations."
              </blockquote>
              <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted">
                Our integrated approach ensures that healthcare facilities receive swift engineering assistance, instant access to our {COMPANY_INFO.partsFacilityM2} m² Maadi spare parts facility, and structured annual maintenance programs throughout the operational lifespan of their medical technology.
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
              24/7 Technical Response
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight max-w-[560px]">
              Need Immediate Technical Field Assistance or AMC Consultation?
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="btn btn-primary gap-2 shrink-0"
            >
              Contact Engineering Team
              <ArrowRight size={15} />
            </Link>
            <a
              href={`tel:${COMPANY_CONTACT.phone[0].replace(/\s/g, '')}`}
              className="btn btn-outline-white gap-2 shrink-0"
            >
              <PhoneCall size={15} />
              Cairo Office: {COMPANY_CONTACT.phone[0]}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
