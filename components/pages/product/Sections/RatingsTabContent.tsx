import React from 'react';
import RatingsSheet from './RatingsSheet';
import ReviewSection from './ReviewSection';
import { ProductCardProps } from '@/interfaces';

const RatingsTabContent = ({
  product,
  isLoading,
}: {
  product: ProductCardProps;
  isLoading: boolean;
}) => {
  return (
    <div>
      <RatingsSheet product={product} />
      <ReviewSection product={product} isLoading={isLoading} />
    </div>
  );
};

export default RatingsTabContent;
