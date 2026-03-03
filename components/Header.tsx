import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-ranch-200 sticky top-0 z-40">
      <div className="container-main">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl sm:text-3xl">🏔️</span>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-ranch-900 leading-tight group-hover:text-sage-700 transition-colors">
                Golden Hills Ranch
              </h1>
              <p className="text-[10px] sm:text-xs text-ranch-500 uppercase tracking-widest font-medium hidden sm:block">
                Farm to Table Since 1952
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1 sm:gap-6">
            <Link
              href="/products"
              className="text-sm sm:text-base font-medium text-ranch-700 hover:text-sage-700 transition-colors px-3 py-2 rounded-lg hover:bg-sage-50"
            >
              Shop
            </Link>
            <Link
              href="/reviews"
              className="text-sm sm:text-base font-medium text-ranch-700 hover:text-sage-700 transition-colors px-3 py-2 rounded-lg hover:bg-sage-50"
            >
              Reviews
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}