'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProductCodesContextType {
  selectedProductId: number | null;
  setSelectedProductId: (id: number | null) => void;
}

const ProductCodesContext = createContext<ProductCodesContextType | undefined>(
  undefined
);

export const ProductCodesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedProductId, setSelectedProductIdState] = useState<
    number | null
  >(null);

  // تحديث القيمة في state + localStorage
  const setSelectedProductId = (id: number | null) => {
    setSelectedProductIdState(id);
    if (id !== null) {
      localStorage.setItem('selectedProductId', id.toString());
    } else {
      localStorage.removeItem('selectedProductId');
    }
  };

  // قراءة القيمة المخزنة عند أول تحميل
  useEffect(() => {
    const storedId = localStorage.getItem('selectedProductId');
    if (storedId) {
      setSelectedProductIdState(Number(storedId));
    }
  }, []);

  return (
    <ProductCodesContext.Provider
      value={{ selectedProductId, setSelectedProductId }}
    >
      {children}
    </ProductCodesContext.Provider>
  );
};

export const useProductCodes = () => {
  const context = useContext(ProductCodesContext);
  if (!context) {
    throw new Error(
      'useProductCodes must be used within a ProductCodesProvider'
    );
  }
  return context;
};
