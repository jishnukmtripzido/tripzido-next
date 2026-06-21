// components/features/searchresult/SearchResultsLoading.tsx

import BikeGridSkeleton from "./BikeGridSkeleton";
import FilterSidebarSkeleton from "./FilterSidebarSkeleton";

/**
 * Suspense fallback for the data-dependent half of the search results
 * page (sidebar + tabs/sort row + grid). Mirrors SearchResultsClient's
 * outer layout exactly (same wrapper classes) so swapping in the real
 * content causes no shift.
 */
export default function SearchResultsLoading() {
  return (
    <div className="min-h-screen md:bg-gray-50">
      <div className="mx-auto flex gap-6 items-start">
        {/* Desktop filter sidebar */}
        <aside className="hidden lg:block xl:w-80 shrink-0 sticky top-[130px] self-start md:border-r border-gray-100 md:shadow-sm">
          <FilterSidebarSkeleton />
        </aside>

        <div className="flex-1 min-w-0">
          {/* Desktop: Tabs + Sort skeleton */}
          <div className="hidden md:flex pt-5 pr-5 items-end justify-between flex-wrap gap-3 mb-4 animate-pulse">
            <div className="flex items-center gap-4 border-b border-gray-200 pb-2.5">
              <div className="h-5 w-24 rounded bg-gray-200" />
              <div className="h-5 w-20 rounded bg-gray-200" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-14 rounded bg-gray-200" />
              <div className="h-9 w-32 rounded-lg bg-gray-200" />
            </div>
          </div>

          <BikeGridSkeleton count={6} />
        </div>
      </div>
    </div>
  );
}
