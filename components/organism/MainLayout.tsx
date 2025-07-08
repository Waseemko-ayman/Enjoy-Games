'use client';
import React, { useEffect, useState } from 'react';
import TopBanner from './WebHeader/TopBanner';
import Header from './WebHeader/Header';
import Navbar from './WebHeader/Navbar';
import Footer from './Footer';
import MobileHeader from './MobileHeader/Header';
import SearchHeader from './MobileHeader/SearchHeader';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <TopBanner />
      {isMobile ? (
        <>
          <MobileHeader />
          <SearchHeader />
        </>
      ) : (
        <>
          <Header />
          <Navbar />
        </>
      )}
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
