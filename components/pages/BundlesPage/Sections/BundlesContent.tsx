'use client';
import ProductCard from '@/components/atomic/ProductCard';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import Container from '@/components/organism/Container';
import { BundlesPageProps } from '@/interfaces';
import { useTranslations } from 'next-intl';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';
import { PiShoppingCartLight } from 'react-icons/pi';

const BundlesContent: React.FC<BundlesPageProps> = ({ item }) => {
  const btnTxts = useTranslations('BtnTexts');
  const searchParams = useSearchParams();
  const account = searchParams.get('account');
  const params = useParams();

  const filteredData = account
    ? item.shiddatData.filter(
        (_, i) => i % 2 === (account === 'account1' ? 0 : 1)
      ) // مجرد مثال للفصل
    : item.shiddatData;

  return (
    <Container otherClassName="mt-12">
      <GridWrapper otherClassName="gap-5">
        {filteredData.map((card, index) => (
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
              btnText={btnTxts('addToCart')}
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
