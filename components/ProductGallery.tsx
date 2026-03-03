'use client';

import { useState } from 'react';
import type { CosmicFile } from '@/types';

interface ProductGalleryProps {
  mainImage?: CosmicFile;
  gallery?: CosmicFile[];
  productName: string;
}

export default function ProductGallery({ mainImage, gallery, productName }: ProductGalleryProps) {
  const allImages: CosmicFile[] = [];

  if (mainImage) {
    allImages.push(mainImage);
  }

  if (gallery && gallery.length > 0) {
    gallery.forEach((img) => {
      // Avoid duplicates
      if (!mainImage || img.imgix_url !== mainImage.imgix_url) {
        allImages.push(img);
      }
    });
  }

  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentImage = allImages[selectedIndex];

  if (allImages.length === 0) {
    return (
      <div className="aspect-square bg-ranch-100 rounded-2xl flex items-center justify-center">
        <span className="text-8xl text-ranch-300">🥩</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square rounded-2xl overflow-hidden bg-ranch-100 border border-ranch-200">
        {currentImage && (
          <img
            src={`${currentImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
            alt={productName}
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                index === selectedIndex
                  ? 'border-sage-500 ring-2 ring-sage-200'
                  : 'border-ranch-200 hover:border-ranch-300'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                alt={`${productName} - Image ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}