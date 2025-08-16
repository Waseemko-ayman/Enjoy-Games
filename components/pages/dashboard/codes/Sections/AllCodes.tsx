'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { useProductCodes } from '@/context/selectedProductId';
import { CodesResponse } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React from 'react';

const AllCodes = ({
  value,
  onTabChange,
  onEditIdChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
  onEditIdChange: (id: string | number | null) => void;
}) => {
  const { selectedProductId } = useProductCodes();
  const t = useTranslations();

  return (
    <GenericAllTable<CodesResponse>
      value={value}
      title={t('Dashboard.codes.title')}
      description={t('Dashboard.codes.manageCodes')}
      apiEndpoint={`product/${selectedProductId}/codes`}
      deleteEndpoint="code/delete"
      placeholder={t('Inputs.placeHolders.searchCodes')}
      onEditIdChange={onEditIdChange}
      onTabChange={onTabChange}
      createTabValue="CreateCodes"
    />
  );
};

export default AllCodes;
