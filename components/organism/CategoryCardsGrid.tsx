/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';
import Container from '@/components/organism/Container';
import { CategoryPageProps } from '@/interfaces';
import GridWrapper from '../molecules/GridWrapper';
import AnimatedWrapper from '../molecules/FramerMotion/AnimatedWrapper';
import Loading from '../molecules/loading';
import ErrorFetching from '../molecules/ErrorFetching';
import { API_IMAGE_URL } from '@/config/api';
import Pagination from '../molecules/Pagination';
import { usePagination } from '@/hook/usePagination';

const CategoryCard = dynamic(() => import('../molecules/CategoryCard'), {
  loading: () => <Loading />,
});

const CategoryCardsGrid: FC<CategoryPageProps> = ({
  cards,
  error,
  isLoading,
  onCardClick,
}) => {
  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    totalItems,
    itemsPerPage,
  } = usePagination<any>({
    data: cards,
    itemsPerPage: 12,
  });

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorFetching />
      ) : (
        <>
          <GridWrapper
            otherClassName={`gap-8 mt-12 ${
              cards.length > 1 ? 'max-sm:grid-cols-2' : ''
            }`}
          >
            {paginatedData.map((card, index) => (
              <AnimatedWrapper key={card.id} custom={index}>
                <CategoryCard
                  image={
                    `${API_IMAGE_URL}${card.image}` ||
                    '/assets/no-image-available.webp'
                  }
                  name={card.name}
                  onClick={() => {
                    onCardClick?.(card.categorySlug ?? '', card.slug);
                    card.onClick?.();
                  }}
                />
              </AnimatedWrapper>
            ))}
          </GridWrapper>

          <AnimatedWrapper>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              className="justify-center mt-10"
            />
          </AnimatedWrapper>
        </>
      )}
    </Container>
  );
};

export default CategoryCardsGrid;
