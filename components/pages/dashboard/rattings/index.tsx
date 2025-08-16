import GenericPage from '@/components/organism/GenericPage';
import React from 'react';
import AllRatings from './Sections/AllRatings';
import { useTranslations } from 'next-intl';

const RatingsPage = () => {
  const t = useTranslations('Dashboard.ratings');

  const tabsData = [
    { value: 'allRatings', label: t('allTitle') },
    // { value: 'createRatings', label: 'إنشاء تقييم' },
  ];

  return (
    <GenericPage
      title={t('title')}
      description={t('manageRatings')}
      tabs={tabsData}
      allComponent={AllRatings}
    />
  );
};

export default RatingsPage;
