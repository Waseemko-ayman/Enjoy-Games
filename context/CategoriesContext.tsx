'use client';

import React, { createContext, useContext, useEffect } from 'react';
import useAPI from '@/hook/useAPI';
import { APIRequest, Category } from '@/interfaces';
import { useLocale } from 'next-intl';

interface CategoriesContextType extends APIRequest {
  categories: Category[];
}

const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  isLoading: true,
  error: false,
  refresh: () => {},
});

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    get,
    data: categories,
    isLoading,
    error,
  } = useAPI<{
    success: boolean;
    data: Category[];
    message: string;
  }>('categories-subcategories');
  const locale = useLocale();

  useEffect(() => {
    get();
  }, [locale, get]);

  const refresh = () => {
    get();
  };

  return (
    <CategoriesContext.Provider
      value={{ categories, isLoading, error, refresh }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
