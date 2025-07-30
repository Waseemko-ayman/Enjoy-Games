'use client';
import React from 'react';
import WelcomeSection from './Sections/WelcomeSection';
import EnjoyGamesGifts from './Sections/EnjoyGamesGifts';
import Upgrade from './Sections/Upgrade';
import FAQ from './Sections/FAQ';
import EarnMore from './Sections/EarnMore';
import { useAuthContext } from '@/context/AuthContext';
import { getCategoryAndSubCategorySlugs } from '@/utils/helpers';
import { useCategories } from '@/context/CategoriesContext';

const StarsPage = () => {
  const { token } = useAuthContext();
  const { categories } = useCategories();
  return (
    <>
      <WelcomeSection />
      <EnjoyGamesGifts
        getSlugs={(subCatId) =>
          getCategoryAndSubCategorySlugs(categories, subCatId)
        }
      />
      <Upgrade />
      {token && <EarnMore />}
      <FAQ />
    </>
  );
};

export default StarsPage;
