'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { Slider } from '@/interfaces';
import React from 'react';

const AllImageSlider = ({
  value,
  onTabChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
}) => {
  return (
    <GenericAllTable<Slider>
      value={value}
      title="جميع صور السلايدر"
      description="إدارة جميع صور السلايدر في مكان واحد"
      apiEndpoint="sliders"
      deleteEndpoint="slider"
      createTabValue="CreateImagesSlider"
      onTabChange={onTabChange}
      showEdit={false}
    />
  );
};

export default AllImageSlider;
