import React, { useState } from 'react';
import { Phone, Mail, MapPin, Printer, Smartphone } from 'lucide-react';
import { COMPANY_CONTACT } from '../data/companyData';

const PRODUCT_OPTIONS = [
  'Radiology Devices (MRI, CT, X-Ray, C-Arm, Cath-Lab)',
  'Medical Equipment',
  'Hospital Furniture',
  'Central Sterilization Equipment',
  'Consumables & Spare Parts',
  'Maintenance & Technical Support',
  'Annual Maintenance Contract',
  'Other',
];

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-white to-warm-white pt-36 pb-20 relative overflow-hidden border-b border-gray-light">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,22,40,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,22,40,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute -right-[5%] top-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="container relative z-10">
          <div className="section-label">
            Contact & Headquarters
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.75rem] font-bold text-navy tracking-tight leading-[0.94] max-w-[850px] mb-8">
            Connect With Our Team
          </h1>
          <p className="font-body text-xl md:text-2xl leading-[1.7] text-text-muted max-w-[650px]">
            For equipment inquiries, turnkey projects, maintenance requests, or spare parts — reach out to our Cairo headquarters.
          </p>
        </div>
      </section>

      {/* Contact Layout */}
      <section className="py-[var(--section-gap)] bg-white">
        <div className="container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-12 lg:gap-24 items-start">
            {/* Contact Details Column */}
            <div>
              <div className="section-label mb-10">Contact Details</div>

              <div className="flex flex-col gap-8">
                <div>
                  <div className="font-mono text-[0.5rem] tracking-widest uppercase text-text-muted mb-2.5">
                    Headquarters Address
                  </div>
                  <div className="flex gap-3 items-start">
                    <MapPin size={14} className="text-blue-medical shrink-0 mt-0.5" />
                    <p className="font-body text-[1.0625rem] leading-relaxed text-text-body">
                      {COMPANY_CONTACT.address}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[0.5rem] tracking-widest uppercase text-text-muted mb-2.5">
                    Landline Phones
                  </div>
                  {COMPANY_CONTACT.phone.map((ph) => (
                    <div key={ph} className="flex gap-3 items-center mb-1.5">
                      <Phone size={14} className="text-blue-medical shrink-0" />
                      <a
                        href={`tel:${ph.replace(/\s/g, '')}`}
                        className="hover-underline font-body text-[1.0625rem] text-text-body no-underline"
                      >
                        {ph}
                      </a>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="font-mono text-[0.5rem] tracking-widest uppercase text-text-muted mb-2.5">
                    Mobile &amp; Emergency Hotline
                  </div>
                  {COMPANY_CONTACT.mobile.map((m) => (
                    <div key={m} className="flex gap-3 items-center mb-1.5">
                      <Smartphone size={14} className="text-blue-medical shrink-0" />
                      <a
                        href={`tel:${m.replace(/\s/g, '')}`}
                        className="hover-underline font-body text-[1.0625rem] text-text-body no-underline"
                      >
                        {m}
                      </a>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="font-mono text-[0.5rem] tracking-widest uppercase text-text-muted mb-2.5">
                    Fax
                  </div>
                  <div className="flex gap-3 items-center">
                    <Printer size={14} className="text-blue-medical shrink-0" />
                    <span className="font-body text-[1.0625rem] text-text-body">
                      {COMPANY_CONTACT.fax}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[0.5rem] tracking-widest uppercase text-text-muted mb-2.5">
                    Email
                  </div>
                  <div className="flex gap-3 items-center">
                    <Mail size={14} className="text-blue-medical shrink-0" />
                    <a
                      href={`mailto:${COMPANY_CONTACT.email}`}
                      className="hover-underline font-body text-[1.0625rem] text-text-body no-underline"
                    >
                      {COMPANY_CONTACT.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div>
              <div className="section-label mb-10">Send an Inquiry</div>

              {submitted ? (
                <div className="p-12 px-10 border border-gray-light rounded text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-medical/10 flex items-center justify-center mx-auto mb-5 text-blue-medical text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="font-heading text-2xl md:text-[1.625rem] font-bold text-navy mb-3">
                    Inquiry Received
                  </h3>
                  <p className="font-body text-[1.0625rem] text-text-muted leading-relaxed">
                    Thank you for contacting Nour Medical. Our team will respond to your inquiry shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                  noValidate
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="form-label">
                        Full Name <span className="text-blue-medical">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        className="form-input"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-org" className="form-label">
                        Organization <span className="text-blue-medical">*</span>
                      </label>
                      <input
                        id="contact-org"
                        type="text"
                        name="organization"
                        className="form-input"
                        placeholder="Hospital or facility name"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                        autoComplete="organization"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-email" className="form-label">
                        Email Address <span className="text-blue-medical">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="you@organization.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        className="form-input"
                        placeholder="+20 xxx xxx xxxx"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-interest" className="form-label">
                      Service / Product Interest
                    </label>
                    <select
                      id="contact-interest"
                      name="interest"
                      className="form-input cursor-pointer"
                      value={formData.interest}
                      onChange={handleChange}
                    >
                      <option value="">Select a category…</option>
                      {PRODUCT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="form-label">
                      Message <span className="text-blue-medical">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="form-input resize-y min-h-[140px]"
                      placeholder="Please describe your equipment requirements or technical needs…"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary self-start"
                  >
                    Send Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
