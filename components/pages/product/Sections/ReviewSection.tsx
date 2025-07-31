'use client';
import React from 'react';
import { Star } from 'lucide-react';
import { ReviewData, ReviewSectionProps } from '@/interfaces';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import MotionSection from '@/components/molecules/FramerMotion/MotionSection';
import { useTranslations } from 'next-intl';
import { useToggleLocale } from '@/hook/useToggleLocale';

const ReviewSection: React.FC<ReviewSectionProps> = ({ data }) => {
  const t = useTranslations('productDetails');
  const { isArabic } = useToggleLocale();
  // Mock data - will be replaced with API data
  const mockData: ReviewData = {
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

  const reviewData = data || mockData;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 ${
          index < Math.floor(rating) ? 'fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const ratingLabels = [
    {
      id: 'excellent',
      label: t('excellent'),
      value: reviewData.ratingBreakdown.excellent,
    },
    {
      id: 'good',
      label: t('good'),
      value: reviewData.ratingBreakdown.good,
    },
    {
      id: 'average',
      label: t('average'),
      value: reviewData.ratingBreakdown.average,
    },
    {
      id: 'poor',
      label: t('poor'),
      value: reviewData.ratingBreakdown.poor,
    },
    {
      id: 'bad',
      label: t('bad'),
      value: reviewData.ratingBreakdown.bad,
    },
  ];

  return (
    <div className="mt-5" dir={isArabic ? 'ltr' : 'rtl'}>
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
      </div>
    </div>
  );
};

export default ReviewSection;
