import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, MapPin, Phone, Mail } from 'lucide-react';
import { COMPANY_PROFILE } from '../../data/companyData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-100 border-t border-slate-200/80 pt-20 pb-12 overflow-hidden text-slate-800">
      <div className="bg-grid-pattern absolute inset-0 opacity-40 pointer-events-none" />
      <div className="scanline-overlay" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-cyan-600/10 border border-cyan-500/30 flex items-center justify-center">
                <Activity className="w-5 h-5 text-cyan-600" />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-wider text-slate-900">
                NOUR <span className="text-cyan-600">MEDICAL</span>
              </span>
            </Link>

            <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-md">
              {COMPANY_PROFILE.subtagline} Established 2015 in Cairo, Egypt. Specializing in radiology devices, medical equipment, hospital furniture, consumables, spare parts, installation, and 24/7 technical support.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-xs font-mono text-cyan-700">
                Est. {COMPANY_PROFILE.establishedYear}
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-sm">
                1,000 m² Parts Storage
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-mono text-cyan-700 uppercase tracking-widest mb-4">NAVIGATION</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li><Link to="/" className="hover:text-cyan-600 transition-colors">Home Experience</Link></li>
              <li><Link to="/products" className="hover:text-cyan-600 transition-colors">Radiology & Products</Link></li>
              <li><Link to="/services" className="hover:text-cyan-600 transition-colors">Services & Engineering</Link></li>
              <li><Link to="/gallery" className="hover:text-cyan-600 transition-colors">Showcase Gallery</Link></li>
              <li><Link to="/clients" className="hover:text-cyan-600 transition-colors">Client Hospitals Map</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-600 transition-colors">Contact Headquarters</Link></li>
            </ul>
          </div>

          {/* Global Partners */}
          <div>
            <h4 className="text-xs font-mono text-cyan-700 uppercase tracking-widest mb-4">GLOBAL PARTNERS</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li className="flex items-center justify-between">
                <span>RADMEDIX</span>
                <span className="text-[10px] font-mono text-slate-500">USA 🇺🇸</span>
              </li>
              <li className="flex items-center justify-between">
                <span>INNOCARE</span>
                <span className="text-[10px] font-mono text-slate-500">Taiwan 🇹🇼</span>
              </li>
              <li className="flex items-center justify-between">
                <span>LONWIN</span>
                <span className="text-[10px] font-mono text-slate-500">China 🇨🇳</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-mono text-cyan-700 uppercase tracking-widest mb-4">CAIRO HEADQUARTERS</h4>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span>{COMPANY_PROFILE.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>02 25267173 / 02 25267175</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-600 shrink-0" />
                <a href={`mailto:${COMPANY_PROFILE.email}`} className="hover:text-cyan-600 transition-colors font-mono">
                  {COMPANY_PROFILE.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_PROFILE.name}. All rights reserved. Cairo, Egypt.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-900 cursor-pointer">Regulatory Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
