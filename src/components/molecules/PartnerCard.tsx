import React from 'react';
import { HolographicCard3D } from './HolographicCard3D';
import type { SupplierPartner } from '../../data/companyData';
import { Globe } from 'lucide-react';

interface PartnerCardProps {
  partner: SupplierPartner;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  return (
    <HolographicCard3D className="h-full flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-xs font-mono text-cyan-800 font-bold">
            OFFICIAL DISTRIBUTOR
          </span>
          <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-cyan-600" />
            {partner.country} {partner.flag}
          </span>
        </div>

        <div className="h-16 flex items-center mb-4">
          <span className="text-2xl font-heading font-black text-slate-900 tracking-wider">
            {partner.name}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-6">
          {partner.description}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <div className="text-[10px] font-mono text-slate-500 uppercase mb-2">SPECIALTIES & PRODUCTS</div>
        <div className="flex flex-wrap gap-1.5">
          {partner.specialties.map((spec: string, idx: number) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-heading font-medium text-slate-800">
              {spec}
            </span>
          ))}
        </div>
      </div>
    </HolographicCard3D>
  );
};
