// components/features/searchresult/BikeGridSkeleton.tsx

/**
 * Skeleton placeholder for a single BikeCard, shaped to match
 * BikeCard's mobile and desktop markup so there is no layout shift
 * when real data swaps in.
 */
function BikeCardSkeleton() {
  return (
    <div className="w-full max-w-sm">
      {/* ── MOBILE skeleton ── */}
      <div className="sm:hidden bg-white rounded-md shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_2px_6px_2px_rgba(60,64,67,0.15)] overflow-hidden animate-pulse">
        <div className="p-4 pb-0">
          {/* badges */}
          <div className="flex gap-1.5 mb-3">
            <div className="h-4 w-16 rounded-full bg-gray-200" />
            <div className="h-4 w-20 rounded-full bg-gray-200" />
          </div>
          {/* title */}
          <div className="h-5 w-3/4 rounded bg-gray-200 mb-5" />
          {/* specs + image row */}
          <div className="grid grid-cols-[1fr_160px] gap-2.5 items-start mb-6">
            <div className="space-y-3">
              <div className="h-3.5 w-20 rounded bg-gray-200" />
              <div className="h-3.5 w-24 rounded bg-gray-200" />
              <div className="h-3.5 w-16 rounded bg-gray-200" />
              <div className="h-3.5 w-28 rounded bg-gray-200" />
            </div>
            <div className="flex justify-end">
              <div className="w-[160px] h-[130px] rounded bg-gray-200 mt-[-50px]" />
            </div>
          </div>
          {/* location dropdown trigger */}
          <div className="h-[52px] w-full rounded-md bg-gray-100 border border-gray-200" />
        </div>
        {/* footer */}
        <div className="flex items-center justify-between px-4 py-3 mt-3 border-t border-gray-100">
          <div className="space-y-1.5">
            <div className="h-3 w-20 rounded bg-gray-200" />
            <div className="h-5 w-16 rounded bg-gray-200" />
          </div>
          <div className="h-10 w-24 rounded-lg bg-gray-200" />
        </div>
      </div>

      {/* ── DESKTOP skeleton ── */}
      <div className="hidden sm:block h-[390px]">
        <div className="w-full h-full bg-white border border-gray-200 shadow-sm rounded-md flex flex-col pt-4 animate-pulse">
          {/* title */}
          <div className="h-5 w-2/3 mx-auto rounded bg-gray-200" />
          {/* image area */}
          <div className="h-36 flex items-center justify-center mt-2 p-3">
            <div className="h-full w-full rounded bg-gray-200" />
          </div>
          {/* "view specs" divider */}
          <div className="flex items-center px-4 mt-1 mb-3">
            <div className="flex-1 border-t-2 border-gray-100" />
            <div className="h-6 w-24 mx-3 rounded-full bg-gray-200" />
            <div className="flex-1 border-t-2 border-gray-100" />
          </div>
          <div className="px-4 pb-4 flex flex-col flex-1 justify-between">
            {/* spec row */}
            <div className="flex justify-between items-center px-1">
              <div className="h-3.5 w-16 rounded bg-gray-200" />
              <div className="h-3.5 w-16 rounded bg-gray-200" />
              <div className="h-3.5 w-16 rounded bg-gray-200" />
            </div>
            {/* location dropdown trigger */}
            <div className="h-[52px] w-full rounded-md bg-gray-100 border border-gray-200 mt-3" />
            {/* price + button footer */}
            <div className="flex justify-between items-end border-t-2 border-gray-100 pt-3 mt-3">
              <div className="space-y-1.5">
                <div className="h-5 w-16 rounded bg-gray-200" />
                <div className="h-3 w-12 rounded bg-gray-200" />
              </div>
              <div className="h-9 w-24 rounded-md bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BikeGridSkeletonProps {
  /** How many skeleton cards to render — match a typical first page of results */
  count?: number;
}

/**
 * Grid of BikeCardSkeletons, matching the exact grid classes used in
 * SearchResultsClient so the real grid drops in with zero layout shift.
 */
export default function BikeGridSkeleton({ count = 6 }: BikeGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-start px-5 py-5 md:px-0 md:py-0 md:pt-1 md:pr-5">
      {Array.from({ length: count }).map((_, i) => (
        <BikeCardSkeleton key={i} />
      ))}
    </div>
  );
}
