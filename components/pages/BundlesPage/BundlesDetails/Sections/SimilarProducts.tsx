import ProductCard from '@/components/atomic/ProductCard';
import GridWrapper from '@/components/molecules/GridWrapper';
import { shiddats } from '@/data';
import React from 'react';
import { PiShoppingCartLight } from 'react-icons/pi';

const SimilarProducts = () => {
  return (
    <div className="mt-10">
      <h3 className="text-2xl sm:text-3xl font-medium mb-4">منتجات مشابهة</h3>
      <GridWrapper otherClassName="gap-5" isScrollable>
        {shiddats.map((card) => (
          <ProductCard
            key={card.id}
            imgAlt={card.title}
            imgTitle={card.title}
            imgSrc={card.src}
            storeFlagImg={card.storeFlagImg}
            description
            showBtn={true}
            btnVariant="primary"
            btnText="أضف للسلة"
            Icon={PiShoppingCartLight}
            // cardLinkPath={`/categories/${params.category}/${params.itemId}/bundles/${card.id}`}
            {...card}
          />
        ))}
      </GridWrapper>
    </div>
  );
};

export default SimilarProducts;
