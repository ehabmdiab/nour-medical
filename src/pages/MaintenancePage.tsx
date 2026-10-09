import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Package, ShieldCheck, CheckCircle2 } from 'lucide-react';

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
  const { ref: commitmentRef, visible: commitmentVisible } = useReveal();
  const { ref: portfolioRef, visible: portfolioVisible } = useReveal();
  const { ref: installRef, visible: installVisible } = useReveal();
  const { ref: infraRef, visible: infraVisible } = useReveal();

  const AMC_SYSTEMS = [
    {
      title: 'Cath-Lab / Interventional',
      description:
        'Priority response, comprehensive component coverage, and tube replacement programmes for all major systems.',
    },
    {
      title: 'C-Arm Surgical Systems',
      description:
        'Preventive calibration, image intensifier service, and mechanical safety checks across multiple OEM brands.',
    },
    {
      title: 'Digital X-Ray Systems',
      description:
        'Flat panel detector calibration, generator maintenance, and software updates for legacy & digital DR units.',
    },
    {
      title: 'CT Scanners',
      description:
        'Regular preventive maintenance, tube monitoring, and cooling system inspection regardless of initial supplier.',
    },
    {
      title: 'MRI Systems',
      description:
        'Cryogenic monitoring, coil inspection, gradient calibration, and preventative service for diagnostic MRI suites.',
    },
  ];

  const INSTALLATION_MODALITIES = [
    {
      label: 'Cath-Lab Systems',
      description: 'Turnkey site preparation, installation, and commissioning.',
    },
    {
      label: 'Digital X-Ray Suites',
      description: 'Fixed room and mobile DR detector integration.',
    },
    {
      label: 'CT Scanners',
      description: 'Full installation and room shielding compliance support.',
    },
    {
      label: 'MRI Modalities',
      description: 'Shielded enclosure setup, cold line connection, and system startup.',
    },
  ];

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-white to-warm-white pt-36 pb-20 relative overflow-hidden border-b border-gray-light">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,22,40,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,22,40,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute -right-[5%] top-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="container relative z-10">
          <div className="section-label">
            Engineering & Maintenance Division
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.75rem] font-bold text-navy tracking-tight leading-[0.94] max-w-[900px] mb-8">
            Medical Equipment Maintenance & Technical Services
          </h1>
          <p className="font-body text-xl md:text-2xl leading-[1.7] text-text-muted max-w-[680px]">
            From preventive calibration to emergency board repair and tube replacements — our certified engineering team keeps critical hospital equipment operational across Egypt.
          </p>
        </div>
      </section>

      {/* Universal Service & Parts Commitments Banner */}
      <section
        ref={commitmentRef as React.RefObject<HTMLElement>}
        className={`py-16 bg-warm-white border-b border-warm-neutral transition-opacity duration-700 ease-out ${
          commitmentVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
            {/* Commitment 1: Multi-Vendor Maintenance */}
            <div className="bg-white border border-warm-neutral rounded-[20px] p-9 md:p-[30px] flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-blue-medical hover:shadow-[0_12px_30px_rgba(0,51,102,0.06)] transition-all duration-300">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-accent/10 text-teal-accent font-mono text-xs font-bold tracking-wide mb-4.5 w-fit">
                <Wrench size={14} />
                UNIVERSAL MAINTENANCE SUPPORT
              </div>
              <h3 className="font-heading text-[1.625rem] font-bold text-navy mb-3 leading-snug">
                Service for All Equipment — Direct or Third-Party
              </h3>
              <p className="font-body text-[1.0625rem] leading-[1.65] text-text-muted mb-4">
                We maintain and repair medical radiology devices regardless of whether they were originally supplied by Nour Medical or purchased through third-party vendors.
              </p>
              <div className="flex items-center gap-2 mt-auto text-navy font-semibold text-[0.8125rem] font-mono">
                <CheckCircle2 size={16} className="text-teal-accent" />
                Multi-vendor technical coverage across Egypt
              </div>
            </div>

            {/* Commitment 2: Spare Parts for All Supported Modalities */}
            <div className="bg-white border border-warm-neutral rounded-[20px] p-9 md:p-[30px] flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-blue-medical hover:shadow-[0_12px_30px_rgba(0,51,102,0.06)] transition-all duration-300">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-medical/[0.08] text-blue-medical font-mono text-xs font-bold tracking-wide mb-4.5 w-fit">
                <Package size={14} />
                FULL SPARE PARTS COVERAGE
              </div>
              <h3 className="font-heading text-[1.625rem] font-bold text-navy mb-3 leading-snug">
                Spare Parts for Every Supported Device Category
              </h3>
              <p className="font-body text-[1.0625rem] leading-[1.65] text-text-muted mb-4">
                We stock and supply genuine OEM spare parts, X-ray tubes, high-voltage generators, and flat panel detectors for all modalities we work with.
              </p>
              <div className="flex items-center gap-2 mt-auto text-navy font-semibold text-[0.8125rem] font-mono">
                <ShieldCheck size={16} className="text-blue-medical" />
                1,000 m² central parts facility in Maadi, Cairo
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
            <div className="section-label">AMC Portfolio</div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy tracking-tight mb-4">
              Annual Maintenance Contracts
            </h2>
            <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted max-w-[580px]">
              Structured annual maintenance contracts providing scheduled service, priority response, and genuine spare parts across all equipment modalities and third-party systems.
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
                  AMC Modality
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
              <div className="section-label">Track Record</div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy tracking-tight leading-tight mb-5">
                System Installation Expertise
              </h2>
              <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted">
                Since 2015, Nour Medical has installed advanced radiology and diagnostic imaging systems across hospitals, scan centers, and medical facilities throughout Egypt.
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
                Parts Infrastructure
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy leading-tight tracking-tight mb-4">
                Dedicated Parts Warehouse
              </h2>
              <div className="font-mono text-[0.625rem] tracking-widest uppercase text-teal-accent mb-8">
                Spare Parts Storage Facility — Maadi, Cairo
              </div>
            </div>

            <div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-navy tracking-tight leading-snug mb-5">
                Full Spare Parts Inventory Supporting All Modalities &amp; Third-Party Equipment
              </h3>
              <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted mb-8">
                Maintaining a 1,000 m² dedicated spare parts facility in Maadi, Cairo allows Nour Medical to supply genuine replacement parts for all imaging modalities we work with, eliminating operational delays for both our clients and third-party systems.
              </p>
              <Link to="/contact" className="btn btn-primary gap-2">
                Request Technical Support or Parts
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
