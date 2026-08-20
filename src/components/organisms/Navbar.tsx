import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Maintenance', href: '/maintenance' },
  { label: 'Clients', href: '/clients' },
  { label: 'Partners', href: '/partners' },
  { label: 'Contact', href: '/contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container" style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link
          to="/"
          style={{ display: 'flex', flexDirection: 'column', gap: '1px', textDecoration: 'none' }}
          aria-label="Nour Medical — Home"
        >
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--navy)',
            lineHeight: 1,
          }}>
            Nour Medical
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>
            Healthcare Technology
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="hover-underline"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  fontWeight: isActive(link.href) ? 600 : 500,
                  color: isActive(link.href) ? 'var(--navy)' : 'var(--text-muted)',
                  letterSpacing: '0.02em',
                  transition: 'color var(--dur-fast)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
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
            top: '72px',
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
            <Link
              key={link.href}
              to={link.href}
              style={{
                padding: '20px 0',
                borderBottom: '1px solid var(--warm-neutral)',
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
          ))}
          <Link
            to="/contact"
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
