'use client';
import React from 'react';
import SectionsTypes from './Sections/SectionsTypes';
import BestSellers from './Sections/BestSellers';
import SuggestedProducts from './Sections/SuggestedProducts';
import NewlyArrived from './Sections/NewlyArrived';
import RedeemPoints from './Sections/RedeemPoints';
import EnjoyWinWin from './Sections/EnjoyWinWin';
import ServiceAdvantages from './Sections/ServiceAdvantages';
import WalletSection from './Sections/WalletSection';
import HeroBanner from './Sections/HeroBanner';
import { useTranslations } from 'next-intl';

const HomePage = () => {
  const t = useTranslations('HomePage');
  return (
    <>
      <HeroBanner />
      <SectionsTypes />
      <WalletSection t={t} />
      <BestSellers t={t} />
      <SuggestedProducts t={t} />
      <NewlyArrived t={t} />
      <RedeemPoints t={t} />
      <EnjoyWinWin t={t} />
      <ServiceAdvantages t={t} />
    </>
  );
};

export default HomePage;
