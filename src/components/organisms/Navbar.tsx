import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Clients', href: '/clients' },
  { label: 'Suppliers', href: '/suppliers' },
  { label: 'Contact', href: '/contact' },
];

const SERVICE_SUB_LINKS = [
  { label: 'Services Overview', href: '/services', desc: 'Core capabilities & full-lifecycle care' },
  { label: 'Technical Maintenance', href: '/services#maintenance', desc: 'Universal multi-vendor support & emergency repair' },
  { label: 'Annual Contracts (AMC)', href: '/services#amc-portfolio', desc: 'Cath-Lab, CT, MRI, X-Ray & C-Arm systems' },
  { label: 'Maadi Parts Warehouse', href: '/services#parts-infrastructure', desc: '1,000 m² dedicated spare parts facility' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

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
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (location.pathname === href) return true;
    if (href === "/suppliers" && location.pathname === "/partners") return true;
    if (href !== "/" && location.pathname.startsWith(`${href}/`)) return true;
    return false;
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container" style={{ height: '92px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link
          to="/"
          style={{ display: 'flex', flexDirection: 'column', gap: '2px', textDecoration: 'none' }}
          aria-label="Nour Medical — Home"
        >
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 3vw, 2.6rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--navy)',
            lineHeight: 1,
          }}>
            Nour Medical
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            fontWeight: 600,
          }}>
            Healthcare Technology
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {NAV_LINKS.map((link) => {
            const isServices = link.href === '/services';
            const active = isActive(link.href);

            if (isServices) {
              return (
                <li
                  key={link.href}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <Link
                    to={link.href}
                    className={`nav-tab-link${active ? " active" : ""}`}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8125rem',
                      fontWeight: active ? 600 : 500,
                      color: active ? 'var(--navy)' : 'var(--text-muted)',
                      letterSpacing: '0.02em',
                      transition: 'color var(--dur-fast)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '8px 0',
                    }}
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      style={{
                        transition: 'transform 0.2s ease',
                        transform: servicesDropdownOpen ? 'rotate(180deg)' : 'none',
                        color: active ? 'var(--blue-medical)' : 'var(--text-muted)',
                      }}
                    />
                  </Link>

                  {/* Dropdown Menu */}
                  {servicesDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        paddingTop: '8px',
                        zIndex: 1050,
                      }}
                    >
                      <div
                        style={{
                          width: '320px',
                          background: 'var(--white)',
                          borderRadius: '16px',
                          border: '1px solid var(--gray-light)',
                          boxShadow: '0 16px 36px rgba(15, 23, 42, 0.1)',
                          padding: '10px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                        }}
                      >
                        {SERVICE_SUB_LINKS.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            onClick={() => setServicesDropdownOpen(false)}
                            style={{
                              padding: '10px 14px',
                              borderRadius: '10px',
                              textDecoration: 'none',
                              transition: 'background 0.15s ease',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '2px',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--warm-neutral)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                          >
                            <span style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: '1.125rem',
                              fontWeight: 700,
                              color: 'var(--navy)',
                            }}>
                              {sub.label}
                            </span>
                            <span style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.75rem',
                              color: 'var(--text-muted)',
                              lineHeight: 1.3,
                            }}>
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
                  className={`nav-tab-link${active ? " active" : ""}`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    fontWeight: active ? 600 : 500,
                    color: active ? 'var(--navy)' : 'var(--text-muted)',
                    letterSpacing: '0.02em',
                    transition: 'color var(--dur-fast)',
                    textDecoration: 'none',
                    padding: '8px 0',
                    display: 'inline-block',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hide-mobile">
          <Link to="/contact" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.8rem' }}>
            Get in Touch
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="hide-desktop"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          style={{ padding: '8px', color: 'var(--navy)', display: 'flex', alignItems: 'center' }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 'var(--navbar-height, 92px)',
            background: 'var(--white)',
            zIndex: 999,
            padding: '32px var(--container-pad)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            overflowY: 'auto',
          }}
          role="dialog"
          aria-label="Mobile navigation menu"
        >
          {NAV_LINKS.map((link, i) => (
            <React.Fragment key={link.href}>
              <Link
                to={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: '18px 0',
                  borderBottom: isActive(link.href) ? '2px solid var(--blue-medical)' : (link.href === '/services' ? 'none' : '1px solid var(--warm-neutral)'),
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: isActive(link.href) ? 'var(--blue-medical)' : 'var(--navy)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: 0,
                  animation: `fadeInUp 0.4s var(--ease-smooth) ${i * 0.05 + 0.1}s both`,
                }}
              >
                {link.label}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-muted)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </Link>

              {/* Sub-links under Service in Mobile */}
              {link.href === '/services' && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '16px',
                    paddingBottom: '16px',
                    gap: '12px',
                    borderBottom: '1px solid var(--warm-neutral)',
                  }}
                >
                  {SERVICE_SUB_LINKS.slice(1).map((sub) => (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.125rem',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '4px 0',
                      }}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--teal-accent)', flexShrink: 0 }} />
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
            className="btn btn-primary"
            style={{ marginTop: '32px', justifyContent: 'center', opacity: 0, animation: 'fadeInUp 0.4s var(--ease-smooth) 0.5s both' }}
          >
            Get in Touch
          </Link>
        </div>
      )}
    </nav>
  );
};
