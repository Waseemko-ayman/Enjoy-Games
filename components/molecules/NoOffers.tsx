'use client';

import React from 'react';
import Layer from '../atomic/Layer';
import Container from '../organism/Container';
import CardWrapper from '../atomic/CardWrapper';

type NoOffersProps = {
  itemId?: string;
};

const NoOffers: React.FC<NoOffersProps> = ({ itemId }) => {
  // دالة لتحويل النص لنسخة مقروءة
  const formatPart = (str?: string) => {
    if (!str) return '';
    return decodeURIComponent(str)
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <Layer otherClassName="!my-12">
      <Container>
        <CardWrapper bgColor="bg-white" className="py-[60px] text-center">
          <svg
            className="w-16 h-16 mb-4 text-gray-400 mx-auto"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17v-2a4 4 0 014-4h4m-4 0a4 4 0 00-4-4H5a4 4 0 00-4 4v4a4 4 0 004 4h4a4 4 0 014-4z"
            />
          </svg>
          <p className="text-lg text-gray-600 font-medium">
            نأسف! لا توجد بطاقات شحن {formatPart(itemId)}
          </p>
        </CardWrapper>
      </Container>
    </Layer>
  );
};

export default NoOffers;
