import React from 'react';
import TopBanner from './header/TopBanner';
import Header from './header/Header';
import Navbar from './header/Navbar';
import Footer from './Footer';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TopBanner />
      <Header />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
