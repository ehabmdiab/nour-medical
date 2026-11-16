import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import { COMPANY_CONTACT } from '../../data/companyData';
import { useLanguage } from '../../i18n';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const footerLinks = useMemo(
    () => ({
      [t('footer.colCompany')]: [
        { label: t('footer.aboutUs'), href: '/about' },
        { label: t('footer.ourSuppliers'), href: '/suppliers' },
        { label: t('footer.ourClients'), href: '/clients' },
        { label: t('footer.mediaGallery'), href: '/gallery' },
      ],
      [t('footer.colSolutions')]: [
        { label: t('footer.products'), href: '/products' },
        { label: t('footer.services'), href: '/services' },
        { label: t('footer.maintenanceSupport'), href: '/services#maintenance' },
      ],
      [t('footer.colSupport')]: [
        { label: t('footer.contactUs'), href: '/contact' },
        { label: t('footer.technicalSupport'), href: '/services#maintenance' },
        { label: t('footer.annualMaintenance'), href: '/services' },
      ],
    }),
    [t]
  );

  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="container pt-20 pb-16">
        <div className="grid grid-cols-1 gap-12">
          {/* Top Row: Brand + Links */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-10">
            {/* Brand - Nour Medical remains in English */}
            <div>
              <Link
                to="/"
                className="no-underline inline-flex flex-col gap-1 mb-5"
              >
                <span className="font-heading text-2xl font-bold text-orange-accent tracking-tight flex items-center gap-2">
                  <span>Nour Medical</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-accent" />
                </span>
                <span className="font-mono text-xs tracking-widest uppercase text-white/75">
                  {t('footer.tagline')}
                </span>
              </Link>
              <p className="font-body text-base leading-[1.7] text-white/85 max-w-[260px]">
                {t('footer.bio')}
              </p>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <p className="font-heading text-base font-bold tracking-wider uppercase text-orange-accent mb-4">
                  {category}
                </p>
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="hover-underline font-body text-base text-white/85 hover:text-orange-accent no-underline transition-colors duration-150"
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
              <p className="font-heading text-base font-bold tracking-wider uppercase text-orange-accent mb-4">
                {t('footer.colContact')}
              </p>
              <ul className="flex flex-col gap-3.5 list-none p-0 m-0">
                <li className="flex gap-2.5 items-start">
                  <MapPin size={16} className="text-orange-accent shrink-0 mt-1" />
                  <span className="font-body text-base text-white/85 leading-relaxed">
                    {t('footer.address')}
                  </span>
                </li>
                <li className="flex gap-2.5 items-center">
                  <Phone size={16} className="text-orange-accent shrink-0" />
                  <span className="font-body text-base text-white/85">
                    {COMPANY_CONTACT.mobile.join(' · ')}
                  </span>
                </li>
                <li className="flex gap-2.5 items-center">
                  <Phone size={16} className="text-orange-accent shrink-0" />
                  <span className="font-body text-base text-white/85">
                    {COMPANY_CONTACT.phone[0]} · {COMPANY_CONTACT.phone[1]}
                  </span>
                </li>
                <li className="flex gap-2.5 items-center">
                  <Mail size={16} className="text-orange-accent shrink-0" />
                  <a
                    href={`mailto:${COMPANY_CONTACT.email}`}
                    className="hover-underline font-body text-base text-white/85 hover:text-orange-accent no-underline"
                  >
                    {COMPANY_CONTACT.email}
                  </a>
                </li>
                <li className="flex gap-2.5 items-center">
                  <Globe size={16} className="text-orange-accent shrink-0" />
                  <span className="font-body text-base text-white/85">
                    {COMPANY_CONTACT.website}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/[0.12] my-2" />

          {/* Bottom Row */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            <p className="font-mono text-xs tracking-wide text-white/70">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex items-center gap-5 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem('nour_loader_dismissed');
                  window.dispatchEvent(new CustomEvent('replay-3d-loader'));
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="bg-transparent border border-orange-accent/50 rounded text-orange-accent px-3.5 py-1.5 font-mono text-xs font-semibold tracking-wide uppercase cursor-pointer hover:border-orange-accent hover:bg-orange-accent hover:text-white transition-all duration-200"
              >
                {t('footer.replayIntro')}
              </button>
              <p className="font-mono text-xs tracking-wide text-white/70">
                {t('footer.estTag')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
