'use client';
import React, { useState } from 'react';
import Profits from './Sections/Profits';
import Upgrade from './Sections/Upgrade';
import FAQ from './Sections/FAQ';
import EarnMore from './Sections/EarnMore';

const MaxupProgramPage = () => {
  const [isLogin] = useState(true);

  return (
    <>
      <Profits />
      <Upgrade />
      {isLogin && <EarnMore />}
      <FAQ />
    </>
  );
};

export default MaxupProgramPage;
