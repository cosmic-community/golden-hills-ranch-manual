// app/categories/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug, getProductsByCategory, getCategories } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found — Golden Hills Ranch' };
  }

  return {
    title: `${category.metadata.name} — Golden Hills Ranch`,
    description: category.metadata.description || `Browse ${category.metadata.name} products from Golden Hills Ranch.`,
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);
  const imageUrl = category.metadata.category_image?.imgix_url;

  return (
    <div>
      {/* Category Hero */}
      <div className="relative bg-ranch-950 text-white overflow-hidden">
        {imageUrl && (
          <div className="absolute inset-0">
            <img
              src={`${imageUrl}?w=1920&h=500&fit=crop&auto=format,compress`}
              alt={category.metadata.name}
              width={1920}
              height={500}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ranch-950/80 to-ranch-950/40" />
          </div>
        )}

        <div className="container-main relative py-14 sm:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-ranch-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-white">{category.metadata.name}</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-bold mb-3">
            {category.metadata.name}
          </h1>
          {category.metadata.description && (
            <p className="text-ranch-300 text-lg max-w-2xl">
              {category.metadata.description}
            </p>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="container-main py-10 sm:py-14">
        {products.length > 0 ? (
          <>
            <p className="text-sm text-ranch-500 mb-6">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">📦</span>
            <h2 className="text-xl font-semibold text-ranch-900 mb-2">
              No Products in This Category
            </h2>
            <p className="text-ranch-500 mb-6">
              Check back soon or browse our other categories.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-sage-600 hover:text-sage-800 font-medium transition-colors"
            >
              ← Back to All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}