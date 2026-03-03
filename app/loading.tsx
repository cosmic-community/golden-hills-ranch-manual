export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-ranch-200 border-t-sage-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-ranch-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}