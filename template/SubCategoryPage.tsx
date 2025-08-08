/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import dynamic from 'next/dynamic';
import { useEffect, useMemo } from 'react';
import useAPI from '@/hook/useAPI';
import { ProductCardProps } from '@/interfaces';
import Container from '@/components/organism/Container';
import GridWrapper from '@/components/molecules/GridWrapper';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { PiShoppingCartLight } from 'react-icons/pi';
import { useTranslations } from 'next-intl';
import Loading from '@/components/molecules/loading';
import { useParams, useRouter } from 'next/navigation';
import LoadingPlaceholder from '@/components/atomic/LoadingPlaceholder';
import { useCurrency } from '@/context/CurrencyContext';
import { API_IMAGE_URL } from '@/config/api';
const ProductCard = dynamic(() => import('@/components/atomic/ProductCard'), {
  loading: () => <Loading />,
});

const SubCategoryPage = ({ itemId }: { itemId: string }) => {
  const btnTxts = useTranslations('BtnTexts');
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('Loading');

  // API Hooks
  const { get, data, isLoading } = useAPI(`sub-category/${itemId}`);
  const { selectedCountry } = useCurrency();

  const enhancedCards = useMemo(() => {
    if (!data || data.type !== 'products') return [];

    return data.products?.map((card: ProductCardProps, index: number) => ({
      ...card,
      onClick: () => {
        const basePath = `/categories/${params.category}/${itemId}/product/${card.slug}`;
        setTimeout(() => router.push(basePath), 150);
      },
      index,
    }));
  }, [data, itemId, params.category, router]);

  useEffect(() => {
    get();
  }, [get, selectedCountry]);

  if (isLoading) {
    return <LoadingPlaceholder message={t('loadingMessage')} />;
  }

  return (
    <Container otherClassName="mt-12">
      <GridWrapper otherClassName="gap-5">
        {data.type === 'products'
          ? enhancedCards.map((card: ProductCardProps, index: number) => {
              const { image, ...cardWithoutImage } = card;
              return (
                <AnimatedWrapper key={card.id} custom={index}>
                  <ProductCard
                    key={card.id}
                    imgAlt={card.title}
                    imgTitle={card.title}
                    image={
                      `${API_IMAGE_URL}${image}` || '/assets/play-station.webp'
                    }
                    storeFlagImg={card.storeFlagImg}
                    showBtn={true}
                    btnVariant="primary"
                    btnText={btnTxts('addToCart')}
                    icon={PiShoppingCartLight}
                    showDesc
                    productData={card}
                    {...cardWithoutImage}
                  />
                </AnimatedWrapper>
              );
            })
          : data.children?.map((item: any) => (
              <div key={item.id}>{item.name}</div>
            ))}
      </GridWrapper>
    </Container>
  );
};

export default SubCategoryPage;
