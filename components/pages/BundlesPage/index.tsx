import NoOffers from '@/components/molecules/NoOffers';
import PageHeader from '@/components/molecules/PageHeader';
import { BundlesPageProps } from '@/interfaces';
import React from 'react';
import BundlesContent from './Sections/BundlesContent';

const BundlesPage: React.FC<BundlesPageProps> = ({ item, params }) => {
  const itemId = item?.id || '';

  if (!item?.shiddatData || item.shiddatData.length === 0) {
    return <NoOffers itemId={itemId} />;
  }

  return (
    <div>
      <PageHeader />
      <BundlesContent item={item} params={params} />
    </div>
  );
};

export default BundlesPage;
