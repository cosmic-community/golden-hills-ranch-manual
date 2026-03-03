import Link from 'next/link';
import type { ProductCategory } from '@/types';

interface CategoryCardProps {
  category: ProductCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { metadata } = category;
  const imageUrl = metadata.category_image?.imgix_url;

  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <div className="relative aspect-[3/2] rounded-2xl overflow-hidden bg-ranch-100 shadow-sm hover:shadow-xl transition-all duration-300">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=800&h=540&fit=crop&auto=format,compress`}
            alt={metadata.name}
            width={400}
            height={270}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ranch-300">
            <span className="text-6xl">🏷️</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ranch-950/80 via-ranch-950/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
            {metadata.name}
          </h3>
          {metadata.description && (
            <p className="text-sm text-ranch-200 line-clamp-2">
              {metadata.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}