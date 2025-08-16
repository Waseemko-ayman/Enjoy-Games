'use client';
import React from 'react';
import AllCodes from './Sections/AllCodes';
import CreateCodes from './Sections/CreateCodes';
import GenericPage from '@/components/organism/GenericPage';
import { useTranslations } from 'next-intl';

const CodesPage = () => {
  const t = useTranslations('Dashboard.codes');

  const tabsData = [
    { value: 'AllCodes', label: t('title') },
    { value: 'CreateCodes', label: t('createCode') },
  ];

  return (
    <GenericPage
      title={t('title')}
      description={t('desc')}
      tabs={tabsData}
      allComponent={AllCodes}
      createComponent={CreateCodes}
    />
  );
};

export default CodesPage;
