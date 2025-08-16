'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { SubCategories } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React from 'react';

const AllSubCategories = ({
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
    <GenericAllTable<SubCategories>
      value={value}
      title={t('Dashboard.subCategories.allSubCategories')}
      description={t('Dashboard.subCategories.manageSubCategories')}
      apiEndpoint="sub-categories"
      deleteEndpoint="sub-category/delete"
      placeholder={t('Inputs.placeHolders.searchSubCategories')}
      createTabValue="createSubCategory"
      onEditIdChange={onEditIdChange}
      onTabChange={onTabChange}
    />
  );
};

export default AllSubCategories;
