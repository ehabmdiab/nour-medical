import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import { COMPANY_CONTACT } from '../../data/companyData';

const FOOTER_LINKS = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Partners', href: '/partners' },
    { label: 'Our Clients', href: '/clients' },
  ],
  Solutions: [
    { label: 'Products', href: '/products' },
    { label: 'Services', href: '/services' },
    { label: 'Maintenance & Support', href: '/maintenance' },
  ],
  Support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Technical Support', href: '/maintenance' },
    { label: 'Annual Maintenance', href: '/services' },
  ],
};

export const Footer: React.FC = () => (
  <footer style={{ background: 'var(--navy)', color: 'var(--white)' }}>
    {/* Main Footer */}
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px' }}>
        {/* Top Row: Brand + Links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '40px',
        }}>
          {/* Brand */}
          <div>
            <Link
              to="/"
              style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', gap: '2px', marginBottom: '20px' }}
            >
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.375rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--white)',
              }}>
                Nour Medical
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
              }}>
                Healthcare Technology
              </span>
            </Link>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '240px',
            }}>
              Established 2015. Supplying radiology devices, medical equipment, and technical support to healthcare organizations across Egypt.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                marginBottom: '16px',
              }}>
                {category}
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="hover-underline"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8125rem',
                        color: 'rgba(255,255,255,0.65)',
                        textDecoration: 'none',
                        transition: 'color var(--dur-fast)',
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: '16px',
            }}>
              Contact
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={13} style={{ color: 'var(--teal-accent)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
                  {COMPANY_CONTACT.address}
                </span>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={13} style={{ color: 'var(--teal-accent)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.65)' }}>
                  {COMPANY_CONTACT.phone[0]} · {COMPANY_CONTACT.phone[1]}
                </span>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={13} style={{ color: 'var(--teal-accent)', flexShrink: 0 }} />
                <a
                  href={`mailto:${COMPANY_CONTACT.email}`}
                  className="hover-underline"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}
                >
                  {COMPANY_CONTACT.email}
                </a>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Globe size={13} style={{ color: 'var(--teal-accent)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.65)' }}>
                  {COMPANY_CONTACT.website}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="rule-dark" />

        {/* Bottom Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.3)',
          }}>
            © {new Date().getFullYear()} Nour Medical Company. All rights reserved. Maadi, Cairo, Egypt.
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.3)',
          }}>
            Est. 2015 · Healthcare Technology · Egypt
          </p>
        </div>
      </div>
    </div>
  </footer>
);
