'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { useProductCodes } from '@/context/selectedProductId';
import { CodesResponse } from '@/interfaces';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const AllCodes = ({
  value,
  onTabChange,
  onEditIdChange,
}: {
  value: string;
  onTabChange: (val: string) => void;
  onEditIdChange: (id: string | number | null) => void;
}) => {
  const t = useTranslations();
  const { selectedProductId, setSelectedProductId } = useProductCodes();
  const searchParams = useSearchParams();

  // مسح selectedProductId إذا تم الدخول مباشرة
  useEffect(() => {
    if (!searchParams.get('fromProduct')) {
      setSelectedProductId(null);
    }
  }, [searchParams, setSelectedProductId]);

  // تحديد API endpoint
  const fromProductId = searchParams.get('fromProduct') || selectedProductId;
  const apiEndpoint = fromProductId
    ? `product/${fromProductId}/codes`
    : 'codes';

  return (
    <GenericAllTable<CodesResponse>
      value={value}
      title={t('Dashboard.codes.title')}
      description={t('Dashboard.codes.manageCodes')}
      apiEndpoint={apiEndpoint}
      deleteEndpoint="code/delete"
      placeholder={t('Inputs.placeHolders.searchCodes')}
      onEditIdChange={onEditIdChange}
      onTabChange={onTabChange}
      createTabValue="CreateCodes"
    />
  );
};

export default AllCodes;
