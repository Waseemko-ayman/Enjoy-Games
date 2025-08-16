'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { CategoryResponse } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React from 'react';

const AllCategories = ({
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
    <GenericAllTable<CategoryResponse>
      value={value}
      title={t('Layout.header.navBar.allCategories')}
      description={t('Dashboard.categories.manageCategories')}
      apiEndpoint="categories"
      deleteEndpoint="category/delete"
      placeholder={t('Inputs.placeHolders.searchCategories')}
      createTabValue="createCategory"
      onEditIdChange={onEditIdChange}
      onTabChange={onTabChange}
    />
  );
};

export default AllCategories;
