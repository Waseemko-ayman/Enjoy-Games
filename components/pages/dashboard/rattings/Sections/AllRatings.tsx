'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { ProductCardProps } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React from 'react';

const AllRatings = ({
  value,
  onTabChange,
  onEditIdChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
  onEditIdChange: (id: string | number | null) => void;
}) => {
  const t = useTranslations();

  return (
    <GenericAllTable<ProductCardProps>
      value={value}
      title={t('Dashboard.ratings.allTitle')}
      description={t('Dashboard.ratings.manageRatings')}
      apiEndpoint="rating"
      deleteEndpoint="rating/delete"
      createTabValue="createRatings"
      placeholder={t('Inputs.placeHolders.searchRating')}
      onEditIdChange={onEditIdChange}
      onTabChange={onTabChange}
    />
  );
};

export default AllRatings;
