/* eslint-disable react-hooks/exhaustive-deps */
// context/MainContentContext.tsx
'use client';

import React, { createContext, useContext, useEffect } from 'react';
import useAPI from '@/hook/useAPI';
import { useLocale } from 'next-intl';
import { Category, ProductCardProps } from '@/interfaces';

interface Sliders {
  id: number;
  image: string;
}

interface MobileMainContent {
  categories: Category[];
  sliders: Sliders[];
  best_seller: ProductCardProps[];
  newly_arrived: ProductCardProps[];
  suggested_products: ProductCardProps[];
}

interface MainContentContextType {
  data: MobileMainContent | null;
  isLoading: boolean;
  error: string;
  refresh: () => void;
}

const MainContentContext = createContext<MainContentContextType>({
  data: null,
  isLoading: true,
  error: '',
  refresh: () => {},
});

export const MainContentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { get, data, isLoading, error } =
    useAPI<MobileMainContent>('main-content');
  const locale = useLocale();

  useEffect(() => {
    get();
  }, [locale]);

  const refresh = () => get();

  return (
    <MainContentContext.Provider value={{ data, isLoading, error, refresh }}>
      {children}
    </MainContentContext.Provider>
  );
};

export const useMainContent = () => useContext(MainContentContext);
