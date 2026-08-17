import React, { useState } from 'react';
import { CLIENT_HOSPITALS } from '../../data/companyData';
import type { ClientHospital } from '../../data/companyData';
import { ClientPinNode } from '../molecules/ClientPinNode';
import { SectionHeading } from '../atoms/SectionHeading';
import { Badge } from '../atoms/Badge';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const EgyptMap3D: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<ClientHospital>(CLIENT_HOSPITALS[0]);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredHospitals = activeFilter === 'all'
    ? CLIENT_HOSPITALS
    : CLIENT_HOSPITALS.filter(h => h.region === activeFilter);

  const getPinStyle = (lat: number, lng: number) => {
    const top = ((31.8 - lat) / (31.8 - 24.0)) * 100;
    const left = ((lng - 25.0) / (35.0 - 25.0)) * 100;
    return { top: `${Math.max(12, Math.min(88, top))}%`, left: `${Math.max(10, Math.min(90, left))}%` };
  };

  return (
    <section className="py-28 relative bg-[#f8fafc] overflow-hidden border-t border-slate-200">
      <div className="bg-grid-pattern absolute inset-0 opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          eyebrow="EGYPTIAN INSTALLATION NETWORK"
          title="Interactive Hospital & Clinical Deployment Map"
          subtitle="Discover Nour Medical's active radiology suites, CT installations, and Cath-Lab servicing projects across Greater Cairo, Alexandria, Delta, and Sinai."
        />

        {/* Region Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {['all', 'Cairo', 'Alexandria', 'Delta', 'Sinai'].map((region) => (
            <button
              key={region}
              onClick={() => setActiveFilter(region)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                activeFilter === region
                  ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-300'
              }`}
            >
              {region === 'all' ? 'All Egypt' : region}
            </button>
          ))}
        </div>

        {/* Main Interactive Map & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Map Surface Container (Left 7 Cols) */}
          <div className="lg:col-span-7 relative h-[500px] md:h-[600px] rounded-3xl bg-slate-100/90 border border-slate-300 p-6 overflow-hidden shadow-sm">
            <div className="scanline-overlay" />
            
            {/* Stylized Egypt Vector Outline Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
              <svg className="w-full h-full text-slate-400" viewBox="0 0 500 500" fill="currentColor">
                <path d="M 120 100 Q 250 80 400 120 L 450 350 L 380 450 L 150 420 Z" opacity="0.15" />
                <path d="M 220 120 Q 240 180 230 300 L 235 440" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.3" />
              </svg>
            </div>

            {/* Title Legend Overlay */}
            <div className="absolute top-6 left-6 z-20 space-y-1">
              <div className="text-[10px] font-mono text-cyan-700 tracking-widest uppercase font-bold">LIVE GEOGRAPHIC DEPLOYMENT</div>
              <div className="text-lg font-heading font-extrabold text-slate-900">Nour Medical Clients in Egypt</div>
            </div>

            {/* Dynamic Map Pins */}
            {filteredHospitals.map((hospital) => (
              <ClientPinNode
                key={hospital.id}
                client={hospital}
                isSelected={selectedClient.id === hospital.id}
                onSelect={(h) => setSelectedClient(h)}
                style={getPinStyle(hospital.lat, hospital.lng)}
              />
            ))}
          </div>

          {/* Selected Hospital Details Panel (Right 5 Cols) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedClient.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-panel glass-panel-hover rounded-3xl p-8 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="cyan">{selectedClient.type}</Badge>
                  <span className="text-xs font-mono text-cyan-700 font-bold">{selectedClient.region}</span>
                </div>

                <div>
                  <h3 className="text-2xl font-heading font-extrabold text-slate-900 mb-1">
                    {selectedClient.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-600">{selectedClient.city}, Egypt</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-mono text-slate-500 uppercase">INSTALLED DEPLOYMENT</div>
                  <div className="text-sm font-heading font-bold text-slate-900">{selectedClient.installations.join(', ')}</div>
                  <div className="text-xs text-slate-600">Serviced under active preventive maintenance contract.</div>
                </div>

                {/* Installed Specs List */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-mono text-slate-700 uppercase tracking-wider font-bold">DEPLOYED INSTALLATIONS</h4>
                  <div className="space-y-2">
                    {selectedClient.installations.map((inst: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                        <span className="text-xs font-heading font-medium text-slate-800">{inst}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-sm transition-all">
                  <span>View Hospital Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
