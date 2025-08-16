'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { Slider } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React from 'react';

const AllImageSlider = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  const t = useTranslations();

  return (
    <GenericAllTable<Slider>
      value={value}
      title={t('Dashboard.sliders.allTitle')}
      description={t('Dashboard.sliders.manageSliders')}
      apiEndpoint="sliders"
      deleteEndpoint="slider"
      createTabValue="CreateImagesSlider"
      placeholder={t('Inputs.placeHolders.searchImage')}
      onTabChange={onTabChange}
      showEdit={false}
    />
  );
};

export default AllImageSlider;
