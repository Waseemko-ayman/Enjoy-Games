import GenericAllTable from '@/components/organism/GenericAllTable';
import { ProductInventoryStats } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React from 'react';

const CodeInventoryStats = ({ value }: { value: string }) => {
  const t = useTranslations();

  return (
    <GenericAllTable<ProductInventoryStats>
      value={value}
      title={t('Dashboard.products.InventoryStatistics.title')}
      description={t('Dashboard.products.InventoryStatistics.desc')}
      apiEndpoint="products/inventory-stats"
      placeholder={t('Inputs.placeHolders.searchProduct')}
    />
  );
};

export default CodeInventoryStats;
