/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import useAPI from '@/hook/useAPI';
import { Category } from '@/interfaces';

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
  const { get, data: categories } = useAPI<{
    success: boolean;
    data: Category[];
    message: string;
  }>('categories-subcategories');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    if (categories?.data) {
      setLoading(false);
    }
  }, [categories]);

  const refresh = () => {
    setLoading(true);
    get();
  };

  return (
    <CategoriesContext.Provider value={{ categories, loading, refresh }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
