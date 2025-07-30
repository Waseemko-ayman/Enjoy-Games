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
import { getSlugsProps, ProductCardProps } from '@/interfaces';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import { toast } from 'react-toastify';
import { useCartContext } from '@/context/CartContext';
const ProductCard = dynamic(() => import('@/components/atomic/ProductCard'), {
  loading: () => <Loading />,
});

const EnjoyGamesGifts: React.FC<getSlugsProps> = ({ getSlugs }) => {
  const secTexts = useTranslations('SectionsTitles.Gifts');
  const btnTexts = useTranslations('BtnTexts');
  const { data, isLoading, error } = useMainContent();
  const msgTxts = useTranslations('Messages');
  const { addToCart } = useCartContext();

  const handleAddToCart = (product: ProductCardProps) => {
    addToCart(product);
    toast.success(`${product.title} ${msgTxts('addedToCart')}`);
  };

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3">
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
                      image={image || '/assets/play-station.webp'}
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
                          window.location.href = path;
                        }
                      }}
                      onAddToCart={() => handleAddToCart(card)}
                      {...cardWithoutImage}
                    />
                  </AnimatedWrapper>
                );
              })}
          </div>
        )}
      </Container>
    </Layer>
  );
};

export default EnjoyGamesGifts;
