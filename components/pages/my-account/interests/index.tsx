'use client';

import React from 'react';
import Layer from '@/components/atomic/Layer';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import Loading from '@/components/molecules/loading';
import PageHeader from '@/components/molecules/PageHeader';
import Container from '@/components/organism/Container';
import { API_IMAGE_URL } from '@/config/api';
import { useCategories } from '@/context/CategoriesContext';
import { ProductCardProps } from '@/interfaces';
import { getCategoryAndSubCategorySlugs } from '@/utils/helpers';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useInterests } from '@/context/InterestsContext';
import GridWrapper from '@/components/molecules/GridWrapper';
import ResponsiveWrapper from '@/components/molecules/ResponsiveWrapper';
import { usePagination } from '@/hook/usePagination';
import Pagination from '@/components/molecules/Pagination';
const ProductCard = dynamic(() => import('@/components/atomic/ProductCard'), {
  loading: () => <Loading />,
});

const InterestsPage = () => {
  // const [selected, setSelected] = useState<{ [key: number]: boolean }>({});
  // const t = useTranslations('SectionsTitles');
  // const btnTexts = useTranslations('BtnTexts');

  // const handleSelect = (id: number) => {
  //   setSelected((prev) => ({
  //     ...prev,
  //     [id]: !prev[id],
  //   }));
  // };

  const btnText = useTranslations('BtnTexts');
  const router = useRouter();

  const { interests, removeInterest, isLoading, error } = useInterests();
  const { categories } = useCategories();

  // Pagination configuration
  const ITEMS_PER_PAGE = 6; // Number of orders to show per page

  // Pagination hook - manages all pagination logic and state
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedInterests,
    goToPage,
    totalItems,
    itemsPerPage,
  } = usePagination<ProductCardProps>({
    data: interests || [], // Use empty array if orders is null/undefined
    itemsPerPage: ITEMS_PER_PAGE,
    initialPage: 1,
  });

  const content = paginatedInterests?.map(
    (card: ProductCardProps, index: number) => {
      const { image, ...cardWithoutImage } = card;
      const slugs =
        card.sub_category_id !== undefined
          ? getCategoryAndSubCategorySlugs(categories, card.sub_category_id)
          : null;
      return (
        <AnimatedWrapper key={card.id} custom={index}>
          <ProductCard
            image={`${API_IMAGE_URL}${image}`}
            imgAlt={card.title}
            imgTitle={card.title}
            btnVariant="primary"
            btnText={btnText('BuyNow')}
            onClick={() => {
              if (slugs) {
                const { categorySlug, subCategorySlug } = slugs;
                const path = `/categories/${categorySlug}/${subCategorySlug}/product/${card.slug}`;
                router.push(path);
              }
            }}
            productData={card}
            showDesc
            showBtn
            handleRemove={() => removeInterest(card.id ?? 0)}
            {...cardWithoutImage}
          />
        </AnimatedWrapper>
      );
    }
  );

  return (
    <div>
      <PageHeader />
      <Layer>
        {isLoading.get ? (
          <Loading />
        ) : error.get ? (
          <ErrorFetching />
        ) : paginatedInterests?.length < 6 ? (
          <Container>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {content}
            </div>
            {totalPages > 1 && (
              <div className="mt-10 pt-8 border-t border-gray-100">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  className="justify-center"
                />
              </div>
            )}
          </Container>
        ) : (
          <ResponsiveWrapper>
            <GridWrapper otherClassName="gap-5" isScrollable>
              {content}
            </GridWrapper>
          </ResponsiveWrapper>
        )}
        {/* <div className="w-full max-w-4xl mx-auto">
          <CardWrapper className="py-5 px-5 sm:px-10">
            <h2 className="text-base font-semibold mb-7">{t('Interests')}🎯</h2>

            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5">
              {InterestsData.map((item) => (
                <div key={item.id} className="relative w-fit mx-auto">
                  <div
                    onClick={() => handleSelect(item.id)}
                    className={`relative flex flex-col justify-center gap-2 cursor-pointer border-2 rounded-full transition-all duration-300 ${
                      selected[item.id]
                        ? 'border-enjoy-primary'
                        : 'border-transparent'
                    }`}
                  >
                    <Avatar
                      imgSrc={item.src}
                      imgAlt={item.alt}
                      imgTitle={item.title}
                      width={75}
                      height={75}
                      otherClassName="mx-auto"
                    />
                  </div>
                  {selected[item.id] && (
                    <span className="absolute bottom-8 left-1 bg-green-600 text-white rounded-full p-1 text-xs">
                      <FaCheck className="w-3 h-3" />
                    </span>
                  )}
                  <h4 className="text-sm text-center font-bold mt-4">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </CardWrapper>
          <Button otherClassName="py-3 px-12 mt-7">
            {btnTexts('SaveChanges')}
          </Button>
        </div> */}
      </Layer>
    </div>
  );
};

export default InterestsPage;
