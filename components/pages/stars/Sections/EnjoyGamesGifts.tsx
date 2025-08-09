import React from 'react';
import dynamic from 'next/dynamic';
import Layer from '@/components/atomic/Layer';
import SectionTitle from '@/components/atomic/SectionTitle';
import Container from '@/components/organism/Container';
import { MdWavingHand } from 'react-icons/md';
import { PiShoppingCartLight } from 'react-icons/pi';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { useTranslations } from 'next-intl';
import { useMainContent } from '@/context/MainContentContext';
import Loading from '@/components/molecules/loading';
import { getSlugsProps } from '@/interfaces';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import GridWrapper from '@/components/molecules/GridWrapper';
import { useRouter } from 'next/navigation';
import { API_IMAGE_URL } from '@/config/api';
const ProductCard = dynamic(() => import('@/components/atomic/ProductCard'), {
  loading: () => <Loading />,
});

const EnjoyGamesGifts: React.FC<getSlugsProps> = ({ getSlugs }) => {
  const secTexts = useTranslations('SectionsTitles.Gifts');
  const btnTexts = useTranslations('BtnTexts');
  const { data, isLoading, error } = useMainContent();
  const router = useRouter();

  return (
    <Layer>
      <Container>
        <SectionTitle
          title={secTexts('title')}
          subtitle={secTexts('desc')}
          icon={MdWavingHand}
        />
        {isLoading ? (
          <Loading />
        ) : error ? (
          <ErrorFetching />
        ) : (
          <GridWrapper otherClassName="gap-5" isScrollable>
            {Array.isArray(data?.newly_arrived) &&
              data.newly_arrived.map((card, index) => {
                const { image, ...cardWithoutImage } = card;
                const slugs =
                  card.sub_category_id !== undefined
                    ? getSlugs(card.sub_category_id)
                    : null;
                return (
                  <AnimatedWrapper key={card.id} custom={index}>
                    <ProductCard
                      key={card.id}
                      image={
                        `${API_IMAGE_URL}${image}` ||
                        '/assets/play-station.webp'
                      }
                      imgAlt={card.title}
                      imgTitle={card.title}
                      showDesc
                      variant="column"
                      showBtn
                      btnVariant="secondary"
                      btnText={btnTexts('GetItNow')}
                      icon={PiShoppingCartLight}
                      onClick={() => {
                        if (slugs) {
                          const { categorySlug, subCategorySlug } = slugs;
                          const path = `/categories/${categorySlug}/${subCategorySlug}/product/${card.slug}`;
                          router.push(path);
                        }
                      }}
                      // onAddToCart={() => handleAddToCart(card)}
                      productData={card}
                      {...cardWithoutImage}
                    />
                  </AnimatedWrapper>
                );
              })}
          </GridWrapper>
        )}
      </Container>
    </Layer>
  );
};

export default EnjoyGamesGifts;
