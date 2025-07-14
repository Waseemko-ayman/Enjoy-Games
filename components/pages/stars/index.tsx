'use client';
import React, { useState } from 'react';
import WelcomeSection from './Sections/WelcomeSection';
import EnjoyGamesGifts from './Sections/EnjoyGamesGifts';
import Upgrade from './Sections/Upgrade';
import FAQ from './Sections/FAQ';
import EarnMore from './Sections/EarnMore';

const StarsPage = () => {
  const [isLogin] = useState(true);
  return (
    <>
      <WelcomeSection />
      <EnjoyGamesGifts />
      <Upgrade />
      {isLogin && <EarnMore />}
      <FAQ />
    </>
  );
};

export default StarsPage;
