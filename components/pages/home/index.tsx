'use client';
import React from 'react';
import CategoriesTypes from './Sections/CategoriesTypes';
import BestSellers from './Sections/BestSellers';
import SuggestedProducts from './Sections/SuggestedProducts';
import NewlyArrived from './Sections/NewlyArrived';
import RedeemPoints from './Sections/RedeemPoints';
import EnjoyWinWin from './Sections/EnjoyWinWin';
import ServiceAdvantages from './Sections/ServiceAdvantages';
import WalletSection from './Sections/WalletSection';
import HeroBanner from './Sections/HeroBanner';
import { useTranslations } from 'next-intl';
import { useCategories } from '@/context/CategoriesContext';
import { useMainContent } from '@/context/MainContentContext';

const HomePage = () => {
  const t = useTranslations('HomePage');
  const { categories, loading } = useCategories();
  const { data, loading: isLoading } = useMainContent();

  return (
    <>
      {/* <HeroBanner sliders={data?.sliders ?? []} /> */}
      <HeroBanner />
      <CategoriesTypes categories={categories} loading={loading} />
      <WalletSection t={t} />
      <BestSellers
        t={t}
        bestSeller={data?.best_seller ?? []}
        isLoading={isLoading}
      />
      <SuggestedProducts
        t={t}
        suggestedProducts={data?.suggested_products ?? []}
        isLoading={isLoading}
      />
      <NewlyArrived
        t={t}
        newlyArrived={data?.newly_arrived ?? []}
        isLoading={isLoading}
      />
      <RedeemPoints
        t={t}
        newlyArrived={data?.newly_arrived ?? []}
        isLoading={isLoading}
      />
      <EnjoyWinWin t={t} />
      <ServiceAdvantages t={t} />
    </>
  );
};

export default HomePage;
