import type { Metadata } from 'next';
import { getReviews } from '@/lib/cosmic';
import { getRatingNumber } from '@/types';
import ReviewCard from '@/components/ReviewCard';
import StarRating from '@/components/StarRating';

export const metadata: Metadata = {
  title: 'Customer Reviews — Golden Hills Ranch',
  description: 'Read what our customers are saying about Golden Hills Ranch products.',
};

export const revalidate = 60;

export default async function ReviewsPage() {
  const reviews = await getReviews();

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + getRatingNumber(r.metadata.rating), 0) / reviews.length
      : 0;

  return (
    <div>
      {/* Page Header */}
      <div className="bg-white border-b border-ranch-100">
        <div className="container-main py-10 sm:py-14">
          <p className="text-sage-600 font-medium text-sm uppercase tracking-widest mb-2">
            ⭐ Testimonials
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-ranch-900 mb-4">
            Customer Reviews
          </h1>
          {reviews.length > 0 && (
            <div className="flex items-center gap-3">
              <StarRating rating={Math.round(avgRating)} size="lg" />
              <span className="text-ranch-600">
                {avgRating.toFixed(1)} average from {reviews.length} review
                {reviews.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="container-main py-10 sm:py-14">
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">⭐</span>
            <h2 className="text-xl font-semibold text-ranch-900 mb-2">No Reviews Yet</h2>
            <p className="text-ranch-500">Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </div>
  );
}