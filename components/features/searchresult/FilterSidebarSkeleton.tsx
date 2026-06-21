// components/features/searchresult/FilterSidebarSkeleton.tsx

function SkeletonSection({
  rows = 3,
  showSlider = false,
}: {
  rows?: number;
  showSlider?: boolean;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0 px-5 lg:px-6 py-4 animate-pulse">
      {/* section title row */}
      <div className="flex items-center justify-between mb-3">
        <div className="h-4 w-28 rounded bg-gray-200" />
        <div className="h-4 w-4 rounded bg-gray-200" />
      </div>
      {showSlider && (
        <>
          <div className="flex justify-between mb-3">
            <div className="h-3 w-8 rounded bg-gray-200" />
            <div className="h-3 w-12 rounded bg-gray-200" />
          </div>
          <div className="h-1.5 w-full rounded-full bg-gray-200 mb-4" />
        </>
      )}
      <div className="flex flex-col gap-2.5">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-200 shrink-0" />
            <div
              className="h-3.5 rounded bg-gray-200"
              style={{ width: `${55 + ((i * 17) % 35)}%` }}
            />
            <div className="h-3.5 w-5 rounded bg-gray-200 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton placeholder for FilterSidebar, shaped to match the real
 * sidebar's header + collapsible sections so layout doesn't shift
 * once filter options arrive.
 */
export default function FilterSidebarSkeleton() {
  return (
    <div className="bg-white rounded-md">
      {/* Header */}
      <div className="hidden lg:flex items-center justify-between px-5 py-4 lg:px-6 lg:pt-6 border-b border-gray-100 animate-pulse">
        <div className="h-5 w-16 rounded bg-gray-200" />
        <div className="h-4 w-24 rounded bg-gray-200" />
      </div>

      <SkeletonSection rows={2} showSlider />
      <SkeletonSection rows={3} />
      <SkeletonSection rows={4} />
      <SkeletonSection rows={2} />
      <SkeletonSection rows={2} />
    </div>
  );
}
