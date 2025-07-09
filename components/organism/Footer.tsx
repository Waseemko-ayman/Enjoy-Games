import React from 'react';
import HelpSection from '../molecules/HelpSection';
import Container from './Container';
import Image from 'next/image';
import FooterLinks from '../molecules/FooterLinks';
import FooterBanner from './FooterBanner';

const Footer = () => {
  return (
    <footer className="relative bg-enjoy-primary-deep mt-40 md:mt-32">
      <Container otherClassName="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-6xl px-4">
          <HelpSection />
        </div>
        <div className="pt-32 md:pt-28 text-white flex flex-col items-center md:items-start md:flex-row max-md:text-center gap-5">
          <Image
            src="/assets/logo.png"
            alt="Enjoy Games"
            title="Enjoy Games"
            width={120}
            height={120}
          />
          <div className="flex items-start justify-between flex-wrap gap-5 w-full">
            <FooterLinks secTitle="أعرف المزيد عنا" listName="followUs" />
            <FooterLinks secTitle="الأعمال والحلول" listName="works" />
            <FooterLinks secTitle="الأعمال والحلول" listName="works2" />
            <FooterLinks secTitle="تسوق عالتطبيق" listName="shop_app" />
            <FooterLinks secTitle="تواصل معنا" listName="socialMedia" />
          </div>
        </div>
        <FooterBanner />
      </Container>
    </footer>
  );
};

export default Footer;
