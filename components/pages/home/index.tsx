/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect } from 'react';
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
import useAPI from '@/hook/useAPI';
import { Category } from '@/interfaces';
import { useCategories } from '@/context/CategoriesContext';

interface Sliders {
  id: number;
  image: string;
}

interface SimpleProduct {
  id: number;
  image: string;
  name: string;
}

interface CardProps {
  id: number;
  name: string;
  price?: number;
  newPrice?: number;
  storeName?: string;
  storeFlagImg?: string;
  ratings?: number | string;
}

interface MobileMainContent {
  categories: Category[];
  sliders: Sliders[];
  best_seller: SimpleProduct[];
  newly_arrived: CardProps[];
  suggested_products: SimpleProduct[];
}

const HomePage = () => {
  const t = useTranslations('HomePage');
  const { categories, loading } = useCategories();
  const { get, data, isLoading } = useAPI<MobileMainContent>(
    'main-content',
    {}
  );

  useEffect(() => {
    get();
  }, []);

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
