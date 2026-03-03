import type { Metadata } from 'next';
import { getProducts, getCategories } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All Products — Golden Hills Ranch',
  description: 'Browse our full selection of grass-fed steaks, raw milk, and artisan cheeses.',
};

export const revalidate = 60;

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div>
      {/* Page Header */}
      <div className="bg-white border-b border-ranch-100">
        <div className="container-main py-10 sm:py-14">
          <p className="text-sage-600 font-medium text-sm uppercase tracking-widest mb-2">
            🥩 Our Products
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-ranch-900 mb-4">
            Shop All Products
          </h1>
          <p className="text-ranch-600 max-w-2xl">
            Every product is raised and crafted on our ranch with care. 100% grass-fed, no
            hormones, no antibiotics — just pure, natural goodness.
          </p>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-ranch-100 text-ranch-700 hover:bg-sage-100 hover:text-sage-800 transition-colors"
                >
                  {cat.metadata.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container-main py-10 sm:py-14">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🥩</span>
            <h2 className="text-xl font-semibold text-ranch-900 mb-2">No Products Yet</h2>
            <p className="text-ranch-500">Check back soon for our latest products.</p>
          </div>
        )}
      </div>
    </div>
  );
}