import Link from 'next/link';
import type { CustomerReview } from '@/types';
import { getRatingNumber, isProduct } from '@/types';
import StarRating from '@/components/StarRating';

interface ReviewCardProps {
  review: CustomerReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { metadata } = review;
  const rating = getRatingNumber(metadata.rating);
  const product = isProduct(metadata.product) ? metadata.product : null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-ranch-100 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-ranch-900">{metadata.reviewer_name}</h3>
          {product && (
            <Link
              href={`/products/${product.slug}`}
              className="text-sm text-sage-600 hover:text-sage-800 transition-colors"
            >
              on {product.metadata.product_name}
            </Link>
          )}
        </div>
        <StarRating rating={rating} size="sm" />
      </div>

      {/* Review Text */}
      <p className="text-ranch-700 text-sm leading-relaxed line-clamp-4">
        &ldquo;{metadata.review_text}&rdquo;
      </p>

      {/* Product Link */}
      {product && (
        <div className="mt-4 pt-4 border-t border-ranch-100">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-sage-600 hover:text-sage-800 transition-colors"
          >
            {product.metadata.product_image?.imgix_url && (
              <img
                src={`${product.metadata.product_image.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                alt={product.metadata.product_name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-lg object-cover"
              />
            )}
            View {product.metadata.product_name}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </div>
  );
}