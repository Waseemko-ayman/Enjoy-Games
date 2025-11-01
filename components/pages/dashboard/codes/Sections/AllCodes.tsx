'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import { useProductCodes } from '@/context/selectedProductId';
import { useUpdateContent } from '@/context/updateContentContext';
import { CodesResponse } from '@/interfaces';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

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
    const { refreshFlags } = useUpdateContent();
  const searchParams = useSearchParams();
  const [refreshKey, setRefreshKey] = useState(0);

  // مسح selectedProductId إذا تم الدخول مباشرة
  useEffect(() => {
    if (!searchParams.get('fromProduct')) {
      setSelectedProductId(null);
    }
  }, [searchParams, setSelectedProductId]);

  // تحديد API endpoint
  const fromProductId = searchParams.get('fromProduct') || selectedProductId;
  const availableForProductId = searchParams.get('availableForProduct');

  const apiEndpoint = availableForProductId
    ? `products/${availableForProductId}/available-codes`
    : fromProductId
    ? `product/${fromProductId}/codes`
    : 'codes';

  useEffect(() => {
    setRefreshKey((prev) => prev + 1);
  }, [refreshFlags.codes]);

  return (
    <GenericAllTable<CodesResponse>
      key={refreshKey}
      value={value}
      title={t('Dashboard.codes.title')}
      description={t('Dashboard.codes.manageCodes')}
      apiEndpoint={apiEndpoint}
      deleteEndpoint="code/delete"
      placeholder={t('Inputs.placeHolders.searchCodes')}
      onEditIdChange={onEditIdChange}
      onTabChange={onTabChange}
      createTabValue="CreateCodes"
      deleteLocation={t('sidebar.codes')}
    />
  );
};

export default AllCodes;
