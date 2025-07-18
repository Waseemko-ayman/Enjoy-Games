import { ReviewApiResponse, ReviewData } from '@/interfaces';

class ReviewService {
  private baseUrl = process.env.REACT_APP_API_URL || 'https://api.example.com';

  async getReviewData(productId: string): Promise<ReviewData> {
    try {
      const response = await fetch(`${this.baseUrl}/reviews/${productId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch review data');
      }

      const data: ReviewApiResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching review data:', error);

      // Return empty data structure in case of error
      return {
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
    }
  }

  async submitReview(
    productId: string,
    rating: number,
    comment: string
  ): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/reviews/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          comment,
          timestamp: new Date().toISOString(),
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error submitting review:', error);
      return false;
    }
  }
}

export const reviewService = new ReviewService();
