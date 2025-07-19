'use client';
import React from 'react';
import TopBanner from './TopBanner';
import Header from './WebHeader/Header';
import Navbar from './WebHeader/Navbar';
import Footer from './Footer';
import MobileHeader from './MobileHeader/Header';
import SearchHeader from './MobileHeader/SearchHeader';
import MobileNavbar from './MobileHeader/Navbar';
import { usePathname } from 'next/navigation';
import useIsMobile from '@/hook/useIsMobile';
import { FloatingChatWidget } from './FloatingChatWidget';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isStorePage = pathname === '/store';
  const isCartPage = pathname === '/my-cart';

  const isMobile = useIsMobile();

  return (
    <>
      {!isCartPage && <TopBanner />}
      {isCartPage ? (
        <></>
      ) : isMobile ? (
        <>
          <MobileHeader />
          <SearchHeader />
          <MobileNavbar />
          {isStorePage && <Navbar layout="store" isMobile />}
        </>
      ) : (
        <div className="shadow-header">
          <Header />
          <Navbar layout={isStorePage ? 'store' : 'default'} />
        </div>
      )}
      {children}
      {!isCartPage && <Footer />}
      <FloatingChatWidget />
    </>
  );
};

export default MainLayout;
