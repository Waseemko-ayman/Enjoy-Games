import MotionSection from '@/components/molecules/FramerMotion/MotionSection';
import { ProductCardProps } from '@/interfaces';
import { extractText } from '@/utils/extractText';
import React from 'react';

const ProductDetailsTabContent = ({
  product,
}: {
  product: ProductCardProps;
}) => {
  return (
    <div className="mt-3">
      <MotionSection index={1}>
        <h5 className="text-lg font-semibold mb-5 text-center">
          {product?.title}
        </h5>
      </MotionSection>
      <MotionSection index={2}>
        <p className="text-[15px] leading-6 text-right">
          {extractText(product?.description)}
        </p>
      </MotionSection>
    </div>
  );
};

export default ProductDetailsTabContent;
