import Container from '@/components/organism/Container';
import React from 'react';
import SectionsTypes from './Sections/SectionsTypes';
import BestSellers from './Sections/BestSellers';
import SuggestedProducts from './Sections/SuggestedProducts';
import NewlyArrived from './Sections/NewlyArrived';

const HomePage = () => {
  return (
    <>
      <Container>
        <SectionsTypes />
        <BestSellers />
        <SuggestedProducts />
        <NewlyArrived />
      </Container>
    </>
  );
};

export default HomePage;
