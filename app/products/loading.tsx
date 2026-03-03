export default function ProductsLoading() {
  return (
    <div>
      <div className="bg-white border-b border-ranch-100">
        <div className="container-main py-10 sm:py-14">
          <div className="h-4 w-24 bg-ranch-200 rounded animate-pulse mb-3" />
          <div className="h-9 w-64 bg-ranch-200 rounded animate-pulse mb-3" />
          <div className="h-5 w-96 bg-ranch-100 rounded animate-pulse" />
        </div>
      </div>
      <div className="container-main py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-ranch-100">
              <div className="aspect-[4/3] bg-ranch-100 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-16 bg-ranch-100 rounded animate-pulse" />
                <div className="h-5 w-40 bg-ranch-200 rounded animate-pulse" />
                <div className="h-4 w-20 bg-ranch-100 rounded animate-pulse" />
                <div className="flex items-center justify-between">
                  <div className="h-6 w-16 bg-ranch-200 rounded animate-pulse" />
                  <div className="h-6 w-20 bg-ranch-100 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}