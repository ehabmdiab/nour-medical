import React, { useState } from 'react';
import { Phone, Mail, MapPin, Printer, Smartphone } from 'lucide-react';
import { COMPANY_CONTACT } from '../data/companyData';
import { useLanguage } from '../i18n';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();

  const productOptions = [
    { value: 'Radiology Devices', label: t('contact.optRadiology') },
    { value: 'Medical Equipment', label: t('contact.optEquipment') },
    { value: 'Hospital Furniture', label: t('contact.optFurniture') },
    { value: 'Central Sterilization Equipment', label: t('contact.optSterilization') },
    { value: 'Consumables & Spare Parts', label: t('contact.optConsumables') },
    { value: 'Maintenance & Technical Support', label: t('contact.optMaintenance') },
    { value: 'Annual Maintenance Contract', label: t('contact.optAmc') },
    { value: 'Other', label: t('contact.optOther') },
  ];

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
            {t('contact.heroBadge')}
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.75rem] font-bold text-navy tracking-tight leading-[0.94] max-w-[850px] mb-8">
            {t('contact.title')}
          </h1>
          <p className="font-body text-xl md:text-2xl leading-[1.7] text-text-muted max-w-[650px]">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Layout */}
      <section className="py-[var(--section-gap)] bg-white">
        <div className="container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-12 lg:gap-24 items-start">
            {/* Contact Details Column */}
            <div>
              <div className="section-label mb-10">{t('contact.detailsLabel')}</div>

              <div className="flex flex-col gap-8">
                <div>
                  <div className="font-mono text-[0.5rem] tracking-widest uppercase text-text-muted mb-2.5">
                    {t('contact.headOffice')}
                  </div>
                  <div className="flex gap-3 items-start">
                    <MapPin size={16} className="text-blue-medical shrink-0 mt-1" />
                    <span className="font-body text-[1.0625rem] text-text-body leading-relaxed">
                      {t('contact.address')}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[0.5rem] tracking-widest uppercase text-text-muted mb-2.5">
                    {t('contact.telephone')}
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
                    {t('contact.mobile')}
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
                    {t('contact.fax')}
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
                    {t('contact.email')}
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
              <div className="section-label mb-10">{t('contact.formTitle')}</div>

              {submitted ? (
                <div className="p-12 px-10 border border-gray-light rounded text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-medical/10 flex items-center justify-center mx-auto mb-5 text-blue-medical text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="font-heading text-2xl md:text-[1.625rem] font-bold text-navy mb-3">
                    {t('contact.successTitle')}
                  </h3>
                  <p className="font-body text-[1.0625rem] text-text-muted leading-relaxed">
                    {t('contact.successMessage')}
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
                        {t('contact.formName')} <span className="text-blue-medical">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        className="form-input"
                        placeholder={t('contact.formNamePlaceholder')}
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-org" className="form-label">
                        {t('contact.formOrg')} <span className="text-blue-medical">*</span>
                      </label>
                      <input
                        id="contact-org"
                        type="text"
                        name="organization"
                        className="form-input"
                        placeholder={t('contact.formOrgPlaceholder')}
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
                        {t('contact.formEmail')} <span className="text-blue-medical">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder={t('contact.formEmailPlaceholder')}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="form-label">
                        {t('contact.formPhone')}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        className="form-input"
                        placeholder={t('contact.formPhonePlaceholder')}
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-interest" className="form-label">
                      {t('contact.formInterest')}
                    </label>
                    <select
                      id="contact-interest"
                      name="interest"
                      className="form-input cursor-pointer"
                      value={formData.interest}
                      onChange={handleChange}
                    >
                      <option value="">{t('contact.formInterestPlaceholder')}</option>
                      {productOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="form-label">
                      {t('contact.formMessage')} <span className="text-blue-medical">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="form-input resize-y min-h-[140px]"
                      placeholder={t('contact.formMessagePlaceholder')}
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
                    {t('contact.sendInquiry')}
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
