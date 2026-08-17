import React, { useState, useEffect } from 'react';
import { NavItem } from '../molecules/NavItem';
import { MagneticButton } from '../atoms/MagneticButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Activity, PhoneCall } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/services', label: 'Services' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/clients', label: 'Our Clients' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div
          className={`w-[92%] max-w-7xl px-6 py-3 rounded-full flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'bg-white/90 backdrop-blur-2xl border border-cyan-500/20 shadow-[0_10px_30px_rgba(0,168,232,0.12)] py-2.5'
              : 'bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-sm'
          }`}
        >
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-cyan-600/10 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
              <Activity className="w-5 h-5 text-cyan-600 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg tracking-wider text-slate-900 flex items-center gap-1">
                NOUR <span className="text-cyan-600">MEDICAL</span>
              </span>
              <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">HEALTHCARE TECH</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavItem key={link.to} to={link.to} label={link.label} />
            ))}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <MagneticButton
                onClick={() => navigate('/contact')}
                variant="primary"
                icon={<PhoneCall className="w-3.5 h-3.5" />}
              >
                Talk to an Expert
              </MagneticButton>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-full bg-slate-100 text-slate-800 border border-slate-300 hover:bg-cyan-50 hover:text-cyan-600"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Overlay Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 lg:hidden"
          >
            <div className="scanline-overlay" />

            <div className="flex flex-col space-y-4 relative z-10">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-heading font-bold text-slate-900 hover:text-cyan-600 transition-colors border-b border-slate-200 pb-3"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="relative z-10 space-y-4 pt-6 border-t border-slate-200">
              <MagneticButton
                onClick={() => {
                  setMobileOpen(false);
                  navigate('/contact');
                }}
                variant="primary"
                className="w-full"
                icon={<PhoneCall className="w-4 h-4" />}
              >
                Talk to an Expert
              </MagneticButton>

              <div className="text-center text-xs font-mono text-slate-500">
                Cairo Headquarters • Misr Helwan Agricultural St.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
