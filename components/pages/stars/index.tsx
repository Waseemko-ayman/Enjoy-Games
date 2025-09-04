'use client';
import React from 'react';
import WelcomeSection from './Sections/WelcomeSection';
import Upgrade from './Sections/Upgrade';
import EarnMore from './Sections/EarnMore';
import { useAuthContext } from '@/context/AuthContext';
import FAQS from '@/components/organism/FAQS';
import { FaqsProvider } from '@/context/FaqContext';
import { WalletProvider } from '@/context/WalletContext';

const StarsPage = () => {
  const { token } = useAuthContext();
  // const { categories } = useCategories();
  return (
    <>
      <WelcomeSection />
      {/* <EnjoyGamesGifts
        getSlugs={(subCatId) =>
          getCategoryAndSubCategorySlugs(categories, subCatId)
        }
      /> */}
      <WalletProvider>
        <Upgrade />
      </WalletProvider>
      {token && <EarnMore />}
      <FaqsProvider>
        <FAQS showTitle />
      </FaqsProvider>
    </>
  );
};

export default StarsPage;
