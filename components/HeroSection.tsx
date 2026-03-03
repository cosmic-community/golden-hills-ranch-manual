import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ranch-950 text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://imgix.cosmicjs.com/82119990-16b1-11f1-8f19-f3dd3ee2f907-autopilot-photo-1618164436241-4473940d1f5c-1772508707226.jpeg?w=1920&h=900&fit=crop&auto=format,compress"
          alt="Golden Hills Ranch"
          width={1920}
          height={900}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ranch-950/90 via-ranch-950/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-main relative py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          <p className="text-amber-300 text-sm sm:text-base font-medium uppercase tracking-widest mb-4">
            🌿 Farm to Table
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Taste the Difference<br />
            <span className="text-amber-300">Nature Makes</span>
          </h1>
          <p className="text-ranch-300 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
            Premium grass-fed steaks, farm-fresh raw milk, and handcrafted artisan cheeses — 
            raised naturally on our family ranch in the golden hills.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-ranch-950 font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-amber-500/25"
            >
              Shop All Products
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-xl transition-colors border border-white/20"
            >
              ⭐ Read Reviews
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}