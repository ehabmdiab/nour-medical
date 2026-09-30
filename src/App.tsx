import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PageLayout } from './components/templates/PageLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ClientsPage } from './pages/ClientsPage';
import { SuppliersPage } from './pages/SuppliersPage';
import { ContactPage } from './pages/ContactPage';
import { GalleryPage } from './pages/GalleryPage';
import { Cinematic3DLoader } from './components/organisms/Cinematic3DLoader';
import { LoaderContext } from './context/LoaderContext';

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const [showLoader, setShowLoader] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('loader') === 'true' || params.get('intro') === '1') {
        return true;
      }
      const hasDismissed = sessionStorage.getItem('nour_loader_dismissed');
      return !hasDismissed;
    }
    return true;
  });

  const handleLoaderComplete = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('nour_loader_dismissed', 'true');
    }
    setShowLoader(false);
  }, []);

  useEffect(() => {
    const handleReplay = () => {
      setShowLoader(true);
    };
    window.addEventListener('replay-3d-loader', handleReplay);
    return () => window.removeEventListener('replay-3d-loader', handleReplay);
  }, []);

  return (
    <LoaderContext.Provider value={showLoader}>
      <Router basename={import.meta.env.BASE_URL}>
        {showLoader && <Cinematic3DLoader onComplete={handleLoaderComplete} />}
        <ScrollToTop />
        <PageLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/maintenance" element={<Navigate to="/services#maintenance" replace />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/partners" element={<SuppliersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </PageLayout>
      </Router>
    </LoaderContext.Provider>
  );
};

export default App;
