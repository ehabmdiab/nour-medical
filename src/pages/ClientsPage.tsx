import React from 'react';
import { PageTransition } from '../components/templates/PageTransition';
import { EgyptMap3D } from '../components/organisms/EgyptMap3D';
import { SectionHeading } from '../components/atoms/SectionHeading';
import { CLIENT_HOSPITALS } from '../data/companyData';
import { CheckCircle } from 'lucide-react';
import { Badge } from '../components/atoms/Badge';

export const ClientsPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="pt-32 pb-24 bg-[#f8fafc] min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="CLIENT HOSPITALS & REFERENCE LIST"
            title="Trusted by Premier Egyptian Hospitals"
            subtitle="Explore our nationwide installation map and reference hospital partnerships across Egypt."
          />
        </div>

        <EgyptMap3D />

        {/* Directory Grid */}
        <div className="max-w-7xl mx-auto px-6 mt-16">
          <h3 className="text-xl font-heading font-extrabold text-slate-900 mb-8 border-b border-slate-200 pb-4">
            Authoritative Hospital Reference Directory
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIENT_HOSPITALS.map((client) => (
              <div key={client.id} className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="cyan">{client.city}</Badge>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">{client.region}</span>
                </div>
                <h4 className="text-lg font-heading font-extrabold text-slate-900 mb-1">{client.name}</h4>
                <span className="text-xs text-slate-500 block mb-4 font-mono">{client.type}</span>

                <div className="space-y-1.5 pt-3 border-t border-slate-200">
                  {client.installations.map((inst, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span className="truncate">{inst}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
