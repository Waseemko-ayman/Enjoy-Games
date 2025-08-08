'use client';
import React from 'react';
import Profits from './Sections/Profits';
import Upgrade from './Sections/Upgrade';
import EarnMore from './Sections/EarnMore';
import { useAuthContext } from '@/context/AuthContext';
import FAQS from '@/components/organism/FAQS';
import { FaqsProvider } from '@/context/FaqContext';

const MaxupProgramPage = () => {
  const { token } = useAuthContext();

  return (
    <>
      <Profits />
      <Upgrade />
      {token && <EarnMore />}
      <FaqsProvider>
        <FAQS />
      </FaqsProvider>
    </>
  );
};

export default MaxupProgramPage;
