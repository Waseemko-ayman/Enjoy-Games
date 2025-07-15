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

const HomePage = () => {
  return (
    <>
      <HeroBanner />
      <SectionsTypes />
      <WalletSection />
      <BestSellers />
      <SuggestedProducts />
      <NewlyArrived />
      <RedeemPoints />
      <EnjoyWinWin />
      <ServiceAdvantages />
    </>
  );
};

export default HomePage;
