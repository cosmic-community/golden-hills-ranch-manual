import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ranch-950 text-ranch-300 mt-auto">
      <div className="container-main py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏔️</span>
              <span className="text-xl font-bold text-white">Golden Hills Ranch</span>
            </Link>
            <p className="text-sm leading-relaxed text-ranch-400">
              Premium grass-fed beef, farm-fresh raw milk, and handcrafted artisan cheeses.
              Raised naturally on our family ranch in the golden hills.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories/grass-fed-steaks" className="text-sm hover:text-white transition-colors">
                  Grass-Fed Steaks
                </Link>
              </li>
              <li>
                <Link href="/categories/raw-milk" className="text-sm hover:text-white transition-colors">
                  Raw Milk
                </Link>
              </li>
              <li>
                <Link href="/categories/artisan-cheese" className="text-sm hover:text-white transition-colors">
                  Artisan Cheese
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-sm hover:text-white transition-colors">
                  Customer Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Our Promise
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span>🌿</span> 100% Grass-Fed & Pasture-Raised
              </li>
              <li className="flex items-center gap-2">
                <span>🚫</span> No Hormones or Antibiotics
              </li>
              <li className="flex items-center gap-2">
                <span>🏡</span> Family-Owned Ranch
              </li>
              <li className="flex items-center gap-2">
                <span>📦</span> Shipped Fresh to Your Door
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ranch-800 mt-10 pt-8 text-center">
          <p className="text-xs text-ranch-500">
            © {new Date().getFullYear()} Golden Hills Ranch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}