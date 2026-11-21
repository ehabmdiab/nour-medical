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
    <div className="min-h-screen bg-white text-navy flex flex-col overflow-x-clip">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
