import Container from '@/components/organism/Container';
import React from 'react';
import SectionsTypes from './Sections/SectionsTypes';
import BestSellers from './Sections/BestSellers';
import SuggestedProducts from './Sections/SuggestedProducts';
import NewlyArrived from './Sections/NewlyArrived';
import RedeemPoints from './Sections/RedeemPoints';

const HomePage = () => {
  return (
    <>
      <Container>
        <SectionsTypes />
        <BestSellers />
        <SuggestedProducts />
        <NewlyArrived />
        <RedeemPoints />
      </Container>
    </>
  );
};

export default HomePage;
