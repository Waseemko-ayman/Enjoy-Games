'use client';
import React, { Suspense, useEffect } from 'react';
import Layer from '@/components/atomic/Layer';
import ProductCard from '@/components/atomic/ProductCard';
import SectionComponent from '@/components/atomic/SectionComponent';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import GridWrapper from '@/components/molecules/GridWrapper';
import Loading from '@/components/molecules/loading';
import Container from '@/components/organism/Container';
import useAPI from '@/hook/useAPI';
import { Category, ProductCardProps, SubCategories } from '@/interfaces';
import { getCategoryAndSubCategorySlugs } from '@/utils/helpers';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import SectionTypeCard from '@/components/molecules/SectionTypeCard';
import { API_IMAGE_URL } from '@/config/api';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const searchTexts = useTranslations('search');
  const btnTxts = useTranslations('BtnTexts');
  const secTxts = useTranslations('SectionsTitles');

  const router = useRouter();

  const { get, data, isLoading, error } = useAPI(
    `search?query=${encodeURIComponent(query)}`
  );

  useEffect(() => {
    if (query.trim() === '') return;

    const delayDebounce = setTimeout(() => {
      get();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, get]);

  const products: ProductCardProps[] = data?.products ?? [];
  const categories: Category[] = data?.categories ?? [];
  const subCategories: SubCategories[] = data?.sub_categories ?? [];

  return (
    <Layer otherClassName="!my-12">
      <Container>
        <SectionComponent title={`${searchTexts('searchResults')}: ${query}`}>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <ErrorFetching />
          ) : (
            <div className="space-y-6">
              {/* {categories.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    {secTxts('categories')}
                  </h2>
                  <GridWrapper otherClassName="gap-5" isScrollable>
                    {categories.map((card, index) => {
                      // const { image, ...cardWithoutImage } = card;
                      const firstSubCategory = card.sub_categories?.[0];
                      const slugs =
                        firstSubCategory !== undefined
                          ? getCategoryAndSubCategorySlugs(
                              categories,
                              firstSubCategory.id
                            )
                          : null;
                      return (
                        <AnimatedWrapper key={card.id} custom={index}>
                          <CategoryCard
                            image={
                              `${API_IMAGE_URL}${image}` ||
                              '/assets/no-image-available.webp'
                            }
                            name={card.name}
                            onClick={() => {
                              if (slugs) {
                                const { categorySlug, subCategorySlug } = slugs;
                                router.push(
                                  `/categories/${categorySlug}/${subCategorySlug}`
                                );
                              }
                            }}
                          />
                        </AnimatedWrapper>
                      );
                    })}
                  </GridWrapper>
                </>
              )} */}

              {categories.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    {secTxts('categories')}
                  </h2>
                  <GridWrapper otherClassName="gap-5" isScrollable>
                    {categories.map((item: Category) => (
                      <Suspense key={item.id} fallback={<Loading />}>
                        <SectionTypeCard
                          path={`/categories/${item.slug}`}
                          imgSrc={'/assets/digitalStores.webp'}
                          imgAlt={item.name}
                          imgTitle={item.name}
                          title={item.name}
                          width={90}
                          height={90}
                          otherClassName="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px]"
                        />
                      </Suspense>
                    ))}
                  </GridWrapper>
                </>
              )}

              {products.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold mb-4">
                    {secTxts('products')}
                  </h2>
                  <GridWrapper otherClassName="gap-5" isScrollable>
                    {products.map((card, index) => {
                      const { image, ...cardWithoutImage } = card;
                      const slugs =
                        card.sub_category_id !== undefined
                          ? getCategoryAndSubCategorySlugs(
                              categories,
                              card.sub_category_id
                            )
                          : null;
                      return (
                        <AnimatedWrapper key={card.id} custom={index}>
                          <ProductCard
                            image={
                              `${API_IMAGE_URL}${image}` ||
                              '/assets/no-image-available.webp'
                            }
                            imgAlt={card.title}
                            imgTitle={card.title}
                            showDesc
                            btnVariant="primary"
                            btnText={btnTxts('BuyNow')}
                            showBtn
                            onClick={() => {
                              if (slugs) {
                                const { categorySlug, subCategorySlug } = slugs;
                                const path = `/categories/${categorySlug}/${subCategorySlug}/product/${card.slug}`;
                                router.push(path);
                              }
                            }}
                            productData={card}
                            {...cardWithoutImage}
                          />
                        </AnimatedWrapper>
                      );
                    })}
                  </GridWrapper>
                </>
              )}

              {subCategories.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    {secTxts('subCategories')}
                  </h2>
                  <GridWrapper otherClassName="gap-5" isScrollable>
                    {subCategories.map((sub, index) => {
                      const { image, ...cardWithoutImage } = sub;
                      const slugs =
                        sub.id !== undefined
                          ? getCategoryAndSubCategorySlugs(categories, sub.id)
                          : null;
                      return (
                        <AnimatedWrapper key={sub.id} custom={index}>
                          <ProductCard
                            key={sub.id}
                            imgAlt={sub.name}
                            imgTitle={sub.name}
                            title={sub.name}
                            image={
                              `${API_IMAGE_URL}${image}` ||
                              '/assets/no-image-available.webp'
                            }
                            showBtn={true}
                            btnVariant="primary"
                            btnText={btnTxts('addToCart')}
                            showDesc
                            // productData={sub}
                            onClick={() => {
                              if (slugs) {
                                const { categorySlug, subCategorySlug } = slugs;

                                router.push(
                                  `/categories/${categorySlug}/${subCategorySlug}/product/${sub.slug}`
                                );
                              }
                            }}
                            {...cardWithoutImage}
                          />
                        </AnimatedWrapper>
                      );
                    })}
                  </GridWrapper>
                </>
              )}

              {products.length === 0 &&
                categories.length === 0 &&
                subCategories.length === 0 && <p>{searchTexts('noResult')}</p>}
            </div>
          )}
        </SectionComponent>
      </Container>
    </Layer>
  );
};

export default SearchPage;
