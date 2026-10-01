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
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission placeholder
    setSubmitted(true);
  };

  return (
    <>
      {/* Page Header */}
      <section style={{
        background: 'var(--navy)',
        padding: '130px 0 80px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          right: '-5%',
          top: '0%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(27,79,216,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--teal-accent)',
            marginBottom: '24px',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--teal-accent)',
              boxShadow: '0 0 8px var(--teal-accent)',
            }} />
            Contact & Location
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3rem, 6.5vw, 5.75rem)',
            fontWeight: 700,
            color: 'var(--white)',
            letterSpacing: '-0.035em',
            lineHeight: 0.94,
            maxWidth: '850px',
            marginBottom: '32px',
          }}>
            Connect With Our Team
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '650px',
          }}>
            For equipment inquiries, turnkey projects, maintenance requests, or spare parts — reach out to our Cairo headquarters.
          </p>
        </div>
      </section>

      {/* Contact Layout */}
      <section style={{ padding: 'var(--section-gap) 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(48px, 6vw, 100px)',
            alignItems: 'start',
          }}>
            {/* Contact Info */}
            <div>
              <div className="section-label" style={{ marginBottom: '40px' }}>Contact Details</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '10px',
                  }}>
                    Address
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <MapPin size={14} style={{ color: 'var(--blue-medical)', flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', lineHeight: 1.6, color: 'var(--text-body)' }}>
                      {COMPANY_CONTACT.address}
                    </p>
                  </div>
                </div>

                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '10px',
                  }}>
                    Telephone
                  </div>
                  {COMPANY_CONTACT.phone.map(ph => (
                    <div key={ph} style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '6px' }}>
                      <Phone size={14} style={{ color: 'var(--blue-medical)', flexShrink: 0 }} />
                      <a
                        href={`tel:${ph.replace(/\s/g, '')}`}
                        className="hover-underline"
                        style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: 'var(--text-body)', textDecoration: 'none' }}
                      >
                        {ph}
                      </a>
                    </div>
                  ))}
                </div>

                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '10px',
                  }}>
                    Head Office / Mobile
                  </div>
                  {COMPANY_CONTACT.mobile.map(m => (
                    <div key={m} style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '6px' }}>
                      <Smartphone size={14} style={{ color: 'var(--blue-medical)', flexShrink: 0 }} />
                      <a
                        href={`tel:${m.replace(/\s|\(|\)/g, '')}`}
                        className="hover-underline"
                        style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: 'var(--text-body)', textDecoration: 'none' }}
                      >
                        {m}
                      </a>
                    </div>
                  ))}
                </div>

                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '10px',
                  }}>
                    Fax
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Printer size={14} style={{ color: 'var(--blue-medical)', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: 'var(--text-body)' }}>
                      {COMPANY_CONTACT.fax}
                    </span>
                  </div>
                </div>

                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '10px',
                  }}>
                    Email
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Mail size={14} style={{ color: 'var(--blue-medical)', flexShrink: 0 }} />
                    <a
                      href={`mailto:${COMPANY_CONTACT.email}`}
                      className="hover-underline"
                      style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: 'var(--text-body)', textDecoration: 'none' }}
                    >
                      {COMPANY_CONTACT.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="section-label" style={{ marginBottom: '40px' }}>Send an Inquiry</div>

              {submitted ? (
                <div style={{
                  padding: '48px 40px',
                  border: '1px solid var(--gray-light)',
                  borderRadius: '4px',
                  textAlign: 'center',
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(27,79,216,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: 'var(--blue-medical)',
                    fontSize: '1.625rem',
                  }}>
                    ✓
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.625rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px' }}>
                    Inquiry Received
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    Thank you for contacting Nour Medical. Our team will respond to your inquiry shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                  noValidate
                >
                  <div className="grid-2" style={{ gap: '20px' }}>
                    <div>
                      <label htmlFor="contact-name" className="form-label">
                        Full Name <span style={{ color: 'var(--blue-medical)' }}>*</span>
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
                        Organization <span style={{ color: 'var(--blue-medical)' }}>*</span>
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

                  <div className="grid-2" style={{ gap: '20px' }}>
                    <div>
                      <label htmlFor="contact-email" className="form-label">
                        Email Address <span style={{ color: 'var(--blue-medical)' }}>*</span>
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
                      className="form-input"
                      value={formData.interest}
                      onChange={handleChange}
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="">Select a category…</option>
                      {PRODUCT_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="form-label">
                      Message <span style={{ color: 'var(--blue-medical)' }}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="form-input"
                      placeholder="Please describe your equipment requirements or technical needs…"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      style={{ resize: 'vertical', minHeight: '140px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ alignSelf: 'flex-start' }}
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
