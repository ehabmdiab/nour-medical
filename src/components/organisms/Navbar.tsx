import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { LanguageSwitch } from '../atoms/LanguageSwitch';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const { locale, t } = useLanguage();

  const navLinks = useMemo(
    () => [
      { label: t('nav.about'), href: '/about' },
      { label: t('nav.products'), href: '/products' },
      { label: t('nav.services'), href: '/services' },
      { label: t('nav.gallery'), href: '/gallery' },
      { label: t('nav.clients'), href: '/clients' },
      { label: t('nav.suppliers'), href: '/suppliers' },
      { label: t('nav.contact'), href: '/contact' },
    ],
    [t]
  );

  const serviceSubLinks = useMemo(
    () => [
      {
        label: t('nav.servicesOverview'),
        href: '/services',
        desc: t('nav.servicesOverviewDesc'),
      },
      {
        label: t('nav.technicalMaintenance'),
        href: '/services#maintenance',
        desc: t('nav.technicalMaintenanceDesc'),
      },
      {
        label: t('nav.annualContracts'),
        href: '/services#amc-portfolio',
        desc: t('nav.annualContractsDesc'),
      },
      {
        label: t('nav.partsFacility'),
        href: '/services#parts-infrastructure',
        desc: t('nav.partsFacilityDesc'),
      },
    ],
    [t]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (location.pathname === href) return true;
    if (href === '/suppliers' && location.pathname === '/partners') return true;
    if (href !== '/' && location.pathname.startsWith(`${href}/`)) return true;
    return false;
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container h-[92px] flex items-center justify-between gap-5">
        {/* Logo - Nour Medical stays always in English per branding guidelines */}
        <Link
          to="/"
          className="flex flex-col gap-[3px] no-underline shrink-0"
          aria-label="Nour Medical — Home"
        >
          <span className="font-heading text-[clamp(1.35rem,1.8vw,1.65rem)] font-bold tracking-[-0.025em] text-navy leading-[1.1] whitespace-nowrap">
            Nour Medical
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-text-muted font-semibold whitespace-nowrap">
            {t('nav.tagline')}
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hide-mobile flex items-center gap-[clamp(14px,1.6vw,24px)] list-none m-0 p-0">
          {navLinks.map((link) => {
            const isServices = link.href === '/services';
            const active = isActive(link.href);

            if (isServices) {
              return (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <Link
                    to={link.href}
                    className={`nav-tab-link${active ? ' active text-navy font-semibold' : ' text-text-muted font-medium'} font-body text-[0.8125rem] tracking-[0.02em] inline-flex items-center gap-1 py-2 no-underline transition-colors`}
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''} ${active ? 'text-blue-medical' : 'text-text-muted'}`}
                    />
                  </Link>

                  {/* Dropdown Menu */}
                  {servicesDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[1050]">
                      <div className="w-[320px] bg-white rounded-2xl border border-gray-light shadow-[0_16px_36px_rgba(15,23,42,0.1)] p-2.5 flex flex-col gap-0.5">
                        {serviceSubLinks.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            onClick={() => setServicesDropdownOpen(false)}
                            className="p-2.5 px-3.5 rounded-[10px] no-underline flex flex-col gap-0.5 hover:bg-warm-neutral transition-colors"
                          >
                            <span className="font-heading text-lg font-bold text-navy">
                              {sub.label}
                            </span>
                            <span className="font-body text-xs text-text-muted leading-[1.3]">
                              {sub.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            }

            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`nav-tab-link${active ? ' active text-navy font-semibold' : ' text-text-muted font-medium'} font-body text-[0.8125rem] tracking-[0.02em] inline-block py-2 no-underline transition-colors`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Actions & Independent Language Switch */}
        <div className="hide-mobile flex items-center gap-5 shrink-0">
          <div className="flex items-center">
            <LanguageSwitch size="sm" />
          </div>
          <div
            className="w-px h-6 bg-gray-light opacity-85"
            aria-hidden="true"
          />
          <Link
            to="/contact"
            className="btn btn-primary py-2.5 px-[22px] text-[0.8rem] whitespace-nowrap"
          >
            {t('common.getInTouch')}
          </Link>
        </div>

        {/* Mobile Header Right (Switch + Independent Toggle with generous spacing) */}
        <div className="hide-desktop flex items-center gap-5">
          <LanguageSwitch size="sm" />
          <div
            className="w-px h-[18px] bg-gray-light opacity-80"
            aria-hidden="true"
          />
          <button
            className="hide-desktop p-2 text-navy flex items-center bg-transparent border-none cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-[var(--navbar-height,92px)] bg-white z-[999] px-[var(--container-pad)] py-6 flex flex-col gap-0 overflow-y-auto"
          role="dialog"
          aria-label={t('nav.mobileNavLabel')}
        >
          {/* Prominent Language Switch in Mobile Drawer */}
          <div className="flex items-center justify-between py-4 pb-5 border-b border-gray-light mb-4">
            <span className="font-heading text-base font-semibold text-navy">
              {t('common.language')}
            </span>
            <LanguageSwitch size="md" />
          </div>

          {navLinks.map((link, i) => (
            <React.Fragment key={link.href}>
              <Link
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`py-4 border-b ${isActive(link.href) ? 'border-b-2 border-blue-medical text-blue-medical font-semibold' : 'border-warm-neutral text-navy font-medium'} font-heading text-[1.35rem] no-underline flex items-center justify-between animate-fade-in-up`}
                style={{
                  animationDelay: `${i * 0.04 + 0.05}s`,
                }}
              >
                {link.label}
                <span className="font-mono text-[0.625rem] text-text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </Link>

              {/* Sub-links under Service in Mobile */}
              {link.href === '/services' && (
                <div className={`flex flex-col ${locale === 'ar' ? 'pr-4' : 'pl-4'} pb-4 gap-3 border-b border-warm-neutral`}>
                  {serviceSubLinks.slice(1).map((sub) => (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-body text-base text-text-muted no-underline flex items-center gap-2.5 py-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-accent shrink-0" />
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}

          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="btn btn-primary mt-7 mb-6 justify-center animate-fade-in-up delay-300"
          >
            {t('common.getInTouch')}
          </Link>
        </div>
      )}
    </nav>
  );
};
