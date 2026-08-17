import React from 'react';
import { PageTransition } from '../components/templates/PageTransition';
import { ServicesTimeline } from '../components/organisms/ServicesTimeline';
import { SectionHeading } from '../components/atoms/SectionHeading';
import { MagneticButton } from '../components/atoms/MagneticButton';
import { ShieldCheck, Clock, Box, Wrench, PhoneCall } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="pt-32 pb-24 bg-[#f8fafc] min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="PRECISION BIOMEDICAL ENGINEERING"
            title="Installation, Maintenance & After-Sales"
            subtitle="Built like a precision engineering operation: 24/7 hotline response, 1,000m² Cairo spare parts storage, and certified field technicians."
          />

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
              <Clock className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
              <span className="text-2xl font-heading font-extrabold text-slate-900 block mb-1">Under 2 Hours</span>
              <span className="text-xs font-mono text-slate-600">Cairo Emergency Hotline Response</span>
            </div>
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
              <Box className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
              <span className="text-2xl font-heading font-extrabold text-slate-900 block mb-1">1,000 m²</span>
              <span className="text-xs font-mono text-slate-600">Maadi Central Parts Inventory</span>
            </div>
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
              <Wrench className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
              <span className="text-2xl font-heading font-extrabold text-slate-900 block mb-1">50+ Engineers</span>
              <span className="text-xs font-mono text-slate-600">Certified Field Technicians</span>
            </div>
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
              <ShieldCheck className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
              <span className="text-2xl font-heading font-extrabold text-slate-900 block mb-1">100% QA</span>
              <span className="text-xs font-mono text-slate-600">Atomic Energy Authority Standard</span>
            </div>
          </div>
        </div>

        <ServicesTimeline />

        <div className="max-w-4xl mx-auto px-6 mt-16 text-center">
          <div className="glass-panel p-10 rounded-3xl border border-slate-300 shadow-lg">
            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-3">Need Immediate Emergency Engineering Support?</h3>
            <p className="text-xs text-slate-600 max-w-xl mx-auto mb-6">
              Our 24/7 hotline dispatches field engineers with OEM spare parts directly to your hospital anywhere in Egypt.
            </p>
            <MagneticButton
              onClick={() => navigate('/contact')}
              variant="primary"
              icon={<PhoneCall className="w-4 h-4" />}
            >
              Contact Emergency Hotline
            </MagneticButton>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
