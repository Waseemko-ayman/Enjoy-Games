import PageHeader from '@/components/molecules/PageHeader';
import React from 'react';
import FAQS from '@/components/organism/FAQS';
import { FaqsProvider } from '@/context/FaqContext';

const FAQSPage = () => {
  return (
    <div>
      <PageHeader />
      <FaqsProvider>
        <FAQS />
      </FaqsProvider>
    </div>
  );
};

export default FAQSPage;
