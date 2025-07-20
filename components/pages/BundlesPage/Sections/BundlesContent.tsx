'use client';
import ProductCard from '@/components/atomic/ProductCard';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import Container from '@/components/organism/Container';
import { BundlesPageProps } from '@/interfaces';
import React from 'react';
import { PiShoppingCartLight } from 'react-icons/pi';

const BundlesContent: React.FC<BundlesPageProps> = ({ item, params }) => {
  return (
    <Container otherClassName="mt-12">
      <GridWrapper otherClassName="gap-5">
        {item.shiddatData.map((card, index) => (
          <AnimatedWrapper key={card.id} custom={index}>
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
              cardLinkPath={`/categories/${params.category}/${params.itemId}/bundles/${card.id}`}
              {...card}
            />
          </AnimatedWrapper>
        ))}
      </GridWrapper>
    </Container>
  );
};

export default BundlesContent;
