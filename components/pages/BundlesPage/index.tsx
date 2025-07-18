import ProductCard from '@/components/atomic/ProductCard';
import GridWrapper from '@/components/molecules/GridWrapper';
import NoOffers from '@/components/molecules/NoOffers';
import PageHeader from '@/components/molecules/PageHeader';
import Container from '@/components/organism/Container';
import { BundlesPageProps } from '@/interfaces';
import React from 'react';
import { PiShoppingCartLight } from 'react-icons/pi';

const BundlesPage: React.FC<BundlesPageProps> = ({ item, params }) => {
  const itemId = item?.id || '';

  if (!item?.shiddatData || item.shiddatData.length === 0) {
    return <NoOffers itemId={itemId} />;
  }

  return (
    <div>
      <PageHeader />
      <Container otherClassName="mt-12">
        <GridWrapper otherClassName="gap-5">
          {item.shiddatData.map((card) => (
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
          ))}
        </GridWrapper>
      </Container>
    </div>
  );
};

export default BundlesPage;
