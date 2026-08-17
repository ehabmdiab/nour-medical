import React from 'react';
import { PageTransition } from '../components/templates/PageTransition';
import { MedicalScanScene } from '../components/organisms/MedicalScanScene';
import { MagneticButton } from '../components/atoms/MagneticButton';
import { RevealText } from '../components/atoms/RevealText';
import { StatsSection } from '../components/organisms/StatsSection';
import { ProductShowcase } from '../components/organisms/ProductShowcase';
import { ServicesTimeline } from '../components/organisms/ServicesTimeline';
import { EgyptMap3D } from '../components/organisms/EgyptMap3D';
import { SUPPLIER_PARTNERS } from '../data/companyData';
import { PartnerCard } from '../components/molecules/PartnerCard';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, ChevronDown, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      {/* 1. HERO SECTION - CT/MRI Scanner 3D Interactive Viewport */}
      <section className="relative h-screen min-h-[750px] w-full flex items-center justify-center overflow-hidden pt-20 bg-[#f8fafc]">
        <div className="bg-grid-pattern absolute inset-0 opacity-60 pointer-events-none" />
        <div className="scanline-overlay" />

        {/* 3D R3F CT/MRI Scanner Model */}
        <div className="absolute inset-0 z-0 opacity-100">
          <MedicalScanScene />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-cyan-500/30 text-cyan-700 text-xs font-mono tracking-widest uppercase mb-6 pointer-events-auto shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            <Cpu className="w-3.5 h-3.5 text-cyan-600" />
            <span>RADIOLOGY SCANNER & CATH-LAB TECHNOLOGY</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black tracking-tight text-slate-900 mb-6 uppercase leading-none"
          >
            PRECISION <br className="hidden sm:block" />
            <span className="text-gradient-cyan">RADIOLOGY TECH.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-base sm:text-xl md:text-2xl text-slate-600 max-w-3xl font-normal leading-relaxed mb-10 text-balance"
          >
            Turnkey CT/MRI gantry assembly, flat panel DR detectors, Cath-Lab equipment installation & 24/7 hotline technical maintenance in Egypt.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-5 pointer-events-auto"
          >
            <MagneticButton
              onClick={() => navigate('/products')}
              variant="primary"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Medical Equipment
            </MagneticButton>
            <MagneticButton
              onClick={() => navigate('/services')}
              variant="glass"
            >
              Engineering & Maintenance
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll Prompt */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none text-slate-500"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL TO INSPECT</span>
          <ChevronDown className="w-4 h-4 text-cyan-600" />
        </motion.div>
      </section>

      {/* 2. EDITORIAL STATEMENT INTRO SECTION */}
      <section className="py-32 relative bg-slate-50 border-t border-slate-200 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
          <span className="text-xs font-mono text-cyan-700 tracking-widest uppercase mb-6 block font-bold">
            OUR POSITIONING & PROMISE
          </span>
          <RevealText
            text="Precision imaging equipment. Rapid emergency engineering response."
            className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-slate-900 text-center justify-center leading-tight mb-8"
          />
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl font-normal leading-relaxed">
            Established in 2015, Nour Medical has built Egypt’s leading healthcare technology infrastructure — integrating advanced radiology devices, flat panel DR detectors, central sterilization systems, and a 1,000m² spare parts facility in Maadi, Cairo.
          </p>
        </div>
      </section>

      {/* 3. MILESTONE STATISTICS SECTION */}
      <StatsSection />

      {/* 4. PRODUCTS SHOWCASE */}
      <ProductShowcase />

      {/* 5. SERVICES TIMELINE */}
      <ServicesTimeline />

      {/* 6. GLOBAL SUPPLIER PARTNERS SECTION */}
      <section className="py-24 relative bg-slate-50 overflow-hidden border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-cyan-700 tracking-widest uppercase block mb-3 font-bold">GLOBAL TECHNOLOGY PARTNERS</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900">World-Class Supplier Ecosystem</h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto mt-4">
              Direct official distribution & technical partnerships with market leaders across the USA, Taiwan, and China.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SUPPLIER_PARTNERS.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE EGYPT HOSPITAL MAP */}
      <EgyptMap3D />

      {/* 8. FINAL CINEMATIC CTA */}
      <section className="py-32 relative bg-white overflow-hidden border-t border-slate-200 text-center">
        <div className="bg-grid-pattern absolute inset-0 opacity-60 pointer-events-none" />
        <div className="scanline-overlay" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-cyan-600/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 mb-6 cyan-glow">
            <Activity className="w-8 h-8" />
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-slate-900 tracking-tight mb-6 uppercase">
            LET'S BUILD THE FUTURE <br />
            <span className="text-gradient-cyan">OF HEALTHCARE.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed">
            Partner with Nour Medical for turnkey radiology suite installations, preventive maintenance contracts, and 24/7 technical hotline support in Egypt.
          </p>

          <MagneticButton
            onClick={() => navigate('/contact')}
            variant="primary"
            className="py-4 px-10 text-base"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Contact Nour Medical
          </MagneticButton>
        </div>
      </section>
    </PageTransition>
  );
};
