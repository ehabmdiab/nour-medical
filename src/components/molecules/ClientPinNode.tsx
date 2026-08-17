import React from 'react';
import type { ClientHospital } from '../../data/companyData';
import { MapPin, Building2, CheckCircle } from 'lucide-react';

interface ClientPinNodeProps {
  client: ClientHospital;
  isSelected: boolean;
  onSelect: (client: ClientHospital) => void;
  style: React.CSSProperties;
}

export const ClientPinNode: React.FC<ClientPinNodeProps> = ({
  client,
  isSelected,
  onSelect,
  style,
}) => {
  return (
    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20" style={style}>
      {/* Pulse Pin Ring */}
      <button
        onClick={() => onSelect(client)}
        className={`relative flex items-center justify-center p-2.5 rounded-full transition-all duration-300 ${
          isSelected
            ? 'bg-cyan-600 text-white scale-125 shadow-lg shadow-cyan-500/40 z-30 ring-4 ring-cyan-200'
            : 'bg-white text-cyan-700 border border-cyan-300 hover:scale-110 hover:border-cyan-500 shadow-md'
        }`}
      >
        <span className="absolute inset-0 rounded-full bg-cyan-400/40 animate-ping" />
        <MapPin className="w-4 h-4 relative z-10" />
      </button>

      {/* Tooltip Hover Preview */}
      <div
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-60 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl pointer-events-none transition-all duration-300 ${
          isSelected ? 'opacity-100 translate-y-0 scale-100 z-40' : 'opacity-0 translate-y-2 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100'
        }`}
      >
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-700 uppercase mb-1 font-bold">
          <Building2 className="w-3 h-3 text-cyan-600" />
          <span>{client.city} • {client.region}</span>
        </div>
        <h4 className="text-sm font-heading font-extrabold text-slate-900 mb-1">{client.name}</h4>
        <span className="text-[10px] text-slate-500 block mb-2 font-medium">{client.type}</span>

        <div className="space-y-1.5 pt-2 border-t border-slate-200">
          {client.installations.slice(0, 2).map((inst, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
              <CheckCircle className="w-3 h-3 text-cyan-600 shrink-0" />
              <span className="truncate">{inst}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
