'use client';
import React from 'react';
import WelcomeSection from './Sections/WelcomeSection';
import EnjoyGamesGifts from './Sections/EnjoyGamesGifts';
import Upgrade from './Sections/Upgrade';
import FAQ from './Sections/FAQ';
import EarnMore from './Sections/EarnMore';
import { useAuthContext } from '@/context/AuthContext';

const StarsPage = () => {
  const { token } = useAuthContext();
  return (
    <>
      <WelcomeSection />
      <EnjoyGamesGifts />
      <Upgrade />
      {token && <EarnMore />}
      <FAQ />
    </>
  );
};

export default StarsPage;
