'use client';
import React from 'react';
import Profits from './Sections/Profits';
import Upgrade from './Sections/Upgrade';
import FAQ from './Sections/FAQ';
import EarnMore from './Sections/EarnMore';
import { useAuthContext } from '@/context/AuthContext';

const MaxupProgramPage = () => {
  const { token } = useAuthContext();

  return (
    <>
      <Profits />
      <Upgrade />
      {token && <EarnMore />}
      <FAQ />
    </>
  );
};

export default MaxupProgramPage;
