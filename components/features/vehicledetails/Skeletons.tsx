// components/features/vehicledetails/Skeletons.tsx

export function CancellationPolicySkeleton() {
  return (
    <div className="mb-8 animate-pulse">
      <div className="h-5 w-44 bg-gray-200 rounded mb-4" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-1.5 w-2 h-2 rounded-full bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3.5 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReviewsSkeleton() {
  return (
    <div className="mb-8 animate-pulse">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-5 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-100 rounded" />
      </div>
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="border border-gray-100 rounded-md p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="h-3.5 w-24 bg-gray-200 rounded" />
              </div>
              <div className="h-3.5 w-20 bg-gray-100 rounded" />
            </div>
            <div className="ml-10 space-y-1.5">
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
