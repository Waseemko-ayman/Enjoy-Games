import ProductCard from '@/components/atomic/ProductCard';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import { shiddats } from '@/data';
import { useTranslations } from 'next-intl';
import React from 'react';
import { PiShoppingCartLight } from 'react-icons/pi';

const SimilarProducts = () => {
  const t = useTranslations('productDetails');
  const btnTxts = useTranslations('BtnTexts');
  return (
    <div className="mt-10">
      <AnimatedWrapper>
        <h3 className="text-2xl sm:text-3xl font-medium mb-4">
          {t('relatedProducts')}
        </h3>
      </AnimatedWrapper>
      <GridWrapper otherClassName="gap-5" isScrollable>
        {shiddats.map((card, index) => (
          <AnimatedWrapper key={card.id} custom={index}>
            <ProductCard
              key={card.id}
              imgAlt={card.name}
              imgTitle={card.name}
              imgSrc={card.image}
              description
              showBtn={true}
              btnVariant="primary"
              btnText={btnTxts('addToCart')}
              icon={PiShoppingCartLight}
              // cardLinkPath={`/categories/${params.category}/${params.itemId}/bundles/${card.id}`}
              {...card}
            />
          </AnimatedWrapper>
        ))}
      </GridWrapper>
    </div>
  );
};

export default SimilarProducts;
