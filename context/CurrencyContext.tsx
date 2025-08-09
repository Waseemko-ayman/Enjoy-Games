'use client';

import { countries } from '@/data';
import { Country } from '@/interfaces';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CurrencyContextType {
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
}

const CurrencyContext = createContext<CurrencyContextType>({
  selectedCountry: countries[0],
  setSelectedCountry: () => {},
});

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(() => {
    const storedCode = localStorage.getItem('currencyCode');
    return countries.find((c) => c.code === storedCode) || countries[0];
  });

  useEffect(() => {
    if (selectedCountry) {
      localStorage.setItem('currencyCode', selectedCountry.code);
    }
  }, [selectedCountry]);

  return (
    <CurrencyContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
