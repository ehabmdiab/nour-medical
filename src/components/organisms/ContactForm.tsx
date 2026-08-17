import React, { useState } from 'react';
import { InputField } from '../atoms/InputField';
import { MagneticButton } from '../atoms/MagneticButton';
import { Send, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_PROFILE } from '../../data/companyData';
import { motion, AnimatePresence } from 'framer-motion';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: 'Equipment Purchase',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Column: HQ Information & Hotline */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <span className="text-xs font-mono text-cyan-700 uppercase tracking-widest block mb-2 font-bold">
            DIRECT ENGINEERING HOTLINE
          </span>
          <h3 className="text-3xl font-heading font-extrabold text-slate-900">
            Cairo Headquarters Terminal
          </h3>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Reach our technical sales advisors or request immediate on-site maintenance dispatch for radiology suites anywhere in Egypt.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-3 text-cyan-700">
              <MapPin className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase">PHYSICAL LOCATION</span>
            </div>
            <p className="text-sm font-heading text-slate-800 font-semibold">{COMPANY_PROFILE.address}</p>
            <p className="text-xs text-slate-500">1,000 m² Spare Parts Facility • Maadi Industrial Hub</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-3 text-cyan-700">
              <Phone className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase">HOTLINE & TELEPHONE</span>
            </div>
            <div className="space-y-1 text-sm font-mono text-slate-800 font-semibold">
              <div>Landline: 02 25267173 / 02 25267175</div>
              <div>Hotline: 01007361255 / 01023515373</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center gap-3 text-cyan-700">
              <Mail className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase">OFFICIAL EMAIL</span>
            </div>
            <a href={`mailto:${COMPANY_PROFILE.email}`} className="text-sm font-mono text-cyan-700 hover:underline font-bold">
              {COMPANY_PROFILE.email}
            </a>
          </div>
        </div>
      </div>

      {/* Right Column: High-Tech Contact Form */}
      <div className="lg:col-span-7">
        <div className="glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-lg border border-slate-300">
          <div className="scanline-overlay" />

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-heading font-bold text-slate-900">Inquiry Transmitted Successfully</h4>
                <p className="text-sm text-slate-600 max-w-md">
                  Thank you, {formData.name}. A senior technical engineer from Nour Medical will review your request and contact you within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-slate-100 text-slate-800 font-mono text-xs hover:bg-slate-200 border border-slate-300"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Full Name"
                    name="name"
                    placeholder="Dr. Ahmed Hassan"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="ahmed@hospital.eg"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Mobile / Telephone"
                    name="phone"
                    placeholder="0100 000 0000"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Hospital / Organization"
                    name="organization"
                    placeholder="Cairo Medical Center"
                    required
                    value={formData.organization}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-slate-700 uppercase tracking-wider font-bold">
                    INQUIRY CATEGORY *
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white font-mono text-sm shadow-sm"
                  >
                    <option value="Equipment Purchase">New Radiology Equipment Purchase</option>
                    <option value="Flat Panel Upgrade">Flat Panel DR Upgrade</option>
                    <option value="Spare Parts">Spare Parts Request</option>
                    <option value="Maintenance Contract">Preventive Maintenance Contract</option>
                    <option value="Emergency Repair">24/7 Emergency Technical Support</option>
                  </select>
                </div>

                <InputField
                  label="Technical Requirements & Details"
                  name="message"
                  placeholder="Specify equipment model, room dimensions, or urgent maintenance symptoms..."
                  required
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                />

                <MagneticButton
                  type="submit"
                  variant="primary"
                  className="w-full py-4 text-sm"
                  icon={<Send className="w-4 h-4" />}
                >
                  {loading ? 'Transmitting Request...' : 'Submit Technical Inquiry'}
                </MagneticButton>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
