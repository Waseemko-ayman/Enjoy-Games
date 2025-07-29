/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { createContext, useContext, useEffect } from 'react';
import useAPI from '@/hook/useAPI';
import { Category } from '@/interfaces';
import { useLocale } from 'next-intl';

interface CategoriesContextType {
  categories: Category[];
  loading: boolean;
  refresh: () => void;
}

const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  loading: true,
  refresh: () => {},
});

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    get,
    data: categories,
    isLoading,
  } = useAPI<{
    success: boolean;
    data: Category[];
    message: string;
  }>('categories-subcategories');
  const locale = useLocale();

  useEffect(() => {
    get();
  }, [locale]);

  const refresh = () => {
    get();
  };

  return (
    <CategoriesContext.Provider
      value={{ categories, loading: isLoading, refresh }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
