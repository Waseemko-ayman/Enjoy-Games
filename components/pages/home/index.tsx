import React from 'react';
import SectionsTypes from './Sections/SectionsTypes';
import BestSellers from './Sections/BestSellers';
import SuggestedProducts from './Sections/SuggestedProducts';
import NewlyArrived from './Sections/NewlyArrived';
import RedeemPoints from './Sections/RedeemPoints';
import EnjoyWinWin from './Sections/EnjoyWinWin';
import ServiceAdvantages from './Sections/ServiceAdvantages';
import Banner from './Sections/Banner';

const HomePage = () => {
  return (
    <>
      <Banner
        images={[
          { src: '/assets/banners/banner1.webp', alt: 'Banner 1' },
          // { src: '/assets/banners/banner2.webp', alt: 'Banner 2' },
          // { src: '/assets/banners/banner3.webp', alt: 'Banner 3' },
        ]}
      />
      <SectionsTypes />
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
