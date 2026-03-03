// app/products/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getProductBySlug, getReviewsByProduct, getProducts } from '@/lib/cosmic';
import { isProductCategory, getRatingNumber } from '@/types';
import ProductGallery from '@/components/ProductGallery';
import InventoryBadge from '@/components/InventoryBadge';
import StarRating from '@/components/StarRating';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found — Golden Hills Ranch' };
  }

  return {
    title: `${product.metadata.product_name} — Golden Hills Ranch`,
    description: `$${product.metadata.price.toFixed(2)} — ${product.metadata.weight || ''} — Shop ${product.metadata.product_name} from Golden Hills Ranch.`,
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { metadata } = product;
  const hasDiscount = metadata.compare_at_price && metadata.compare_at_price > metadata.price;
  const category = isProductCategory(metadata.category) ? metadata.category : null;

  // Fetch reviews for this product
  const reviews = await getReviewsByProduct(product.id);

  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? Math.round(
          reviews.reduce((sum, r) => sum + getRatingNumber(r.metadata.rating), 0) /
            reviews.length
        )
      : 0;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-ranch-100">
        <div className="container-main py-3">
          <nav className="flex items-center gap-2 text-sm text-ranch-500">
            <Link href="/" className="hover:text-sage-700 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-sage-700 transition-colors">
              Products
            </Link>
            {category && (
              <>
                <span>/</span>
                <Link
                  href={`/categories/${category.slug}`}
                  className="hover:text-sage-700 transition-colors"
                >
                  {category.metadata.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-ranch-900 font-medium">{metadata.product_name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container-main py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <ProductGallery
            mainImage={metadata.product_image}
            gallery={metadata.gallery}
            productName={metadata.product_name}
          />

          {/* Info */}
          <div>
            {/* Category */}
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className="inline-block text-xs font-medium text-sage-600 uppercase tracking-widest mb-3 hover:text-sage-800 transition-colors"
              >
                {category.metadata.name}
              </Link>
            )}

            <h1 className="text-3xl sm:text-4xl font-bold text-ranch-900 mb-4">
              {metadata.product_name}
            </h1>

            {/* Rating Summary */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={avgRating} size="md" />
                <span className="text-sm text-ranch-500">
                  {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-ranch-900">
                ${metadata.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-ranch-400 line-through">
                  ${metadata.compare_at_price?.toFixed(2)}
                </span>
              )}
              {hasDiscount && (
                <span className="text-sm font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                  Save $
                  {(
                    (metadata.compare_at_price || 0) - metadata.price
                  ).toFixed(2)}
                </span>
              )}
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <InventoryBadge status={metadata.inventory_status} />
              {metadata.weight && (
                <span className="text-sm text-ranch-500 bg-ranch-100 px-3 py-1 rounded-full">
                  ⚖️ {metadata.weight}
                </span>
              )}
            </div>

            {/* Divider */}
            <hr className="border-ranch-200 mb-6" />

            {/* Description */}
            {metadata.description && (
              <div className="prose prose-ranch prose-sm sm:prose-base max-w-none mb-8">
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => (
                      <h2 className="text-xl font-bold text-ranch-900 mt-0 mb-3">{children}</h2>
                    ),
                    p: ({ children }) => (
                      <p className="text-ranch-700 leading-relaxed mb-3">{children}</p>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-ranch-900 font-semibold">{children}</strong>
                    ),
                    ul: ({ children }) => (
                      <ul className="space-y-1.5 mb-4 list-none pl-0">{children}</ul>
                    ),
                    li: ({ children }) => (
                      <li className="flex items-start gap-2 text-ranch-700">
                        <span className="text-sage-500 mt-0.5">✓</span>
                        <span>{children}</span>
                      </li>
                    ),
                  }}
                >
                  {metadata.description}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section className="mt-16 sm:mt-20 border-t border-ranch-200 pt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-ranch-900 mb-8">
              Customer Reviews ({reviews.length})
            </h2>

            <div className="space-y-6">
              {reviews.map((review) => {
                const rating = getRatingNumber(review.metadata.rating);
                return (
                  <div
                    key={review.id}
                    className="bg-white rounded-xl p-6 border border-ranch-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-ranch-900">
                        {review.metadata.reviewer_name}
                      </h3>
                      <StarRating rating={rating} size="sm" />
                    </div>
                    <p className="text-ranch-700 leading-relaxed">
                      &ldquo;{review.metadata.review_text}&rdquo;
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}