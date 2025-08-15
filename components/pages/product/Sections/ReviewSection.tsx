/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { ProductCardProps, ReviewData } from '@/interfaces';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import MotionSection from '@/components/molecules/FramerMotion/MotionSection';
import { useTranslations } from 'next-intl';
import { useToggleLocale } from '@/hook/useToggleLocale';
import { FaRegStar, FaStar, FaStarHalfStroke } from 'react-icons/fa6';
import Pagination from '@/components/molecules/Pagination';
import Image from 'next/image';
import Loading from '@/components/molecules/loading';

const ReviewSection = ({
  product,
  isLoading,
}: {
  product: ProductCardProps;
  isLoading: boolean;
}) => {
  const t = useTranslations('productDetails');
  const { isArabic } = useToggleLocale();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const ratingsArray =
    Array.isArray(product?.ratings) &&
    product.ratings.every((r) => typeof r === 'object' && 'stars' in r)
      ? (product.ratings as { stars: number; [key: string]: any }[])
      : [];

  const reviewData: ReviewData = ratingsArray.length
    ? (() => {
        const totalReviews = ratingsArray.length;
        const overallRating =
          ratingsArray.reduce((sum, r) => sum + (r.stars || 0), 0) /
          totalReviews;

        const ratingBreakdown = {
          excellent: ratingsArray.filter((r) => r.stars == 5).length,
          good: ratingsArray.filter((r) => r.stars == 4).length,
          average: ratingsArray.filter((r) => r.stars == 3).length,
          poor: ratingsArray.filter((r) => r.stars == 2).length,
          bad: ratingsArray.filter((r) => r.stars == 1).length,
        };

        return { totalReviews, overallRating, ratingBreakdown };
      })()
    : {
        overallRating: 0.0,
        totalReviews: 0,
        ratingBreakdown: {
          excellent: 0,
          good: 0,
          average: 0,
          poor: 0,
          bad: 0,
        },
      };

  const renderStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map((i) => {
      if (i <= rating)
        return <FaStar key={i} className="w-5 h-5 text-yellow-400" />;
      if (i - 1 < rating)
        return <FaStarHalfStroke key={i} className="w-5 h-5 text-yellow-400" />;
      return <FaRegStar key={i} className="w-5 h-5 text-gray-300" />;
    });
  };

  const ratingLabels = [
    {
      id: 'excellent',
      label: t('excellent'),
      value: reviewData.ratingBreakdown.excellent,
    },
    { id: 'good', label: t('good'), value: reviewData.ratingBreakdown.good },
    {
      id: 'average',
      label: t('average'),
      value: reviewData.ratingBreakdown.average,
    },
    { id: 'poor', label: t('poor'), value: reviewData.ratingBreakdown.poor },
    { id: 'bad', label: t('bad'), value: reviewData.ratingBreakdown.bad },
  ];

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRatings = ratingsArray.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="mt-5" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="flex items-start justify-between max-[991px]:flex-col max-[991px]:text-center max-[991px]:justify-center gap-2 md:gap-8">
        {/* No reviews message */}
        {reviewData.totalReviews === 0 && (
          <div className="mt-8 text-center max-[991px]:w-full max-[991px]:order-2">
            <MotionSection index={1}>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-gray-400" />
                </div>
              </div>
            </MotionSection>
            <MotionSection index={2}>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {t('noRatingsYet')}
              </h3>
            </MotionSection>
            <MotionSection index={3}>
              <p className="text-gray-500 text-sm">{t('beFirstToRate')}</p>
            </MotionSection>
          </div>
        )}

        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex-1 max-[991px]:w-full max-[991px]:order-1">
            <div className="flex flex-col items-end mb-4">
              <MotionSection index={1}>
                <div className="text-4xl sm:text-5xl font-bold mb-2">
                  {reviewData.overallRating.toFixed(1)}
                </div>
              </MotionSection>
              <MotionSection index={2}>
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(reviewData.overallRating)}
                </div>
              </MotionSection>
              <MotionSection index={3}>
                <div className="text-sm text-gray-500">
                  {t('rating')} {reviewData.totalReviews}
                </div>
              </MotionSection>
            </div>

            <div className="space-y-2">
              {ratingLabels.map((item, index) => (
                <AnimatedWrapper key={item.id} custom={index}>
                  <div className="flex items-center gap-3 text-sm w-full">
                    <span className="text-gray-500 text-xs whitespace-nowrap w-[38px] text-left">
                      {item.value} {t('rating')}
                    </span>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full w-full">
                        <div
                          className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                          style={{
                            width:
                              reviewData.totalReviews > 0
                                ? `${
                                    (item.value / reviewData.totalReviews) * 100
                                  }%`
                                : '0%',
                          }}
                        />
                      </div>
                    </div>
                    <span
                      className={`text-gray-700 font-medium whitespace-nowrap ${
                        isArabic ? 'w-[50px] text-end' : 'w-[80px] text-end'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </AnimatedWrapper>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reviews list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-7">
        {currentRatings.map((rating, index) => (
          <div
            key={index}
            className="relative p-4 rounded-lg shadow-sm border border-gray-200 bg-white flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {renderStars(rating.stars)}
                {rating.show_name === '1' && (
                  <span className="text-sm text-gray-500">{rating.name}</span>
                )}
              </div>
              <span className="text-xs text-gray-400">{rating.stars}/5</span>
            </div>
            <p className="text-gray-700 text-sm">{rating.comment}</p>
            {rating.images && rating.images.length > 0 && (
              <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
                {rating.images.map((img: any) => (
                  <Image
                    src="/assets/play-station.webp"
                    key={img.id}
                    alt="Rating"
                    width={80}
                    height={80}
                    className="flex-shrink-0 w-20 h-20 object-cover rounded-md border border-gray-200"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {reviewData.totalReviews > itemsPerPage && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(ratingsArray.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
            totalItems={ratingsArray.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
