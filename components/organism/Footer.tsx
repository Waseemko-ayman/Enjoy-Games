import React from 'react';
import HelpSection from '../molecules/HelpSection';
import Container from './Container';
import Image from 'next/image';
import FooterLinks from '../molecules/FooterLinks';
import FooterBanner from './FooterBanner';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Layout.footer');
  return (
    <footer className="relative bg-enjoy-primary-deep mt-40 md:mt-32 max-sm:pb-36">
      <Container otherClassName="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-6xl px-4">
          <HelpSection />
        </div>
        <div className="pt-32 md:pt-28 text-white flex flex-col items-center md:items-start md:flex-row max-md:text-center gap-5">
          <Image
            src="/assets/logo.png"
            alt="Enjoy Games Logo"
            title="Enjoy Games"
            width={120}
            height={120}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
            <FooterLinks
              secTitle={t('LearnMore.title')}
              listName="LearnMore"
              t={t}
            />
            <FooterLinks
              secTitle={t('BusinessAndSolutions.title')}
              listName="BusinessAndSolutions"
              t={t}
            />
            <FooterLinks
              secTitle={t('applyShopping')}
              t={t}
              listName="shop_app"
            />
            <FooterLinks
              secTitle={t('connectWithUs')}
              t={t}
              listName="socialMedia"
            />
          </div>
        </div>
        <FooterBanner />
      </Container>
    </footer>
  );
};

export default Footer;
