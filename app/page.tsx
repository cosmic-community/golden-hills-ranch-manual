import Link from 'next/link';
import { getProducts, getCategories, getReviews } from '@/lib/cosmic';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import ReviewCard from '@/components/ReviewCard';

export const revalidate = 60;

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getReviews(),
  ]);

  // Sort products by price descending (premium items first)
  const featuredProducts = products
    .sort((a, b) => b.metadata.price - a.metadata.price)
    .slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <HeroSection />

      {/* Categories */}
      <section className="container-main py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-sage-600 font-medium text-sm uppercase tracking-widest mb-2">
            Shop by Category
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-ranch-900">
            From Our Ranch to Your Table
          </h2>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <p className="text-center text-ranch-500">No categories available yet.</p>
        )}
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-main">
          <div className="flex items-end justify-between mb-10 sm:mb-12">
            <div>
              <p className="text-sage-600 font-medium text-sm uppercase tracking-widest mb-2">
                Our Best Sellers
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-ranch-900">
                Featured Products
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1 text-sage-600 hover:text-sage-800 font-medium transition-colors"
            >
              View All
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-ranch-500">No products available yet.</p>
          )}

          <div className="sm:hidden text-center mt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-sage-600 hover:text-sage-800 font-medium transition-colors"
            >
              View All Products
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      {reviews.length > 0 && (
        <section className="container-main py-16 sm:py-20">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-sage-600 font-medium text-sm uppercase tracking-widest mb-2">
              ⭐ Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-ranch-900">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-1 text-sage-600 hover:text-sage-800 font-medium transition-colors"
            >
              Read All Reviews
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="bg-sage-800 text-white py-14 sm:py-20">
        <div className="container-main text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Taste the Difference?
          </h2>
          <p className="text-sage-200 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of families who trust Golden Hills Ranch for the highest quality
            grass-fed beef, raw milk, and artisan cheeses.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-ranch-950 font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg"
          >
            Shop Now
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}