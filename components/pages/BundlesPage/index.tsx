import CommonCard from '@/components/atomic/CommonCard';
import GridWrapper from '@/components/molecules/GridWrapper';
import NoOffers from '@/components/molecules/NoOffers';
import PageHeader from '@/components/molecules/PageHeader';
import Container from '@/components/organism/Container';
import { CardItem } from '@/interfaces';
import React from 'react';
import { PiShoppingCartLight } from 'react-icons/pi';

interface BundlesPageProps {
  item: CardItem;
}

const BundlesPage: React.FC<BundlesPageProps> = ({ item }) => {
  const itemId = item?.id || '';

  if (!item?.shiddatData || item.shiddatData.length === 0) {
    return <NoOffers itemId={itemId} />;
  }

  return (
    <div>
      <PageHeader />
      <Container otherClassName="mt-12">
        <GridWrapper otherClassName="gap-5" isScrollable>
          {item.shiddatData.map((card) => (
            <CommonCard
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
              {...card}
            />
          ))}
        </GridWrapper>
      </Container>
    </div>
  );
};

export default BundlesPage;
