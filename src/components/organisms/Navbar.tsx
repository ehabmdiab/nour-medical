import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { LanguageSwitch } from '../atoms/LanguageSwitch';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
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

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (location.pathname === href) return true;
    if (href === '/suppliers' && location.pathname === '/partners') return true;
    if (href !== '/' && location.pathname.startsWith(`${href}/`)) return true;
    return false;
  };

  return (
    <header>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="container h-[var(--navbar-height)] flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          {/* Logo - Nour Medical stays always in English per branding guidelines */}
          <Link
            to="/"
            className="flex flex-col gap-[2px] no-underline min-w-0 shrink"
            aria-label="Nour Medical — Home"
          >
            <span className="font-heading text-[clamp(1.2rem,4vw,1.6rem)] sm:text-[clamp(1.45rem,2.2vw,2rem)] font-extrabold tracking-[-0.03em] text-navy leading-[1.1] whitespace-nowrap">
              Nour Medical
            </span>
            <span className="hidden sm:block font-mono text-[0.8125rem] sm:text-[0.9375rem] tracking-[0.04em] sm:tracking-[0.12em] uppercase text-navy/80 font-semibold whitespace-nowrap">
              {t('nav.tagline')}
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hide-mobile flex items-center gap-[clamp(14px,1.5vw,24px)] list-none m-0 p-0">
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
                      aria-current={active ? 'page' : undefined}
                      className={`nav-tab-link${active ? ' active text-navy font-bold' : ' text-navy font-semibold'} font-body text-[1.0625rem] xl:text-[1.1875rem] tracking-[0.01em] inline-flex items-center gap-1 py-2 no-underline transition-colors`}
                    >
                      {link.label}
                      <ChevronDown
                        size={15}
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''} text-navy`}
                      />
                    </Link>

                    {/* Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[1050]">
                        <div className="w-[340px] bg-white rounded-2xl border border-gray-light shadow-[0_16px_36px_rgba(15,23,42,0.1)] p-3 flex flex-col gap-1">
                          {serviceSubLinks.map((sub) => (
                            <Link
                              key={sub.href}
                              to={sub.href}
                              onClick={() => setServicesDropdownOpen(false)}
                              className="p-2.5 px-3.5 rounded-[10px] no-underline flex flex-col gap-1 hover:bg-warm-neutral transition-colors"
                            >
                              <span className="font-heading text-base font-bold text-navy">
                                {sub.label}
                              </span>
                              <span className="font-body text-sm text-navy/85 leading-[1.4]">
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
                    aria-current={active ? 'page' : undefined}
                    className={`nav-tab-link${active ? ' active text-navy font-bold' : ' text-navy font-semibold'} font-body text-[1.0625rem] xl:text-[1.1875rem] tracking-[0.01em] inline-block py-2 no-underline transition-colors`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Actions & Independent Language Switch */}
          <div className="hide-mobile flex items-center gap-3.5 xl:gap-5 shrink-0">
            <div className="flex items-center">
              <LanguageSwitch size="sm" />
            </div>
            <div
              className="w-px h-6 bg-gray-light opacity-85"
              aria-hidden="true"
            />
            <Link
              to="/contact"
              className="btn btn-primary py-2.5 px-5 text-[1.0625rem] xl:text-[1.1875rem] whitespace-nowrap"
            >
              {t('common.getInTouch')}
            </Link>
          </div>

          {/* Mobile Header Right (Switch + Independent Toggle) */}
          <div className="hide-desktop flex items-center gap-1.5 sm:gap-3.5 shrink-0">
            <LanguageSwitch size="sm" />
            <div
              className="w-px h-4 sm:h-[18px] bg-gray-light opacity-80"
              aria-hidden="true"
            />
            <button
              ref={menuButtonRef}
              type="button"
              className="hide-desktop p-2 min-w-[44px] min-h-[44px] text-navy flex items-center justify-center rounded-lg hover:bg-navy/[0.04] bg-transparent border-none cursor-pointer shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer — placed outside nav.navbar so backdrop-filter does not trap position:fixed */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          data-lenis-prevent
          className="fixed inset-x-0 bottom-0 top-[var(--navbar-height)] bg-white z-[999] border-t border-gray-light px-[var(--container-pad)] py-6 flex flex-col gap-0 overflow-y-auto shadow-[0_20px_48px_rgba(10,22,40,0.12)]"
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.mobileNavLabel')}
        >
          {/* Prominent Language Switch in Mobile Drawer */}
          <div className="flex items-center justify-between py-3 pb-4 border-b border-gray-light mb-3">
            <span className="font-heading text-lg font-bold text-navy">
              {t('common.language')}
            </span>
            <LanguageSwitch size="md" />
          </div>

          {navLinks.map((link, i) => {
            const active = isActive(link.href);
            return (
              <React.Fragment key={link.href}>
                <Link
                  to={link.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3.5 border-b ${active ? 'border-b-2 border-orange-accent text-navy font-bold' : 'border-warm-neutral text-navy font-semibold'} font-heading text-lg no-underline flex items-center justify-between animate-fade-in-up`}
                  style={{
                    animationDelay: `${i * 0.04 + 0.05}s`,
                  }}
                >
                  {link.label}
                  <span className="font-mono text-xs text-navy">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </Link>

                {/* Sub-links under Service in Mobile */}
                {link.href === '/services' && (
                  <div className={`flex flex-col ${locale === 'ar' ? 'pr-4' : 'pl-4'} pb-3.5 pt-1 gap-2.5 border-b border-warm-neutral`}>
                    {serviceSubLinks.slice(1).map((sub) => (
                      <Link
                        key={sub.href}
                        to={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className="font-body text-base text-navy no-underline flex items-center gap-2.5 py-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-accent shrink-0" />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </React.Fragment>
            );
          })}

          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="btn btn-primary mt-6 mb-6 justify-center animate-fade-in-up delay-300"
          >
            {t('common.getInTouch')}
          </Link>
        </div>
      )}
    </header>
  );
};
