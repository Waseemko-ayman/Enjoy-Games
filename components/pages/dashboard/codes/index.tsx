'use client';
import React from 'react';
import AllCodes from './Sections/AllCodes';
import CreateCodes from './Sections/CreateCodes';
import GenericPage from '@/components/organism/GenericPage';
import { useTranslations } from 'next-intl';
import CreateBulkImportCodes from './Sections/CreateBulkImportCodes';

const CodesPage = () => {
  const t = useTranslations('Dashboard.codes');

  const tabsData = [
    { value: 'AllCodes', label: t('title') },
    { value: 'CreateCodes', label: t('createCode') },
    { value: 'CreateBulkImportCodes', label: t('CreateBulkImportCodes') },
  ];

  return (
    <GenericPage
      title={t('title')}
      description={t('desc')}
      tabs={tabsData}
      allComponent={AllCodes}
      createComponent={CreateCodes}
      overviewComponent={CreateBulkImportCodes}
      overviewTabValue="CreateBulkImportCodes"
    />
  );
};

export default CodesPage;
