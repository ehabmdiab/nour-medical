import React from 'react';
import { Navbar } from '../organisms/Navbar';
import { Footer } from '../organisms/Footer';
import { CursorFollower } from './CursorFollower';
import { useLenisScroll } from '../../hooks/useLenisScroll';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  useLenisScroll();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-cyan-500/20 selection:text-slate-900 relative overflow-x-hidden">
      <CursorFollower />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
