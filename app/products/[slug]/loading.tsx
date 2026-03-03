// app/products/[slug]/loading.tsx
export default function ProductDetailLoading() {
  return (
    <div>
      <div className="bg-white border-b border-ranch-100">
        <div className="container-main py-3">
          <div className="h-4 w-64 bg-ranch-100 rounded animate-pulse" />
        </div>
      </div>
      <div className="container-main py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="aspect-square bg-ranch-100 rounded-2xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-3 w-20 bg-ranch-100 rounded animate-pulse" />
            <div className="h-9 w-72 bg-ranch-200 rounded animate-pulse" />
            <div className="h-5 w-32 bg-ranch-100 rounded animate-pulse" />
            <div className="h-8 w-24 bg-ranch-200 rounded animate-pulse" />
            <div className="flex gap-3">
              <div className="h-7 w-20 bg-ranch-100 rounded-full animate-pulse" />
              <div className="h-7 w-16 bg-ranch-100 rounded-full animate-pulse" />
            </div>
            <hr className="border-ranch-200" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-ranch-100 rounded animate-pulse" />
              <div className="h-4 w-full bg-ranch-100 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-ranch-100 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}