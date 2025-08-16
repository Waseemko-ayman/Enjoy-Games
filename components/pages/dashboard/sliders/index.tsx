'use client';
import React from 'react';
import AllImageSlider from './Sections/AllImageSlider';
import CreateImagesSlider from './Sections/CreateImagesSlider';
import GenericPage from '@/components/organism/GenericPage';
import { useTranslations } from 'next-intl';

const SlidersPage = () => {
  const t = useTranslations('sliders');

  const tabsData = [
    { value: 'AllImageSlider', label: t('title') },
    { value: 'CreateImagesSlider', label: t('createFaq') },
  ];

  return (
    <GenericPage
      title={t('title')}
      description={t('desc')}
      tabs={tabsData}
      allComponent={AllImageSlider}
      createComponent={CreateImagesSlider}
    />
  );
};

export default SlidersPage;
