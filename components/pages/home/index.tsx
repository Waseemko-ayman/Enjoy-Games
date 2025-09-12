'use client';
import React from 'react';
import CategoriesTypes from './Sections/CategoriesTypes';
import BestSellers from './Sections/BestSellers';
import SuggestedProducts from './Sections/SuggestedProducts';
import NewlyArrived from './Sections/NewlyArrived';
// import RedeemPoints from './Sections/RedeemPoints';
import EnjoyWinWin from './Sections/EnjoyWinWin';
import ServiceAdvantages from './Sections/ServiceAdvantages';
// import WalletSection from './Sections/WalletSection';
import HeroBanner from './Sections/HeroBanner';
import { useTranslations } from 'next-intl';
import { useCategories } from '@/context/CategoriesContext';
import { useMainContent } from '@/context/MainContentContext';
import { getCategoryAndSubCategorySlugs } from '@/utils/helpers';
// import { WalletProvider } from '@/context/WalletContext';

const HomePage = () => {
  const t = useTranslations('HomePage');
  const {
    categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const {
    data,
    isLoading: mainContentLoading,
    error: mainContentError,
  } = useMainContent();

  return (
    <>
      <HeroBanner
        sliders={data?.sliders ?? []}
        loading={mainContentLoading}
        error={mainContentError}
      />
      <CategoriesTypes
        categories={categories}
        loading={categoriesLoading}
        error={categoriesError}
      />
      {/* <WalletProvider>
        <WalletSection t={t} />
      </WalletProvider> */}
      <BestSellers
        t={t}
        bestSeller={data?.best_seller ?? []}
        isLoading={mainContentLoading}
        error={mainContentError}
        getSlugs={(subCatId) =>
          getCategoryAndSubCategorySlugs(categories, subCatId)
        }
      />
      <SuggestedProducts
        t={t}
        suggestedProducts={data?.suggested_products ?? []}
        isLoading={mainContentLoading}
        error={mainContentError}
        getSlugs={(subCatId) =>
          getCategoryAndSubCategorySlugs(categories, subCatId)
        }
      />
      <NewlyArrived
        t={t}
        newlyArrived={data?.newly_arrived ?? []}
        isLoading={mainContentLoading}
        error={mainContentError}
        getSlugs={(subCatId) =>
          getCategoryAndSubCategorySlugs(categories, subCatId)
        }
      />
      {/* <RedeemPoints
        t={t}
        newlyArrived={data?.newly_arrived ?? []}
        isLoading={mainContentLoading}
        error={mainContentError}
        getSlugs={(subCatId) =>
          getCategoryAndSubCategorySlugs(categories, subCatId)
        }
      /> */}
      <EnjoyWinWin t={t} />
      <ServiceAdvantages t={t} />
    </>
  );
};

export default HomePage;
