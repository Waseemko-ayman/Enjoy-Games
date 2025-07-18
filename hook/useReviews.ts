import { ReviewData } from '@/interfaces';
import { reviewService } from '@/services/reviewService';
import { useState, useEffect } from 'react';

export const useReviews = (productId: string) => {
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await reviewService.getReviewData(productId);
        setReviewData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const submitReview = async (rating: number, comment: string) => {
    try {
      const success = await reviewService.submitReview(
        productId,
        rating,
        comment
      );

      if (success) {
        // Refresh the review data after successful submission
        const updatedData = await reviewService.getReviewData(productId);
        setReviewData(updatedData);
      }

      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
      return false;
    }
  };

  return {
    reviewData,
    loading,
    error,
    submitReview,
    refetch: () => {
      if (productId) {
        reviewService.getReviewData(productId).then(setReviewData);
      }
    },
  };
};
