import React from 'react';
import { Navbar } from '../organisms/Navbar';
import { Footer } from '../organisms/Footer';
import { useLenisScroll } from '../../hooks/useLenisScroll';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  useLenisScroll();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--white)',
      color: 'var(--text-body)',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
    }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: '72px' }}>{children}</main>
      <Footer />
    </div>
  );
};
