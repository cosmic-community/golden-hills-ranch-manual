import Link from 'next/link';
import type { Product } from '@/types';
import { isProductCategory, getMetafieldValue } from '@/types';
import InventoryBadge from '@/components/InventoryBadge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { metadata } = product;
  const imageUrl = metadata.product_image?.imgix_url;
  const hasDiscount = metadata.compare_at_price && metadata.compare_at_price > metadata.price;
  const categoryName = isProductCategory(metadata.category) ? metadata.category.metadata.name : '';
  const inventoryKey = metadata.inventory_status?.key || '';

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-ranch-100 hover:border-ranch-200">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-ranch-100">
          {imageUrl ? (
            <img
              src={`${imageUrl}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={metadata.product_name}
              width={400}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-ranch-300">
              <span className="text-5xl">🥩</span>
            </div>
          )}

          {/* Sale Badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              SALE
            </div>
          )}

          {/* Out of Stock Overlay */}
          {inventoryKey === 'out_of_stock' && (
            <div className="absolute inset-0 bg-ranch-950/40 flex items-center justify-center">
              <span className="bg-white text-ranch-900 text-sm font-bold px-4 py-2 rounded-full">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5">
          {/* Category */}
          {categoryName && (
            <p className="text-xs font-medium text-sage-600 uppercase tracking-wider mb-1.5">
              {categoryName}
            </p>
          )}

          {/* Product Name */}
          <h3 className="text-lg font-semibold text-ranch-900 group-hover:text-sage-700 transition-colors mb-2 line-clamp-1">
            {metadata.product_name}
          </h3>

          {/* Weight */}
          {metadata.weight && (
            <p className="text-sm text-ranch-500 mb-3">{metadata.weight}</p>
          )}

          {/* Price & Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-ranch-900">
                ${metadata.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-ranch-400 line-through">
                  ${metadata.compare_at_price?.toFixed(2)}
                </span>
              )}
            </div>
            <InventoryBadge status={metadata.inventory_status} />
          </div>
        </div>
      </div>
    </Link>
  );
}