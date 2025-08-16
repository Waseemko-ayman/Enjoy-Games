import GenericPage from '@/components/organism/GenericPage';
import React from 'react';
import AllFaqs from './Sections/AllFaqs';
import CreateFaqs from './Sections/CreateFaqs';
import { useTranslations } from 'next-intl';

const FaqsPage = () => {
  const t = useTranslations('Dashboard.faqs');
  const tabsData = [
    { value: 'allFaqs', label: t('title') },
    { value: 'createFaqs', label: t('createFaq') },
  ];

  return (
    <GenericPage
      title={t('title')}
      description={t('desc')}
      tabs={tabsData}
      allComponent={AllFaqs}
      createComponent={CreateFaqs}
    />
  );
};

export default FaqsPage;
