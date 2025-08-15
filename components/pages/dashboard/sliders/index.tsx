'use client';
import React from 'react';
import AllImageSlider from './Sections/AllImageSlider';
import CreateImagesSlider from './Sections/CreateImagesSlider';
import GenericPage from '@/components/organism/GenericPage';

const tabsData = [
  { value: 'AllImageSlider', label: 'جميع صور السلايدر' },
  { value: 'CreateImagesSlider', label: 'إنشاء صور سلايدر' },
];

const SlidersPage = () => {
  return (
    <GenericPage
      title="جميع صور السلايدر"
      description="قم بإنشاء وإدارة صور الإعلانات لمتجرك"
      tabs={tabsData}
      allComponent={AllImageSlider}
      createComponent={CreateImagesSlider}
    />
  );
};

export default SlidersPage;
